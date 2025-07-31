import React, { useState, useRef, useEffect } from "react";
import BatteryModeltsx from "./BatteryModeltsx";
import { X } from "lucide-react";

interface ModelPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    batteryId: string;
}

const ModelPreviewModal: React.FC<ModelPreviewModalProps> = ({
    isOpen,
    onClose,
    batteryId,
}) => {
    const [scale, setScale] = useState(1.5);
    const modelRef = useRef<any>(null);

    useEffect(() => {
        if (modelRef.current?.updateModelProperties) {
            modelRef.current.updateModelProperties("front", scale, 0);
        }
    }, [scale]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center border border-gray-800">
            <div className="relative w-full max-w-6xl h-[90vh] bg-black rounded-lg shadow-lg overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
                >
                    <X size={20} />
                </button>

                {/* Battery 3D Model Viewer */}
                <BatteryModeltsx
                    ref={modelRef}
                    key={batteryId}
                    batteryId={batteryId}
                    position="front"
                    isInteractive={true}

                    scale={scale}
                    rotationY={0}
                    containerHeight={window.innerHeight * 0.8}
                    isMobile={false}
                />

                {/* Scale Slider */}
                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2">
                    <label htmlFor="scaleSlider" className="text-sm whitespace-nowrap">Model Size</label>
                    <input
                        id="scaleSlider"
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-40"
                    />
                    <span className="text-sm">{scale.toFixed(1)}x</span>
                </div> */}
            </div>
        </div>
    );
};

export default ModelPreviewModal;
