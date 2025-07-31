import L from "leaflet";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Now it's safe to import React-Leaflet and other Leaflet-dependent modules
import {
  MapContainer, ImageOverlay, useMap, TileLayer, Polygon, // ✅ this is what you're missing
} from "react-leaflet";
import { ChevronRight } from "lucide-react";
import { ManualPanelControls } from "../manual";

// Local components
import ManualPanelWrapper, {
  ManualPanelWrapperRef,
} from "../manual/ManualPanelWrapper";
import ManualPanelDependencies from "../manual/ManualPanelDependencies";
import { SummaryPanel } from "./SummaryPanel";
import { useLoader } from "../context/LoaderContext";

// Add props for dynamic map data
interface NearmapTestingTwoProps {
  onFinalizeDesign?: () => void;
  imageUrl?: string | null;
  overlayBounds?: {
    north: number;
    east: number;
    south: number;
    west: number;
  } | null;
  mapCenter?: {
    lat: number;
    lng: number;
  } | null;
  // Additional data
  solarData?: any;
  // Auto-generated panels related props
  panels?: any[];
  obstructedPanels?: Set<string>;
  onIncreasePanels?: () => void;
  onDecreasePanels?: () => void;
  onSetPanels?: (newCount: number) => void;
  onPanelClick?: (panel: any) => void;

  isAutoPanelsSupported?: boolean;
  roofData?: any;
  // Alignment related props
  alignmentSaved?: boolean;
  setAlignmentSaved?: (saved: boolean) => void;
  autoPanelOffset?: { lat: number; lng: number };
  setAutoPanelOffset?: (offset: { lat: number; lng: number }) => void;
  // Manual panels related props
  manualPanelsOn?: boolean;
  setManualPanelsOn?: (on: boolean) => void;
  manualPanelRegions?: any[];
  setManualPanelRegions?: (regions: any[]) => void;
  selectedRegionId?: number | null;
  setSelectedRegionId?: (id: number | null) => void;
  totalManualPanels?: number;
  setTotalManualPanels?: (count: number) => void;
  manualPanelEnergy?: number;
  setManualPanelEnergy?: (energy: number) => void;
  currentRotation?: number;
  setCurrentRotation?: (rotation: number) => void;
  // Manual panel obstruction props
  manualPanelObstructedIds?: Set<string>;
  setManualPanelObstructedIds?: (ids: Set<string>) => void;
  // Battery-related props
  batteryCount?: number;
  setBatteryCount?: (count: number) => void;
  isBatterySkipped?: boolean;
  selectedBattery?: any;
  navigateToBatteriesTab?: () => void;
  annualUsage?: number;
}

const NearmapTestingTwo: React.FC<NearmapTestingTwoProps> = ({
  imageUrl: propImageUrl, overlayBounds: propOverlayBounds, mapCenter: propMapCenter, annualUsage: propAnnualUsage,
  // Manual panels props
  manualPanelsOn, setManualPanelsOn, manualPanelRegions: propManualPanelRegions, setManualPanelRegions: propSetManualPanelRegions, selectedRegionId: propSelectedRegionId,
  setSelectedRegionId: propSetSelectedRegionId, totalManualPanels: propTotalManualPanels, setTotalManualPanels: propSetTotalManualPanels, manualPanelEnergy: propManualPanelEnergy,
  setManualPanelEnergy: propSetManualPanelEnergy, currentRotation: propCurrentRotation, setCurrentRotation: propSetCurrentRotation, manualPanelObstructedIds: propManualPanelObstructedIds,
  setManualPanelObstructedIds: propSetManualPanelObstructedIds, panels, }) => {
  const leafletMapRef = useRef<any>(null);
  const { showLoader, hideLoader } = useLoader();
 
  // State for image and map configuration
  const [imageUrl, setImageUrl] = useState(propImageUrl || null);
  const [imageLoading, setImageLoading] = useState(false);
const mapContainerRef = useRef<HTMLDivElement>(null);
  const [annualUsage, setAnnualUsage] = useState(propAnnualUsage || 12000);

  // Default values for overlayBounds and mapState
  const defaultOverlayBounds = {
    north: 26.02399199,
    east: -80.40506498,
    south: 26.02348201,
    west: -80.40530902,
  };

  const defaultMapState = {
    center: {
      lat: 26.023736995,
      lng: -80.4052021,
    },
    zoom: 21,
  };

  // Use props or default values
  const [overlayBounds, setOverlayBounds] = useState(
    propOverlayBounds || defaultOverlayBounds
  );
  const [mapState, setMapState] = useState({
    center: propMapCenter || defaultMapState.center,
    zoom: 21,
  });

  // Error handling state
  const [loading, setLoading] = useState(true);

  const [totalManualPanels, setTotalManualPanels] = useState(
    propTotalManualPanels || 0
  );
  const [manualPanelEnergy, setManualPanelEnergy] = useState(
    propManualPanelEnergy || 0
  );
  const [manualPanelRegions, setManualPanelRegions] = useState<any[]>(
    propManualPanelRegions || []
  );
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(
    propSelectedRegionId || null
  );
  const [currentRotation, setCurrentRotation] = useState<number>(
    propCurrentRotation || 0
  );
  const manualPanelWrapperRef = useRef<ManualPanelWrapperRef>(null);
  const initialIsMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [viewerKey, setViewerKey] = useState(0); // Add a key to force re-render
  // Add state for manual panel obstructions
  const [localManualPanelObstructedIds, setLocalManualPanelObstructedIds] =
    useState<Set<string>>(propManualPanelObstructedIds || new Set<string>());
  useLayoutEffect(() => {
    const checkIfMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        // Force re-render of viewer component when switching modes
        setViewerKey((prevKey) => prevKey + 1);
        // Reset expanded card when switching to/from mobile
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  // Trigger a global resize event when isMobile changes to force WebGL resize
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);

    return () => clearTimeout(timer);
  }, [isMobile, viewerKey]);
  // UI state
  const [obstructionMode, setObstructionMode] = useState(false);
  // State to handle the expand/collapse of the floating Manual Panel Controls card
  const [isManualPanelSectionExpanded, setIsManualPanelSectionExpanded] =
    useState<boolean>(false);

 
  useEffect(() => {
  setImageUrl(propImageUrl || null);
  console.log("propImageUrl",propImageUrl)
}, [propImageUrl]);

useEffect(() => {
  if (propOverlayBounds) {
    setOverlayBounds(propOverlayBounds);
  }
}, [propOverlayBounds]);

useEffect(() => {
  if (propMapCenter) {
    setMapState((prev) => ({
      ...prev,
      center: propMapCenter,
    }));
  }
}, [propMapCenter]);

  // Set loading state to false when image URL is available
  useEffect(() => {
     showLoader("Map is loading...");
    if (imageUrl) {
      hideLoader()
      setLoading(false);
    } else if (imageUrl === null && propImageUrl === null) {
      // If both the prop and state are explicitly null, set a timeout to show loading is complete
      const timer = setTimeout(() => {
        hideLoader()
        setLoading(false);
      }, 3000); // Give a short delay to ensure transitions are smooth

      return () => clearTimeout(timer);
    }
  }, [imageUrl, propImageUrl]);

  // Add an effect to invalidate the map when imageUrl changes
  useEffect(() => {
    // Get the map instance
    const map = leafletMapRef.current;
    if (map) {
      // Short delay to let React state update and re-render
      setTimeout(() => {
        // Force the map to recalculate its dimensions
        map.invalidateSize({ animate: true });

        // Ensure the bounds are set correctly
        if (propOverlayBounds) {
          try {
            map.fitBounds(getLeafletBounds());
          } catch (e) {
            // Handle error silently
          }
        }

        // Optional: store reference for later removal
      }, 200);
    }
  }, [propImageUrl, propOverlayBounds, L]);

  // Update the manualPanelsOn state when the prop changes

  // Update the parent component when manualPanelsOn changes

  // Handle manual panel count changes
  const handleManualPanelCountChange = (count: number) => {
    if (propSetTotalManualPanels) {
      propSetTotalManualPanels(count);
    } else {
      setTotalManualPanels(count);
    }
  };

  // Handle manual panel production changes
  const handleManualPanelProductionChange = (production: number) => {
    if (propSetManualPanelEnergy) {
      propSetManualPanelEnergy(production);
    } else {
      setManualPanelEnergy(production);
    }
  };

  // Handle manual panel reset
  const handleResetManualPanels = () => {
    if (manualPanelWrapperRef.current) {
      manualPanelWrapperRef.current.resetAllPanels();
    }
  };

  // Handle delete region
  const handleDeleteRegion = () => {
    if (manualPanelWrapperRef.current) {
      manualPanelWrapperRef.current.deleteSelectedRegion();
    }
  };

  // Handle enable draw mode
  const handleEnableDrawMode = () => {
    if (manualPanelWrapperRef.current) {
      manualPanelWrapperRef.current.enableDrawMode();
    }
  };

  // Handle rotation change
  const handleRotationChange = (rotation: number) => {
    // Skip processing if rotation hasn't actually changed
    if (currentRotation === rotation) return;

    // Prevent cascading updates during rotation
    const prevRotation = currentRotation;

    // Update state first
    if (propSetCurrentRotation) {
      propSetCurrentRotation(rotation);
    } else {
      setCurrentRotation(rotation);
    }

    // Apply changes to ManualPanelWrapper but only if it's a significant change
    // This reduces the number of expensive operations
    if (
      Math.abs(prevRotation - rotation) >= 1 &&
      manualPanelWrapperRef.current
    ) {
      // Throttle calls to handleRotationChange to avoid overloading the system
      manualPanelWrapperRef.current.handleRotationChange(rotation);
    }
  };

  // Update local state from props for manual panels
  useEffect(() => {
    if (propManualPanelRegions !== undefined) {
      setManualPanelRegions(propManualPanelRegions);
    }
  }, [propManualPanelRegions]);

  useEffect(() => {
    if (propSelectedRegionId !== undefined) {
      setSelectedRegionId(propSelectedRegionId);
    }
  }, [propSelectedRegionId]);

  useEffect(() => {
    if (propTotalManualPanels !== undefined) {
      setTotalManualPanels(propTotalManualPanels);
    }
  }, [propTotalManualPanels]);

  useEffect(() => {
    if (propManualPanelEnergy !== undefined) {
      setManualPanelEnergy(propManualPanelEnergy);
    }
  }, [propManualPanelEnergy]);

  useEffect(() => {
    if (propCurrentRotation !== undefined) {
      setCurrentRotation(propCurrentRotation);
    }
  }, [propCurrentRotation]);

  // Update local state from props for manual panel obstructions
  useEffect(() => {
    if (propManualPanelObstructedIds !== undefined) {
      setLocalManualPanelObstructedIds(propManualPanelObstructedIds);
    }
  }, [propManualPanelObstructedIds]);

  // Function to handle manual panel obstructions
  const handleManualPanelObstructedPanelsChange = (
    obstructedIds: Set<string>
  ) => {
    setLocalManualPanelObstructedIds(obstructedIds);
    if (propSetManualPanelObstructedIds) {
      propSetManualPanelObstructedIds(obstructedIds);
    }
  };

  // Add CSS for animations
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      .panel-appear {
        animation: panelAppear 0.5s ease-out;
      }
      
      @keyframes panelAppear {
        0% { 
          opacity: 0;
          transform: scale(0.8); 
        }
        70% {
          opacity: 0.9;
          transform: scale(1.05);
        }
        100% { 
          opacity: 1;
          transform: scale(1);
        }
      }
      
      /* Purple flash animation */
      .panel-flash-purple {
        animation: flashPurple 1.2s ease-in-out;
      }
      
      @keyframes flashPurple {
        0%, 100% { fill: inherit; }
        16.67% { fill: #9333ea; }
        33.33% { fill: inherit; }
        50% { fill: #9333ea; }
        66.67% { fill: inherit; }
        83.33% { fill: #9333ea; }
      }
      
      /* Transparent Leaflet container */
      .leaflet-container-transparent {
        background: transparent !important;
      }
      
      .leaflet-container-transparent .leaflet-tile-pane {
        opacity: var(--tile-opacity, 1);
      }
      
      /* Remove Leaflet borders */
      .leaflet-container {
        border: none !important;
      }
      
      /* Remove any other potential borders */
      .leaflet-control-container .leaflet-control {
        border: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // No need to create a separate imperative tile layer
  // We'll use the React-Leaflet TileLayer component instead

  // Convert bounds to Leaflet bounds format
  const getLeafletBounds = () => {
    // Create a LatLngBounds instance directly from corner coordinates

    return [
      [overlayBounds.south, overlayBounds.west], // Southwest corner
      [overlayBounds.north, overlayBounds.east], // Northeast corner
    ] as any; // Use 'any' to avoid type issues
  };

  // Add helper to toggle manual panel controls section (place near other handlers)
  const handleManualPanelSectionToggle = () => {
    setIsManualPanelSectionExpanded((prev) => !prev);
    if (setManualPanelsOn) {
      setManualPanelsOn(true);
    }
  };

  if (loading || imageLoading) {
    return (
      <div className="pt-[20%] flex flex-col items-center justify-center text-white p-4 ">
        
      </div>
    );
  }

  return (
    <>
      <div ref={mapContainerRef} className="relative w-full h-[95dvh] rounded-3xl overflow-hidden border border-white/10 shadow-inner shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* MapContainer with ImageOverlay */}
        <MapContainer
          ref={leafletMapRef}
          // @ts-ignore - TileLayer typing issues
          center={[mapState.center.lat, mapState.center.lng]}
          zoom={mapState.zoom}
          scrollWheelZoom
          zoomControl={false}
          maxZoom={24}
          minZoom={10}
          whenCreated={(mapInstance: any) => {
            leafletMapRef.current = mapInstance;
          }}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            background: "transparent",
            borderRadius: "1rem",
          }}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vld2VlZDEyMzQ1IiwiYSI6ImNtYTRtMHl6czA4ZmwybG9sajZ1ZXc4d2gifQ.LlxCetKw2TcQXBOfqt5M-w"
            // @ts-ignore - TileLayer typing issues
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
            tileSize={512}
            zoomOffset={-1}
            maxZoom={24}
          />

          {imageUrl && (
            <ImageOverlay
              key={imageUrl}
              url={imageUrl}
              bounds={getLeafletBounds()}
              // @ts-ignore - TileLayer typing issues
              interactive={false}
              opacity={0.8}
            />
          )}

          {/* Manual Drawing Logic */}
          <ManualPanelWrapper
            ref={manualPanelWrapperRef}
            mapRef={leafletMapRef}
            themeColor="#9333ea"
            totalPanels={totalManualPanels}
            totalProduction={manualPanelEnergy}
            currentRotation={currentRotation}
            regions={manualPanelRegions}
            selectedRegionId={selectedRegionId}
            onPanelCountChange={handleManualPanelCountChange}
            onProductionChange={handleManualPanelProductionChange}
            onRegionInfoChange={() => { }}
            onRegionSelect={() => { }}
            onRotationChange={() => { }}
            obstructionMode={obstructionMode}
            obstructedPanelIds={localManualPanelObstructedIds}
            onObstructedPanelsChange={handleManualPanelObstructedPanelsChange}
            mapContainerRef={mapContainerRef}
             onImageUpdate={(url) => {
   localStorage.setItem("capturedImage", url);
  }}
          />
        </MapContainer>

        {/* Floating Manual Panel Controls inside Map */}
        <div
          className={`absolute z-[1002] ${isMobile ? "top-[2%] left-[5%]" : "top-4 right-4"
            } w-[320px] max-w-[80vw]`}
        >
          <motion.div className="pointer-events-auto overflow-hidden rounded-xl bg-black/80 border border-white/20">
            <div
              className="flex items-center cursor-pointer p-4 relative"
              onClick={handleManualPanelSectionToggle}
            >
              <h3 className="text-white text-sm font-medium w-full text-center">
                Manual Panel Controls
              </h3>
              <motion.div
                animate={{ rotate: isManualPanelSectionExpanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            </div>

            <AnimatePresence>
              {isManualPanelSectionExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-visible"
                >
                  <div className="px-4 pb-4">
                    <ManualPanelControls
                      totalManualPanels={totalManualPanels}
                      onResetManualPanels={handleResetManualPanels}
                      onDeleteRegion={handleDeleteRegion}
                      onEnableDrawMode={handleEnableDrawMode}
                      onRotationChange={handleRotationChange}
                      currentRotation={currentRotation}
                      regions={manualPanelRegions}
                      selectedRegionId={selectedRegionId}
                      onRegionSelect={(regionId: number) =>
                        manualPanelWrapperRef.current?.handleRegionSelect(
                          regionId
                        )
                      }
                      obstructedPanelIds={localManualPanelObstructedIds}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <ManualPanelDependencies />
        </div>
      </div>
      {/* Summary Section */}
      <div style={{ flexShrink: 0, order: 2, height: isMobile ? "60vh" : "100vh", overflowY: "auto", padding: "16px", boxSizing: "border-box", }}
      >
        <SummaryPanel
          annualUsage={annualUsage}
          setAnnualUsage={setAnnualUsage}
          panelCount={totalManualPanels}
          setPanelCount={setTotalManualPanels}
        />
      </div>
    </>
  );
};

export default NearmapTestingTwo;
