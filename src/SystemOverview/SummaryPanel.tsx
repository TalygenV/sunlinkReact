import lightning from '../assets/images/lightning_svgrepo.com.svg';
import React, { useState } from "react";
import { Zap, Target, Info, ChevronDown, ChevronUp } from "lucide-react";
import { EnergyOffsetChart } from "./EnergyOffsetChart";
import { UsageInput } from "./UsageInput";
import { useNavigate } from "react-router-dom";

interface SummaryPanelProps {
  annualUsage?: number;
  setAnnualUsage: (energy: number) => void;
  panelCount?: number;
  setPanelCount?: (energy: number) => void;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  setAnnualUsage,
  annualUsage = 0,
  panelCount = 0,
  setPanelCount,
}) => {
  const [selectedTarget, setSelectedTarget] = useState(100);
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const navigate = useNavigate();

  // Constants for calculations
  const panelWattage = 400; // watts per panel
  const systemEfficiency = 0.85; // 85% system efficiency
  const sunHoursPerYear = 1460; // average sun hours per year

  // Calculations
  const systemSize = (panelCount * panelWattage) / 1000; // kW
  const annualOutput = Math.round(
    systemSize * sunHoursPerYear * systemEfficiency
  );
  const energyOffset =
    panelCount > 0 ? Math.round((annualOutput / annualUsage) * 100) : 0;

  // Energy offset targets
  const offsetTargets = [
    {
      percentage: 80,
      label: "Basic",
      description: "Significantly reduce your monthly electricity bills",
      color: "#10b981",
    },
    {
      percentage: 100,
      label: "Complete",
      description: "Match your annual energy usage with solar production",
      color: "#ff6b35",
    },
    {
      percentage: 120,
      label: "Surplus",
      description: "Generate extra power for batteries or future expansion",
      color: "#3b82f6",
    },
    {
      percentage: 150,
      label: "Maximum",
      description: "Ideal for pools, workshops, or major home additions",
      color: "#8b5cf6",
    },
  ];

  // Calculate required panels for selected target
  const requiredOutput = (selectedTarget / 100) * annualUsage;
  const requiredSystemSize =
    requiredOutput / (sunHoursPerYear * systemEfficiency);
  const requiredPanels = Math.ceil((requiredSystemSize * 1000) / panelWattage);

  const handleTargetSelect = (target: number) => {
    setSelectedTarget(target);
    // Calculate and set required panels for this target
    const requiredOutput = (target / 100) * annualUsage;
    const requiredSystemSize =
      requiredOutput / (sunHoursPerYear * systemEfficiency);
    const requiredPanels = Math.ceil(
      (requiredSystemSize * 1000) / panelWattage
    );
    if (setPanelCount) {
      setPanelCount(requiredPanels);
    }
  };

  const handleUsageChange = (newUsage: number) => {
    setAnnualUsage(newUsage);
    // Recalculate panels for current target with new usage
    if (selectedTarget) {
      const requiredOutput = (selectedTarget / 100) * newUsage;
      const requiredSystemSize =
        requiredOutput / (sunHoursPerYear * systemEfficiency);
      const requiredPanels = Math.ceil(
        (requiredSystemSize * 1000) / panelWattage
      );
      if (setPanelCount) {
        setPanelCount(requiredPanels);
      }
    }
  };

  const gotoNextScreen = () => {
    const totalcost = panelCount * 400 * 2.5;
    localStorage.setItem("panelCount", JSON.stringify({ panelCount, totalcost }))
    navigate("/system-design");
  };

  return (
    <div className="w-full h-full ">
      <div className="w-full">
        <div className="space-y-3 lg:space-y-6">
          <div className="flex items-center space-x-2 mb-3 lg:mb-4">
            <img className="" src={lightning} alt="Sunlink" />
            <h2 className="text-base lg:text-2xl text-color ">
              System Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 wp600">
            <UsageInput
              annualUsage={annualUsage}
              onUsageChange={handleUsageChange}
            />
            <div className="bg-[#252525] rounded-xl p-4 border border-neutral-600 custom-bod">
              <div className="text-white/70 text-xs uppercase tracking-wide font-medium mb-2">
                Annual Output
                <div className="text-white/70 text-sm">kWh</div>
              </div>
              <div className="text-white text-lg lg:text-2xl font-bold">
                {annualOutput.toLocaleString()}
              </div>
              
            </div>



            <div className="bg-[#252525] rounded-xl p-4 border border-neutral-600 custom-bod">
              <div className="text-white/70 text-xs uppercase tracking-wide font-medium mb-2">
                System Size
              </div>
              <div className="text-white text-lg lg:text-2xl font-bold">
                {systemSize.toFixed(1)}
              </div>
              <div className="text-white/70 text-sm">kW</div>
            </div>
            <div className="bg-[#252525] rounded-xl p-4 border border-neutral-600 custom-bod">
              <div className="text-white/70 text-xs uppercase tracking-wide font-medium mb-2">
                Panels
              </div>
              <div className="text-white text-lg lg:text-2xl font-bold">
                {panelCount}
              </div>
              <div className="text-white/70 text-sm">panels</div>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 rounded-lg p-3 lg:p-4 border border-[#e5e7eb]">
              <div className="text-white/70 text-xs uppercase tracking-wide font-medium mb-2">
                System Size
              </div>
              <div className="text-white text-lg lg:text-2xl font-bold">
                {systemSize.toFixed(1)}
              </div>
              <div className="text-white/70 text-sm">kW</div>
            </div>
            <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 rounded-lg p-3 lg:p-4 border border-[#e5e7eb]">
              <div className="text-white/70 text-xs uppercase tracking-wide font-medium mb-2">
                Panels
              </div>
              <div className="text-white text-lg lg:text-2xl font-bold">
                {panelCount}
              </div>
              <div className="text-white/70 text-sm">panels</div>
            </div>
          </div> */}
        </div>

        {/* Energy Offset Chart */}
        <EnergyOffsetChart offset={energyOffset} panelCount={panelCount} />

        {/* Choose Desired Energy Offset - Dark Gradient Background with Less Orange */}
        <div className="bg-[#2c2c2c] custom-bod text-white px-6 py-6 rounded-xl shadow-lg w-full mt-4 border border-neutral-600">
          <div className="flex items-center space-x-2 lg:mb-6">
            <Target className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            <h3 className="text-color text-sm lg:text-lg font-normal">
              Choose Desired Energy Offset
            </h3>
          </div>

          {/* Future expansion note - Clickable */}
          <button
            onClick={() => setShowPlanDetails(!showPlanDetails)}
            className="w-full mb-4 p-3 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Info className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-sm lg:text-base">
                  Plan for the Future
                </span>
              </div>
              {showPlanDetails ? (
                <ChevronUp className="w-4 h-4 text-white/70" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/70" />
              )}
            </div>

            {showPlanDetails && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-white/90 text-xs lg:text-sm leading-relaxed text-left">
                  You can always add more panels later if your home and roof
                  structure support expansion. Start with your current needs and
                  scale up as your energy requirements grow.
                </p>
              </div>
            )}
          </button>

          <div className="space-y-3 lg:space-y-4">
            {offsetTargets.map((target) => {
              const isSelected = selectedTarget === target.percentage;
              const isAchieved = energyOffset >= target.percentage;

              return (
                <button
                  key={target.percentage}
                  onClick={() => handleTargetSelect(target.percentage)}
                  className={`w-full py-6 space-y-3 lg:p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md ${isSelected
                    ? "bg-gradient-to-br from-orange-500 to-red-500 ring-2 ring-white shadow-lg text-white"
                    : "bg-white border border-gray-200 hover:border-gray-300 text-[#1f2937]"
                    }`}
                >
                  <div className="flex items-center gap-3 justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${isSelected ? "bg-white/30" : "bg-gray-300"
                          }`}
                        style={
                          !isSelected ? { backgroundColor: target.color } : {}
                        }
                      ></div>
                      <div className="min-w-0">
                        <span
                          className={`font-semibold text-sm lg:text-base ${isSelected ? "text-white" : "text-[#1f2937]"
                            }`}
                        >
                          {target.percentage}% {target.label}
                        </span>
                        {isAchieved && (
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded-full ${isSelected
                              ? "bg-white/20 text-white"
                              : "bg-green-500/20 text-green-600"
                              }`}
                          >
                            ✓ Achieved
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p
                    className={`text-xs mb-2 ${isSelected ? "text-white/90" : "text-[#6b7280]"
                      }`}
                  >
                    {target.description}
                  </p>
                  <div
                    className={`text-xs ${isSelected ? "text-white/80" : "text-[#6b7280]"
                      }`}
                  >
                    Requires ~
                    {Math.ceil(
                      ((target.percentage / 100) * annualUsage) /
                      ((sunHoursPerYear * systemEfficiency * panelWattage) /
                        1000)
                    )}{" "}
                    panels
                  </div>
                </button>
              );
            })}
          </div>

          {/* <div className="space-y-3 lg:space-y-4">
            {offsetTargets.map((target) => {
              const isSelected = selectedTarget === target.percentage;
              const isAchieved = energyOffset >= target.percentage;

              return (
                <button
                  key={target.percentage}
                  onClick={() => handleTargetSelect(target.percentage)}
                  className={`w-full p-3 lg:p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md ${
                    isSelected
                      ? "bg-gradient-to-br from-orange-500 to-red-500 ring-2 ring-orange-300 shadow-lg"
                      : "bg-white border border-gray-200 hover:border-orange-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isSelected ? "bg-white/30" : "bg-gray-300"
                        }`}
                        style={
                          !isSelected ? { backgroundColor: target.color } : {}
                        }
                      ></div>
                      <div className="min-w-0">
                        <span
                          className={`font-semibold text-sm lg:text-base ${
                            isSelected ? "text-white" : "text-[#1f2937]"
                          }`}
                        >
                          {target.percentage}% {target.label}
                        </span>
                        {isAchieved && (
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-green-500/20 text-green-600"
                            }`}
                          >
                            ✓ Achieved
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p
                    className={`text-xs mb-2 ${
                      isSelected ? "text-white/90" : "text-[#6b7280]"
                    }`}
                  >
                    {target.description}
                  </p>
                  <div
                    className={`text-xs ${
                      isSelected ? "text-white/80" : "text-[#6b7280]"
                    }`}
                  >
                    Requires ~
                    {Math.ceil(
                      ((target.percentage / 100) * annualUsage) /
                        ((sunHoursPerYear * systemEfficiency * panelWattage) /
                          1000)
                    )}{" "}
                    panels
                  </div>
                </button>
              );
            })}
          </div> */}
        </div>

        {/* Finalize Design Button */}
        <button
          onClick={gotoNextScreen}
          className="w-full btn-primary text-white py-2 lg:py-4 px-3 lg:px-6 rounded-xl transition-all duration-200 orangegradbtn flex items-center justify-center space-x-2 text-sm lg:text-base mt-4"
        >
          <span>Finalize my Design </span>
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
