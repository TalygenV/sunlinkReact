import React, { useCallback, useEffect, useRef, useState } from "react";
import NearmapTestingTwo from "./NearmapTestingTwoManual";
import { auth, db, storage } from "../firebase";
import { ref as dbRef, get, set, update } from "firebase/database";
// import ProgressBar, { type ProgressStage } from "../../ui/progress/ProgressBar";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import { calculateTotalStats, getAllPanels, getPanelId, updateActivePanels, } from "../utils/panelHelpers";
import axios from "axios";
import { localUserData } from '../store/solarSlice'

// interface UserData {
//   name: string;
//   address: string;
//   phoneNumber?: string;
//   uid?: string;
//   solarData?: any;
//   monthlyBill?: number;
//   annualUsage?: number;
//   isAutoPanelsSupported?: boolean;
// }

// Props for the SystemDesign component
interface MapViewProps {
  userData: localUserData;
}

interface RoofSegment {
  azimuth: number;
  tilt: number;
  center: { lat: number; lng: number };
  boundingBox: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  };
}

export const MapView: React.FC<MapViewProps> = ({ userData }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [overlayBounds, setOverlayBounds] = useState<{
    north: number;
    east: number;
    south: number;
    west: number;
  } | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [solarData, setSolarData] = useState<any>(null);
  const [annualUsage, setAnnualUsage] = useState<number>(12000);
  const [roofData, setRoofData] = useState<any>(null);

  const [currentStage, setCurrentStage] = useState("Design");

  // const [completedStages, setCompletedStages] = useState<ProgressStage[]>([
  //   "Design",
  // ]);

  const [panels, setPanels] = useState<any[]>([]);
  const [obstructedPanels, setObstructedPanels] = useState<Set<string>>(
    new Set()
  );

  const [manualPanelsOn, setManualPanelsOn] = useState<boolean>(false);
  const [manualPanelRegions, setManualPanelRegions] = useState<any[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [totalManualPanels, setTotalManualPanels] = useState<number>(0);
  const [manualPanelEnergy, setManualPanelEnergy] = useState<number>(0);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [manualPanelObstructedIds, setManualPanelObstructedIds] = useState<
    Set<string>
  >(new Set());

  const [alignmentSaved, setAlignmentSaved] = useState<boolean>(false);
  // Add autoPanelOffset state
  const [autoPanelOffset, setAutoPanelOffset] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const prevStateRef = useRef<Record<string, any>>({});

  const formatAddressForStorage = (address: string): string => {
    return address.replace(/\s+/g, "").replace(/,/g, "-");
  };

  // Helper function to parse bbox string into overlayBounds object
  const parseBbox = (bboxString: string) => {
    const [west, south, east, north] = bboxString.split(",").map(Number);
    return { north, east, south, west };
  };

  // Helper function to calculate map center from bounds
  const calculateMapCenter = (bounds: {
    north: number;
    east: number;
    south: number;
    west: number;
  }) => { return { lat: (bounds.north + bounds.south) / 2, lng: (bounds.east + bounds.west) / 2, }; };

  const handleIncreasePanels = () => {
    const stats = calculateTotalStats(panels, obstructedPanels);
    setPanels(
      updateActivePanels(panels, stats.totalPanels + 1, obstructedPanels)
    );
    // Update database after state change
  };

  const handleDecreasePanels = () => {
    const stats = calculateTotalStats(panels, obstructedPanels);
    setPanels(
      updateActivePanels(
        panels,
        Math.max(0, stats.totalPanels - 1),
        obstructedPanels
      )
    );
    // Update database after state change
  };

  const handleSetPanels = (newCount: number) => {
    setPanels(updateActivePanels(panels, newCount, obstructedPanels));
    // Update database after state change
  };

  const updateChangedPanelData = useCallback(async () => {
    // Use userData.uid if available, otherwise check auth.currentUser
    if (!userData.uid && !auth.currentUser) {
      return;
    }

    const uid = userData.uid || auth.currentUser?.uid;

    if (!uid) {
      return;
    }

    try {
      // Get reference to user's data
      const dataRef = dbRef(db, `users/${uid}`);

      // Create current state object with all values
      const currentState: Record<string, any> = {
        imageUrl,
        overlayBounds,
        mapCenter,
        solarData,
        panels,
        obstructedPanels: Array.from(obstructedPanels),
        annualUsage,
        roofData,
        manualPanelRegions,
        selectedRegionId,
        totalManualPanels,
        manualPanelEnergy,
        manualPanelObstructedIds: Array.from(manualPanelObstructedIds),
        alignmentSaved,
        autoPanelOffset,
        isAutoPanelsSupported:
          userData.isAutoPanelsSupported !== undefined
            ? userData.isAutoPanelsSupported
            : solarData?.isAutoPanelsSupported || false,
      };

      // Compare with previous state and build update object with only changed fields
      const changedFields: Record<string, any> = {};
      let hasChanges = false;

      Object.entries(currentState).forEach(([key, value]) => {
        // Skip undefined values
        if (value === undefined) return;

        // Compare current and previous values using JSON.stringify
        // This handles complex objects but has limitations with circular references
        if (
          !prevStateRef.current[key] ||
          JSON.stringify(prevStateRef.current[key]) !== JSON.stringify(value)
        ) {
          changedFields[key] = value;
          hasChanges = true;
        }
      });

      // Only update if there are changes
      if (hasChanges) {
        await update(dataRef, changedFields);
        // Update previous state reference with new values
        prevStateRef.current = { ...prevStateRef.current, ...changedFields };
      }
    } catch (error) {
      console.error("Error updating panel data:", error);
    }
  }, [
    userData.uid,
    imageUrl,
    overlayBounds,
    mapCenter,
    solarData,
    panels,
    obstructedPanels,
    annualUsage,
    roofData,
    manualPanelRegions,
    selectedRegionId,
    totalManualPanels,
    manualPanelEnergy,
    manualPanelObstructedIds,
    alignmentSaved,
    autoPanelOffset,
    solarData?.isAutoPanelsSupported,
  ]);

  const handlePanelClick = (panel: any) => {
    if (panel) {
      const panelId = getPanelId(panel);
      const newObstructedPanels = new Set(obstructedPanels);
      if (obstructedPanels.has(panelId)) {
        newObstructedPanels.delete(panelId);
      } else {
        newObstructedPanels.add(panelId);
      }
      setObstructedPanels(newObstructedPanels);
      // Update database after state change using optimized function
      setTimeout(() => updateChangedPanelData(), 0);
    }
  };

  const hasRequiredSystemDesignData = (snapshot: any) => {
    if (!snapshot.exists()) return false;

    // Check for at least one of the key SystemDesign properties
    const data = snapshot.val();
    return (
      data.imageUrl !== undefined ||
      data.panels !== undefined ||
      data.solarData !== undefined
    );
  };

  // const ensureProgressConsistency = () => {
  //   const stages = ["Panels", "Inverter", "Design", "Batteries", "Overview"];
  //   const currentIndex = stages.indexOf(currentStage);

  //   // Ensure all previous stages are in completedStages
  //   const requiredStages = stages
  //     .slice(0, currentIndex + 1)
  //     .filter((stage) => stage !== "Completion") as ProgressStage[];
  //   const updatedCompletedStages = [
  //     ...new Set([...completedStages, ...requiredStages]),
  //   ];

  //   if (
  //     JSON.stringify(updatedCompletedStages) !== JSON.stringify(completedStages)
  //   ) {
  //     setCompletedStages(updatedCompletedStages);
  //   }
  // };

  useEffect(() => {
    const fetchOrGenerateData = async () => {
      // Use userData.uid if available, otherwise check auth.currentUser
      if (!userData.uid && !auth.currentUser) {
        console.log("No user data or auth.currentUser found", userData, auth);

        return;
      }
      const uid = userData.uid || auth.currentUser?.uid;

      if (!uid) {
        console.log("No uid found");
        return;
      }

      try {
        console.log("uid found");
        // Check if data exists in database
        const dataRef = dbRef(db, `users/${uid}`);
        const snapshot = await get(dataRef);

        // Check if snapshot has the required SystemDesign data
        if (hasRequiredSystemDesignData(snapshot)) {
          console.log("hasRequiredSystemDesignData");
          // Use existing data
          console.log("Found existing SystemDesign data");

          // Load image and bounds data if available
          if (snapshot.val().imageUrl) {
            setImageUrl(snapshot.val().imageUrl);
          }

          // Always try to load bounds, but provide a fallback if missing
          if (snapshot.val().overlayBounds) {
            setOverlayBounds(snapshot.val().overlayBounds);
          } else {
            // Create default bounds based on map center if available
            const center = snapshot.val().mapCenter;
            if (center) {
              setOverlayBounds({
                north: center.lat + 0.001,
                south: center.lat - 0.001,
                east: center.lng + 0.001,
                west: center.lng - 0.001,
              });
            }
          }

          // Load progress state if it exists
          if (snapshot.val().progress) {
            const progressData = snapshot.val().progress;

            if (
              progressData.completedStages &&
              Array.isArray(progressData.completedStages)
            ) {
              // setCompletedStages(progressData.completedStages);
            }

            // Ensure progress state is consistent
            // ensureProgressConsistency();
          }

          // Always try to load map center, critical for map initialization
          if (snapshot.val().mapCenter) {
            setMapCenter(snapshot.val().mapCenter);
          } else if (
            snapshot.val().solarData &&
            snapshot.val().solarData.center &&
            snapshot.val().solarData.center.latitude &&
            snapshot.val().solarData.center.longitude
          ) {
            // If no mapCenter but solarData has center coordinates, use those instead
            const newMapCenter = {
              lat: snapshot.val().solarData.center.latitude,
              lng: snapshot.val().solarData.center.longitude,
            };
            setMapCenter(newMapCenter);
          }

          // Make sure solarData includes isAutoPanelsSupported flag
          const existingSolarData = snapshot.val().solarData;
          const isAutoSupported =
            userData.isAutoPanelsSupported !== undefined
              ? userData.isAutoPanelsSupported
              : snapshot.val().isAutoPanelsSupported !== undefined
                ? snapshot.val().isAutoPanelsSupported
                : existingSolarData?.isAutoPanelsSupported || false;

          setSolarData(existingSolarData ? { ...existingSolarData, isAutoPanelsSupported: isAutoSupported, } : null);
          // Load panels if they exist in the database
          if (snapshot.val().panels) { setPanels(snapshot.val().panels); }

          // Load obstructedPanels if they exist in the database
          if (snapshot.val().obstructedPanels) {
            // Convert array back to Set
            setObstructedPanels(new Set(snapshot.val().obstructedPanels));
          }

          // Load annualUsage if it exists in the database
          if (snapshot.val().annualUsage) {
            setAnnualUsage(snapshot.val().annualUsage);
          }

          // Load roofData if it exists in the database
          if (snapshot.val().roofData) {
            setRoofData(snapshot.val().roofData);
          }

          if (snapshot.val().manualPanelRegions) {
            setManualPanelRegions(snapshot.val().manualPanelRegions);
          }

          if (snapshot.val().selectedRegionId !== undefined) {
            setSelectedRegionId(snapshot.val().selectedRegionId);
          }

          if (snapshot.val().totalManualPanels !== undefined) {
            setTotalManualPanels(snapshot.val().totalManualPanels);
          }

          if (snapshot.val().manualPanelEnergy !== undefined) {
            setManualPanelEnergy(snapshot.val().manualPanelEnergy);
          }

          if (snapshot.val().currentRotation !== undefined) {
            setCurrentRotation(snapshot.val().currentRotation);
          }

          // Load manual panel obstructions if they exist in the database
          if (snapshot.val().manualPanelObstructedIds !== undefined) {
            setManualPanelObstructedIds(
              new Set(snapshot.val().manualPanelObstructedIds)
            );
          }

          if (snapshot.val().alignmentSaved !== undefined) {
            setAlignmentSaved(snapshot.val().alignmentSaved);
          }

          if (snapshot.val().autoPanelOffset !== undefined) {
            setAutoPanelOffset(snapshot.val().autoPanelOffset);
          }

          // Option B: Check if imageUrl is missing and fetch if needed
          if (!snapshot.val().imageUrl) {
            console.log(
              "Existing data found, but imageUrl is missing. Fetching from Nearmap."
            );
            const address = snapshot.val().address; //userData.address;
            if (address) {
              try {
                const functions = getFunctions();
                // const checkAvailabilityFunc = httpsCallable(
                //   functions,
                //   "checkSurveyAvailability"
                // );
                const addressWithoutUSA = address.replace(/, USA$/, "");
                console.log("addressWithoutUSA", addressWithoutUSA);
                console.log("Sending data to checkSurveyAvailability:", {
                  address: addressWithoutUSA,
                });

                let response = await checkSurveyAvailability({
                  address: addressWithoutUSA,
                });
                console.log("Response from checkSurveyAvailability:", response);

                // @ts-ignore
                if (response.success && response.data?.imageData) {
                  console.log("1059");

                  // @ts-ignore
                  const imageData = response.data.imageData;
                  // @ts-ignore
                  const contentType = response.data.contentType || "image/png";
                  // Extract base64 portion from Data URL
                  const base64Match = imageData.match(
                    /^data:(.*);base64,(.*)$/
                  );

                  console.log("1071");

                  if (!base64Match || base64Match.length !== 3) {
                    console.error("❌ Invalid data URL format.");
                    return;
                  }

                  const cleanBase64 = base64Match[2]
                    .trim()
                    .replace(/\s/g, "")
                    .replace(/[^A-Za-z0-9+/=]/g, "");

                  // ✅ Base64 validator
                  const isBase64 = (str: string) => {
                    try {
                      return btoa(atob(str)) === str;
                    } catch {
                      return false;
                    }
                  };

                  if (!isBase64(cleanBase64)) {
                    console.error("❌ Invalid base64 image data.");
                    return;
                  }
                  console.log("1096");

                  // Convert base64 to blob for storage
                  // Remove any potential whitespace and ensure proper base64 format
                  // const cleanBase64 = imageData.replace(/\s/g, "");
                  const byteCharacters = atob(cleanBase64);
                  const byteArrays = [];
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays.push(byteCharacters.charCodeAt(i));
                  }
                  const blob = new Blob([new Uint8Array(byteArrays)], {
                    type: contentType,
                  });

                  const formattedAddress = formatAddressForStorage(address);

                  console.log("1112", formattedAddress);

                  const imageRef = storageRef(
                    storage,
                    `nearmap-images/${formattedAddress}`
                  );
                  const uploadResult = await uploadBytes(imageRef, blob);

                  // console.error("1120", uploadResult);

                  const downloadUrl = await getDownloadURL(uploadResult.ref);

                  const tempUrl = URL.createObjectURL(blob);

                  // Now you can use tempUrl to preview or download the image
                  console.log("Temporary Local Image URL:", tempUrl);

                  // @ts-ignore
                  const bbox = response.data.surveyData.bbox;
                  const newOverlayBounds = parseBbox(bbox);
                  const newMapCenter = calculateMapCenter(newOverlayBounds);
                  let newRoofData = null;
                  // @ts-ignore
                  if (response.data.roofData) {
                    // @ts-ignore
                    console.log(
                      "new roof data set 1133",
                      response.data.roofData
                    );
                    newRoofData = response.data.roofData;

                    setRoofData(response.data.roofData);
                  } else {
                    console.log("no roof data found");
                  }

                  // Update state

                  // Example: show image
                  setImageUrl(tempUrl);
                  //setImageUrl(downloadUrl);
                  setOverlayBounds(newOverlayBounds);

                  // Only update map center if it wasn't already loaded
                  if (!mapCenter) {
                    setMapCenter(newMapCenter);
                  }
                  if (newRoofData) {
                    console.log("new roof data set 1133");
                    setRoofData(newRoofData);
                  }

                  //Update database
                  await update(dataRef, {
                    imageUrl: downloadUrl,
                    overlayBounds: newOverlayBounds,
                    mapCenter: mapCenter || newMapCenter, // Use existing or new map center
                    roofData: newRoofData || roofData, // Use new or existing roof data
                  });
                  console.log("Nearmap data fetched and updated successfully.");
                }
              } catch (error) {
                console.error("Error fetching missing Nearmap data:", error);
              }
            } else {
              console.error("Cannot fetch Nearmap data without an address.");
            }
          }
        } else {
          // No existing data, generate new data
          console.log("No existing data, generating new data");

          // Get address from userData
          const address = userData.address;
          // const address = userData.address;
          console.log("address", address);

          if (!address) {
            console.log("No address found");
            return;
          }

          // Get solarData from userData - do this first to ensure we have coordinates
          const solarDataFromUser = userData.solarData;

          // Create placeholder objects for when Nearmap API fails
          const imageUrl = null;
          let overlayBoundsData = { north: 0, south: 0, east: 0, west: 0 };
          let downloadUrl = null;
          let mapCenterData = null;

          // First determine mapCenter using coordinates if available,
          // so we'll have this even if the cloud function fails
          if (
            solarDataFromUser &&
            solarDataFromUser.coordinates &&
            solarDataFromUser.coordinates.latitude &&
            solarDataFromUser.coordinates.longitude
          ) {
            // First priority: Use coordinates from Places API that we passed through
            mapCenterData = {
              lat: solarDataFromUser.coordinates.latitude,
              lng: solarDataFromUser.coordinates.longitude,
            };

            // If we have coordinates but no bounds, create default bounds centered on coordinates
            overlayBoundsData = {
              north: mapCenterData.lat + 0.001,
              south: mapCenterData.lat - 0.001,
              east: mapCenterData.lng + 0.001,
              west: mapCenterData.lng - 0.001,
            };
          } else if (
            solarDataFromUser &&
            solarDataFromUser.center &&
            solarDataFromUser.coordinates.latitude &&
            solarDataFromUser.coordinates.longitude
          ) {
            // Second priority: Use center from solarData
            mapCenterData = {
              lat: solarDataFromUser.coordinates.latitude,
              lng: solarDataFromUser.coordinates.longitude,
            };

            // If we only have center coordinates but no bounds, create default bounds
            overlayBoundsData = {
              north: mapCenterData.lat + 0.001,
              south: mapCenterData.lat - 0.001,
              east: mapCenterData.lng + 0.001,
              west: mapCenterData.lng - 0.001,
            };
          }

          // Try to get the image from Nearmap API
          try {
            console.log("getting image from nearmap api");
            const functions = getFunctions();
            const checkAvailabilityFunc = httpsCallable(
              functions,
              "checkSurveyAvailability"
            );
            // Remove USA country code from address before calling the function
            const addressWithoutUSA = address.replace(/, USA$/, "");
            console.log("addressWithoutUSA", addressWithoutUSA);
            console.log("Sending data to checkSurveyAvailability:", {
              address: addressWithoutUSA,
            });

            const response = await checkSurveyAvailability({
              address: addressWithoutUSA,
            });
            console.log("Response from checkSurveyAvailability:", response);

            console.log("661");

            // @ts-ignore - response.data structure is known from NearmapTesting.tsx
            if (response.success && response.data?.imageData) {
              // @ts-ignore
              let imageData = response.data.imageData;
              // @ts-ignore
              const contentType = response.data.contentType || "image/png";

              // If it includes a data URL prefix, remove it
              if (imageData.startsWith("data:")) {
                imageData = imageData.split(",")[1];
              }

              // Ensure no whitespaces
              const cleanBase64 = imageData.replace(/\s/g, "");

              // Validate base64 format (optional but useful)
              const base64Regex = /^[A-Za-z0-9+/=]+$/;
              if (!base64Regex.test(cleanBase64)) {
                throw new Error("Invalid base64 format received");
              }

              // Convert base64 to byte array
              const byteCharacters = atob(cleanBase64);
              const byteArrays = new Uint8Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays[i] = byteCharacters.charCodeAt(i);
              }

              // Create a Blob
              const blob = new Blob([byteArrays], { type: contentType });

              // Optional: Generate a blob URL for preview
              // const dataUrl = URL.createObjectURL(blob);

              // Create a storage reference with formatted address
              const formattedAddress = formatAddressForStorage(address);
              console.log("formattedAddress",formattedAddress);
              const imageRef = storageRef(
                storage,
                `nearmap-images/${formattedAddress}`
              );
 console.log("imageRef",imageRef);
              // Upload the blob to Firebase Storage
              const uploadResult = await uploadBytes(imageRef, blob);

              // Get the download URL
              downloadUrl = await getDownloadURL(uploadResult.ref);

              console.log(downloadUrl);

              // Parse bbox from surveyData
              // @ts-ignore
              const bbox = response.data.surveyData.bbox;

              overlayBoundsData = parseBbox(bbox);

              // If we didn't have map center from coordinates, calculate it from bounds
              if (!mapCenterData) {
                mapCenterData = calculateMapCenter(overlayBoundsData);
              }

              // Extract roof data if available
              // @ts-ignore
              if (response.data.roofData) {
                console.log("roof data found");
                // @ts-ignore
                const roofDataFromApi = response.data.roofData;
                setRoofData(roofDataFromApi);
              } else {
                console.log("no roof data found");
              }
            }
          } catch (error) {
            console.error("Error fetching roof data:", error);

            // We'll continue with whatever mapCenterData we determined earlier
          }

          // Initialize panels based on solarData if available
          let initialPanels: any[] = [];
          if (
            solarDataFromUser &&
            solarDataFromUser.solarPotential &&
            userData.isAutoPanelsSupported &&
            solarDataFromUser.solarPotential.solarPanels
          ) {
            try {
              // Get all possible panels from the solar data
              const allPanels = getAllPanels(solarDataFromUser);

              // Find the best analysis index
              let panelCount = 0;

              // Try to get panel count directly from solarData
              if (solarDataFromUser.solarPotential.solarPanelConfigs) {
                // Find the best analysis using the same logic as in CallToAction
                const validAnalyses = solarDataFromUser.financialAnalyses || [];
                const bestAnalysis = validAnalyses
                  .filter((analysis: any) => analysis.panelConfigIndex >= 0)
                  .reduce((best: any, current: any) => {
                    if (!solarDataFromUser.targetMonthlyBill) {
                      // Fallback to highest savings if no monthly bill provided
                      const currentSavings =
                        current.cashPurchaseSavings?.savings?.savingsYear20
                          ?.units || "0";
                      const bestSavings =
                        best.cashPurchaseSavings?.savings?.savingsYear20
                          ?.units || "0";
                      return parseInt(currentSavings) > parseInt(bestSavings)
                        ? current
                        : best;
                    }

                    // Calculate target monthly bill using the formula: (monthlyBill / 2) + 25
                    const targetBill =
                      solarDataFromUser.targetMonthlyBill / 2 + 25;

                    // Get the absolute difference between each analysis's monthly bill and target
                    const currentDiff = Math.abs(
                      parseInt(current.monthlyBill?.units || "0") - targetBill
                    );
                    const bestDiff = Math.abs(
                      parseInt(best.monthlyBill?.units || "0") - targetBill
                    );

                    // Return the analysis with the closest monthly bill to our target
                    return currentDiff < bestDiff ? current : best;
                  }, validAnalyses[0]);

                if (bestAnalysis) {
                  const selectedConfig =
                    solarDataFromUser.solarPotential.solarPanelConfigs[
                    bestAnalysis.panelConfigIndex
                    ];
                  panelCount = selectedConfig?.panelsCount || 0;
                }
              }

              // Update panels to activate the specified number
              if (panelCount > 0) {
                initialPanels = updateActivePanels(
                  allPanels,
                  panelCount,
                  new Set()
                );
              } else {
                initialPanels = allPanels;
              }
            } catch (err) {
              // Fallback to empty array if there's an error
              initialPanels = [];
            }
          }

          // Calculate annual usage if userData has it, otherwise use default
          const userAnnualUsage =
            userData.annualUsage ||
            (solarDataFromUser &&
              solarDataFromUser.solarPotential &&
              solarDataFromUser.solarPotential.solarPanelConfigs &&
              solarDataFromUser.solarPotential.solarPanelConfigs[0]
              ? solarDataFromUser.solarPotential.solarPanelConfigs[0]
                .yearlyEnergyDcKwh
              : 12000);

          // Add the isAutoPanelsSupported flag to solarData if it exists in userData
          const updatedSolarData = solarDataFromUser
            ? {
              ...solarDataFromUser,
              isAutoPanelsSupported: userData.isAutoPanelsSupported,
            }
            : null;

          // Ensure isAutoPanelsSupported is defined and force it to false if no solarPanels
          const hasSolarPanelData =
            solarDataFromUser &&
            solarDataFromUser.solarPotential &&
            solarDataFromUser.solarPotential.solarPanels;

          // Force isAutoSupported to false if no solar panel data is available
          const isAutoSupported = hasSolarPanelData
            ? userData.isAutoPanelsSupported !== undefined
              ? userData.isAutoPanelsSupported
              : solarDataFromUser?.isAutoPanelsSupported || false
            : false;

          // Prepare SystemDesign data to save
          const systemDesignData = {
            imageUrl: downloadUrl,
            overlayBounds: overlayBoundsData,
            mapCenter: mapCenterData,
            solarData: updatedSolarData,
            panels: initialPanels, // Use initialized panels instead of empty array
            obstructedPanels: [], // Initialize with empty obstructedPanels array
            annualUsage: userAnnualUsage,
            roofData: roofData, // Add roofData to database
            // Initialize manual panel data
            manualPanelsOn: !isAutoSupported || !hasSolarPanelData || !roofData, // Enable manual panels when no roof data
            manualPanelRegions: [],
            selectedRegionId: null,
            totalManualPanels: 0,
            manualPanelEnergy: 0,
            currentRotation: 0,
            // Initialize manual panel obstructions
            manualPanelObstructedIds: [],
            // Add default values for new fields
            alignmentSaved: false,
            autoPanelOffset: { lat: 0, lng: 0 },
            // Explicitly save isAutoPanelsSupported at the root level
            isAutoPanelsSupported: isAutoSupported,
            // Initialize battery-related data
            selectedBatteryDetails: null,
            batteryCount: 0,
            isBatterySkipped: false,
          };

          // If the node already exists, use update to preserve other fields
          if (snapshot.exists()) {
            console.log("Updating existing user node with SystemDesign data");
            await update(dataRef, systemDesignData);
          } else {
            // If node doesn't exist at all, use set to create it
            console.log("Creating new user node with SystemDesign data");
            await set(dataRef, systemDesignData);
          }

          // Update annualUsage state
          setAnnualUsage(userAnnualUsage);

          // Set state values
          setImageUrl(downloadUrl);
          setOverlayBounds(overlayBoundsData);
          setMapCenter(mapCenterData);
          setSolarData(solarDataFromUser);
          setPanels(initialPanels); // Set panels state with initialized panels
        }
      } catch (error) { }
    };
    fetchOrGenerateData();
  }, [userData.uid]);

  const handleContinue = async () => {
    // Change the type to include 'Completion'
    const stages = ["Design"] as const;
    type ExtendedStage = (typeof stages)[number]; // This creates a union type from the array
    const currentIndex = stages.indexOf(currentStage as ExtendedStage);

    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];

      // Update completed stages to include all previous and the new stage
      // const updatedCompletedStages = [...new Set([...completedStages,
      //        currentStage, 
      //     nextStage,
      //   ]),
      // ] as ProgressStage[];

      // Save progress with the new values BEFORE updating state
      // This ensures we save the next stage, not the current one

      // Update state
      setCurrentStage(nextStage as any);
      // setCompletedStages(updatedCompletedStages);
    }
  };

  function arrayBufferToBase64(buffer: any) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function checkSurveyAvailability(inputData: any) {
    console.log("Received data in checkSurveyAvailability:", {
      inputData,
      type: typeof inputData,
      hasAddress: inputData && "address" in inputData,
    });

    if (!inputData || typeof inputData !== "object") {
      throw new Error("Invalid input: Data must be an object.");
    }

    const address = inputData?.data?.address || inputData?.address;
    if (!address) {
      throw new Error("Address is required.");
    }

    console.log("Making API call to Nearmap with address:", address);

    try {
      const previewResponse = await callSurveyApi(address, true);
      console.log("Preview response:", previewResponse);

      if (previewResponse?.surveys && previewResponse.surveys.length > 0) {
        const actualResponse = await callSurveyApi(address, false);
        const firstSurvey = actualResponse?.surveys?.[0];
        const surveyId = firstSurvey?.id;
        const bbox = actualResponse?.bbox;
        const transactionToken = actualResponse?.transactionToken;

        const imageResponse = await getSurveyImage(surveyId, bbox, transactionToken);        // const imageBase64 = Buffer.from(imageResponse.data).toString("base64");
        const imageBase64 = arrayBufferToBase64(imageResponse.data);

        const imageDataUrl = `data:${imageResponse.headers["content-type"] || "image/png"};base64,${imageBase64}`;

        let roofData = null;
        if (firstSurvey?.aiResourceId) {
          try {
            const roofResponse = await getRoofData(
              firstSurvey.aiResourceId,
              transactionToken
            );
            roofData = roofResponse.data;
          } catch (err: any) {
            console.error("Failed to fetch roof data:", err.message);
          }
        }

        return {
          success: true,
          message: "Survey, image, and roof data retrieved successfully",
          data: {
            surveyData: actualResponse,
            imageData: imageDataUrl,
            contentType: imageResponse.headers["content-type"],
            roofData: roofData,
          },
        };
      }

      return {
        success: false,
        message: "No survey available for this address",
        data: previewResponse,
      };
    } catch (error: any) {
      console.error("Error in survey availability check:", error);
      throw new Error(
        `Failed to retrieve survey data: ${error.response?.data?.message || error.message
        }`
      );
    }
  }

  async function callSurveyApi(address: any, preview: any) {
    const apiKey = "MjAyYTY0ZTUtYTIwNC00MzMzLWIzNjEtNThiZWQ5YjY0NWY3";

    if (!apiKey) throw new Error("Missing Nearmap API key");

    const formattedAddress = address.trim();

    const url = `https://api.nearmap.com/coverage/v2/tx/address?address=${formattedAddress}&country=US&dates=single&resources=raster:Vert,aiPacks:roof_char&limit=1&sort=captureDate&preview=${preview}&apikey=${apiKey}`;

    const response = await axios.get(url);
    return response.data;
  }

  async function getSurveyImage(surveyId: any, bbox: any, token: any) {
    const url = `https://api.nearmap.com/staticmap/v3/surveys/${surveyId}/Vert.png`;

    const response = await axios.get(url, {
      params: { bbox, transactionToken: token },
      responseType: "arraybuffer",
    });

    return response;
  }

  async function getRoofData(aiResourceId: any, token: any) {
    const url = `https://api.nearmap.com/ai/features/v4/tx/surveyresources/${aiResourceId}/features.json`;

    return await axios.get(url, {
      params: { transactionToken: token },
    });
  }

  return (
    <div className="w-full h-full bg-black rounded-xl overflow-hidden border shadow-sm">
      <div className="h-full flex items-center justify-center">
        <NearmapTestingTwo
          onFinalizeDesign={handleContinue}
          imageUrl={imageUrl}
          overlayBounds={overlayBounds}
          mapCenter={mapCenter}
          solarData={solarData}
          panels={panels}
          obstructedPanels={obstructedPanels}
          onIncreasePanels={handleIncreasePanels}
          onDecreasePanels={handleDecreasePanels}
          onSetPanels={handleSetPanels}
          onPanelClick={handlePanelClick}
          annualUsage={annualUsage}
          // Pass battery-related props
          // Pass manual panel-related props
          manualPanelsOn={manualPanelsOn}
          setManualPanelsOn={setManualPanelsOn}
          manualPanelRegions={manualPanelRegions}
          setManualPanelRegions={setManualPanelRegions}
          selectedRegionId={selectedRegionId}
          setSelectedRegionId={setSelectedRegionId}
          totalManualPanels={totalManualPanels}
          setTotalManualPanels={setTotalManualPanels}
          manualPanelEnergy={manualPanelEnergy}
          setManualPanelEnergy={setManualPanelEnergy}
          currentRotation={currentRotation}
          setCurrentRotation={setCurrentRotation}
          // Pass the isAutoPanelsSupported flag from solarData
          isAutoPanelsSupported={solarData?.isAutoPanelsSupported}
          // Pass manual panel obstructions
          manualPanelObstructedIds={manualPanelObstructedIds}
          setManualPanelObstructedIds={setManualPanelObstructedIds}
          // Add alignment saved props
          alignmentSaved={alignmentSaved}
          setAlignmentSaved={setAlignmentSaved}
          // Add autoPanelOffset props
          autoPanelOffset={
            autoPanelOffset && {
              lat: autoPanelOffset.lat,
              lng: autoPanelOffset.lng,
            }
          }
          setAutoPanelOffset={setAutoPanelOffset}
          // Add roofData prop
          roofData={roofData}
        />
      </div>
    </div>
  );
};
