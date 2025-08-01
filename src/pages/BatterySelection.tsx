import React, { useState, useRef, useEffect } from "react";
import checkIcon from '../assets/images/check.svg';
import infoCircleIcon from '../assets/images/info-circle_svgrepo.com.svg';
import { ChevronLeft, ChevronRight } from "lucide-react";
import CompareModal from './CompareModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BatteryDetails from '../components/battery/BatteryDetails';
import { useNavigate } from 'react-router-dom';
import BatteryModeltsx from '../SystemDesign/BatteryModeltsx';
import vectorIcon from '../assets/images/Vector.svg';
import ModelPreviewModal from "../SystemDesign/ModelPreviewModal";
import defaultModel from "../products/batteries/model/enphase_battery-opt-opt-opt-compressed.glb?url";
import model2 from "../products/batteries/model/solar_edge_battery.glb?url";
import model4 from "../products/batteries/model/tesla_battery-opt-opt-opt-compressed.glb?url";

const BatterySelection = () => {
    const [selectedBatteryIndex, setSelectedBatteryIndex] = useState<number>(0);
    const navigate = useNavigate();
    const batteryModelRef = useRef<any>(null);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const batteries = useSelector((state: RootState) => state.batteries.list);
    const [selectedId, setSelectedId] = useState<string>(batteries?.[0]?.id || "");

    useEffect(() => {
        if (batteries[selectedBatteryIndex]) {
            setSelectedId(batteries[selectedBatteryIndex].id);
        }
    }, [selectedBatteryIndex, batteries]);

    const selectedBattery = batteries.find(b => b.id === selectedId);
    if (!selectedBattery) return <div className="text-white">Loading battery...</div>;

    const gotoNextScreen = () => {
        navigate("/choose-plan");
    };

    const nextGoPage = () => {
        localStorage.setItem("battery", JSON.stringify({ selectedBattery, quantity }));
        navigate("/installation");
    };

    const handleRotateRequest = (direction: "left" | "right" | "up" | "down") => {
        if (batteryModelRef.current) { batteryModelRef.current.rotateModel(direction); }
    };

    const navigateToPrevious = () => {
        setSelectedBatteryIndex(
            selectedBatteryIndex > 0 ? selectedBatteryIndex - 1 : batteries.length - 1
        );
    };

    const navigateToNext = () => {
        setSelectedBatteryIndex(
            selectedBatteryIndex < batteries.length - 1 ? selectedBatteryIndex + 1 : 0
        );
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

                {/* Heading */}
                <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-color font-normal tracking-tight text-pretty">
                    Choose your batteries
                </h1>

                {/* Step Indicator */}
                <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white flex items-center justify-center">
                            <img src={checkIcon} alt="Check" />
                        </div>
                        <span className="text-white">Design</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-orange-500 min-w-[40px]" />

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-orange-500 border border-white flex items-center justify-center">
                            <img src={checkIcon} alt="Check" />
                        </div>
                        <span>Batteries</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-white">
                        <div className="w-1/2 h-0.5 bg-orange-500" />
                    </div>

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white flex items-center justify-center">3</div>
                        <span>Choose Your Plan</span>
                    </div>

                    <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]" />

                    <div className="flex items-center gap-2 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#542a17] text-white flex items-center justify-center">4</div>
                        <span>Customer Portal</span>
                    </div>
                </div>

                {/* Compare Modal */}
                {showCompareModal && (
                    <CompareModal onClose={() => setShowCompareModal(false)} />
                )}

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-2 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {/* Left Panel */}
                    <div className="lg:pt-4 lg:pr-2">
                        <div className="w-full mx-auto">
                            {/* Model Viewer */}
                            <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg font-semibold">
                                <button
                                    onClick={navigateToPrevious}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors z-10 shadow-sm"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </button>
                                <BatteryModeltsx
                                    ref={batteryModelRef}
                                    position="front"
                                    isInteractive={true}
                                    scale={1.0}
                                    rotationY={0}
                                    onRotateRequest={handleRotateRequest}
                                    isMobile={true}
                                    containerHeight={300}
                                    key={selectedBattery.id}
                                    batteryId={selectedBattery.id}
                                />

                                <button
                                    onClick={() => setShowPreviewModal(true)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white text-black rounded shadow"
                                    title="Expand 3D Model"
                                >
                                    <img src={vectorIcon} className="h-5 w-5" alt="Expand" />
                                </button>

                                <button
                                    onClick={navigateToNext}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors z-10 shadow-sm"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </button>

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <span className="text-sm text-gray-300">
                                        {selectedBatteryIndex + 1} of {batteries.length}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between gap-4">
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square"><img src={defaultModel} alt="Battery Preview" className="w-full h-full object-contain" /></div>
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square"><img src={model2} alt="Battery Preview" className="w-full h-full object-contain" ></img></div>
                                <div className="flex-1 bg-gray-400 rounded-md aspect-square"><img src={model4} alt="Battery Preview" className="w-full h-full object-contain" ></img> </div>
                                {/* <img className="mx-auto" src={sunlinkicon} alt="Sunlink" /> */}
                                {/* {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex-1 rounded-md aspect-square bg-black relative overflow-hidden">
                                        <BatteryModeltsx
                                            batteryId={selectedBattery.id}
                                            position="front"
                                            isInteractive={false}
                                            scale={1.2}
                                            rotationY={i * 45} // Rotate each slightly differently
                                            containerHeight={300} // Optional: use dynamic height if needed
                                            isMobile={false}
                                        />
                                    </div>
                                ))} */}
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

                    {/* Right Panel */}
                    <BatteryDetails
                        battery={selectedBattery}
                        onQuantityChange={setQuantity}
                        onPrequalify={gotoNextScreen}
                        onCompareAll={() => setShowCompareModal(true)}
                    />
                </div>
            </div>

            {/* Model Preview Modal */}
            <ModelPreviewModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                batteryId={selectedBattery.id}
            />

            {/* Skip Option */}
            <p className="mt-12 text-center text-gray-400 text-sm">
                Don't need a battery?{" "}
                <span
                    onClick={nextGoPage}
                    className="underline text-white cursor-pointer"
                    role="button"
                    tabIndex={0}
                >
                    Skip
                </span>
            </p>
        </section>
    );
};

export default BatterySelection;
