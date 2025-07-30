// import React, { useState } from "react";
// import { CheckCircle, Mail, FileSignature } from "lucide-react";
// import { useLoader } from "../context/LoaderContext";

// interface QuotationPopupProps {
//   isOpen: boolean;
//   displayPrice: number;
//   planChosen: any;
//   handleDocuSignCompleteContract:(projectId:string) => void
// }

// const QuotationPopup: React.FC<QuotationPopupProps> = ({
//   isOpen,
//   displayPrice,
//   planChosen,
//   handleDocuSignCompleteContract,
// }) => {
//   const [showCreditCheckPassedPopup, setShowCreditCheckPassedPopup] = useState(false);
//   const [isContractSignLoading, setIsContractSignLoading] = useState(false);
//   const [projectId, setProjectId] = useState("");
  
//   if (!isOpen) return null;
  
//   const DocuSignSunlightSubmit = async () => {
//     handleDocuSignCompleteContract(projectId);
//   };

//   return (
//     <>
//       {showCreditCheckPassedPopup && (
//         <div className="fixed inset-0 z-60 bg-black bg-opacity-60 flex items-center justify-center px-4">
//           <div className="bg-white p-8 max-w-2xl rounded-[30px] text-center space-y-5 shadow-2xl">
//             <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
//             <h2 className="text-2xl text-black">Credit Check Passed!</h2>
//             <h2 className="text-lg mt-2 text-gray-600">Congratulations! Your Loan Approved</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
//                 <div className="text-xs text-left text-gray-600">APR Rate</div>
//                 <div className="text-[40px] text-left mt-5 text-black">{planChosen?.rate}%</div>
//               </div>
//               <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
//                 <div className="text-xs text-left text-gray-600">Approved Amount</div>
//                 <div className="text-[40px] text-left mt-5 text-black">${displayPrice.toLocaleString()}</div>
//               </div>
//               <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
//                 <div className="text-xs text-left text-gray-600">Loan Term</div>
//                 <div className="text-[40px] text-left mt-5 text-black">
//                   {planChosen?.badge?.split("-")[0]}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-[#d0f2e7] border border-green-200 rounded-lg p-4 mb-8">
//               <ul className="text-sm text-green-700 list-disc space-y-1 text-left pl-6">
//                 <li>No impact on credit score for pre-qualification</li>
//                 <li>Rate locked for 30 days</li>
//                 <li>No prepayment penalties</li>
//                 <li>Flexible payment options available</li>
//               </ul>
//             </div>
            
//             <button
//               onClick={DocuSignSunlightSubmit}
//               className="bg-black text-white w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2"
//               disabled={isContractSignLoading}
//               type="button"
//             >
//               <FileSignature className="w-5 h-5" />
//               <span>Sign Documents</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default QuotationPopup;


import React, { useState, useEffect } from "react";
import { CheckCircle, FileSignature } from "lucide-react";

interface QuotationPopupProps {
  isOpen: boolean;
  displayPrice: number;
  planChosen: any;
  projectIdSelected:string
  handleDocuSignCompleteContract: (projectId: string) => void;
}

const QuotationPopup: React.FC<QuotationPopupProps> = ({
  isOpen,
  displayPrice,
  planChosen,
  projectIdSelected,
  handleDocuSignCompleteContract,
}) => {
  const [showCreditCheckPassedPopup, setShowCreditCheckPassedPopup] = useState(false);
  const [isContractSignLoading, setIsContractSignLoading] = useState(false);
  const [projectIdval, setProjectId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShowCreditCheckPassedPopup(true);
    }
  }, [isOpen]);

  const DocuSignSunlightSubmit = async () => {
    debugger;
    setProjectId(projectIdSelected);
    handleDocuSignCompleteContract(projectIdSelected);
  };

  if (!isOpen) return null;

  return (
    <>
      {showCreditCheckPassedPopup && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-white p-8 max-w-2xl rounded-[30px] text-center space-y-5 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
            <h2 className="text-2xl text-black">Credit Check Passed!</h2>
            <h2 className="text-lg mt-2 text-gray-600">Congratulations! Your Loan Approved</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
                <div className="text-xs text-left text-gray-600">APR Rate</div>
                <div className="text-[40px] text-left mt-5 text-black">{planChosen?.rate}%</div>
              </div>
              <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
                <div className="text-xs text-left text-gray-600">Approved Amount</div>
                <div className="text-[40px] text-left mt-5 text-black">
                  ${displayPrice.toLocaleString()}
                </div>
              </div>
              <div className="bg-[#e4eef0] rounded-lg p-4 text-center border border-gray-200">
                <div className="text-xs text-left text-gray-600">Loan Term</div>
                <div className="text-[40px] text-left mt-5 text-black">
                  {planChosen?.badge?.split("-")[0]}
                </div>
              </div>
            </div>

            <div className="bg-[#d0f2e7] border border-green-200 rounded-lg p-4 mb-8">
              <ul className="text-sm text-green-700 list-disc space-y-1 text-left pl-6">
                <li>No impact on credit score for pre-qualification</li>
                <li>Rate locked for 30 days</li>
                <li>No prepayment penalties</li>
                <li>Flexible payment options available</li>
              </ul>
            </div>

            <button
              onClick={DocuSignSunlightSubmit}
              className="bg-black text-white w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2"
              disabled={isContractSignLoading}
              type="button"
            >
              <FileSignature className="w-5 h-5" />
              <span>Sign Documents</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuotationPopup;
