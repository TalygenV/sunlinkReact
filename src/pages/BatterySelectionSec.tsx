import React, { useState } from 'react';
import checkIcon from '../assets/images/check.svg';
import infoCircleIcon from '../assets/images/info-circle_svgrepo.com.svg';
import vectorIcon from '../assets/images/Vector.svg';
import colorIcon from '../assets/images/color.svg';
import clockIcon from '../assets/images/clock-three.svg';

const BatterySelectionSec = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(2);

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
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm">Compare all</button>
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

                                <p className="text-sm text-gray-400 flex items-center">
                                    * Prices are subject to eligibility requirements.
                                </p>
                            </div>
                        </div>
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
        </section>
    );
};

export default BatterySelectionSec;
