import React, { useRef, useState } from "react";
import {
  X,
  CreditCard,
  AlertCircle,
  Clock,
  CheckCircle,
  Mail,
  Send,
} from "lucide-react";
import QuotationPopup from "./QuotationPopup";

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: any;
  sfAccessToken: string;
  selectedPlan: any;
  totalPrice: number;
  onSubmit?: (data: any,formDataRef: any,sfAccessToken: string) => void;
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
  onValueChange?: (name: string, value: string) => void;
}

interface OptimizedSelectProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  options: Array<{ value: string; label: string }>;
  onValueChange?: (name: string, value: string) => void;
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
  formatter,
  onValueChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (formatter) {
      newValue = formatter(newValue);
    }
    setValue(newValue);
    if (onValueChange) {
      onValueChange(name, newValue);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
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
        className={`w-full px-4 py-3 border border-[#7a8185] h-[60px] bg-[#e8e9ea] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black  ${className}`}
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
  options,
  onValueChange,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(name, newValue);
    }
  };
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
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
  sfAccessToken,
  selectedPlan,
  totalPrice,
  onSubmit,
}) => {
  const [applicationStep, setApplicationStep] = useState<
    "form" | "processing" | "approved" | "documents"
  >("form");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditCheckModal, setShowCreditCheckModal] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const handleInputChange = (name: string, value: string) => {
    formDataRef.current[name as keyof typeof formDataRef.current] = value;
  };
  const formDataRef = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    income: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    employerName: "",
    jobTitle: "",
    annualIncome: "",
    employmentMonths: "",
    employmentYears: "",
  });
  if (!isOpen) return null;

  const handleCloseModal = () => {
    onClose();
    setApplicationStep("form");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
   // setApplicationStep("processing");
   console.log("In Submit Form");
    console.log(selectedPlan);
    try {
      const res = await fetch(
        "https://us-central1-sunlink-21942.cloudfunctions.net/createSolarProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sfAccessToken: `Bearer ${sfAccessToken}`,
            apr: selectedPlan.rate,
            term: selectedPlan.badge.split("-")[0],
            productType: "Solar",
            installStreet: formDataRef.current.address,
            installCity: formDataRef.current.city,
            installStateName: formDataRef.current.state,
            installZipCode: formDataRef.current.zipCode,
            firstName: formDataRef.current.firstName,
            lastName: formDataRef.current.lastName,
            phone: formDataRef.current.phone,
            otherPhone: formDataRef.current.phone,
            email: formDataRef.current.email,
            mailingStreet: formDataRef.current.address,
            mailingCity: formDataRef.current.city,
            mailingStateName: formDataRef.current.state,
            mailingZipCode: formDataRef.current.zipCode,
            residenceStreet: formDataRef.current.address,
            residenceCity: formDataRef.current.city,
            residenceStateName: formDataRef.current.state,
            residenceZipCode: formDataRef.current.zipCode,
            dateOfBirth: formDataRef.current.dateOfBirth || "1990-01-01",
            ssn: formDataRef.current.ssn.replace(/-/g, ""),
            annualIncome: formDataRef.current.income.replace(/\D/g, ""),
            employerName: formDataRef.current.employerName,
            jobTitle: formDataRef.current.jobTitle,
            employmentYears: formDataRef.current.employmentYears,
            employmentMonths: formDataRef.current.employmentMonths,
            loanAmount: displayPrice,
            projectType: "Rooftop PV",
            estAnnualProductionkwh: 29581,
            inverterCount: 1,
            inverterMake: "a1sJ0000004kwGW",
            inverterModel: "TUV6000",
            moduleCount: 20,
            moduleMake: "a1sJ0000004kwFx",
            moduleModel: "HW320",
            systemSize: 25,
          }),
        }
      );
      const data = await res.json();

      const firstProject = data.projects?.[0];
      const firstApplicant = firstProject?.applicants?.[0];
      if (onSubmit) {
        onSubmit(data,formDataRef,sfAccessToken);
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${res.status}`
        );
      } else {
        localStorage.setItem("pid", firstProject.id);
        setProjectId(firstProject.id);
        setApplicationId(firstApplicant.id);

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(
            errorData?.error || `HTTP error! status: ${res.status}`
          );
        } else {
          localStorage.removeItem("planOptionlocal");
          setTimeout(() => {
            setApplicationStep("approved");
          }, 2000);
        }
      }
    } catch (error) {
      setApplicationStep("form");
      console.log("Error submitting form:", error);
    }
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
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  };

  const formatIncome = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned ? `$${parseInt(cleaned).toLocaleString()}` : "";
  };

  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 5);
  };

  const stateOptions = [
    { value: "Alabama", label: "Alabama" },
    { value: "Alaska", label: "Alaska" },
    { value: "Arizona", label: "Arizona" },
    { value: "Arkansas", label: "Arkansas" },
    { value: "California", label: "California" },
    { value: "Colorado", label: "Colorado" },
    { value: "Connecticut", label: "Connecticut" },
    { value: "Delaware", label: "Delaware" },
    { value: "Florida", label: "Florida" },
    { value: "Georgia", label: "Georgia" },
    // Add more states as needed
  ];

  const CreditCheckModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Credit Check Required</h3>
        <p className="text-gray-600 mb-6">
          To proceed with your loan application, we need to perform a credit
          check.
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-hidden z-50">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[30px]">
        {/* Modal Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
              
            </div>
            <div>
              <h3 className="text-2xl font-medium text-black">
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
                      onValueChange={handleInputChange}
                    />
                    <OptimizedInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                      autoComplete="family-name"
                      onValueChange={handleInputChange}
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
                      onValueChange={handleInputChange}
                    />
                    <OptimizedInput
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      required
                      autoComplete="tel"
                      onValueChange={handleInputChange}
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
                      onValueChange={handleInputChange}
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
                          className="w-full pl-8 pr-4 py-3 text-black"
                          formatter={formatIncome}
                          onValueChange={handleInputChange}
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
                      onValueChange={handleInputChange}
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
                        onValueChange={handleInputChange}
                      />
                      <OptimizedSelect
                        id="state"
                        name="state"
                        label="State"
                        required
                        autoComplete="address-level1"
                        options={stateOptions}
                        onValueChange={handleInputChange}
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
                        onValueChange={handleInputChange}
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
                      onValueChange={handleInputChange}
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
                        onValueChange={handleInputChange}
                      />
                      <OptimizedInput
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        required
                        autoComplete="bday"
                        onValueChange={handleInputChange}
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
                        onValueChange={handleInputChange}
                      />
                      <OptimizedInput
                        id="employmentMonths"
                        name="employmentMonths"
                        type="number"
                        label="Employment Months"
                        placeholder="Employment Months"
                        required
                        onValueChange={handleInputChange}
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
                      <ul className="space-y-2 text-sm">
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

          {showCreditCheckModal && <CreditCheckModal />}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;
