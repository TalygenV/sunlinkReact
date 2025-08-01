import React from "react";
import { SolarCustomizationMain } from "../paymentPlans";

const SolarCustomizationPage: React.FC = () => {
  // Your existing props/state logic
  const mockProps = {
    selectedPlanDynamic: "15-years",
    onPlanChange: (plan: string) => console.log("Plan changed:", plan),
    totalPrice: 39900,
    solarOnlyPrice: 22400,
    batteryTotalPrice: 15000,
    batteryCountDynamic: 1,
    onFinancingApproved: (value: string) =>
      console.log("Financing approved:", value),
    showIncentives: true,
    netCostAfterIncentives: 27930,
    handlePlanChange: (plan: string) =>
      console.log("Handle plan change:", plan),
  };

  return <SolarCustomizationMain {...mockProps} />;
};

export default SolarCustomizationPage;
