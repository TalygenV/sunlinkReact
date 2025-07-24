import React from "react";
import tickcircle from '../assets/images/tick-circle_svgrepo1.com.svg';
import check from '../assets/images/check.svg';

const BatterySelectionCustmize = () => {
    const handleSelectBattery = (battery: string) => {
        alert(`You selected: ${battery}`);
        // Here you can handle battery selection logic, e.g. update state, navigate, etc.
    };

    return (
        <section className="overflow-hidden py-24 sm:py-20 bg-black-custom relative">
            <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-2">
                    <span className="uppercase tracking-wide text-xs">Recommendation</span>
                    <span className="px-3">&gt;</span>
                    <span className="text-white uppercase">Customize</span>
                </div>

                {/* Title */}
                <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-color font-normal tracking-tight text-pretty">
                    Choose your batteries
                </h1>

                {/* Step Navigation */}
                <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
                    {/* Step 1 */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-black text-xs font-bold flex items-center justify-center">
                            <img src={check} alt="check" />
                        </div>
                        <span className="text-white">Design</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-orange-500 min-w-[40px]" />

                    {/* Step 2 */}
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-black text-xs font-bold flex items-center justify-center">
                            <img src={check} alt="check" />
                        </div>
                        <span>Batteries</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white">
                        <div className="w-1/2 h-0.5 bg-orange-500" />
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">3</div>
                        <span>Choose Your Plan</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]" />

                    {/* Step 4 */}
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">4</div>
                        <span>Customer Portal</span>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg relative overflow-hidden">
                    {/* Close Button */}
                    <button
                        className="absolute top-2 right-2"
                        onClick={() => (window.location.href = "dashboard-flow3-2.html")}
                    >
                        <img src="assets/images/cross_svgrepo.com.svg" alt="Close" />
                    </button>

                    <h2 className="text-2xl text-gray-800 mb-4">Compare Batteries</h2>
                    <p className="text-gray-500 mb-6">Choose the best option for your home</p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full below-1080 table-auto border border-gray-300 rounded-lg">
                            <thead className="rounded-t-lg">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xl font-medium text-black">Specifications</th>
                                    <th className="px-6 py-4 text-left text-xl font-medium text-black">Tesla<br /><span className="text-lg text-gray-600">Powerwall 3</span></th>
                                    <th className="px-6 py-4 text-left text-xl font-medium text-black">Enphase<br /><span className="text-lg text-gray-600">IQ Battery 5P</span></th>
                                    <th className="px-6 py-4 text-left text-xl font-medium text-black">SolarEdge<br /><span className="text-lg text-gray-600">Home Battery</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b bg-[#e4eef0]">
                                    <td className="px-6 py-4 text-xl text-gray-700">Monthly Payment</td>
                                    <td className="px-6 py-4 text-xl text-gray-700">$83/mo<br /><span className="text-base text-gray-500">25 year term at 4.49% APR</span></td>
                                    <td className="px-6 py-4 text-xl text-gray-700">$47/mo<br /><span className="text-base text-gray-500">25 year term at 4.49% APR</span></td>
                                    <td className="px-6 py-4 text-xl text-gray-700">$62/mo<br /><span className="text-base text-gray-500">25 year term at 4.49% APR</span></td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 text-xl text-black">Capacity (kWh)</td>
                                    <td className="px-6 py-4 text-xl text-black">13.5</td>
                                    <td className="px-6 py-4 text-xl text-black">5.0</td>
                                    <td className="px-6 py-4 text-xl text-black">9.7</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 text-xl text-black">Warranty (in years)</td>
                                    <td className="px-6 py-4 text-xl text-black">10</td>
                                    <td className="px-6 py-4 text-xl text-black">15</td>
                                    <td className="px-6 py-4 text-xl text-black">10</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 text-xl text-black">Efficiency (in %)</td>
                                    <td className="px-6 py-4 text-xl text-black">97.5</td>
                                    <td className="px-6 py-4 text-xl text-black">96</td>
                                    <td className="px-6 py-4 text-xl text-black">94.5</td>
                                </tr>
                                <tr className="border-b bg-[#e4eef0]">
                                    <td className="px-6 py-6 text-xl text-black">Total Price ($)</td>
                                    <td className="px-6 py-6 text-xl text-black">15,000</td>
                                    <td className="px-6 py-6 text-xl text-black">8,500</td>
                                    <td className="px-6 py-6 text-xl text-black">11,200</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 text-xl text-black">Key Features</td>
                                    {[
                                        ["Integrated inverter", "App-based monitoring", "Storm Watch feature"],
                                        ["Modular design", "Hot-swappable", "Built-in microinverters"],
                                        ["DC-coupled system", "Compact design", "Fire safety features"]
                                    ].map((features, idx) => (
                                        <td key={idx} className="px-6 py-4 text-sm text-gray-700">
                                            <ul className="list-none pl-5">
                                                {features.map((item, i) => (
                                                    <li key={i} className="flex items-center text-gray-500 leading-relaxed text-lg">
                                                        <img
                                                            src={tickcircle}
                                                            alt="tick"
                                                            className="mr-4 h-5 w-5"
                                                        />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td colSpan={4} className="px-6 py-4 bg-[#e4eef0]">
                                        <div className="text-center py-3">
                                            <div className="flex space-x-6">
                                                <h3 className="text-xl text-left text-gray-800 mb-4 w-full">Select Batteries</h3>
                                                {[
                                                    "Tesla",
                                                    "Enphase",
                                                    "SolarEdge"
                                                ].map((label) => (
                                                    <button
                                                        key={label}
                                                        className="orangegradbtn text-color px-8 py-3 rounded-md text-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-700 transition duration-300 ease-in-out w-full"
                                                        onClick={() => handleSelectBattery(label)}
                                                    >
                                                        Select {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BatterySelectionCustmize;
