import React, { useState, useRef, useEffect } from "react";
import checkIcon from '../assets/images/check.svg';
import infoCircleIcon from '../assets/images/info-circle_svgrepo.com.svg';
import { Zap, ChevronLeft, ChevronRight, Link } from "lucide-react";
import CompareModal from './CompareModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BatteryDetails from '../components/battery/BatteryDetails';
import { useNavigate } from 'react-router-dom';
import BatteryModeltsx from '../SystemDesign/BatteryModeltsx';
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
import ModelPreviewModal from "../SystemDesign/ModelPreviewModal";
//   const navigate = useNavigate();
const BatterySelection = () => {
    const [selectedBatteryIndex, setSelectedBatteryIndex] = useState<number>(0);
    const navigate = useNavigate();
    const batteryModelRef = useRef<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [openSection, setOpenSection] = useState<string | null>(null);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const batteries = useSelector((state: RootState) => state.batteries.list);
    const [selectedId, setSelectedId] = useState<string>(batteries?.[0]?.id || "");
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const selectedBattery = batteries.find(b => b.id === selectedId)!
    const transformedBattery = { ...selectedBattery, description: "Perfect for homeowners seeking reliability...", projectedHours: 75.6, netCost: 30000, payment: "$167/mo", annualSavings: 2317, quantity: quantity || 1 }
    const gotoNextScreen = () => { navigate("/choose-plan"); };

    const handleRotateRequest = (direction: "left" | "right" | "up" | "down") => {
        if (batteryModelRef.current) { batteryModelRef.current.rotateModel(direction); }
    };
    const toggleSection = (section: string) => { setOpenSection(prev => (prev === section ? null : section)); };

    const handleIncrement = () => { setQuantity((prev) => prev + 1); };

    const handleDecrement = () => { if (quantity > 1) setQuantity((prev) => prev - 1); };

    const navigateToPrevious = () => { setSelectedBatteryIndex(selectedBatteryIndex > 0 ? selectedBatteryIndex - 1 : batteries.length - 1); };

    const navigateToNext = () => { setSelectedBatteryIndex(selectedBatteryIndex < batteries.length - 1 ? selectedBatteryIndex + 1 : 0); };
    const nextGoPage = () => {
        localStorage.setItem("battery", JSON.stringify({ selectedBattery, quantity }));
        navigate("/installation");
    };
    useEffect(() => {
        if (batteries[selectedBatteryIndex]) {
            setSelectedId(batteries[selectedBatteryIndex].id);
        }
    }, [selectedBatteryIndex, batteries]);
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
                {showCompareModal && (<CompareModal onClose={() => setShowCompareModal(false)} />)}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-2">
                        <div className="w-full mx-auto">
                            <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg font-semibold">
                                {/* Dummy 3D Model */}
                                <button onClick={() => setModalOpen(true)} className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1" title="Expand">
                                    <img src={vectorIcon} className="h-5 w-5" alt="Expand" /></button>

                                <button onClick={navigateToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors z-10 shadow-sm">
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> </button>

                                <BatteryModeltsx ref={batteryModelRef} position="front" isInteractive={true} scale={1.0}
                                    rotationY={0} onRotateRequest={handleRotateRequest} isMobile={true} containerHeight={300} key={selectedBattery.id}
                                    batteryId={selectedBattery.id} />              <button
                                        onClick={() => setShowPreviewModal(true)}
                                        className="absolute top-4 right-4 z-10 p-2 bg-white text-black rounded shadow">
                                    {/* <Expand className="w-5 h-5" /> */}
                                </button>


                                <button onClick={navigateToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors z-10 shadow-sm">
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></button>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <span className="text-sm text-gray-300">
                                        {selectedBatteryIndex + 1} of {batteries.length}
                                    </span>
                                </div>
                            </div>

                            {/* <div className="mt-4 flex justify-between gap-4">
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square" />
                            </div> */}

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
                    <BatteryDetails
                        battery={selectedBattery}
                        onQuantityChange={setQuantity}
                        onPrequalify={() => gotoNextScreen()}
                        onCompareAll={() => setShowCompareModal(true)} // ✅ Add this
                    />

                    {modalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
                            <div className="relative bg-gray-400 rounded-lg w-full max-w-4xl aspect-square flex items-center justify-center text-white text-3xl font-semibold">
                                Dummy 3D Model Zoom
                                {/* <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 bg-gray-600 hover:bg-gray-700 rounded p-2" title="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button> */}
                                <ModelPreviewModal
                                    isOpen={showPreviewModal}
                                    onClose={() => setShowPreviewModal(false)}
                                    batteryId={selectedBattery.id}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-12 text-center text-gray-400 text-sm" onClick={() => nextGoPage()}>
                Don't need a battery? <a href="dashboard-flow4-1.html" className="underline text-white">Skip</a>
            </p>
        </section>
    );
};

export default BatterySelection;
