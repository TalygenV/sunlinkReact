import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import Stripe from "stripe";
import * as fs from "fs";
import * as docusign from "docusign-esign";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
admin.initializeApp();
const corsHandler = cors({ origin: true });

const integratorKey = process.env.DOCUSIGN_CLIENT_ID;
const userId = process.env.DOCUSIGN_USER_ID;
const accountId = process.env.DOCUSIGN_ACCOUNT_ID;
const basePath = "https://demo.docusign.net/restapi";
const privateKey = fs.readFileSync("./private.key");
const SCOPES = ["signature", "impersonation"];

// Type declarations for better code organization
interface SurveyResponse {
  success: boolean;
  message: string;
  data?: Record<string, any>;
}

interface SurveyRequestData {
  address: string;
}

// Add this helper function at the top of the file, after imports
function safeStringify(obj: any): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  });
}

// Helper function to make the API call to check survey availability
async function callSurveyApi(address: string, preview: boolean): Promise<any> {
  const apiKey = process.env.NEARMAP_API_KEY;
  if (!apiKey) {
    functions.logger.error("Missing Nearmap API key");
    throw new functions.https.HttpsError(
      "internal",
      "Missing Nearmap API key."
    );
  }

  // Format address to match the working example
  const formattedAddress = address.trim();

  const config = {
    method: "get",
    // maxBodyLength: Infinity,
    url: `https://api.nearmap.com/coverage/v2/tx/address?address=${formattedAddress}&country=US&dates=single&resources=raster:Vert,aiPacks:roof_char&limit=1&sort=captureDate&preview=${preview}&apikey=${apiKey}`,
    // params: {
    //   address: formattedAddress,
    //   country: "US",
    //   dates: "single",
    //   resources: "raster:Vert,aiPacks:roof_char",
    //   limit: 1,
    //   sort: "captureDate",
    //   preview: preview,
    //   apikey: apiKey,
    // },
    // headers: {
    //   Accept: "application/json",
    // },
    // paramsSerializer: (params) => {
    //   return Object.entries(params)
    //     .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    //     .join("&");
    // },
  };

  functions.logger.info("Making API call with config:", {
    url: config.url,
    // params: config.params,
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey.length,
  });

  try {
    const response = await axios.request(config);
    functions.logger.info("API call successful:", {
      status: response.status,
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : [],
    });
    return response.data;
  } catch (error) {
    functions.logger.error("Nearmap API call failed:", {
      error: error.response?.data || error.message,
      status: error.response?.status,
      headers: error.response?.headers,
      config: {
        url: config.url,
        // params: config.params,
        // headers: config.headers,
      },
    });

    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      throw new Error("No response received from Nearmap API");
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}

// Helper function to fetch the actual survey image
async function getSurveyImage(
  surveyId: string,
  bbox: string,
  transactionToken: string
): Promise<any> {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.nearmap.com/staticmap/v3/surveys/${surveyId}/Vert.png`,
    params: {
      bbox: bbox,
      transactionToken: transactionToken,
    },
    headers: {},
    responseType: "arraybuffer",
  };

  return await axios.request(config);
}

/**
 * Cloud function to check survey availability and retrieve survey data and image if available
 */
async function getRoofData(aiResourceId, transactionToken) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.nearmap.com/ai/features/v4/tx/surveyresources/${aiResourceId}/features.json`,
    params: {
      transactionToken: transactionToken,
    },
    headers: {},
  };
  try {
    return await axios.request(config);
  } catch (error) {
    functions.logger.error("Roof data retrieval failed", {
      aiResourceId,
      error:
        (error === null || error === void 0 ? void 0 : error.message) ||
        "Unknown error",
    });
    throw error;
  }
}

exports.checkSurveyAvailability = functions.https.onCall(
  async (data, context) => {
    try {
      functions.logger.info("Received data in checkSurveyAvailability:", {
        data: safeStringify(data),
        dataType: typeof data,
        hasAddress: data && "address" in data,
        addressValue: data && data.address,
      });

      // Input validation
      if (!data || typeof data !== "object") {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Data must be an object"
        );
      }

      // Extract address from the nested structure
      const address = data.data?.address || data.address;

      if (!address) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Address is required"
        );
      }

      functions.logger.info(
        "Making API call to Nearmap with address:",
        address
      );

      // Step 1: Check availability with preview=true
      try {
        const previewResponse = await callSurveyApi(address, true);
        functions.logger.info("Preview response received:", {
          hasSurveys: !!previewResponse?.surveys,
          surveyCount: previewResponse?.surveys?.length,
          responseKeys: Object.keys(previewResponse || {}),
          fullResponse: safeStringify(previewResponse),
        });

        // If preview check succeeds, proceed to get actual data
        if (
          previewResponse &&
          previewResponse.surveys &&
          previewResponse.surveys.length > 0
        ) {
          // Step 2: Get actual survey data with preview=false
          const actualResponse = await callSurveyApi(address, false);
          functions.logger.info("Actual survey response received:", {
            actualResponse,
            hasSurveys: !!actualResponse?.surveys,
            surveyCount: actualResponse?.surveys?.length,
            responseKeys: Object.keys(actualResponse || {}),
            fullResponse: safeStringify(actualResponse),
          });

          const surveyData = actualResponse;
          // Ensure we have the required data for the image request
          if (
            surveyData &&
            surveyData.surveys &&
            surveyData.surveys.length > 0
          ) {
            const firstSurvey = surveyData.surveys[0];
            const surveyId = firstSurvey.id;
            const bbox = surveyData.bbox;
            const transactionToken = surveyData.transactionToken;

            functions.logger.info("Making image request with:", {
              surveyId,
              bbox,
              hasTransactionToken: !!transactionToken,
            });

            // Step 3: Get the actual survey image
            const imageResponse = await getSurveyImage(
              surveyId,
              bbox,
              transactionToken
            );
            functions.logger.info("Survey image retrieved", {
              imageResponse,
              address: address,
              surveyId: surveyId,
              status: imageResponse.status,
              contentType: imageResponse.headers["content-type"],
              hasImageData: !!imageResponse.data,
            });

            // Convert binary image data to base64 for transmission
            const imageBase64 = Buffer.from(imageResponse.data).toString(
              "base64"
            );
            const imageDataUrl = `data:${
              imageResponse.headers["content-type"] || "image/png"
            };base64,${imageBase64}`;

            // Step 4: Get roof data if aiResourceId is available
            let roofData = null;
            if (firstSurvey.aiResourceId) {
              try {
                const roofResponse = await getRoofData(
                  firstSurvey.aiResourceId,
                  transactionToken
                );
                roofData = roofResponse.data;
                functions.logger.info("Roof data retrieved successfully", {
                  roofResponse,
                  address: address,
                  aiResourceId: firstSurvey.aiResourceId,
                  hasRoofData: !!roofData,
                  roofDataKeys: roofData ? Object.keys(roofData) : [],
                });
              } catch (roofError) {
                functions.logger.error("Roof data retrieval failed", {
                  address: address,
                  aiResourceId: firstSurvey.aiResourceId,
                  error:
                    roofError instanceof Error
                      ? roofError.message
                      : "Unknown error",
                  errorStack:
                    roofError instanceof Error ? roofError.stack : undefined,
                });
                // Continue even if roof data fails - the rest of the process will work
              }
            }

            const responseData = {
              success: true,
              message:
                "Survey data, image, and roof data retrieved successfully",
              data: {
                surveyData: surveyData,
                imageData: imageDataUrl, // Use the data URL instead of raw base64
                contentType:
                  imageResponse.headers["content-type"] || "image/png",
                roofData: roofData,
              },
            };

            functions.logger.info("Sending response to client:", {
              responseData,
              hasSurveyData: !!responseData.data.surveyData,
              hasImageData: !!responseData.data.imageData,
              hasRoofData: !!responseData.data.roofData,
              responseKeys: Object.keys(responseData),
              imageDataLength: responseData.data.imageData.length,
            });

            return responseData;
          }
        }
        // If we got here, either the preview check failed or we couldn't get the actual data/image
        const errorResponse = {
          success: false,
          message: "No survey available for this address",
          data: previewResponse,
        };

        functions.logger.info("Sending error response to client:", {
          hasPreviewData: !!errorResponse.data,
          responseKeys: Object.keys(errorResponse),
        });

        return errorResponse;
      } catch (apiError) {
        functions.logger.error("API call failed", {
          error: apiError instanceof Error ? apiError.message : "Unknown error",
          errorStack: apiError instanceof Error ? apiError.stack : undefined,
          address: address,
        });
        throw new functions.https.HttpsError(
          "internal",
          "Failed to retrieve survey data: " +
            (apiError instanceof Error ? apiError.message : "Unknown error")
        );
      }
    } catch (error) {
      // Log the error for debugging
      functions.logger.error("Survey check failed", {
        address: data?.address || "not provided",
        error: error instanceof Error ? error.message : "Unknown error",
        errorStack: error instanceof Error ? error.stack : undefined,
        errorType:
          error instanceof Error ? error.constructor.name : typeof error,
      });

      // Error handling
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      if (error.isAxiosError) {
        if (error.response) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            `API returned error: ${error.response.status}`,
            {
              status: error.response.status,
              data: safeStringify(error.response.data),
            }
          );
        } else if (error.request) {
          throw new functions.https.HttpsError(
            "unavailable",
            "No response received from survey API"
          );
        }
      }
      throw new functions.https.HttpsError(
        "internal",
        "Failed to check survey availability: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }
);

/**
 * Cloud function to create a Stripe Checkout session for the $500 deposit
 */
exports.createStripe = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.info("Creating Stripe session with data:", data);

    // @ts-ignore
    if (!functions.config()) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 1: functions.config() is undefined",
        { checkpoint: 1 }
      );
    }

    // @ts-ignore
    if (!functions.config().stripe) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 2: functions.config().stripe is undefined",
        // @ts-ignore
        { checkpoint: 2, configKeys: Object.keys(functions.config() || {}) }
      );
    }

    // @ts-ignore
    const stripeSecretKey = functions.config().stripe?.secret_key;

    if (!stripeSecretKey) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 3: Missing Stripe secret key in environment variables",
        { checkpoint: 3 }
      );
    }

    // Try initializing Stripe
    let stripe;
    try {
      stripe = new Stripe(stripeSecretKey);
    } catch (stripeInitError) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 4: Failed to initialize Stripe client",
        {
          checkpoint: 4,
          error:
            stripeInitError instanceof Error
              ? stripeInitError.message
              : "Unknown error",
          keyLength: stripeSecretKey.length,
        }
      );
    }

    // Extract customer data and amount
    const { name, email, amount = 50000, orderSummary } = data; // Default to $500 if not provided
    if (!name || !email) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "CHECKPOINT 5: Missing name or email in request data",
        { checkpoint: 5, hasName: !!name, hasEmail: !!email }
      );
    }

    // Create a new customer directly with provided data
    let customerId;
    try {
      const customer = await stripe.customers.create({
        name: name || "Solar Customer",
        email,
        metadata: {
          address: orderSummary?.customerInfo?.address || "",
          city: orderSummary?.customerInfo?.city || "",
          state: orderSummary?.customerInfo?.state || "",
          zipCode: orderSummary?.customerInfo?.zipCode || "",
          systemSize: orderSummary?.systemDetails?.baseSystemCost
            ? `${orderSummary.systemDetails.baseSystemCost / 1000}kW`
            : "",
          batteryCount:
            orderSummary?.systemDetails?.batteryCount?.toString() || "0",
          includeRoof:
            orderSummary?.systemDetails?.includeRoof?.toString() || "false",
          includeEvCharger:
            orderSummary?.systemDetails?.includeEvCharger?.toString() ||
            "false",
          selectedPlan: orderSummary?.selectedPlan?.title || "",
          totalCost: orderSummary?.systemDetails?.totalCost?.toString() || "",
          taxCreditAmount:
            orderSummary?.systemDetails?.taxCreditAmount?.toString() || "",
          finalCost:
            orderSummary?.systemDetails?.costAfterTaxCredit?.toString() || "",
        },
      });

      customerId = customer.id;
      functions.logger.info("Created Stripe customer:", customerId);
    } catch (customerError) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 6: Failed to create Stripe customer",
        {
          checkpoint: 6,
          error:
            customerError instanceof Error
              ? customerError.message
              : "Unknown error",
          errorDetails: JSON.stringify(
            customerError,
            Object.getOwnPropertyNames(customerError)
          ),
        }
      );
    }

    // Define the return URL - ensure the path matches your routes
    const returnUrl = `${
      data.origin || "http://localhost:5173"
    }/design-return?session_id={CHECKOUT_SESSION_ID}`;
    functions.logger.info("Return URL:", returnUrl);

    // Create the checkout session with dynamic amount
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        ...(customerId && { customer: customerId }),
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Solar System Design Deposit",
                description: `Initial deposit for ${
                  orderSummary?.selectedPlan?.title || "solar system"
                } installation`,
                metadata: {
                  systemSize: orderSummary?.systemDetails?.baseSystemCost
                    ? `${orderSummary.systemDetails.baseSystemCost / 1000}kW`
                    : "",
                  batteryCount:
                    orderSummary?.systemDetails?.batteryCount?.toString() ||
                    "0",
                  includeRoof:
                    orderSummary?.systemDetails?.includeRoof?.toString() ||
                    "false",
                  includeEvCharger:
                    orderSummary?.systemDetails?.includeEvCharger?.toString() ||
                    "false",
                  selectedPlan: orderSummary?.selectedPlan?.title || "",
                  totalCost:
                    orderSummary?.systemDetails?.totalCost?.toString() || "",
                  taxCreditAmount:
                    orderSummary?.systemDetails?.taxCreditAmount?.toString() ||
                    "",
                  finalCost:
                    orderSummary?.systemDetails?.costAfterTaxCredit?.toString() ||
                    "",
                },
              },
              unit_amount: amount, // Use the provided amount
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        return_url: returnUrl,
        metadata: {
          systemSize: orderSummary?.systemDetails?.baseSystemCost
            ? `${orderSummary.systemDetails.baseSystemCost / 1000}kW`
            : "",
          batteryCount:
            orderSummary?.systemDetails?.batteryCount?.toString() || "0",
          includeRoof:
            orderSummary?.systemDetails?.includeRoof?.toString() || "false",
          includeEvCharger:
            orderSummary?.systemDetails?.includeEvCharger?.toString() ||
            "false",
          selectedPlan: orderSummary?.selectedPlan?.title || "",
          totalCost: orderSummary?.systemDetails?.totalCost?.toString() || "",
          taxCreditAmount:
            orderSummary?.systemDetails?.taxCreditAmount?.toString() || "",
          finalCost:
            orderSummary?.systemDetails?.costAfterTaxCredit?.toString() || "",
        },
      });

      functions.logger.info("Created Stripe session successfully", {
        sessionId: session.id,
        hasClientSecret: !!session.client_secret,
        amount: amount,
      });
    } catch (sessionError) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 7: Failed to create checkout session",
        {
          checkpoint: 7,
          error:
            sessionError instanceof Error
              ? sessionError.message
              : "Unknown error",
          errorDetails: JSON.stringify(
            sessionError,
            Object.getOwnPropertyNames(sessionError)
          ),
        }
      );
    }

    if (!session || !session.client_secret) {
      throw new functions.https.HttpsError(
        "internal",
        "CHECKPOINT 8: Session created but client_secret is missing",
        { checkpoint: 8, hasSession: !!session }
      );
    }

    // Success! Return only the client secret
    return { clientSecret: session.client_secret };
  } catch (error) {
    functions.logger.error("Error in createStripe:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to create Stripe session",
      { error: error instanceof Error ? error.message : "Unknown error" }
    );
  }
});

// Add a function to verify Stripe sessions status
exports.verifyStripeSession = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.info("Verifying Stripe session:", data.sessionId);

    if (!data.sessionId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Session ID is required",
        { missingSessionId: true }
      );
    }

    // @ts-ignore
    const stripeSecretKey = functions.config().stripe?.secret_key;

    if (!stripeSecretKey) {
      throw new functions.https.HttpsError(
        "internal",
        "Missing Stripe secret key in environment variables"
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    // Retrieve the session to check its status
    const session = await stripe.checkout.sessions.retrieve(data.sessionId);

    functions.logger.info("Retrieved session status:", {
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
    });

    return {
      success: true,
      sessionId: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
    };
  } catch (error) {
    functions.logger.error("Error verifying Stripe session:", error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      "internal",
      "Failed to verify Stripe session: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
});

exports.testCallable = functions.https.onCall(async (data, context) => {
  return { message: "This works!" };
});

export const createSigningLink = functions.https.onRequest(async (req, res) => {
  // CORS Headers
  res.set("Access-Control-Allow-Origin", "*"); // In production, replace * with your domain
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { signerName, signerEmail, returnUrl, templateId } = req.body;

    if (!templateId) {
      return res.status(400).json({ error: "templateId is required" });
    }

    const apiClient = new docusign.ApiClient();
    apiClient.setOAuthBasePath("account-d.docusign.com");

    const results = await apiClient.requestJWTUserToken(
      integratorKey,
      userId,
      ["signature", "impersonation"],
      privateKey,
      3600
    );

    const accessToken = results.body.access_token;
    apiClient.setBasePath(basePath);
    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    const envelopeDefinition = {
      templateId,
      templateRoles: [
        {
          email: signerEmail,
          name: signerName,
          roleName: "Customer",
          clientUserId: "1001",
        },
      ],
      status: "sent",
    };

    const envelope = await envelopesApi.createEnvelope(accountId, {
      envelopeDefinition,
    });

    const viewRequest = {
      authenticationMethod: "none",
      clientUserId: "1001",
      recipientId: "1",
      returnUrl,
      userName: signerName,
      email: signerEmail,
    };

    const result = await envelopesApi.createRecipientView(
      accountId,
      envelope.envelopeId!,
      { recipientViewRequest: viewRequest }
    );

    return res.status(200).json({ url: result.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create signing link" });
  }
});

exports.fetchAPRTerms = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  try {
    // Credentials and headers
    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    // Step 1: Get access token
    const tokenResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/gettoken/accesstoken",
      {
        username: "sunlinkapipt@yopmail.com.pt",
        password: "Test123!",
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = (tokenResponse.data as { access_token: string })
      .access_token;

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    // Step 2: Use access token to fetch products
    const productResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/product/fetchproducts",
      {
        products: [
          {
            apr: 3.99,
            isACH: true,
          },
        ],
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: `Bearer ${accessToken}`,
        },
      }
    );

    // Combine and respond
    res.status(200).json({
      access_token: accessToken,
      product_response: productResponse.data,
    });
  } catch (error) {
    console.error(error.message, error.response?.data || error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});
exports.fetchAPRTermsoncall = functions.https.onCall(async (data, context) => {
  try {
    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    // Step 1: Get access token
    const tokenResponse = await axios.post<{ access_token: string }>(
      "https://test.connect.boomi.com/ws/rest/v1/pt/gettoken/accesstoken",
      {
        username: "sunlinkapipt@yopmail.com.pt",
        password: "Test123!",
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data?.access_token;

    if (!accessToken) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get access token."
      );
    }

    // Step 2: Use access token to fetch products
    const productResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/product/fetchproducts",
      {
        products: [
          {
            apr: 3.99,
            isACH: true,
          },
        ],
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      access_token: accessToken,
      product_response: productResponse.data,
    };
  } catch (error) {
    console.error(error.message, error.response?.data || error);
    throw new functions.https.HttpsError(
      "internal",
      error.message,
      error.response?.data || null
    );
  }
});

exports.fetchProducts = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  try {
    // Credentials and headers
    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    // Step 1: Get access token
    const tokenResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/gettoken/accesstoken",
      {
        username: "sunlinkapipt@yopmail.com.pt",
        password: "Test123!",
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = (tokenResponse.data as { access_token: string })
      .access_token;

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    // Step 2: Use access token to fetch products
    const productResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/product/fetchproducts",
      {
        products: [
          {
            loanType: "Single",
            ShowTiers: ["All"],
            language: "English",
          },
        ],
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: `Bearer ${accessToken}`,
        },
      }
    );

    // Combine and respond
    res.status(200).json({
      access_token: accessToken,
      product_response: productResponse.data,
    });
  } catch (error) {
    console.error(error.message, error.response?.data || error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

exports.calculateLoanProduct = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const {
      sfAccessToken,
      term,
      stateName,
      name,
      loanAmount,
      apr,
      productType,
      projectCategory,
    } = req.body;

    if (
      !sfAccessToken ||
      !term ||
      !stateName ||
      !name ||
      !loanAmount ||
      !apr ||
      !productType ||
      !projectCategory
    ) {
      res.status(400).json({ error: "Missing required parameters in body." });
      return;
    }
    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v2/pt/slf/calculator",
      {
        term,
        stateName,
        isACH: true,
        name,
        loanAmount,
        paydownPercentage: 1,
        apr,
        productType,
        projectCategory,
        alternatePaydown: 0,
        nonSolarAmount: 0,
      },
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (error) {
    console.error(error.message, error.response?.data || error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

exports.createSolarProject = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const {
      sfAccessToken,
      apr,
      term,
      productType,
      installStreet,
      installCity,
      installStateName,
      installZipCode,
      firstName,
      lastName,
      phone,
      otherPhone,
      email,
      mailingStreet,
      mailingCity,
      mailingStateName,
      mailingZipCode,
      residenceStreet,
      residenceCity,
      residenceStateName,
      residenceZipCode,
      dateOfBirth,
      ssn,
      annualIncome,
      employerName,
      jobTitle,
      employmentYears,
      employmentMonths,
      loanAmount,
      projectType,
      estAnnualProductionkwh,
      inverterCount,
      inverterMake,
      inverterModel,
      moduleCount,
      moduleMake,
      moduleModel,
      systemSize,
    } = req.body;

    if (!sfAccessToken) {
      res
        .status(400)
        .json({ error: "Missing required parameter: sfAccessToken" });
      return;
    }

    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      projects: [
        {
          apr,
          term,
          isACH: true,
          productType,
          installStreet,
          installCity,
          installStateName,
          installZipCode,
          sendLinkEmail: false,
          applicants: [
            {
              isPrimary: true,
              firstName,
              lastName,
              phone,
              otherPhone,
              email,
              mailingStreet,
              mailingCity,
              mailingStateName,
              mailingZipCode,
              residenceStreet,
              residenceCity,
              residenceStateName,
              residenceZipCode,
              dateOfBirth,
              ssn,
              annualIncome,
              employerName,
              jobTitle,
              employmentYears,
              employmentMonths,
            },
          ],
          quotes: [
            {
              loanAmount,
            },
          ],
          systemDesigns: [
            {
              projectType,
              estAnnualProductionkwh,
              inverterCount,
              inverterMake,
              inverterModel,
              moduleCount,
              moduleMake,
              moduleModel,
              systemSize,
            },
          ],
        },
      ],
    };

    // Call Boomi API
    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/pricing/createaccount",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (error) {
    console.error(error.message, error.response?.data || error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

exports.prequalBoomi = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    const {
      sfAccessToken,
      projectId,
      applicantId,
      firstName,
      lastName,
      annualIncome,
    } = req.body;

    if (
      !sfAccessToken ||
      !projectId ||
      !applicantId ||
      !firstName ||
      !lastName ||
      !annualIncome
    ) {
      res
        .status(400)
        .json({ error: "Missing one or more required parameters." });
      return;
    }

    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      projects: [
        {
          id: projectId,
          applicants: [
            {
              id: applicantId,
              isPrimary: true,
              firstName,
              lastName,
              annualIncome,
            },
          ],
          prequals: [
            {
              isPrequalAuthorized: true,
            },
          ],
        },
      ],
    };

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v2/pt/prequal",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (err) {
    console.error(err.message, err.response?.data || err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});

exports.submitCreditCheck = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    const {
      sfAccessToken,
      projectId,
      applicantId,
      firstName,
      lastName,
      phone,
      otherPhone,
      email,
      annualIncome,
      employerName,
      employmentMonths,
      employmentYears,
      jobTitle,
      dateOfBirth,
      ssn,
    } = req.body;

    // validate required params
    if (
      !sfAccessToken ||
      !projectId ||
      !applicantId ||
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !annualIncome ||
      !employerName ||
      !employmentMonths ||
      !employmentYears ||
      !jobTitle ||
      !dateOfBirth ||
      !ssn
    ) {
      res
        .status(400)
        .json({ error: "Missing one or more required parameters." });
      return;
    }

    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      projects: [
        {
          id: projectId,
          isCreditAuthorized: true,
          applicants: [
            {
              id: applicantId,
              firstName,
              lastName,
              phone,
              otherPhone,
              email,
              isPrimary: true,
              annualIncome,
              employerName,
              employmentMonths,
              employmentYears,
              jobTitle,
              dateOfBirth,
              ssn,
            },
          ],
        },
      ],
    };

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/credit/submit",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (err) {
    console.error(err.message, err.response?.data || err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});

exports.loanDocsSunLight = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    const { sfAccessToken, projectId } = req.body;

    if (!sfAccessToken || !projectId) {
      res.status(400).json({
        error: "Missing required parameters: sfAccessToken, projectId",
      });
      return;
    }

    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      projects: [
        {
          id: projectId,
          deliveryMethod: "inPerson",
        },
      ],
    };

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/sendloandocs/request",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
          returnUrl : req?.body?.returnUrl
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (err) {
    console.error(err.message, err.response?.data || err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});

exports.getProjectStatus = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    const { sfAccessToken, projectIds } = req.body;

    if (!sfAccessToken || !projectIds) {
      res.status(400).json({
        error: "Missing required parameters: sfAccessToken, projectIds",
      });
      return;
    }

    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      projectIds,
    };

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/getstatus/status",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          SFAccessToken: sfAccessToken,
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (err) {
    console.error(err.message, err.response?.data || err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});

exports.getAccessToken = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, SFAccessToken");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    const authHeader =
      "Basic c3VubGlua0BzdW5saWdodGZpbmFuY2lhbC1XU0hBM1ouTjI5U0NFOmI1ODM4NzA1LWRmYjUtNDAyZi1iZTE3LTg3N2JhNmEwYWZmOA==";

    const payload = {
      username: "sunlinkapipt@yopmail.com.pt",
      password: "Test123!",
    };

    const boomiResponse = await axios.post(
      "https://test.connect.boomi.com/ws/rest/v1/pt/gettoken/accesstoken",
      payload,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(boomiResponse.data);
  } catch (err) {
    console.error(err.message, err.response?.data || err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});
