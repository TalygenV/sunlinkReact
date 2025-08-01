import React, { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, User, Home, Calendar, ArrowRight, X, Shield, AlertCircle, Download, FileTextIcon, ShieldIcon, MailIcon, XIcon, CheckCircleIcon, AlertCircleIcon, } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ContractSigningPageProps {
  onSigningComplete: () => void;
  onBack: () => void;
  customerInfo: { name: string; email: string; address: string; };
  systemDetails: { size: string; batteryCount: number; totalPrice: number; selectedPlan: string; };
  onFinancingApproved: (value: string) => void; isFinancingApproved: string;
}

const ContractSigningPage: React.FC<ContractSigningPageProps> = ({
  onSigningComplete,
  onBack,
  customerInfo,
  systemDetails,
  onFinancingApproved,
  isFinancingApproved,
}) => {
  const [signingStepSunlink, setSigningStepSunlink] = useState<
    "review" | "signing" | "processing" | "complete"
  >("review");
  const [showSigningModal, setShowSigningModal] = useState(false);
  const [signingUrlSunlink, setSigningUrlLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [signedStatus, setSignedStatus] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDocuSignIframe, setShowDocuSignIframe] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", uid: "", });
  const [error, setError] = useState<string | null>(null);
  // Firebase function configuration
  const FIREBASE_FUNCTION_URL = "https://createsigninglink-6wr3ut5iuq-uc.a.run.app/createSigningLink";
  const templateId = import.meta.env.VITE_DOCUSIGN_TEMPLATEID; // Replace with your actual template ID

  useEffect(() => {
    // Check URL parameters for signing completion
    const urlParams = new URLSearchParams(window.location.search);
    const event = urlParams.get("event");
    console.log("event", event);
    if (event === "signing_complete") {
      handleSigningComplete();
      // Clean up URL parameters
      //window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Initialize user info from storage or show form

    setSigningStepSunlink("signing");
    setShowDocuSignIframe(true);
    createSigningLink();
  }, [window.location]);

  useEffect(() => {
    // Listen for messages from signing popup/iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.origin) return;

      if (event.data?.type === "SIGNING_COMPLETED") {
        console.log("Received SIGNING_COMPLETED message");
        setShowSigningModal(false);
        //handleSigningComplete();
        setError(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.getElementById("docuSignIframe") as HTMLIFrameElement;
      try {
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        const bodyText = doc?.body?.innerText || "";

        if (
          bodyText.includes(
            "The process has been successfully completed. You may now close this modal and continue with the next steps."
          )
        ) {
          clearInterval(interval);
          setSigningStepSunlink("complete");
          setTimeout(() => {
            onSigningComplete();
          }, 3000);
        }
      } catch (err) {
        // Cross-origin protection (expected)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
    }
  }, []);

  const createSigningLink = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const storedName = localStorage.getItem("nameGlobal") || "";
      const storedEmail = localStorage.getItem("emailGlobal") || "";
      const uidGlobal = localStorage.getItem("uidGlobal") || "";
      if (storedName && storedEmail) { setUserInfo({ name: storedName, email: storedEmail, uid: uidGlobal }); }
      console.log("templateId", templateId);
      console.log("userInfo", userInfo);
      const returnUrl = `http://localhost:5001/#/success-page`;
      //const returnUrl = `${window.location.origin}/success-page`;
      console.log("returnUrl", returnUrl);
      const response = await fetch(
        "https://us-central1-sunlink-21942.cloudfunctions.net/createSigningLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            signerName: storedName,
            signerEmail: storedEmail,
            returnUrl: returnUrl, //"http://localhost:5173/success-page",
            templateId: templateId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      if (result?.url) {
        setSigningUrlLink(result.url);
        setShowSigningModal(true);
      } else {
        throw new Error("No signing URL received from server");
      }

      setTimeout(() => {
        //setShowSigningModal(false);
      }, 15000);
    } catch (error: any) {
      console.log("Error creating signing link:", error);
      setError(
        error.message || "Failed to create signing link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignContract = () => {
    createSigningLink();
  };

  const handleSigningComplete = () => {
    setSignedStatus("completed");
    setShowSigningModal(false);
    // Show success message
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  const handleSigningCancel = () => {
    setSignedStatus("cancelled");
    setShowSigningModal(false);
  };

  const handleStartSigning = () => { };

  const handleDocuSignComplete = () => {
    setSigningStepSunlink("processing");
    setShowDocuSignIframe(false);

    // Simulate processing time
    setTimeout(() => {
      setSigningStepSunlink("complete");
      setTimeout(() => {
        onSigningComplete();
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    // Check URL parameters for signing completion
    const urlParams = new URLSearchParams(window.location.search);
    const event = urlParams.get("event");

    if (event === "signing_complete") {
      handleDocuSignComplete();
      // Clean up URL parameters
      //window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const DocuSignIframe: React.FC = () => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col animate-fade-in shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">
                Home Improvement Contract
              </h3>
              <p className="text-sm text-gray-400">
                SunLink Solar Installation Agreement
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDocuSignIframe(false)}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* DocuSign Iframe Simulation */}
        <div className="flex-1 overflow-hidden bg-gray-800">
          <div className="h-full flex flex-col">
            <div className="bg-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Solar Installation Contract</div>
                  <div className="text-sm opacity-80">
                    Please review and sign below
                  </div>
                </div>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded">
                Step 1 of 3
              </div>
            </div>

            <div className="flex-1 p-6 bg-gray-900 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center border-b border-gray-700 pb-6">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    HOME IMPROVEMENT CONTRACT
                  </h1>
                  <p className="text-gray-400">
                    Solar Energy System Installation Agreement
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    Contract #: SL-{Date.now().toString().slice(-6)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-white mb-3">Contractor</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>SunLink Solar Solutions LLC</div>
                      <div>123 Solar Drive</div>
                      <div>Energy City, CA 90210</div>
                      <div>License #: C-46 123456</div>
                      <div>Phone: (555) 123-SOLAR</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-white mb-3">Customer</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>{customerInfo.name}</div>
                      <div>{customerInfo.address}</div>
                      <div>{customerInfo.email}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-950 border border-blue-800 rounded-lg p-6">
                  <h3 className="font-medium text-blue-200 mb-4">
                    Solar Energy System Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-300">
                        System Size:
                      </span>
                      <span className="ml-2 text-blue-100">
                        {systemDetails.size} kW
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-300">
                        Battery Storage:
                      </span>
                      <span className="ml-2 text-blue-100">
                        {systemDetails.batteryCount} units
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-300">
                        Total Contract Price:
                      </span>
                      <span className="ml-2 text-blue-100">
                        ${systemDetails.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-300">
                        Financing:
                      </span>
                      <span className="ml-2 text-blue-100">
                        {systemDetails.selectedPlan === "cash"
                          ? "Cash Payment"
                          : "Solar Loan"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Key Contract Terms</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">
                          Installation Timeline:
                        </span>{" "}
                        Work will commence within 30-60 days of permit approval
                        and be completed within 1-3 days of installation start.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Warranty Coverage:</span>{" "}
                        25-year manufacturer warranty on solar panels, 10-year
                        warranty on installation workmanship.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">
                          Permits & Inspections:
                        </span>{" "}
                        Contractor will obtain all necessary permits and
                        coordinate required inspections.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Right to Cancel:</span>{" "}
                        Customer has 3 business days to cancel this contract
                        without penalty.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="font-medium text-white mb-4">
                    Electronic Signature Required
                  </h3>
                  <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-300">
                        <p className="font-medium mb-1">
                          Please Review Carefully
                        </p>
                        <p>
                          By signing below, you acknowledge that you have read,
                          understood, and agree to all terms and conditions of
                          this contract. This is a legally binding agreement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center bg-blue-950">
                      <div className="text-blue-300 mb-2">
                        <User className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="font-medium text-blue-200 mb-1">
                        Customer Signature
                      </div>
                      <div className="text-sm text-blue-100 mb-4">
                        {customerInfo.name}
                      </div>
                      <button
                        onClick={handleSignContract}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Click to Sign
                      </button>
                    </div>

                    <div className="border border-gray-600 rounded-lg p-6 text-center bg-gray-800">
                      <div className="text-gray-400 mb-2">
                        <User className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="font-medium text-gray-300 mb-1">
                        Contractor Signature
                      </div>
                      <div className="text-sm text-gray-400 mb-4">
                        SunLink Solar Solutions
                      </div>
                      <div className="text-xs text-gray-500">
                        Will be signed after customer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (signingStepSunlink === "processing" || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl p-8 text-center animate-fade-in shadow-xl">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-white mb-4">
            Processing Your Contract
          </h2>
          <p className="text-gray-400 mb-6">
            Finalizing your solar installation agreement...
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (signingStepSunlink === "complete") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl p-8 text-center animate-fade-in shadow-xl">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-white mb-4">
            Contract Signed Successfully!
          </h2>
          <p className="text-gray-400 mb-6">
            Your solar installation agreement has been completed and processed.
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Redirecting to order confirmation...
            </p>
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="tesla-card rounded-2xl w-full max-w-4xl mt-8 p-8 animate-fade-in bg-gray-900 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">
            Installation Contract
          </h1>
          <p className="text-gray-400">
            Review and sign your home improvement agreement
          </p>
        </div>

        {/* Contract Overview */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium text-white mb-6">
            Contract Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">Customer</div>
                <div className="font-medium text-white">
                  {customerInfo.name}
                </div>
                <div className="text-sm text-gray-500">
                  {customerInfo.email}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">
                  Installation Address
                </div>
                <div className="font-medium text-white">
                  {customerInfo.address}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">System Details</div>
                <div className="font-medium text-white">
                  {systemDetails.size} kW Solar System
                </div>
                <div className="text-sm text-gray-500">
                  {systemDetails.batteryCount} Battery Units
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Contract Value</div>
                <div className="font-medium text-white">
                  ${systemDetails.totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  {systemDetails.selectedPlan === "cash"
                    ? "Cash Payment"
                    : "Solar Financing"}
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="font-medium text-white mb-3">Key Contract Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  25-year equipment warranty
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">
                  10-year installation warranty
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">All permits included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">3-day right to cancel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-300 mb-2">
                Important Information
              </h3>
              <div className="text-sm text-yellow-200 space-y-2">
                <p>• This is a legally binding home improvement contract</p>
                <p>• You have 3 business days to cancel without penalty</p>
                <p>
                  • All work will be performed by licensed, insured contractors
                </p>
                <p>• Installation timeline: 30–60 days from permit approval</p>
                <p>• Final payment due upon system activation and inspection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleStartSigning}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex-1 py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl"
          >
            <FileText className="w-6 h-6" />
            <span>Review & Sign Contract</span>
          </button>

          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white flex-1 py-4 px-8 rounded-xl font-medium flex items-center justify-center space-x-2"
          >
            <span>Back to Payment</span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>
              Secured by DocuSign • Legally binding electronic signature
            </span>
          </div>
        </div>
      </div>

      {/* DocuSign Iframe Modal */}
      {showDocuSignIframe && <DocuSignIframe />}

      {showSigningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg w-full max-w-6xl h-5/6 flex flex-col border border-slate-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <FileTextIcon />
                <h3 className="text-lg font-semibold text-white">
                  Sign Your Solar Installation Contract
                </h3>
              </div>
              <button onClick={handleSigningCancel} className="text-slate-400 hover:text-white transition-colors">  <XIcon />
              </button>
            </div>

            {/* DocuSign Iframe Container */}
            <div className="flex-1 p-4">
              <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                {signingUrlSunlink ? (
                  <iframe
                    src={signingUrlSunlink}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="DocuSign Document Signing"
                    className="rounded-lg"
                    id="docuSignIframe"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600">
                        Loading signing interface...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Info */}
            <div className="p-4 border-t border-slate-700 bg-slate-900/50">
              <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldIcon />
                  <span>Secure & Legally Binding</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon />
                  <span>Auto-notification Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Display */}
      {signedStatus && (
        <div
          className={`mb-8 p-4 rounded-lg flex items-center space-x-3 ${signedStatus === "completed"
            ? "bg-green-900/30 border border-green-700"
            : "bg-red-900/30 border border-red-700"
            }`}
        >
          {signedStatus === "completed" ? (
            <CheckCircleIcon />
          ) : (
            <AlertCircleIcon />
          )}
          <div>
            <p
              className={`font-medium ${signedStatus === "completed" ? "text-green-300" : "text-red-300"
                }`}
            >
              {signedStatus === "completed"
                ? "Contract Signed Successfully!"
                : "Signing Process Cancelled"}
            </p>
            {signedStatus === "completed" && (
              <div className="flex items-center gap-2 mt-1 text-sm text-green-400">
                <MailIcon />
                <span>Confirmation emails sent to all parties</span>
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-8 bg-black/90 backdrop-blur-xl rounded-3xl border border-white/10 z-10 text-center"
            >
              <h2 className="text-2xl font-medium text-white mb-4">
                🎉 Document Signed Successfully!
              </h2>
              <p className="text-white/70 mb-6">
                Confirmation emails have been sent to you and our admin team.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowSigningModal(false); // Close other modals
                }}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContractSigningPage;
