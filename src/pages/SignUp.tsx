import React, { useState, useEffect } from 'react';
import SolarForm from '../components/SolarForm';
import { BarChart3, X, Home as HomeIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setPersonalInfo } from "../store";
import { FormContext } from '../context/FormContext';
import SolorDetails from './SolorDetails';

const SignUp = () => {
  const {
    isAuthenticated,
  } = React.useContext(FormContext);
  const dispatch = useAppDispatch();
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);
  const [energyInputMode, setEnergyInputMode] = useState("annual");
  const [annualUsage, setAnnualUsage] = useState("");
  const [monthlyUsages, setMonthlyUsages] = useState(Array(12).fill(""));
  const { ownsHome } = useAppSelector((state) => state.solar.solarForm);

  const handleEnergyModal = (open: boolean) => setShowEnergyModal(open);
  const handleIneligibleModal = () => setShowIneligibleModal(true);
  const closeIneligibleModal = () => setShowIneligibleModal(false);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showEnergyModal || showIneligibleModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showEnergyModal, showIneligibleModal]);

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
    dispatch(setPersonalInfo({ ['powerBill']: estimatedMonthlyBill }));
    handleEnergyModal(false);
  };

  const handleMonthlyUsageChange = (index: number, value: string) => {
    const newUsages = [...monthlyUsages];
    newUsages[index] = value;
    setMonthlyUsages(newUsages);
  };


  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if(isAuthenticated){
    return (<SolorDetails/>)
  }

  return (
    <section className="pt-[150px] bg-black-custom relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* Left Content */}
          <div className={`lg:pt-4 lg:pr-8 ${showEnergyModal || showIneligibleModal ? '' : 'go-solar sticky top-20 h-screen'}`}>
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
                  <a href="#" className="underline">Read more</a>
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
          <div className="lg:pt-4 design-solar">
            <SolarForm
              onOpenEnergyModal={() => setShowEnergyModal(true)}
              onSubmitEnergyData={handleEnergySubmit}
              showIneligibleModal={handleIneligibleModal}
            />
          </div>

         {/* Energy Consumption Modal */}
          {showEnergyModal && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div
                className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl flex flex-col"
                style={{
                  maxHeight: 'calc(100vh - 2rem)', // Leaves small margin on all devices
                  minHeight: '300px',
                }}
              >
                {/* Modal Header */}
                <div className="py-3 lg:py-5 px-4 lg:px-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-brand-orange to-brand-teal rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="tesla-heading text-2xl text-gray-900">Energy Consumption</h3>
                    </div>
                    <button
                      onClick={() => handleEnergyModal(false)}
                      className="w-8 h-8 bg-[#f46b30] hover:bg-black rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div
                  className="py-3 lg:py-5 px-4 lg:px-6 overflow-y-auto flex-grow min-h-0"
                  style={{
                    scrollbarGutter: 'stable',
                  }}
                >
                  {/* Toggle Buttons */}
                  <div className="flex bg-[#e8e9ea] rounded-lg p-1 mb-6">
                    <button
                      onClick={() => setEnergyInputMode("annual")}
                      className={`tesla-button flex-1 py-3 px-4 ${
                        energyInputMode === "annual"
                          ? "bg-white text-brand-teal shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Annual Total
                    </button>
                    <button
                      onClick={() => setEnergyInputMode("monthly")}
                      className={`tesla-button flex-1 py-3 px-4 ${
                        energyInputMode === "monthly"
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
                            className="w-full px-4 py-3 border border-[#7a8185] h-[60px] bg-[#e8e9ea] text-black text-lg"
                            placeholder="12000"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            kWh/year
                          </span>
                        </div>
                      </div>
                      <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10">
                        <p className="tesla-body text-gray-700 text-sm">
                          <strong>Tip:</strong> You can find your annual usage on your utility bill or by adding up 12 months of usage from your online account.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Monthly Input */}
                  {energyInputMode === "monthly" && (
                    <div className="space-y-4">
                      <p className="tesla-body text-gray-600 text-sm mb-4">
                        Enter your monthly energy usage for each month (in kWh).
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {monthNames.map((month, index) => (
                          <div key={month}>
                            <label className="block tesla-caption text-xs text-gray-700 mb-1">{month}</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={monthlyUsages[index]}
                                onChange={(e) => handleMonthlyUsageChange(index, e.target.value)}
                                className="w-full px-4 py-3 border border-[#7a8185] h-[60px] bg-[#e8e9ea] text-black"
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
                          <strong>Total Annual Usage:</strong> {monthlyUsages.reduce((sum, usage) => sum + (parseInt(usage) || 0), 0).toLocaleString()} kWh
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Action Buttons */}
                <div className="py-3 lg:py-5 px-4 lg:px-6 border-t border-gray-200 flex flex-col lg:flex-row gap-4 flex-shrink-0">
                  <button
                    onClick={handleEnergySubmit}
                    disabled={
                      (energyInputMode === "annual" && !annualUsage) ||
                      (energyInputMode === "monthly" && monthlyUsages.every((usage) => !usage))
                    }
                    className="orangegradbtn rounded-xl border border-[#F47121] py-4 px-5 text-lg font-normal text-white w-full lg:w-1/2"
                  >
                    Use This Data
                  </button>
                  { <button
                    onClick={() => handleEnergyModal(false)}
                    className="w-full lg:w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button> }
                </div>
              </div>
            </div>
          )}


          {/* Ineligible Modal */}
          {showIneligibleModal && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
                <button
                  onClick={closeIneligibleModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-[#f46b30] hover:bg-black rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-white hover:text-white" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 tesla-gradient-bg rounded-lg flex items-center justify-center mx-auto mb-6">
                    <HomeIcon className="w-8 h-8 text-brand-orange" />
                  </div>

                  <h3 className="tesla-heading text-2xl text-gray-900 mb-4">We're Sorry</h3>

                  {ownsHome === "renter" ? (
                    <>
                      <p className="tesla-body text-gray-600 text-lg mb-6">
                        Solar installation is only available for homeowners. As a renter, you would need permission from your landlord and they would receive the benefits.
                      </p>
                      <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10 mb-6">
                        <p className="tesla-body text-gray-700 text-sm">
                          <strong>Homeowners only:</strong> Solar systems require property ownership to install and benefit from incentives.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="tesla-body text-gray-600 text-lg mb-6">
                        Your property type is not eligible for solar installation at this time.
                      </p>
                      <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10 mb-6">
                        <p className="tesla-body text-gray-700 text-sm">
                          <strong>Eligible property types:</strong> Single-family homes with suitable roof conditions.
                        </p>
                      </div>
                    </>
                  )}

                  <button
                    onClick={closeIneligibleModal}
                    className="btn-sheen orangegradbtn text-white px-8 py-3 rounded-md text-lg w-full transition-all duration-300"
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

export default SignUp;
