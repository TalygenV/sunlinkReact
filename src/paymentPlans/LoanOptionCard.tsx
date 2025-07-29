import React, { useEffect, useState, useRef } from "react";
import { Check, CreditCard } from "lucide-react";
import LoanApplicationModal from "./LoanApplicationModal";
import QuotationPopup from "./QuotationPopup";
import SunlightDocuSign from "./SunlightDocuSign"
import { useLoader } from "../context/LoaderContext";

export interface LoanOption {
  name: string;
  badge: string;
  rate: any;
  key: string;
  icon: any;
  loanDetails: {
    lowestPayment: any;
    paymentWithTaxCredit: any;
    paymentWithoutTaxCredit: any;
  };
}
export interface LoanOptionCardProps {
  option: LoanOption;
  totalCost: number;
  selectedPlan: any;
  onSelectPlan: (option: any) => void;
  sfAccessToken:string,
  onPreQualifyClick: (option: any) => void;
  badgeText?: string;
  badgeColor?: string;
  features: string[];
  recommendation: string;
  isLoading?: boolean;
}
const LoanOptionCard: React.FC<LoanOptionCardProps> = ({
  option,
  totalCost,
  selectedPlan,
  sfAccessToken,
  onSelectPlan,
  onPreQualifyClick,
  badgeText = "Fastest Payoff",
  badgeColor = "bg-red-500",
  features,
  recommendation,
  isLoading,
}) => {
  
  
  // Extract badge value (before dash, converted to number)
  const badgeValue = parseInt(option.badge?.split("-")[0]);

  // Define default values
  let dynamicBadgeText = badgeText || "Fastest Payoff";
  let dynamicBadgeColor = badgeColor || "bg-red-500";
  let dynamicFeatures = features;
  let dynamicRecommendation = recommendation || "";

  // Override values based on badgeValue
  switch (badgeValue) {
    case 60:
      dynamicBadgeText = "Fastest Payoff";
      dynamicBadgeColor = "bg-red-500";
      dynamicFeatures = ["Lowest total interest paid", "Build equity fastest","Highest monthly tax benefits","Best for high-income households"];
      dynamicRecommendation = "Perfect if you want to own your system quickly and have strong monthly cash flow.";
      break;
    case 180:
      dynamicBadgeText = "Most Popular";
      dynamicBadgeColor = "bg-teal-600";
      dynamicFeatures = ["Balanced payment & savings", "Moderate monthly commitment","Good interest savings","Flexible for most budgets"];
      dynamicRecommendation ="The sweet spot between affordability and total cost - chosen by 70% of our customers.";
      break;
    case 300:
      dynamicBadgeText = "Lowest Payment";
      dynamicBadgeColor = "bg-indigo-600";
      dynamicFeatures = ["Lowest monthly payment", "Immediate positive cashflow","Easier budget integration","Long-term wealth building"];
      dynamicRecommendation ="Ideal if you want maximum monthly savings from day one with minimal payment stress.";
      break;
    default:
      break;
  }
  return (
    isLoading ? (
      <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4 animate-pulse">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-300 text-white text-xs px-3 py-1 rounded-full w-24 h-5"></div>
  
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
  
        <div className="bg-gray-100 rounded-xl p-4 my-4">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="bg-gray-300 w-full h-px my-4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
  
        <div className="space-y-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
  
        <div className="bg-gray-100 p-3 rounded-xl h-16"></div>
  
        <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
      </div>
    ) : (
      <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4">
        <span
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${dynamicBadgeColor} text-white text-xs px-3 py-1 rounded-full`}
        >
          {dynamicBadgeText}
        </span>
  
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">
              {option.badge.split("-")[0]}
            </span>
          </div>
          <div>
            <div className="text-sm text-black font-medium">{option.name}</div>
            <div className="text-xs text-gray-500">{option.rate}% APR</div>
          </div>
        </div>
  
        <div className="bg-gray-100 rounded-xl p-3 my-4 text-center">
          <p className="text-sm text-gray-500">Months 1–16 Payment</p>
          <p className="text-2xl font-medium text-gray-800">
            $
            {option.loanDetails.lowestPayment.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
            /mo
          </p>
          <p className="text-xs text-gray-500 mt-1">Lowest payment period</p>
          <div className="bg-gray-300 w-full h-px my-3"></div>
          <div className="mt-4 text-xs">
            <div className="flex justify-between">
              <p className="text-gray-600">Before tax credit</p>
              <p className="text-green-600">
                {option.loanDetails?.paymentWithoutTaxCredit != null
                  ? `$${option.loanDetails.paymentWithoutTaxCredit.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}/mo`
                  : "--"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">After tax credit</p>
              <p className="text-green-600 opacity-75">
                {option.loanDetails?.paymentWithTaxCredit != null
                  ? `$${option.loanDetails.paymentWithTaxCredit.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}/mo`
                  : "--"}
              </p>
            </div>
          </div>
        </div>
  
        <ul className="list-none text-xs space-y-2">
          {dynamicFeatures.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-500">
              <Check className="mr-3 h-4 w-4 text-black text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
  
        <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-600">
          <p className="text-red-500 font-medium">Recommended for:</p>
          {dynamicRecommendation}
        </div>
  
        <button
          onClick={() => onPreQualifyClick?.(option)}
          className={`w-full mt-4 py-2 rounded-lg text-xs flex items-center justify-center space-x-2 ${
            selectedPlan === option.key
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Submit Application</span>
        </button>
      </div>
    )
  );
  
};
// Add props interface for LoanOptionsPage
interface LoanOptionsPageProps {
  totalCost: number;
}

// Update LoanOptionsPage to accept totalCost as a prop
const LoanOptionsPage: React.FC<LoanOptionsPageProps> = ({ totalCost }) => {
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedLoanOption, setSelectedLoanOption] = useState<any>(null);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [sfAccessToken, setsfAccessToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [quotationPopup, setquotationPopup] = useState(false);
  const [Loanapplicataiondata, setLoanapplicataiondata] = useState<any>(null);
  const [formDataRef, setformDataRef] = useState<any>(null);
  const [signingUrl, setSigningUrl] = useState<string>("");
  const [showDocuSignModal, setShowDocuSignModal] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const skeletonLoanOptions: Partial<LoanOption>[] = [
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-60", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } },
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-180", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } },
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-300", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } }
  ];


  // const fetchAPRTerms = async () => {
  //   setIsLoading(true);
  //   console.log("✅ fetchAPRTerms CALLED");
  //   try {
  //     const fetchJSON = async (url: string, body: any) => {
  //       const res = await fetch(url, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       });
  //       if (!res.ok) {
  //         const errorData = await res.json().catch(() => null);
  //         throw new Error(
  //           errorData?.error || `HTTP error! status: ${res.status}`
  //         );
  //       }
  //       return res.json();
  //     };
  //
  //     const initialRes = await fetchJSON(
  //       "https://us-central1-sunlink-21942.cloudfunctions.net/fetchProducts",
  //       {}
  //     );
  //
  //     const products = initialRes?.product_response?.products || [];
  //     const sfAccessToken = initialRes?.access_token;
  //     setsfAccessToken(sfAccessToken);
  //     const selectedState =
  //       JSON.parse(localStorage.getItem("solarSetup") || "{}")?.state ||
  //       "California";
  //
  //     const allowedTerms = [60, 180, 300];
  //     const eligibleProducts = products.filter(
  //       (item: any) =>
  //         item.isACH &&
  //         item.productType.toLowerCase() === "solar" &&
  //         item.stateName.toLowerCase() === selectedState.toLowerCase()
  //     );
  //
  //     const filteredProducts: any[] = [];
  //     allowedTerms.forEach((term) => {
  //       const productsForTerm = eligibleProducts.filter(
  //         (item: any) => item.term === term
  //       );
  //       if (productsForTerm.length > 0) {
  //         const minApr = Math.min(...productsForTerm.map((p: any) => p.apr));
  //         const bestProducts = productsForTerm.filter(
  //           (p: any) => p.apr === minApr
  //         );
  //         filteredProducts.push(...bestProducts);
  //       }
  //     });
  //     
  //     console.log("Filtered products:", filteredProducts);
  //     const resultPromises = filteredProducts.map(async (product) => {
  //       try {
  //         const data = await fetchJSON(
  //           "https://us-central1-sunlink-21942.cloudfunctions.net/calculateLoanProduct",
  //           {
  //             sfAccessToken: `Bearer ${sfAccessToken}`,
  //             term: product.term,
  //             stateName: product.stateName,
  //             name: product.name,
  //             loanAmount: totalCost, // Use totalCost from props
  //             apr: product.apr,
  //             productType: product.productType,
  //             projectCategory: product.projectCategory || "Solar",
  //           }
  //         );
  //         console.log("Calculated data:", data);
  //         return {
  //           name: product.name,
  //           badge: `${product.term}-month`,
  //           rate: product.apr,
  //           key: `${product.name}-${product.term}`,
  //           icon: null,
  //           loanDetails: {
  //             lowestPayment: data.monthlyPayment,
  //             paymentWithTaxCredit: data.finalMonthlyPayment,
  //             paymentWithoutTaxCredit: data.escalatedMonthlyPayment,
  //           },
  //         };
  //       } catch (error: any) {
  //         console.warn("Failed to calculate loan product:", error.message);
  //         return null;
  //       }
  //     });
  //
  //     const results = (await Promise.all(resultPromises)).filter(Boolean);
  //     setLoanOptions(results as LoanOption[]);
  //   } catch (error: any) {
  //     console.error("Error in fetchAPRTerms:", error.message);
  //   }
  //   finally{
  //     setIsLoading(false); 
  //   }
  // };


  const fetchAPRTerms = async () => {
    setIsLoading(true);
    console.log("✅ fetchAPRTerms CALLED");
  
    try {
      const fetchJSON = async (url: string, body: any) => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(
            errorData?.error || `HTTP error! status: ${res.status}`
          );
        }
        return res.json();
      };
  
      const initialRes = await fetchJSON(
        "https://us-central1-sunlink-21942.cloudfunctions.net/fetchProducts",
        {}
      );
  
      const products = initialRes?.product_response?.products || [];
      const sfAccessToken = initialRes?.access_token;
      setsfAccessToken(sfAccessToken);
  
      const selectedState =
        JSON.parse(localStorage.getItem("solarSetup") || "{}")?.state || "California";
  
      const allowedTerms = [60, 180, 300];
  
      const eligibleProducts = products.filter(
        (item: any) =>
          item.isACH &&
          item.productType.toLowerCase() === "solar" &&
          item.stateName.toLowerCase() === selectedState.toLowerCase()
      );
  
      const filteredProducts: any[] = [];
      allowedTerms.forEach((term) => {
        const productsForTerm = eligibleProducts.filter((item: any) => item.term === term);
        if (productsForTerm.length > 0) {
          const minApr = Math.min(...productsForTerm.map((p: any) => p.apr));
          const bestProducts = productsForTerm.filter((p: any) => p.apr === minApr);
          filteredProducts.push(...bestProducts);
        }
      });
  
      console.log("Filtered products:", filteredProducts);
  
      if (!filteredProducts || filteredProducts.length === 0) {
        console.log("🚫 No valid loan products found for this region.");
        setLoanOptions([]);
        return;
      }
  
      const resultPromises = filteredProducts.map(async (product) => {
        try {
          const data = await fetchJSON(
            "https://us-central1-sunlink-21942.cloudfunctions.net/calculateLoanProduct",
            {
              sfAccessToken: `Bearer ${sfAccessToken}`,
              term: product.term,
              stateName: product.stateName,
              name: product.name,
              loanAmount: totalCost,
              apr: product.apr,
              productType: product.productType,
              projectCategory: product.projectCategory || "Solar",
            }
          );
  
          return {
            name: product.name,
            badge: `${product.term}-month`,
            rate: product.apr,
            key: `${product.name}-${product.term}`,
            icon: null,
            loanDetails: {
              lowestPayment: data.monthlyPayment,
              paymentWithTaxCredit: data.finalMonthlyPayment,
              paymentWithoutTaxCredit: data.escalatedMonthlyPayment,
            },
          };
        } catch (error: any) {
          console.warn("❌ Failed to calculate loan product:", error.message);
          return null;
        }
      });
  
      const results = (await Promise.all(resultPromises)).filter(Boolean);
      setLoanOptions(results as LoanOption[]);
    } catch (error: any) {
      console.error("Error in fetchAPRTerms:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  const hasFetched = useRef(false);
  const handlePreQualifyClick = (option: any) => {
    setSelectedPlan(option);
    setSelectedLoanOption(option);
    setIsLoanModalOpen(true);
  };
  useEffect(() => {
    // ✅ only allow one fetch ever
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAPRTerms();
    }
  }, []);

  const LoanApplicationCreateSubmit = async (data: any ,formDataRef: any,sfAccessToken:string) => {
    setIsLoanModalOpen(false);
    setquotationPopup(true);
    setLoanapplicataiondata(data);
    setformDataRef(formDataRef);
    setsfAccessToken(sfAccessToken as any);
  };

  const CreateSunlightSingingLink = async (projectId: string) => {
    showLoader("Preparing your documents for e-signature...");
    console.log("In CreateSunlightSingingLink");
    debugger;
    const returnUrl = `${window.location.origin}${window.location.pathname}?event=signing_complete`;

    const response = await fetch(
      "https://us-central1-sunlink-21942.cloudfunctions.net/loanDocsSunLight",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sfAccessToken: `Bearer ${sfAccessToken}`,
          projectId: projectId,
          returnUrl: returnUrl,
        }),
      }
    );
    const result = await response.json();
    if (result.returnCode != 200) {
      setShowErrorPopup(true);
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `HTTP error! status: ${response.status}`
      );
    }else{
      if (result.projects) {
      setSigningUrl(result.projects[0].envelopeURL);
      setquotationPopup(false);
      hideLoader();
      setShowDocuSignModal(true);
    } else {
      setShowErrorPopup(true);
      throw new Error("No signing URL received from server");
    }
    }
  }
  const handleSigningCancel = () => {
    setShowDocuSignModal(false);
  };

  const handleSelectPlan = (option: LoanOption) => {
    setSelectedPlan(option.key);
    console.log("Selected plan:", option);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {isLoading ? (
      Array.from({ length: 3 }).map((_, idx) => (
        <LoanOptionCard
          key={`skeleton-${idx}`}
          option={{} as LoanOption}
          totalCost={totalCost}
          selectedPlan={selectedPlan}
          sfAccessToken=""
          onPreQualifyClick={() => {}}
          onSelectPlan={() => {}}
          features={[]}
          recommendation=""
          badgeText="Loading..."
          badgeColor="bg-gray-300 animate-pulse"
          isLoading={true}
        />
          ))
        ) : loanOptions.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 text-lg py-8">
            No product is available for this region.
          </div>
        ) : (
          loanOptions.map((option, idx) => (
            <LoanOptionCard
              key={option.key || `loan-${idx}`}
              option={option as LoanOption}
              totalCost={totalCost}
              selectedPlan={selectedPlan}
              sfAccessToken={sfAccessToken ?? ""}
              onPreQualifyClick={handlePreQualifyClick}
              onSelectPlan={handleSelectPlan}
              features={["Fixed Rate", "No Prepayment Penalty", "Flexible Terms"]}
              recommendation="Homeowners with strong credit and stable income"
              badgeText={undefined}
              badgeColor={undefined}
              isLoading={false}
            />
          ))
        )}
      </div>
      <LoanApplicationModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        selectedOption={selectedLoanOption}
        sfAccessToken={sfAccessToken ?? ""}
        selectedPlan={selectedPlan}
        totalPrice={totalCost}
        onSubmit={(data, formDataRef, sfAccessToken) => LoanApplicationCreateSubmit(data, formDataRef, sfAccessToken)}
      />
      <QuotationPopup
        isOpen={quotationPopup}
        onClose={() => setquotationPopup(false)}
        planChosen={selectedPlan ?? ""}
        totalPrice={totalCost}
        displayPrice={totalCost}
        sfAccessToken={sfAccessToken ?? ""}
        Loanapplicataiondata={Loanapplicataiondata}
        handleDocuSignCompleteContract={(projectId) => CreateSunlightSingingLink(projectId)}
        formDataRef={formDataRef}
        isLoading={isLoading}
      />
      <SunlightDocuSign
        isOpen={showDocuSignModal}
        signingUrl={signingUrl}
        onCancel={handleSigningCancel}
      />
          {showErrorPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4 text-red-600">Document generation Fail</h2>
      <p className="text-gray-700 mb-6">Please try again later.</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={() => setShowErrorPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </>
  );
};




export default LoanOptionsPage;


