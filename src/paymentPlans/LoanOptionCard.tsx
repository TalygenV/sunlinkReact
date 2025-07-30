import React, { useEffect, useState, useRef } from "react";
import { BadgeCheck, Check, CreditCard } from "lucide-react";
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
  selectedPlanShow:boolean;
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
  selectedPlanShow,
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
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [selectedLoanOption, setSelectedLoanOption] = useState<any>(null);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [sfAccessToken, setsfAccessToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [quotationPopup, setquotationPopup] = useState(false);
  const [Loanapplicataiondata, setLoanapplicataiondata] = useState<any>(null);
  const [formDataRef, setformDataRef] = useState<any>(null);
  const [signingUrl, setSigningUrl] = useState<string>("");
  const [showDocuSignModal, setShowDocuSignModal] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCreditCheckPassedPopup, setShowCreditCheckPassedPopup] = useState(false);
  const [projectId, setProjectId] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const [showStaticCard, setShowStaticCard] = useState(false);
  const skeletonLoanOptions: Partial<LoanOption>[] = [
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-60", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } },
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-180", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } },
    { badge: "Loading...", name: "Loading...", rate: "--", key: "skeleton-300", icon: null, loanDetails: { lowestPayment: "--", paymentWithTaxCredit: "--", paymentWithoutTaxCredit: "--" } }
  ];

  const fetchAPRTerms = async () => {
    setIsLoading(true);
    console.log("localStorage.getItem(userData)",localStorage.getItem("userData"));
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
    setLoanapplicataiondata(data);
    setformDataRef(formDataRef);
    setsfAccessToken(sfAccessToken as any);
    submitCreditCheck(data,formDataRef);
  };

  const submitCreditCheck = async (data:any,formDataRef: any) => {
    showLoader("Performing credit check...");
    console.log("In Credit Check method");
    const firstProject = data.projects?.[0];
    const firstApplicant = firstProject?.applicants?.[0];
    try {
      const res = await fetch(
        "https://us-central1-sunlink-21942.cloudfunctions.net/submitCreditCheck",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sfAccessToken: `Bearer ${sfAccessToken}`,
            projectId: firstProject.id,
            applicantId: firstApplicant.id,
            firstName: firstApplicant.firstName,
            lastName: firstApplicant.lastName,
            phone: firstApplicant.phone,
            otherPhone: firstApplicant.phone,
            email: firstApplicant.email,
            annualIncome: firstApplicant.annualIncome,
            employerName: firstApplicant.employerName,
            employmentMonths: firstApplicant.employmentMonths,
            employmentYears: firstApplicant.employmentYears,
            jobTitle: firstApplicant.jobTitle,
            dateOfBirth: formDataRef.current.dateOfBirth || "1990-01-01",
            ssn: formDataRef.current.ssn.replace(/-/g, ""),
          }),
        }
      );
      const data = await res.json();
      if (data.returnCode != 200) {
        setShowErrorPopup(true);
        hideLoader();
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${res.status}`);
      }else{
        setProjectId(firstProject.id);
        hideLoader();
        setquotationPopup(true); 
      }
      
    } catch (error) {
      hideLoader();
      setShowErrorPopup(true);
      console.error("Credit check failed:", error);
    }
  };

  const CreateSunlightSingingLink = async (projectId: string) => {
    showLoader("Preparing your documents for e-signature...");
    console.log("In CreateSunlightSingingLink");
    console.log("projectId for docusign link sunlight",projectId);
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
    setShowStaticCard(true);
  };

  const handleSelectPlan = (option: LoanOption) => {
    setSelectedPlan(option.key);
    console.log("Selected plan:", option);
  };

  return (
    <>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            selectedPlanShow={showStaticCard}
          />
        ))
      ) : showStaticCard && selectedPlan ? (
        <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-4 pb-4 col-span-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="text-gray-800" />
              <h2 className="text-lg text-gray-800">Payment Plan</h2>
            </div>
            <button
              onClick={() => setShowStaticCard(false)}
              className="bg-gradient-to-b from-zinc-900 to-zinc-800 text-white text-xs px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Choose Different Plan
            </button>
          </div>
      
          <h3 className="flex items-center text-green-500 mt-3 text-xl sm:text-base md:text-2xl lg:text-xl">
            <BadgeCheck className="mr-3" />
            {selectedPlan.name}
          </h3>
      
          <div className="border-t border-gray-300 my-4"></div>
      
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Plan Name</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Loan Lowest Payment</span>
              <span className="font-medium">
                ${selectedPlan.rate}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Loan Payment With Tax Credit</span>
              <span className="font-medium">
                ${selectedPlan.loanDetails?.paymentWithoutTaxCredit}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Loan Payment Without Tax Credit</span>
              <span className="font-medium">
                ${selectedPlan.loanDetails?.paymentWithTaxCredit}
              </span>
            </div>
          </div>
      
          <div className="bg-[#d0f2e7] border border-green-400 rounded-lg mt-5 px-4 py-3">
            <div className="flex items-center">
              <BadgeCheck className="mr-3 text-[#1ba452]" />
              <p className="text-xl text-[#1ba452] sm:text-base md:text-2xl lg:text-xl">
                Your Loan has been Approved
              </p>
            </div>
          </div>
        </div>

      ) : loanOptions.length === 0 ? (
        <div className="col-span-full bg-[#3c3c3c] text-center rounded-xl text-white text-lg py-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-off">
            <path d="M12.75 7.09a3 3 0 0 1 2.16 2.16"/>
            <path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"/>
            <path d="m2 2 20 20"/>
            <path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533"/>
            <path d="M9.13 9.13a3 3 0 0 0 3.74 3.74"/>
          </svg>
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
            selectedPlanShow={showStaticCard}
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
        displayPrice={totalCost}
        planChosen={selectedPlan ?? ""}
        projectIdSelected={projectId}
        handleDocuSignCompleteContract={(projectId) => CreateSunlightSingingLink(projectId)}
      />
      <SunlightDocuSign
        isOpen={showDocuSignModal}
        signingUrl={signingUrl}
        onCancel={handleSigningCancel}
      />
          {showErrorPopup && (
  // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  //   <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
  //     <h2 className="text-lg font-semibold mb-4 text-red-600">Document generation Fail</h2>
  //     <p className="text-gray-700 mb-6">Please try again later.</p>
  //     <button
  //       className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  //       onClick={() => setShowErrorPopup(false)}
  //     >
  //       Close
  //     </button>
  //   </div>
  // </div>
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium mb-4 text-black">Document generation Fail</h2>
              <p className="text-gray-700 mb-6">Please try again later.</p>
              <button
                className="bg-black text-white w-full px-6 py-4 rounded-xl font-medium"
                onClick={() => setShowErrorPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
)}
           {showCreditCheckPassedPopup && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                 <div className="mx-auto mb-4 flex items-center justify-center">
                   <svg
                     className="w-12 h-12 text-green-600"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       d="M5 13l4 4L19 7"
                     />
                   </svg>
                 </div>
                 <h2 className="text-2xl font-medium mb-4 text-black">Credit Check Passed!</h2>
                 <p className="text-gray-700 mb-6">Your application has been approved. You can now proceed with document signing.</p>
                 <button
                   className="bg-green-600 text-white w-full px-6 py-4 rounded-xl font-medium"
                   onClick={() => {
                     setShowCreditCheckPassedPopup(false);
                     CreateSunlightSingingLink(projectId);
                   }}
                 >
                   Proceed to Sign Documents
                 </button>
               </div>
             </div>
           )}
    </>
  );
};




export default LoanOptionsPage;


