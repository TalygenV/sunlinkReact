import React from "react";
import { CheckCircle, Mail } from "lucide-react";

interface PlanChosen {
  apr: number;
  name: string;
  term: string;
}

interface QuotationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  displayPrice: number;
  planChosen: PlanChosen;
  submitCreditCheck: () => void;
  isLoading?: boolean;
}

const QuotationPopup: React.FC<QuotationPopupProps> = ({
  isOpen,
  onClose,
  totalPrice,
  displayPrice,
  planChosen,
  submitCreditCheck,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white max-w-3xl w-full rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
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
          <p className="text-gray-600 mb-8">
            Your Quotation Generated for solar financing up to ${totalPrice.toLocaleString()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-black">
                {planChosen?.apr}%
              </div>
              <div className="text-sm text-gray-600">APR Rate</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-black">
                ${displayPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Approved Amount</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-black">
                {planChosen?.name === "10-year" && "10 Years"}
                {planChosen?.name === "15-year" && "15 Years"}
                {planChosen?.name === "25-year" && "25 Years"}
              </div>
              <div className="text-sm text-gray-600">Loan Term</div>
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
    </div>
  );
};

export default QuotationPopup;