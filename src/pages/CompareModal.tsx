import React from "react";
import tickcircle from '../assets/images/tick-circle_svgrepo1.com.svg';
import check from '../assets/images/check.svg';
import crossIcon from '../assets/images/cross_svgrepo.svg';

interface CompareModalProps {

    onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ onClose }) => {

    const handleSelectBattery = (battery: string) => {
        alert(`You selected: ${battery}`);
        // Here you can handle battery selection logic, e.g. update state, navigate, etc.
    };
    return (
        <div className="p-6 bg-white rounded-lg shadow-lg relative overflow-hidden">
            {/* Close Button */}
            {/* <button
                className="absolute top-2 right-2"
                onClick={() => (window.location.href = "dashboard-flow3-2.html")}
            >
                <img src="assets/images/cross_svgrepo.com.svg" alt="Close" />
            </button> */}
            <button className="absolute top-4 right-4" onClick={onClose}>
                <img src={crossIcon} alt="Close" />
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
    );
};

export default CompareModal;
