import React, { useState, useEffect } from "react";
import {
  Calculator,
  CreditCard,
  Shield,
  Check,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";

// Import all the components
import Breadcrumb from "./Breadcrumb";
import StepNavigation from "./StepNavigation";
import SolarDesignStep from "./SolarDesignStep";
import StatsCard from "./StatsCard";
import BatteryControls from "./BatteryControls";
import AddOnService from "./AddOnService";
import WarrantyCard from "./WarrantyCard";
import LoanOptionCard from "./LoanOptionCard";
import PayInFullCard from "./PayInFullCard";
import OrderSummary from "./OrderSummary";
import Modal from "./Modal";
import Toggle from "./Toggle";

interface SolarCustomizationProps {
  selectedPlanDynamic: string;
  onPlanChange: (plan: string) => void;
  totalPrice: number;
  solarOnlyPrice: number;
  batteryTotalPrice: number;
  batteryCountDynamic: number;
  onFinancingApproved?: (value: string) => void;
  showIncentives: boolean;
  netCostAfterIncentives: number;
  handlePlanChange: (plan: string) => void;
}

const SolarCustomizationMain: React.FC<SolarCustomizationProps> = () => {
  const [batteryCount, setBatteryCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("15-years");
  type LoanOption = {
    name: string;
    badge: string;
    rate: number;
    key: string;
    icon: React.ElementType;
    loanDetails: {
      lowestPayment: number;
      paymentWithTaxCredit: number;
      paymentWithoutTaxCredit: number;
    };
  };

  const [results, setResults] = useState<LoanOption[]>([]);
  const [loanOptions, setLoanOptions] = useState<any[]>([]);

  type ToggleKey =
    | "solarLayout"
    | "totalCost"
    | "evCharger"
    | "roofReplacement"
    | "electricalPanel";

  const [toggleStates, setToggleStates] = useState<Record<ToggleKey, boolean>>({
    solarLayout: false,
    totalCost: false,
    evCharger: false,
    roofReplacement: false,
    electricalPanel: false,
  });

  const [formData, setFormData] = useState({
    cardholderName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleToggle = (key: ToggleKey) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const incrementBattery = () =>
    setBatteryCount((prev) => Math.min(prev + 1, 5));
  const decrementBattery = () =>
    setBatteryCount((prev) => Math.max(prev - 1, 1));

  const calculateTotalCost = () => {
    let total = 22400 + batteryCount * 15000;
    if (toggleStates.evCharger) total += 2500;
    if (toggleStates.electricalPanel) total += 3500;
    return total;
  };

  const totalCost = calculateTotalCost();
  const afterTaxCredit = Math.round(totalCost * 0.7);

  // Data for breadcrumb
  const breadcrumbSteps = [
    { label: "Recommendation" },
    { label: "Customize", isActive: true },
  ];

  // Data for step navigation
  const steps = [
    { number: 1, label: "Design", isCompleted: true, isActive: false },
    { number: 2, label: "Batteries", isCompleted: false, isActive: true },
    {
      number: 3,
      label: "Choose Your Plan",
      isCompleted: false,
      isActive: false,
    },
    {
      number: 4,
      label: "Customer Portal",
      isCompleted: false,
      isActive: false,
    },
  ];

  // Warranty data
  const warrantyData = [
    {
      title: "Product Warranty",
      description:
        "Complete coverage for solar panels against manufacturing defects.",
      duration: "25 years",
      bgColor: "bg-blue-500",
    },
    {
      title: "Performance Warranty",
      description: "Guaranteed 80% power output after 25 years of operation.",
      duration: "25 years",
      bgColor: "bg-green-500",
    },
    {
      title: "Roof Warranty",
      description:
        "Comprehensive workmanship guarantee on all installation work.",
      duration: "10 years",
      bgColor: "bg-purple-500",
    },
    {
      title: "Battery Warranty",
      description:
        "Tesla Powerwall warranty with 70% capacity retention guarantee.",
      duration: "10 years",
      bgColor: "bg-yellow-500",
    },
  ];

  // Mock loan options data - replace with your actual API call
  useEffect(() => {
    // Simulate API call
    const mockResults = [
      {
        name: "Standard Solar Loan",
        badge: "5-Year",
        rate: 6.99,
        key: "5-year-standard",
        icon: DollarSign,
        loanDetails: {
          lowestPayment: 450,
          paymentWithTaxCredit: 315,
          paymentWithoutTaxCredit: 450,
        },
      },
    ];
    setResults(mockResults);
  }, []);

  return (
    <section className="py-24 sm:py-40 bg-slate-900 relative min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <Breadcrumb steps={breadcrumbSteps} />

        {/* Title */}
        <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-white font-normal tracking-tight">
          Customize your solar system
        </h1>

        {/* Step Navigation */}
        <StepNavigation steps={steps} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
          {/* Left Panel */}
          <div className="w-full space-y-4">
            {/* Overview Section */}
            <div className="w-full rounded-xl relative p-6 text-white border border-neutral-600">
              <div className="text-white text-lg font-medium gap-2 mb-6">
                <span className="text-2xl text-orange-400">Overview</span>
              </div>

              {/* Step 1 - Solar Design */}
              <SolarDesignStep
                solarLayoutToggle={toggleStates.solarLayout}
                onSolarLayoutToggle={() => handleToggle("solarLayout")}
                onExpandClick={() => setIsModalOpen(true)}
              />

              {/* Step 2 - Confirm Order */}
              <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full mt-4">
                <div className="flex mb-4">
                  <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
                    Step 2
                  </p>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="text-gray-300">Confirm your order</div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3 w-full">
                  <div className="w-full sm:w-[calc(50%-0.75rem)]">
                    <div className="grid grid-cols-2 w-full gap-4">
                      <StatsCard
                        title="Panels"
                        value="32"
                        subtitle="12.8kW System"
                      />
                      <StatsCard
                        title="Battery Storage"
                        value={batteryCount}
                        subtitle="-8 hours backup"
                        controls={
                          <BatteryControls
                            count={batteryCount}
                            onIncrement={incrementBattery}
                            onDecrement={decrementBattery}
                          />
                        }
                      />
                      <StatsCard
                        title="Solar System Costs ($)"
                        value="22,400"
                        bgColor="bg-emerald-900"
                      />
                      <StatsCard
                        title="Battery Cost ($)"
                        value={(batteryCount * 15000).toLocaleString()}
                        bgColor="bg-emerald-900"
                      />
                    </div>
                  </div>

                  {/* Total System Cost */}
                  <div className="bg-orange-900 text-white rounded-xl p-4 border border-neutral-600 w-full sm:w-[calc(50%-0.75rem)]">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Total System Cost ($)
                      </span>
                      <Toggle
                        checked={toggleStates.totalCost}
                        onChange={() => handleToggle("totalCost")}
                      />
                    </div>
                    <div className="text-4xl pt-32">
                      {totalCost.toLocaleString()}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Before Incentives
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add-on Services */}
                <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
                  <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
                    <span className="mr-3 text-2xl">+</span>Add-on Services
                  </div>

                  <AddOnService
                    icon={CreditCard}
                    title="EV Charger Installation"
                    price="$2,500"
                    isToggled={toggleStates.evCharger}
                    onToggle={() => handleToggle("evCharger")}
                  />

                  <AddOnService
                    icon={() => (
                      <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    )}
                    title="Roof Replacement"
                    price="Generate custom quote"
                    isToggled={toggleStates.roofReplacement}
                    onToggle={() => handleToggle("roofReplacement")}
                  />

                  <AddOnService
                    icon={() => (
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    )}
                    title="Electrical Panel Upgrade"
                    price="$3,500"
                    isToggled={toggleStates.electricalPanel}
                    onToggle={() => handleToggle("electricalPanel")}
                    hasInfo={true}
                  />
                </div>

                {/* Disclaimers */}
                <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs">i</span>
                  </div>
                  Tax Credit Disclaimer: The 30% federal tax credit is subject
                  to eligibility requirements and may vary based on your tax
                  situation.
                </div>

                <div className="bg-red-900 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs">!</span>
                  </div>
                  Act fast - the 30% federal solar tax credit expires at the end
                  of 2025.
                </div>

                {/* Warranty Protection */}
                <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
                  <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
                    <Shield className="mr-3 w-5 h-5" />
                    Warranty Protection
                  </div>

                  <div className="grid grid-cols-2 w-full gap-4">
                    {warrantyData.map((warranty, index) => (
                      <WarrantyCard key={index} {...warranty} />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 w-full gap-4 mt-4">
                    {[
                      "24/7 Monitoring",
                      "Free Maintenance",
                      "Remote Diagnostics",
                    ].map((feature, index) => {
                      const colors = [
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-purple-500",
                      ];
                      return (
                        <div
                          key={index}
                          className="bg-slate-600 p-3 rounded-xl text-left text-white text-xs font-normal flex items-center"
                        >
                          <div
                            className={`w-4 h-4 ${colors[index]} rounded-full mr-2`}
                          ></div>
                          {feature}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3 - Payment Plans */}
              <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full mt-4">
                <div className="flex mb-4">
                  <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
                    Step 3
                  </p>
                </div>

                <div className="text-gray-300 mb-2 text-lg">
                  Choose your payment plan
                </div>
                <div className="text-gray-100 text-base mb-4">
                  Select the financing option that works best for you
                </div>

                {/* How Re-amortizing Solar Loans Work */}
                <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
                  <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
                    <Calculator className="mr-3 w-5 h-5" />
                    How Re-amortizing Solar Loans Work
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                    {[
                      {
                        step: "1",
                        title: "Months 1-16: Lowest Payment",
                        description:
                          "Your monthly payment remains fixed during the first 16 months. During this period, you can apply your tax credit or make an optional lump sum payment.",
                      },
                      {
                        step: "2",
                        title: "Months 16: Tax Credit Decision",
                        description:
                          "If eligible, you may claim the 30% federal solar tax credit. At this stage, you can choose to apply any received benefit toward your loan.",
                      },
                      {
                        step: "3",
                        title: "Months 17+: Payment Adjusts",
                        description:
                          "Your monthly payment updates based on the total loan amount owed after you apply your tax credit, personal funds, or both.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-slate-600 p-3 rounded-xl">
                        <div className="flex mb-4">
                          <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
                            {item.step}
                          </p>
                        </div>
                        <div className="w-full text-white text-sm font-normal mb-2">
                          {item.title}
                        </div>
                        <div className="w-full text-gray-300 text-xs font-normal">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-neutral-900 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">i</span>
                    </div>
                    Industry Standard Structure: This re-amortizing structure is
                    the standard for solar financing.
                  </div>
                </div>

                {/* Payment Plan Options */}
                <div className="py-4 w-full mt-4">
                  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
                  {results?.map((option, index) => {
                    const badges = [
                      "Fastest Payoff",
                      "Most Popular",
                      "Lowest Payment",
                    ];
                    const badgeColors = [
                      "bg-red-500",
                      "bg-teal-600",
                      "bg-red-500",
                    ];
                    const features = [
                      [
                        "Lowest total interest paid",
                        "Build equity fastest",
                        "Highest monthly tax benefits",
                        "Best for high-income households",
                      ],
                      [
                        "Balanced payment & savings",
                        "Moderate monthly commitment",
                        "Good interest savings",
                        "Flexible for most budgets",
                      ],
                      [
                        "Lowest monthly payment",
                        "Immediate positive cashflow",
                        "Easier budget integration",
                        "Long-term wealth building",
                      ],
                    ];
                    const recommendations = [
                      "Perfect if you want to own your system quickly and have strong monthly cash flow.",
                      "The sweet spot between affordability and total cost - chosen by 70% of our customers.",
                      "Ideal if you want maximum monthly savings from day one with minimal payment stress.",
                    ];

                    return (
                      <LoanOptionCard
                        key={option.key}
                        option={option}
                        totalCost={totalCost}
                        selectedPlan={selectedPlan}
                        onSelectPlan={setSelectedPlan}
                        badgeText={badges[index]}
                        badgeColor={badgeColors[index]}
                        features={features[index]}
                        recommendation={recommendations[index]}
                      />
                    );
                  })}
                  {/* </div> */}
                </div>

                {/* Pay in Full Option */}
                <PayInFullCard totalPrice={totalCost} />
              </div>
            </div>

            {/* What's Next Section */}
            <div className="w-full rounded-xl relative p-6 text-white border border-neutral-600">
              <div className="text-gray-100 text-2xl mb-4">What's next?</div>

              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Confirm Order",
                    description:
                      "Submit your $500 deposit to secure your system and lock in current price.",
                  },
                  {
                    step: "2",
                    title: "Upload Photos",
                    description: "Share photos of your home for system design.",
                  },
                  {
                    step: "3",
                    title: "Get Professional Installer",
                    description:
                      "Connect with certified installers in your area.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-xl text-left"
                  >
                    <div className="flex mb-4">
                      <p className="text-sm bg-orange-100 text-orange-600 flex items-center border rounded-xl px-3 py-1">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>{" "}
                        {item.step}
                      </p>
                    </div>
                    <div className="w-full text-black text-sm font-normal mb-2">
                      {item.title}
                    </div>
                    <div className="w-full text-gray-500 text-xs font-normal">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5">
                <div className="flex items-center mb-4">
                  <Shield className="mr-2 w-5 h-5" />
                  <p className="text-base font-medium">
                    What is a SunLink Verified Installer?
                  </p>
                </div>

                <ul className="flex flex-wrap gap-6 text-sm font-normal">
                  {[
                    "NABCEP-Certified",
                    "5+ years in business",
                    "Licensed and insured",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <OrderSummary
            batteryCount={batteryCount}
            totalCost={totalCost}
            afterTaxCredit={afterTaxCredit}
            evChargerEnabled={toggleStates.evCharger}
            electricalPanelEnabled={toggleStates.electricalPanel}
            formData={formData}
            onInputChange={handleInputChange}
          />
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          3D Models
        </Modal>
      </div>
    </section>
  );
};

export default SolarCustomizationMain;
