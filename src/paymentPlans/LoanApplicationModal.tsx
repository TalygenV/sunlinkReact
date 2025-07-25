import React, { useState } from 'react';
import { X, CreditCard, AlertCircle, Clock, CheckCircle, Mail, Send } from 'lucide-react';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: any;
  totalPrice: number;
}

interface OptimizedInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
  className?: string;
  formatter?: (value: string) => string;
}

interface OptimizedSelectProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  options: Array<{ value: string; label: string }>;
}

const OptimizedInput: React.FC<OptimizedInputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  required = false,
  autoComplete,
  maxLength,
  pattern,
  className = "",
  formatter
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (formatter) {
      newValue = formatter(newValue);
    }
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        pattern={pattern}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500 ${className}`}
      />
    </div>
  );
};

const OptimizedSelect: React.FC<OptimizedSelectProps> = ({
  id,
  name,
  label,
  required = false,
  autoComplete,
  options
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedOption,
  totalPrice
}) => {
  const [applicationStep, setApplicationStep] = useState<"form" | "processing" | "approved" | "documents">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditCheckModal, setShowCreditCheckModal] = useState(false);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    onClose();
    setApplicationStep("form");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationStep("processing");
    
    // Simulate processing
    setTimeout(() => {
      setApplicationStep("approved");
    }, 3000);
  };

  const submitCreditCheck = async () => {
    setIsLoading(true);
    // Simulate credit check submission
    setTimeout(() => {
      setApplicationStep("documents");
      setIsLoading(false);
    }, 2000);
  };

  const selectedTerm = selectedOption?.badge?.toLowerCase() || "15-year";
  const displayPrice = totalPrice;
  const planChosen = selectedOption;

  // Formatters
  const formatSSN = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const formatIncome = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned ? `$${parseInt(cleaned).toLocaleString()}` : '';
  };

  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    // Add more states as needed
  ];

  const CreditCheckModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Credit Check Required</h3>
        <p className="text-gray-600 mb-6">
          To proceed with your loan application, we need to perform a credit check.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowCreditCheckModal(false)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowCreditCheckModal(false);
              submitCreditCheck();
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-black">
                Solar Loan Application
              </h3>
              <p className="text-sm text-gray-600">
                {selectedTerm === "10-year" &&
                  "10-Year Re-amortizing Loan at 4.49% APR"}
                {selectedTerm === "15-year" &&
                  "15-Year Re-amortizing Loan at 4.49% APR"}
                {selectedTerm === "25-year" &&
                  "25-Year Re-amortizing Loan at 4.49% APR"}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            type="button"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {applicationStep === "form" && (
            <div className="p-4 sm:p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OptimizedInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      placeholder="Enter your first name"
                      required
                      autoComplete="given-name"
                    />
                    <OptimizedInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OptimizedInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="your.email@example.com"
                      required
                      autoComplete="email"
                    />
                    <OptimizedInput
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Financial Information */}
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">
                    Financial Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OptimizedInput
                      id="ssn"
                      name="ssn"
                      type="password"
                      label="Social Security Number"
                      placeholder="XXX-XX-XXXX"
                      required
                      maxLength={11}
                      autoComplete="off"
                      formatter={formatSSN}
                    />
                    <div className="w-full">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"></span>
                        <OptimizedInput
                          id="income"
                          name="income"
                          type="text"
                          label="Annual Income"
                          placeholder="$"
                          required
                          className="w-full pl-8 pr-4 py-3 rounded-lg text-black placeholder-gray-500"
                          formatter={formatIncome}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">
                    Address Information
                  </h4>
                  <div className="space-y-4">
                    <OptimizedInput
                      id="address"
                      name="address"
                      type="text"
                      label="Street Address"
                      placeholder="123 Main Street"
                      required
                      autoComplete="street-address"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <OptimizedInput
                        id="city"
                        name="city"
                        type="text"
                        label="City"
                        placeholder="City"
                        required
                        autoComplete="address-level2"
                      />
                      <OptimizedSelect
                        id="state"
                        name="state"
                        label="State"
                        required
                        autoComplete="address-level1"
                        options={stateOptions}
                      />
                      <OptimizedInput
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        label="ZIP Code"
                        placeholder="12345"
                        required
                        maxLength={5}
                        pattern="[0-9]{5}"
                        autoComplete="postal-code"
                        formatter={formatZipCode}
                      />
                    </div>
                  </div>
                </div>

                {/* Employer Information */}
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">
                    Employer Information
                  </h4>
                  <div className="space-y-4">
                    <OptimizedInput
                      id="employerName"
                      name="employerName"
                      type="text"
                      label="Employer Name"
                      placeholder="Employer Name"
                      required
                      autoComplete="organization"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <OptimizedInput
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        label="Job Title"
                        placeholder="Job Title"
                        required
                        autoComplete="organization-title"
                      />
                      <OptimizedInput
                        id="dateofBirth"
                        name="dateofBirth"
                        type="date"
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        required
                        autoComplete="bday"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <OptimizedInput
                        id="employmentYears"
                        name="employmentYears"
                        type="number"
                        label="Employment Years"
                        placeholder="Employment Years"
                        required
                      />
                      <OptimizedInput
                        id="employmentMonths"
                        name="employmentMonths"
                        type="number"
                        label="Employment Months"
                        placeholder="Employment Months"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimers */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Important Disclaimers:</p>
                      <ul className="space-y-1 text-xs">
                        <li>
                          • This application does not guarantee loan approval
                        </li>
                        <li>
                          • A soft credit check will be performed for
                          pre-qualification
                        </li>
                        <li>
                          • Final loan terms may vary based on creditworthiness
                        </li>
                        <li>
                          • All information provided must be accurate and
                          complete
                        </li>
                        <li>
                          • By submitting, you consent to credit and background
                          checks
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    className="bg-black text-white flex-1 py-4 px-6 rounded-xl font-medium flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Submit Application</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-100 text-black px-6 py-4 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {applicationStep === "processing" && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Clock className="w-8 h-8 text-white animate-spin" />
              </div>

              <h4 className="text-2xl font-light text-black mb-4">
                Processing Your Application
              </h4>
              <p className="text-gray-600 mb-6">
                We're reviewing your information and checking your credit...
              </p>
            </div>
          )}

          {applicationStep === "approved" && (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h4 className="text-2xl font-light text-black mb-2">
                Congratulations! Quotation Generated
              </h4>
              <p className="text-gray-600 mb-8">
                Your quotation has been generated for solar financing up to $
                {totalPrice.toLocaleString()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-black">
                    {planChosen?.rate || '4.49'}%
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
                    {planChosen?.badge || '15-Year'}
                  </div>
                  <div className="text-sm text-gray-600">Loan Term</div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Quotation Generated
                  </span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
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
          )}

          {applicationStep === "documents" && (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-light text-black mb-2">
                Documents Sent Successfully!
              </h4>
              <p className="text-gray-600 mb-6">
                Your loan documents have been sent to your email address.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Email Sent</span>
                </div>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>• Pre-approval letter with loan terms</p>
                  <p>• Next steps and timeline information</p>
                  <p>• Contact information for your loan specialist</p>
                  <p>• Frequently asked questions</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Important Note
                  </span>
                </div>
                <p className="text-sm text-yellow-700">
                  Look out for documents from{" "}
                  <span className="font-semibold">"Sunlight Financial"</span> in
                  your email inbox. Check your spam folder if you don't see them
                  within 10 minutes.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Continuing with your solar system order...
                </p>
                <div className="flex justify-center">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          )}
          {showCreditCheckModal && <CreditCheckModal />}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;