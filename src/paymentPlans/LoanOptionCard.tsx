import React, { useEffect, useState, useRef } from "react";
import { Check, CreditCard } from "lucide-react";
import LoanApplicationModal from "./LoanApplicationModal";
import QuotationPopup from "./QuotationPopup";
import SunlightDocuSign from "./SunlightDocuSign"

export interface LoanOption {
  name: string;
  badge: string;
  rate: number;
  key: string;
  icon: any;
  loanDetails: {
    lowestPayment: number;
    paymentWithTaxCredit: number;
    paymentWithoutTaxCredit: number;
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
}) => {
  return (
    <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4">
      <span
        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${badgeColor} text-white text-xs px-3 py-1 rounded-full`}
      >
        {badgeText}
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
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-500">
            <Check className="mr-3 h-4 w-4 text-black text-green-500" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-600">
        <p className="text-red-500 font-medium">Recommended for:</p>
        {recommendation}
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




  const fetchAPRTerms = async () => {
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
        JSON.parse(localStorage.getItem("solarSetup") || "{}")?.state ||
        "California";

      const allowedTerms = [60, 180, 300];
      const eligibleProducts = products.filter(
        (item: any) =>
          item.isACH &&
          item.productType.toLowerCase() === "solar" &&
          item.stateName.toLowerCase() === selectedState.toLowerCase()
      );

      const filteredProducts: any[] = [];
      allowedTerms.forEach((term) => {
        const productsForTerm = eligibleProducts.filter(
          (item: any) => item.term === term
        );
        if (productsForTerm.length > 0) {
          const minApr = Math.min(...productsForTerm.map((p: any) => p.apr));
          const bestProducts = productsForTerm.filter(
            (p: any) => p.apr === minApr
          );
          filteredProducts.push(...bestProducts);
        }
      });
      console.log("Filtered products:", filteredProducts);
      const resultPromises = filteredProducts.map(async (product) => {
        try {
          const data = await fetchJSON(
            "https://us-central1-sunlink-21942.cloudfunctions.net/calculateLoanProduct",
            {
              sfAccessToken: `Bearer ${sfAccessToken}`,
              term: product.term,
              stateName: product.stateName,
              name: product.name,
              loanAmount: totalCost, // Use totalCost from props
              apr: product.apr,
              productType: product.productType,
              projectCategory: product.projectCategory || "Solar",
            }
          );
          console.log("Calculated data:", data);
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
          console.warn("Failed to calculate loan product:", error.message);
          return null;
        }
      });

      const results = (await Promise.all(resultPromises)).filter(Boolean);
      setLoanOptions(results as LoanOption[]);
    } catch (error: any) {
      console.error("Error in fetchAPRTerms:", error.message);
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `HTTP error! status: ${response.status}`
      );
    }
    const result = await response.json();

    if (result.projects) {
      setSigningUrl(result.projects[0].envelopeURL);
      setquotationPopup(false);
      setShowDocuSignModal(true);
    } else {
      throw new Error("No signing URL received from server");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loanOptions.map((option) => (
        <LoanOptionCard
          key={option.key}
          option={option}
          totalCost={totalCost}
          selectedPlan={selectedPlan}
          sfAccessToken={sfAccessToken ?? ""}
          onPreQualifyClick={handlePreQualifyClick}
          onSelectPlan={handleSelectPlan}
          features={["Fixed Rate", "No Prepayment Penalty", "Flexible Terms"]}
          recommendation="Homeowners with strong credit and stable income"
        />

        
      ))}

<LoanApplicationModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        selectedOption={selectedLoanOption}
        sfAccessToken={sfAccessToken ?? ""}
        selectedPlan={selectedPlan}
        totalPrice={totalCost}
        onSubmit={(data, formDataRef,sfAccessToken) => LoanApplicationCreateSubmit(data,formDataRef,sfAccessToken)}
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
    </div>
  );
};




export default LoanOptionsPage;


