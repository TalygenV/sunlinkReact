import React, { useState } from 'react';
import checkIcon from '../assets/images/check.svg';
import infoCircleIcon from '../assets/images/info-circle_svgrepo.com.svg';
import vectorIcon from '../assets/images/Vector.svg';
import colorIcon from '../assets/images/color.svg';
import clockIcon from '../assets/images/clock-three.svg';
import tickIcon from '../assets/images/tick-circle_svgrepo.com.svg';
import specsIcon from '../assets/images/list-1_svgrepo.com.svg';
import backupIcon from '../assets/images/shield_svgrepo.com.svg';
import savingsIcon from '../assets/images/graph_svgrepo.com.svg';
import essentialsIcon from '../assets/images/Frame-16188731261.svg';
import appliancesIcon from '../assets/images/Frame-1618873126.svg';
import writeIcon from '../assets/images/write_svgrepo.com.svg';

import CompareModal from './CompareModal';

const BatterySelection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(2);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <section className="overflow-hidden py-24 sm:py-20 bg-black-custom relative">
            <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
                <div className="text-sm text-gray-400 mb-2">
                    <span className="uppercase tracking-wide text-xs">Recommendation</span>
                    <span className="px-3">&gt;</span>
                    <span className="text-white uppercase">Customize</span>
                </div>

                <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-color font-normal tracking-tight text-pretty">
                    Choose your batteries
                </h1>

                <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-black text-xs font-bold flex items-center justify-center">
                            <img src={checkIcon} alt="Check" />
                        </div>
                        <span className="text-white">Design</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-orange-500 min-w-[40px]" />

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-black text-xs font-bold flex items-center justify-center">
                            <img src={checkIcon} alt="Check" />
                        </div>
                        <span>Batteries</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-white">
                        <div className="w-1/2 h-0.5 bg-orange-500" />
                    </div>

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">3</div>
                        <span>Choose Your Plan</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]" />

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">4</div>
                        <span>Customer Portal</span>
                    </div>
                </div>
                {showCompareModal && (
                    <CompareModal onClose={() => setShowCompareModal(false)} />
                )}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-2">
                        <div className="w-full mx-auto">
                            <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg font-semibold">
                                Dummy 3D Model
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1"
                                    title="Expand"
                                >
                                    <img src={vectorIcon} className="h-5 w-5" alt="Expand" />
                                </button>
                            </div>

                            <div className="mt-4 flex justify-between gap-4">
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                            </div>

                            <div className="disclaimer-bg mt-5 text-white p-4 rounded-lg max-w-3xl mx-auto text-sm">
                                <div className="flex items-start mb-4">
                                    <img className="mr-2 mt-1" src={infoCircleIcon} alt="Info" />
                                    <p>
                                        <span className="font-normal text-gray-400">Battery Backup Disclaimer:</span> Projected backup hours are estimates only and not guaranteed. Actual performance will depend on:
                                    </p>
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                    <li>How much energy your solar system produces</li>
                                    <li>What appliances and circuits you choose to back up</li>
                                    <li>How often and how heavily you use the battery</li>
                                    <li>Your usage, weather conditions, and backup settings can significantly impact results.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="lg:pt-4 lg:pl-2">
                        <div className="custom-formcls p-8 rounded-xl max-w-[700px] ml-auto space-y-6 border border-neutral-600">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-2xl text-white text-sm">
                                    <span className="w-3 h-3 rounded-full bg-orange-600"></span> Most Recommended
                                </span>
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm" onClick={() => setShowCompareModal(true)}>Compare all</button>
                                {/* Modal Component */}

                            </div>

                            <h3 className="text-gray-300 text-3xl mb-3">Tesla Powerwall 3</h3>
                            <p className="text-gray-300 text-xl">
                                Perfect for homeowners seeking reliability and smart features. Integrates seamlessly with all solar systems and advanced smartphone app with 24/7 monitoring features.
                            </p>

                            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">
                                <div className="w-full sm:w-[calc(50%-0.75rem)]">
                                    <label className="w-full text-gray-300 text-xl">Available Color</label>
                                    <div className="flex items-center mb-4 mt-2">
                                        <img className="mr-2 mt-1" src={colorIcon} alt="Color" />
                                    </div>
                                </div>

                                <div className="w-full sm:w-[calc(50%-0.75rem)]">
                                    <label className="w-full text-gray-300 text-xl">Quantity</label>
                                    <div className="relative flex items-center text-white mt-2">
                                        <button type="button" onClick={handleDecrement} className="shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center">
                                            -
                                        </button>
                                        <input type="text" className="shrink-0 text-white border-0 bg-transparent text-sm font-normal max-w-[2.5rem] text-center" value={quantity} readOnly />
                                        <button type="button" onClick={handleIncrement} className="shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full space-y-2 mb-6 mt-6 plain-black-bg p-5 py-7 rounded-2xl ">
                                    <div className="text-gray-300 text-xl flex justify-between flex-wrap">
                                        <span><img className="mr-2 mt-1 float-left" src={clockIcon} alt="Info" /><span>Projected Backup Hours (h): </span></span>
                                        <span className="text-gray-100 text-2xl">21.6</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-2 mb-6 mt-6 plain-black-bg p-5 py-7 rounded-2xl">
                                    <div className="text-gray-300 text-xl flex justify-between flex-wrap">
                                        <span>
                                            <img className="mr-2 mt-1 float-left" src={clockIcon} alt="Info" /> Projected Backup Hours (h):
                                        </span>
                                        <span className="text-gray-100 text-2xl">21.6</span>
                                    </div>
                                </div>

                                <div className="w-full text-center">
                                    <a href="#" className="orangegradbtn rounded-xl border border-[#F47121] py-4 px-5 mb-2 text-lg font-normal text-white w-full flex justify-center">
                                        Select Tesla Powerwall 3
                                    </a>
                                </div>

                                <p className="text-sm text-gray-400 flex items-center">* Prices is subjected to eligibility requirements.</p>
                                <div className="custom-gradient flex items-start gap-3 bg-gray-800 bg-opacity-50 rounded-lg p-4 text-gray-300 text-sm max-w-xl">
                                    <img src={infoCircleIcon} className="text-gray-400 flex-shrink-0" />
                                    <p className="text-sm leading-[20px] ">
                                        <span className="font-normal text-gray-400">Tax Credit Disclaimer:</span> The 30% federal tax credit is subject to eligibility requirements and may vary based on your tax situation. Consult with a tax professional to
                                        determine your specific benefits. Local and utility incentives vary by location and may have additional requirements or limitations.
                                    </p>
                                </div>
                                <div className="bg-neutral-600 w-full h-px my-3"></div>
                                <div className="space-y-4 w-full">
                                    {/* Specifications Section */}
                                    <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => toggleSection('specs')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span><img src={specsIcon} alt="specifications" /></span>
                                                <h2 className="text-xl font-normal">Specifications</h2>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'specs' ? 'rotate-180' : ''}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        {openSection === 'specs' && (
                                            <div className="mt-4 overflow-hidden">
                                                <p className="text-lg text-gray-400">Key features include:</p>
                                                <ul className="mt-4 space-y-3">
                                                    <li className="flex items-center space-x-3">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span>Integrated inverter</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span>App-based monitoring</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span>Storm Watch feature</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/*  Backup Section  */}
                                    <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('backup')}>
                                            <div className="flex items-center space-x-2">
                                                <span><img src={backupIcon} alt="backup" /></span>
                                                <h2 className="text-xl font-normal">Backup</h2>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'backup' ? 'rotate-180' : ''}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        {openSection === 'backup' && (
                                            <div className="mt-4 overflow-hidden">
                                                <p className="text-sm text-gray-300">Operating Mode</p>
                                                <div className="bg-[#252727] px-5 py-4 rounded-lg mt-6 w-full">
                                                    <label className="flex items-center space-x-2 text-white">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span className="text-white pl-2">Backup Only</span>
                                                    </label>
                                                    <p className="text-gray-400 text-sm mt-3">Emergency power only</p>
                                                </div>
                                                <div className="bg-[#252727] px-5 py-4 rounded-lg mt-4 w-full">
                                                    <label className="flex items-center space-x-2 text-white">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span className="text-white pl-2">Self-Consumption</span>
                                                    </label>
                                                    <p className="text-gray-400 text-sm mt-3">Use solar first, then battery</p>
                                                </div>
                                                <div className="bg-[#252727] px-5 py-4 rounded-lg mt-4 w-full">
                                                    <label className="flex items-center space-x-2 text-white">
                                                        <img src={tickIcon} alt="check-icon" />
                                                        <span className="text-white pl-2">Time-of-Use</span>
                                                    </label>
                                                    <p className="text-gray-400 text-sm mt-3">Avoid peak hour rates</p>
                                                </div>
                                                <p className="text-sm text-gray-300 py-5">Backup Duration Scenarios</p>
                                                <div className="bg-[#252727] px-5 py-5 rounded-lg">
                                                    <div className="flex items-start space-x-3">
                                                        <img src={essentialsIcon} alt="Essentials" />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-white">Essentials</h3>
                                                            <p className="text-gray-400 text-sm">Critical systems only</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#fe3c26]">
                                                            <li>Refrigerator</li>
                                                            <li>Phone charging</li>
                                                        </ul>
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#fe3c26]">
                                                            <li>Lights (LED)</li>
                                                            <li>Internet/Wifi</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="bg-[#252727] px-5 py-5 mt-4 rounded-lg">
                                                    <div className="flex items-start space-x-3">
                                                        <img src={appliancesIcon} alt="Appliances" />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-white">Appliances</h3>
                                                            <p className="text-gray-400 text-sm">Most home appliances</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#1f5c64]">
                                                            <li>All essentials</li>
                                                            <li>Dishwasher</li>
                                                        </ul>
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#1f5c64]">
                                                            <li>Washer/Dryer</li>
                                                            <li>Microwave</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="bg-[#252727] px-5 py-5 mt-4 rounded-lg">
                                                    <div className="flex items-start space-x-3">
                                                        <img src={appliancesIcon} alt="Whole Home" />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-white">Whole Home</h3>
                                                            <p className="text-gray-400 text-sm">Compare home backup</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#bb0021]">
                                                            <li>All appliances</li>
                                                            <li>Electric vehicle charging</li>
                                                        </ul>
                                                        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#bb0021]">
                                                            <li>HVAC system</li>
                                                            <li>Pool/Spa equipment</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Savings Section */}
                                    <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => toggleSection('savings')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span><img src={savingsIcon} alt="savings" /></span>
                                                <h2 className="text-xl font-normal">Savings</h2>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'savings' ? 'rotate-180' : ''}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        {openSection === 'savings' && (
                                            <div className="mt-4 overflow-hidden">
                                                <p className="text-lg text-gray-300">Energy Arbitrage:</p>
                                                <p className="text-base text-white py-4">Average monthly utility bill</p>

                                                <div className="flex gap-4 w-10/12 text-white customradio sys_overview mt-3 s-utility rounded-xl border border-neutral-600">
                                                    <div className="w-2/4">
                                                        <label className="flex items-center gap-3 cursor-pointer">
                                                            <input type="radio" name="ownership" value="own" className="accent-blue-600 w-5 h-5" defaultChecked />
                                                            <span className="text-sm py-3 px-3 rounded-md text-center">Utility Bill Savings</span>
                                                        </label>
                                                    </div>
                                                    <div className="w-2/4">
                                                        <label className="flex items-center gap-3 cursor-pointer">
                                                            <input type="radio" name="ownership" value="rent" className="accent-blue-600 w-5 h-5" />
                                                            <span className="text-sm py-3 px-3 rounded-md text-center"><a href="#">After Tax Credit</a></span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 w-12/12 gap-4 mt-6 mb-6 wp">
                                                    <div className="bg-[#161d20] custom-bod text-white rounded-xl p-4 border border-neutral-600">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-[#ffffff99]">Capacity (kWh)</span>
                                                            <a href="dashboard-flow2-2.html"><img src={writeIcon} alt="edit" /></a>
                                                        </div>
                                                        <div className="text-4xl font-semibold pt-[25px]">27.0</div>
                                                    </div>
                                                    <div className="bg-[#1f433a] custom-bod text-white rounded-xl p-4 border border-neutral-600">
                                                        <div className="text-xs text-[#ffffff99]">Net Cost ($)</div>
                                                        <div className="text-4xl font-semibold pt-[25px]">30,000</div>
                                                    </div>
                                                </div>

                                                <p className="text-base text-white py-4">Monthly Cost Comparison</p>
                                                <div className="plain-black-bg p-10 rounded-2xl border-0 mb-5">
                                                    <div className="grid grid-cols-1 sm:grid-cols-1 text-sm">
                                                        <div className="bg-neutral-400 p-3 text-center text-white">
                                                            <p className="text-white text-xl text-sm py-12">Graph</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-[#1f433a] p-6 rounded-lg flex justify-between items-center">
                                                    <div>
                                                        <h3 className="text-xl pb-2">Annual Savings ($)</h3>
                                                        <p className="text-xs">With 2 batteries + Scales with quantity</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-3xl font-semibold">2,317</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>
                            <div className="bg-neutral-600 w-full h-px my-3"></div>
                            <div className="grid grid-cols-3 w-full gap-4 mb-6 wp">
                                <div className="bg-[#161d20] custom-bod  text-white rounded-xl p-4 border border-neutral-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-[#ffffff99]">Capacity (kWh)</span>
                                        <a href="dashboard-flow2-2.html"></a>
                                    </div>
                                    <div className="text-4xl font-semibold pt-[25px]">27.0</div>
                                </div>
                                <div className="bg-[#1f433a] custom-bod  text-white rounded-xl p-4 border border-neutral-600">
                                    <div className="text-xs text-[#ffffff99]">Net Cost ($)</div>
                                    <div className="text-4xl font-semibold pt-[25px]">21,000</div>
                                </div>
                                <div className="bg-[#161d20] custom-bod  text-white rounded-xl p-4 border border-neutral-600">
                                    <div className="text-xs text-[#ffffff99]">Payment ($)</div>
                                    <div className="text-4xl font-semibold pt-[25px]">167/mo</div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 flex items-center">
                                *Tax credits applied.
                                <a href="#" className="underline decoration-solid text-white ml-1">See full price</a>
                            </p>
                        </div>
                    </div>

                    {modalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
                            <div className="relative bg-gray-400 rounded-lg w-full max-w-4xl aspect-square flex items-center justify-center text-white text-3xl font-semibold">
                                Dummy 3D Model Zoom
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="absolute top-4 right-4 bg-gray-600 hover:bg-gray-700 rounded p-2"
                                    title="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-12 text-center text-gray-400 text-sm">
                Don't need a battery? <a href="dashboard-flow4-1.html" className="underline text-white">Skip</a>
            </p>
        </section>
    );
};

export default BatterySelection;
