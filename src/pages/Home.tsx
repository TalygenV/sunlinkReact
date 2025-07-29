import React, { useState } from 'react';
import SolarForm from '../components/SolarForm';
import { BarChart3, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setPersonalInfo } from "../store";
const Home = () => {
  const dispatch = useAppDispatch();
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);
  const [energyInputMode, setEnergyInputMode] = useState("annual");
  const [annualUsage, setAnnualUsage] = useState("");
  const [monthlyUsages, setMonthlyUsages] = useState(Array(12).fill(""));

  const handleEnergyModal = (open: boolean) => setShowEnergyModal(open);
  const { ownsHome } = useAppSelector((state) => state.solar.solarForm);

  const handleEnergySubmit = () => {
    let estimatedMonthlyBill = 0;
    setShowEnergyModal(false);
    if (energyInputMode === "annual" && annualUsage) {
      estimatedMonthlyBill = Math.round((Number(annualUsage) * 0.15) / 12);
    } else if (energyInputMode === "monthly") {
      const totalAnnualUsage = monthlyUsages.reduce(
        (sum, usage) => sum + (Number(usage) || 0),
        0
      );
      estimatedMonthlyBill = Math.round((totalAnnualUsage * 0.15) / 12);
    }

    dispatch(setPersonalInfo({ ['powerBill']: estimatedMonthlyBill }))
    handleEnergyModal(false);
  };
  const handleIneligibleModal = () => {
    setShowIneligibleModal(true)
  }
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const closeIneligibleModal = () => {
    setShowIneligibleModal(false);
  };
  const handleMonthlyUsageChange = (index: number, value: string) => {
    const newUsages = [...monthlyUsages];
    newUsages[index] = value;
    setMonthlyUsages(newUsages);
  };
  return (
    <section className="pt-[100px] py-24 sm:py-48 bg-black-custom relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* Left Content */}
          <div className="lg:pt-4 lg:pr-8 sticky top-20 h-screen">
            <div className="lg:max-w-lg">
              <p className="text-sm text-color font-mono">GO SOLAR</p>
              <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-color">
                Solar for you, not salesperson
              </h2>
              <p className="mt-6 text-xl text-color">
                Get instant quote and linked to a pre-screened, certified installer who delivers quality results without the high pressure sales tactics.
              </p>
              <ul className="mt-6 text-xl text-white space-y-2 list">
                <li>Competitive pricing with completely transparent quotes and no hidden fees or surprises.</li>
                <li>Receive your solar quote in minutes, not weeks, so you can start saving sooner.</li>
                <li>
                  Licensed, insured, and background-checked installers.{' '}
                  <a href="#" className="underline">
                    Read more
                  </a>
                </li>
              </ul>
              <div className="mt-10 gap-x-6 relative">
                <p className="sm-testimonial py-4 px-5 me-2 mb-2 text-lg text-center text-white">
                  "No pushy sales calls. No surprise fees. Just honest, professional solar solutions tailored to your home."
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:pt-4 lg:pr-8">
            <SolarForm onOpenEnergyModal={() => setShowEnergyModal(true)}
              onSubmitEnergyData={handleEnergySubmit}
              showIneligibleModal={handleIneligibleModal}
            />
          </div>
           {/* Energy Consumption Modal */}
      {showEnergyModal && (
        <div className="fixed inset-0 bg-slate-800 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-brand-orange to-brand-teal rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="tesla-heading text-2xl text-gray-900">
                    Energy Consumption
                  </h3>
                </div>
                <button
                  onClick={() => {
                    handleEnergyModal(false);
                  }}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-[#e8e9ea] rounded-lg p-1 mb-6">
                <button
                  onClick={() => setEnergyInputMode("annual")}
                  className={`tesla-button flex-1 py-3 px-4 ${energyInputMode === "annual"
                      ? "bg-white text-brand-teal shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  Annual Total
                </button>
                <button
                  onClick={() => setEnergyInputMode("monthly")}
                  className={`tesla-button flex-1 py-3 px-4 ${energyInputMode === "monthly"
                      ? "bg-white text-brand-teal shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  Month by Month
                </button>
              </div>

              {/* Annual Input */}
              {energyInputMode === "annual" && (
                <div className="space-y-4">
                  <div>
                    <label className="block tesla-caption text-sm text-gray-700 mb-2">
                      Total Annual Energy Usage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={annualUsage}
                        onChange={(e) => setAnnualUsage(e.target.value)}
                        className="tesla-input w-full prw-full px-4 py-3 border border-[#7a8185] h-[60px] bg-[#e8e9ea] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black-16 pl-4 py-4 text-lg"
                        placeholder="12000"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                        kWh/year
                      </span>
                    </div>
                  </div>
                  <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10">
                    <p className="tesla-body text-gray-700 text-sm">
                      <strong>Tip:</strong> You can find your annual usage on
                      your utility bill or by adding up 12 months of usage
                      from your online account.
                    </p>
                  </div>
                </div>
              )}

              {/* Monthly Input */}
              {energyInputMode === "monthly" && (
                <div className="space-y-4">
                  <p className="tesla-body text-gray-600 text-sm mb-4">
                    Enter your monthly energy usage for each month (in kWh).
                    You can find this information on your utility bills.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {monthNames.map((month, index) => (
                      <div key={month}>
                        <label className="block tesla-caption text-xs text-gray-700 mb-1">
                          {month}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={monthlyUsages[index]}
                            onChange={(e) =>
                              handleMonthlyUsageChange(index, e.target.value)
                            }
                            className="w-full px-4 py-3 border border-[#7a8185] h-[60px] bg-[#e8e9ea] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                            placeholder="1000"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                            kWh
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10">
                    <p className="tesla-body text-gray-700 text-sm">
                      <strong>Total Annual Usage:</strong>{" "}
                      {monthlyUsages
                        .reduce(
                          (sum, usage) => sum + (parseInt(usage) || 0),
                          0
                        )
                        .toLocaleString()}{" "}
                      kWh
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => {
                    handleEnergyModal(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnergySubmit}
                  disabled={
                    (energyInputMode === "annual" && !annualUsage) ||
                    (energyInputMode === "monthly" &&
                      monthlyUsages.every((usage) => !usage))
                  }
                  className="orangegradbtn rounded-xl border border-[#F47121] py-4 px-5 text-lg font-normal text-white w-full flex justify-center"
                >
                  Use This Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Ineligible Modal */}
      {showIneligibleModal && (
        <div className="fixed inset-0 bg-slate-800 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            <button
              onClick={closeIneligibleModal}
              className="absolute top-4 right-4 w-8 h-8 bg-[#f46b30] hover:bg-black rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-white hover:text-white" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 tesla-gradient-bg rounded-lg flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-brand-orange" />
              </div>

              <h3 className="tesla-heading text-2xl text-gray-900 mb-4">
                We're Sorry
              </h3>

              {ownsHome === "renter" ? (
                <>
                  <p className="tesla-body text-gray-600 text-lg mb-6">
                    Solar installation is only available for homeowners. As a
                    renter, you would need permission from your landlord and
                    they would receive the benefits of the solar system.
                  </p>

                  <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10 mb-6">
                    <p className="tesla-body text-gray-700 text-sm">
                      <strong>Homeowners only:</strong> Solar systems require
                      property ownership for installation, financing, and to
                      receive tax credits and incentives.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="tesla-body text-gray-600 text-lg mb-6">
                    Your property type is not eligible for solar installation
                    at this time. Solar systems work best on single-family
                    homes with adequate roof space and proper orientation.
                  </p>

                  <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10 mb-6">
                    <p className="tesla-body text-gray-700 text-sm">
                      <strong>Eligible property types:</strong> Single-family
                      homes with suitable roof conditions for solar panel
                      installation. Townhomes and condos typically have shared
                      roofs or HOA restrictions that prevent solar
                      installation.
                    </p>
                  </div>
                </>
              )}

              <button
                onClick={closeIneligibleModal}
                className="btn-sheen w-full flex items-center justify-center gap-3 orangegradbtn text-white px-8 py-3 rounded-md text-lg w-full transition-all duration-300"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
     
    </section>
  );
};

export default Home;
