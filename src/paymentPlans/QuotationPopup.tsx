import React, { useState } from "react";
import { CheckCircle, Mail, FileSignature } from "lucide-react";
import { useLoader } from "../context/LoaderContext";

interface QuotationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  displayPrice: number;
  planChosen: any;
  sfAccessToken: string;
  Loanapplicataiondata: any;
  handleDocuSignCompleteContract:(projectId:string) => void
  formDataRef: any;
  isLoading?: boolean;
}

const QuotationPopup: React.FC<QuotationPopupProps> = ({
  isOpen,
  onClose,
  totalPrice,
  displayPrice,
  planChosen,
  sfAccessToken,
  Loanapplicataiondata,
  handleDocuSignCompleteContract,
  formDataRef,
  isLoading = false,
}) => {
  const [showCreditCheckPassedPopup, setShowCreditCheckPassedPopup] = useState(false);
  const [isContractSignLoading, setIsContractSignLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const [projectId, setProjectId] = useState("");
  if (!isOpen) return null;

  const submitCreditCheck = async () => {
    debugger;
    showLoader("Performing credit check...");
    console.log("In Credit Check method");
    const firstProject = Loanapplicataiondata.projects?.[0];
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
        setShowCreditCheckPassedPopup(true); // ✅ Show success popup
      }
      
    } catch (error) {
      hideLoader();
      setShowErrorPopup(true);
      console.error("Credit check failed:", error);
    }
  };

  const DocuSignSunlightSubmit = async () => {
    handleDocuSignCompleteContract(projectId);
  };

  // const handleDocuSignCompleteContract = async () => {
  //   setIsContractSignLoading(true);
  //   // Mock contract signing handler
  //   setTimeout(() => {
  //     setIsContractSignLoading(false);
  //     setShowCreditCheckPassedPopup(false); // Close popup
  //     onClose(); // Optionally close main modal
  //   }, 2000);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white max-w-1/2 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <div className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h4 className="text-2xl font-light text-black mb-2">
            Congratulations! Quotation Generated
          </h4>
          <p className="text-lg text-[#858c8f] mb-8">
            Your Quotation Generated for solar financing up to ${totalPrice.toLocaleString()}
          </p>

          {/* 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">APR Rate</div>
              <div className="text-2xl font-bold text-black">{planChosen?.rate}%</div>
              
            </div>
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">Approved Amount</div>
              <div className="text-2xl font-bold text-black">${displayPrice.toLocaleString()}</div>
            </div>
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">Loan Term</div>
              <div className="text-2xl font-bold text-black">
                {planChosen?.badge?.split("-")[0]}
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Quotation Generated</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1 text-left pl-6">
              <li>• No impact on credit score for pre-qualification</li>
              <li>• Rate locked for 30 days</li>
              <li>• No prepayment penalties</li>
              <li>• Flexible payment options available</li>
            </ul>
          </div>
          */}

          <div className="flex justify-center">
            <button
              onClick={submitCreditCheck}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
              type="button"
              disabled={isLoading}
            >
              <Mail className="w-4 h-4" />
              <span>Submit Credit Check</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Credit Check Success Popup */}
      {showCreditCheckPassedPopup && (
        <div className="fixed inset-0 z-60 bg-black bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
            <h2 className="text-2xl font-semibold text-black">Credit Check Passed!</h2>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">APR Rate</div>
              <div className="text-2xl font-bold text-black">{planChosen?.rate}%</div>
              
            </div>
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">Approved Amount</div>
              <div className="text-2xl font-bold text-black">${displayPrice.toLocaleString()}</div>
            </div>
            <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
              <div className="text-sm text-gray-600">Loan Term</div>
              <div className="text-2xl font-bold text-black">
                {planChosen?.badge?.split("-")[0]}
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Quotation Generated</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1 text-left pl-6">
              <li>• No impact on credit score for pre-qualification</li>
              <li>• Rate locked for 30 days</li>
              <li>• No prepayment penalties</li>
              <li>• Flexible payment options available</li>
            </ul>
          </div>
          
            <button
              onClick={DocuSignSunlightSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition mx-auto"
              disabled={isContractSignLoading}
              type="button"
            >
              <FileSignature className="w-5 h-5" />
              <span>Sign Documents</span>
            </button>
          </div>
        </div>
      )}
      {showErrorPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4 text-red-600">Credit Check Fail.</h2>
      <p className="text-gray-700 mb-6">Please Pay in Full</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={() => setShowErrorPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
    
  );
};

export default QuotationPopup;
