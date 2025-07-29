import { useContext, useEffect, useRef, useState } from "react";
import { Search, Lock, Eye, EyeOff, Check, X, ChevronDown, BarChart3, Home, } from "lucide-react";
//import { GenabilityData, SolarData, Tariff } from "../domain/types";
import profile from '../assets/images/profile.svg';
import chartImage from "../assets/images/graph.svg"
import { useSelector } from 'react-redux';
import { setPersonalInfo, setPassword, setConfirmPassword, setPropertyInfo, togglePasswordVisibility, setFieldError, setMultipleFieldErrors, clearErrors, setLoading } from "../store";
import { isValidEmail, validateField, validatePassword } from "../utils/validation";
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { submitForm } from '../store/solarSlice';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, firestore } from "../firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { set } from "firebase/database";
import { ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FormContext } from "../context/FormContext";
import React from "react";
//import { RootState } from '../store';
//import { ref, set } from "firebase/database";
//import { doc, setDoc, getDoc, collection, query, where, getDocs, } from "firebase/firestore";
//import { app, auth, db, firestore } from "../firebase";
//import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const GENABILITY_APP_ID = import.meta.env.GENABILITY_APP_ID;
const GENABILITY_API_KEY = import.meta.env.GENABILITY_API_KEY;
const base_url = "https://api.genability.com";
const basic_token = "ZGI5MTczMGItNWUwNi00N2I1LWI3MjAtNzcyZDc5ODUyNTA1OjBiY2U1M2RiLTc3NjItNGQ0Zi1iZDA1LWYzODEwNWE1OWI5YQ==";
type Territory = { name: string; code: string; websiteHome: string; lseId: number; };
interface SolarFormProps {
  onOpenEnergyModal: () => void;
  onSubmitEnergyData: () => void;
  showIneligibleModal: () => void;
}

const SolarForm: React.FC<SolarFormProps> = ({
  onOpenEnergyModal,
  onSubmitEnergyData,
  showIneligibleModal,
}) => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { firstName, lastName, email, phone, password, confirmPassword, ownsHome, propertyType, powerBill, showPassword, showConfirmPassword, errors, zipCode, address, lat, lng, ustate } = useAppSelector((state) => state.solar.solarForm);
  const { isLoading } = useAppSelector((state) => state.solar);
  const [showKwh, setShowKwh] = useState(false);
   const [ineligibilityReason, setIneligibilityReason] = useState<
    "renter" | "property-type"
  >("property-type");
  const passwordRequirements = validatePassword(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const getErrorMessage = (field: string, message: string) => errors[field] ? (<p className="text-sm text-red-500 mt-1">{message}</p>) : null;
  const handleFieldValidation = (field: string, value: any, relatedValues: { [key: string]: any } = {}) => {
    const isValid = validateField(field, value, relatedValues);
    dispatch(setFieldError({ field, hasError: !isValid }));
    return isValid;
  };
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  async function checkIfEmailExists(email: string): Promise<boolean> {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  const handlePersonalInfoChange = async (field: string, value: string) => {
    dispatch(setPersonalInfo({ [field]: value }));
    if (field === "email") {
      const validationErrors: { [key: string]: boolean } = {};
      const trimmed = value.trim();
      if (isValidEmail(trimmed)) {
        const alreadyRegistered = await checkIfEmailExists(trimmed);
        console.log("alreadyRegistered", alreadyRegistered);
        if (alreadyRegistered) {
          setemailError("Email is already registered.")
          validationErrors.email = true;
          dispatch(setMultipleFieldErrors(validationErrors));
        } else {
          handleFieldValidation(field, trimmed);
        }
        // this should call async checkIfEmailExists
      } else {
        setemailError("Invalid email format")
        validationErrors.email = true;
        dispatch(setMultipleFieldErrors(validationErrors));
      }
    } else {
      handleFieldValidation(field, value);
    }
  };

  const handlePasswordChange = (value: string) => {
    dispatch(setPassword({ password: value }));
    handleFieldValidation("password", value);
    // Also validate confirm password if it exists
    if (confirmPassword) {
      handleFieldValidation("confirmPassword", confirmPassword, { password: value });
    }
  };
  const handleConfirmPasswordChange = (value: string) => {
    dispatch(setConfirmPassword({ confirmPassword: value }));
    handleFieldValidation("confirmPassword", value, { password });
  };
  const handlePropertyInfoChange = (field: string, value: any) => {
    dispatch(setPropertyInfo({ [field]: value }));
    handleFieldValidation(field, value);
  };
  const { setUserData, setIsAuthenticated } = useContext(FormContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [viewMode, setViewMode] = useState('annual');
  const [annualUsage, setAnnualUsage] = useState("");
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [energyInputMode, setEnergyInputMode] = useState<"annual" | "monthly">("annual");
  const [emailError, setemailError] = useState("");
  const [monthlyUsages, setMonthlyUsages] = useState(Array(12).fill(""));

  const [showEnergyModal, setShowEnergyModal] = useState(false);


  useEffect(() => {
    if (addressInputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address", "geometry"],
          types: ["address"],
        }
      );
      autocomplete.addListener("place_changed", async () => {
        const place = autocomplete.getPlace();
        console.log(
          "addressInputRef.current?.value",
          addressInputRef.current?.value
        );
        if (addressInputRef.current?.value)
          dispatch(setPersonalInfo({ ['address']: addressInputRef.current?.value }));
        // Extract postal code from address_components
        if (place.address_components) {
          for (const component of place.address_components) {
            if (component.types.includes("postal_code")) {

              dispatch(setPersonalInfo({ ['zipCode']: component.long_name }));
              break;
            }
            if (component.types.includes("administrative_area_level_1")) {
              dispatch(setPersonalInfo({ ['ustate']: component.long_name }));
            }
            if (component.types.includes("locality")) {
              dispatch(setPersonalInfo({ ['city']: component.long_name }));
            } else if (
              component.types.includes("administrative_area_level_2")
            ) {
              dispatch(setPersonalInfo({ ['city']: component.long_name }));
            }
          }
        }

        if (addressInputRef.current?.value && place.geometry?.location) {
          //setFormattedAddress(address);
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            //setAddress({ lat, lng });
            dispatch(setPersonalInfo({ ['lat']: lat }));
            dispatch(setPersonalInfo({ ['lng']: lng }));

          }

          try {
            const response = await fetch(
              `${base_url}/rest/public/lses?addressString=${addressInputRef.current?.value}&country=US&residentialServiceTypes=ELECTRICITY&sortOn=totalCustomers&sortOrder=DESC`,
              {
                method: "GET",
                headers: {
                  Authorization: `Basic ${basic_token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const data = (await response.json()) as {
              status: string;
              results: Territory[];
            };

            if (data.status === "success") {
              const utilityList = data.results || [];

              // You can filter if needed — for example, ignore records without names or websites:
              const filteredList = utilityList.filter(
                (u) => u.name && u.websiteHome
              );

              setTerritories(filteredList); // Though this should ideally be named setUtilities or similar
            } else {
              setTerritories([]);
            }
          } catch (error) {
            console.error("Error fetching utilities:", error);
          }
        }
      });
    }
  }, []);

  const fetchUtilityAndTariff = async () => {
    try {
      // Input validation
      if (!lat || !lng || powerBill <= 0)
        if (!selectedTerritory?.lseId)
          if (!GENABILITY_APP_ID || !GENABILITY_API_KEY)
            //throw new Error("Provide a valid address and monthly bill.");
            //throw new Error("No utility selected.");
            throw new Error("Missing API credentials.");

      const lseId = selectedTerritory?.lseId;
      const today = new Date().toISOString().split("T")[0];
      const lastYear = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      )
        .toISOString()
        .split("T")[0];
      const annualBill = powerBill * 12;
      const randomId = Math.floor(Math.random() * 100000);
      const providerAccountId = `provider-account-${randomId}`;
      const accountName = `customer-account-${randomId}`;


      // 1. Create Genability Account
      const accountRes = await fetch(`${base_url}/rest/v1/accounts`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerAccountId,
          accountName,
          address: { addressString: address },
          properties: {
            customerClass: {
              keyName: "customerClass",
              dataValue: "1",
            },
          },
        }),
      });

      if (!accountRes.ok) throw new Error(await accountRes.text());
      const accountData = await accountRes.json();
      const accountId = accountData?.results?.[0]?.accountId;
      if (!accountId) throw new Error("Account ID not found in response.");

      // 2. Set lseId property
      await fetch(`${base_url}/rest/v1/accounts/${accountId}/properties`, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${basic_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyName: "lseId",
          dataValue: lseId,
        }),
      });

      // 3. Estimate kWh from annual bill
      const kwhCalcRes = await fetch(
        `${base_url}/rest/v1/accounts/${accountId}/calculate/`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basic_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromDateTime: lastYear,
            toDateTime: today,
            billingPeriod: "false",
            groupBy: "MONTH",
            detailLevel: "TOTAL",
            propertyInputs: [
              { keyName: "total", dataValue: annualBill, unit: "cost" },
              { keyName: "baselineType", dataValue: "typicalElectricity" },
            ],
          }),
        }
      );

      if (!kwhCalcRes.ok) throw new Error(await kwhCalcRes.text());
      const kwhData = await kwhCalcRes.json();
      const pricePerKwh = kwhData?.results?.[0]?.summary?.kWh;
      const estimatedMonthlyKw = kwhData?.results?.[0]?.summary?.kW;
      if (!pricePerKwh) throw new Error("kWh estimate not found.");

      // 4. Estimate system size in kW (used later for solar profile and display)

      const recommendedSizeKw = estimatedMonthlyKw * 1000;
      await fetch(`${base_url}/rest/v1/profiles`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerAccountId: providerAccountId,
          providerProfileId: `Annual-Consumption-${providerAccountId}`,
          profileName: `Annual Consumption for ${providerAccountId}`,
          isDefault: true,
          serviceTypes: "ELECTRICITY",
          sourceId: "ReadingEntry",
          readingData: [
            {
              fromDateTime: lastYear,
              toDateTime: today,
              quantityUnit: "kWh",
              quantityValue: pricePerKwh,
            },
          ],
        }),
      });

      // if (!profileResAnnual.ok) throw new Error(await profileResAnnual.text());
      // const profileDataAnnual = await profileResAnnual.json();
      // 5. Create Solar Profile
      await fetch(`${base_url}/rest/v1/profiles`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerAccountId: providerAccountId,
          providerProfileId: `Solar-Production-PVWatts-6kW-${providerAccountId}`,
          groupBy: "YEAR",
          serviceTypes: "SOLAR_PV",
          source: { sourceId: "PVWatts", sourceVersion: "8" },
          properties: {
            systemSize: {
              keyName: "systemSize",
              dataValue: estimatedMonthlyKw,
            },
            azimuth: { keyName: "azimuth", dataValue: "180" },
            losses: { keyName: "losses", dataValue: "15" },
            inverterEfficiency: {
              keyName: "inverterEfficiency",
              dataValue: "96",
            },
            tilt: { keyName: "tilt", dataValue: "25" },
          },
        }),
      });

      // if (!profileRes.ok) throw new Error(await profileRes.text());
      // const profileData = await profileRes.json();

      const analysis = await fetch(`${base_url}/rest/v1/accounts/analysis`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerAccountId: providerAccountId,
          fromDateTime: today,
          useIntelligentBaselining: true,
          propertyInputs: [
            {
              keyName: "providerProfileId",
              dataType: "STRING",
              dataValue: `Annual-Consumption-${providerAccountId}`,
              scenarios: "before,after",
              dataFactor: 1.0,
            },
            {
              keyName: "providerProfileId",
              dataType: "STRING",
              dataValue: `Solar-Production-PVWatts-6kW-${providerAccountId}`,
              scenarios: "solar,after",
              dataFactor: 1.0,
            },
            {
              keyName: "projectDuration",
              dataType: "INTEGER",
              dataValue: "31",
            },
            {
              keyName: "rateInflation",
              dataType: "DECIMAL",
              dataValue: "3.0",
              scenarios: "before,after",
            },
            {
              keyName: "rateInflation",
              dataType: "DECIMAL",
              dataValue: "2.0",
              scenarios: "solar",
            },
            {
              keyName: "solarDegradation",
              dataType: "DECIMAL",
              dataValue: "0.5",
              scenarios: "solar",
            },
          ],
          rateInputs: [
            {
              chargeType: "FIXED_PRICE",
              chargePeriod: "MONTHLY",
              transactionType: "BUY",
              rateBands: [
                {
                  rateAmount: 0.0,
                },
              ],
              scenarios: "solar",
            },
          ],
        }),
      });

      if (!analysis.ok) throw new Error(await analysis.text());
      const analysisData = await analysis.json();
      // Pull only the first result
      const seriesResult = analysisData?.results?.[0];

      const estimatedAnnualSavings =
        estimatedMonthlyKw * 12 * pricePerKwh * 0.8; // 80% savings
      const penalCount = recommendedSizeKw / 400;
      localStorage.setItem("emailGlobal", email || "");
      localStorage.setItem("nameGlobal", firstName || "");
      const allData = {
        providerAccountId, pricePerKwh, selectedTerritoryName: selectedTerritory?.name, estimatedMonthlyKw, recommendedSizeKw, estimatedAnnualSavings, penalCount, accountName,
        series: seriesResult?.series || [], seriesData: seriesResult?.seriesData || [], address, ustate, firstName, lastName, email,
      };
      //localStorage.setItem("solarSetup", JSON.stringify(allData));

      //console.log("providerAccountId", providerAccountId);

      return {
        utilityName: selectedTerritory?.name || "Unknown Utility",
        pricePerKwh,
        estimatedMonthlyKw,
        recommendedSizeKw,
        estimatedAnnualSavings,
        providerAccountId,
        penalCount,
        seriesData: {
          series: seriesResult?.series || [],
          seriesData: seriesResult?.seriesData || [],
        },
      };
    } catch (error: unknown) {
      console.error("Genability API error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch utility data."
      );
    } finally {
      //dispatch(setLoading(false));
    }
  };

  const propertyTypes = [
    "Select property type",
    "Single Family Home",
    "Townhome",
    "Condo",
  ];


  const handleContinue = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearErrors());


      const validationErrors: { [key: string]: boolean } = {};

      // Validate all fields
      if (!validateField("firstName", firstName)) validationErrors.firstName = true;
      if (!validateField("lastName", lastName)) validationErrors.lastName = true;
      if (!validateField("email", email)) validationErrors.email = true;
      if (!validateField("email", email)) setemailError("Invalid email format");
      if (!validateField("phone", phone)) validationErrors.phone = true;
      if (!validateField("ownsHome", ownsHome)) validationErrors.ownsHome = true;
      if (!validateField("propertyType", propertyType)) validationErrors.propertyType = true;
      if (!validateField("powerBill", powerBill)) validationErrors.powerBill = true;
      if (!validateField("password", password)) validationErrors.password = true;
      if (!validateField("confirmPassword", confirmPassword, { password })) validationErrors.confirmPassword = true;
      if (Object.keys(validationErrors).length > 0) {
        dispatch(setMultipleFieldErrors(validationErrors));
        dispatch(setLoading(false));
        return;
      }

            if (ownsHome === "rent") {
       showIneligibleModal();
        dispatch(setLoading(false));
        return;
      }

      // Check for disqualified property type
      if (propertyType === "Townhome" || propertyType === "Condo") {
        showIneligibleModal();
        dispatch(setLoading(false));
        return;
      }

      const genabilityInfo = await fetchUtilityAndTariff();
      let userCredential;
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      if (genabilityInfo) {
        await set(ref(db, `users/${user.uid}`), {
          displayName: firstName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
          address: address,
          ownsHome: ownsHome,
          propertyType: propertyType,
          powerBill: powerBill,
          state: ustate,
          phoneNumber: auth.currentUser.phoneNumber,
          annualUsage: powerBill * 12 || 12000, // Default to 12000 if not provided
          monthlyBill: powerBill || 0,
          genabilityInfo: {
            utilityName: genabilityInfo.utilityName,
            pricePerKwh: genabilityInfo.pricePerKwh,
            estimatedMonthlyKw: genabilityInfo.estimatedMonthlyKw,
            recommendedSizeKw: genabilityInfo.recommendedSizeKw,
            estimatedAnnualSavings: genabilityInfo.estimatedAnnualSavings,
            providerAccountId: genabilityInfo.providerAccountId,
            penalCount: genabilityInfo.penalCount,
            series: genabilityInfo.seriesData.series ?? [],
            seriesData: genabilityInfo.seriesData.seriesData ?? [],
            summary: {
              totalGeneration: 0,
              averageMonthlyGeneration: 0,
            },
          },
          targetMonthlyBill: powerBill,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          isAutoPanelsSupported: true,
          profileComplete: true,
          createdAt: new Date(),
          stepName: "solarResult",
        });
        const data = {
          firstName,
          lastName,
          email,
          phone,
          password,
          address: address, // ✅ store text address
          ownsHome,
          propertyType,
          powerBill,
          state: ustate,
          genabilityInfo: {
            utilityName: genabilityInfo.utilityName,
            pricePerKwh: genabilityInfo.pricePerKwh,
            estimatedMonthlyKw: genabilityInfo.estimatedMonthlyKw,
            recommendedSizeKw: genabilityInfo.recommendedSizeKw,
            estimatedAnnualSavings: genabilityInfo.estimatedAnnualSavings,
            providerAccountId: genabilityInfo.providerAccountId,
            penalCount: genabilityInfo.penalCount,
            series: genabilityInfo.seriesData.series ?? [],
            seriesData: genabilityInfo.seriesData.seriesData ?? [],
            summary: {
              totalGeneration: 0,
              averageMonthlyGeneration: 0,
            },
          },
          targetMonthlyBill: powerBill,
          estimatedAnnualSavings: genabilityInfo.estimatedAnnualSavings,
          monthlyConsumption: powerBill ? powerBill : 0,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          isAutoPanelsSupported: true,
          profileComplete: true,
          createdAt: new Date(),
          stepName: "solarResult",
          uid: user.uid
        };
        
        localStorage.setItem("userData", JSON.stringify(data));
        setIsAuthenticated(true);
        setUserData(data);
        //
        setTimeout(()=>{
dispatch(setLoading(false));
dispatch(submitForm());
        },2000);
        console.log("form");
        
      }
    } catch (err: unknown) {
      console.error("Error fetching data:", err);
      dispatch(setLoading(false));
    }
  };


  return (
     

    <div className="custom-formcls p-10 rounded-xl max-w-[700px] ml-auto">
      <h3 className="text-gray-300 text-3xl mb-3">Design your solar system</h3>
      <p className="text-gray-300 text-xl">Create your personalized account and get a solar estimate tailored to
        your home.</p>

      <h4 className="mt-4 flex items-center text-white text-lg"><img className="mr-2" src={profile}
        alt="profile" /> your personalized account</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">First Name</label>
          <input type="text" value={firstName} onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)} className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.firstName ? "border-red-500" : "border-white/30"}`}
            placeholder="Enter your first name" />
          {getErrorMessage("firstName", "First name is required.")}
        </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Last Name</label>
          <input type="text" value={lastName} onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)} className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.lastName ? "border-red-500" : "border-white/30"}`} placeholder="Enter your last name" />
          {getErrorMessage("lastName", "Last name is required.")}
        </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Email Address</label>
          <input type="email" value={email} onChange={(e) => handlePersonalInfoChange("email", e.target.value)} className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.email ? "border-red-500" : "border-white/30"}`} placeholder="your@email.com" />
          {getErrorMessage("email", emailError)} </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => {
            let input = e.target.value; if (input.startsWith("+")) { input = "+" + input.slice(1).replace(/\D/g, ""); }
            else {
              input = input.replace(/\D/g, "");
            }
            const digitCount = input.startsWith("+") ? input.slice(1).length : input.length;
            if (digitCount <= 11) {
              handlePersonalInfoChange("phone", input);
            }
          }}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.phone ? "border-red-500" : "border-white/30"}`} placeholder="+15551234567"
          />
          {getErrorMessage("phone", "Please enter a valid phone number.")}
        </div>
        <div className="w-full">
          <label className="w-full text-gray-300 text-base ">Create Password</label>

          <div className="relative flex items-center justify-center">
            {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 mt-1 " /> */}
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => handlePasswordChange(e.target.value)} className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.password ? "border-red-500" : "border-white/30"}`} placeholder="Create a secure password"
            />
            <button type="button" onClick={() => dispatch(togglePasswordVisibility({ field: "password" }))} className="absolute right-3 mt-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {getErrorMessage("password", "Password must meet all requirements.")}
        </div>

        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Confirm Password</label>
          <div className="relative">
            {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 mt-1" /> */}
            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.confirmPassword ? "border-red-500" : "border-white/30"}`}
              placeholder="Confirm your password" />
            <button type="button" onClick={() => dispatch(togglePasswordVisibility({ field: "confirmPassword" }))} className="absolute mt-1 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {getErrorMessage("confirmPassword", "Passwords must match.")}

        </div>
        {/* Password Requirements */}
        {password.length > 0 && (
          <div className="disclaimer-bg w-full mt-5 text-white p-4 rounded-lg text-sm bg-white/50 rounded-lg p-4 border border-gray-200">
            <p className="tesla-caption text-sm text-gray-700 mb-3 text-white
            "> Password Requirements: </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className={`flex items-center gap-2 ${passwordRequirements.length ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordRequirements.length ? "text-green-600" : "text-gray-400"}`} /><span>At least 8 characters</span> </div>
              <div className={`flex items-center gap-2 ${passwordRequirements.uppercase ? "text-green-600" : "text-gray-500"}`}>
                <Check className={`w-3 h-3 ${passwordRequirements.uppercase ? "text-green-600" : "text-gray-400"}`} /><span>One uppercase letter</span> </div>
              <div className={`flex items-center gap-2 ${passwordRequirements.lowercase ? "text-green-600" : "text-gray-500"}`}>
                <Check className={`w-3 h-3 ${passwordRequirements.lowercase ? "text-green-600" : "text-gray-400"}`} /><span>One lowercase letter</span></div>
              <div className={`flex items-center gap-2 ${passwordRequirements.number ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordRequirements.number ? "text-green-600" : "text-gray-400"}`} />
                <span>One number</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordRequirements.special ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordRequirements.special ? "text-green-600" : "text-gray-400"}`} />
                <span>One special character</span>
              </div>
              <div className={`flex items-center gap-2 ${passwordsMatch ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordsMatch ? "text-green-600" : "text-gray-400"}`} />
                <span>Passwords match</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <h4 className="mt-10 flex items-center text-white text-lg"><img className="mr-2" src={profile} alt="profile" /> Property Information</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">
        <div className="w-full relative">
          <label className="w-full text-gray-300 text-base"> Property Address </label>
          {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-teal w-5 h-5 text-black" /> */}
          <input type="text" ref={addressInputRef} className="tesla-input w-full px-4 py-2 text-black mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500  text-white"
            placeholder="Enter your address" onBlur={async (e) => await validateField("address", e.target.value)} />
          {getErrorMessage("address", "Please select a address.")}
        </div>
        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Do you own your home?</label>
          <div className="flex gap-4 text-white customradio mt-3">
            <div className="w-1/2">
              <label className="flex items-center gap-3 cursor-pointer ">
                <input
                  type="radio"
                  name="ownership"
                  value="own"
                  className="accent-blue-600 w-5 h-5"
                  checked={ownsHome === "own"}
                  onChange={(e) => handlePropertyInfoChange("ownsHome", e.target.value)}
                />
                <span className="text-base p-4 rounded-md text-center">Yes, I own my home</span>
              </label>
            </div>

            {/* Right Column */}
            <div className="w-1/2">
              <label className="flex items-center gap-3 cursor-pointer ">
                <input type="radio" name="ownership" value="rent" className="accent-blue-600 w-5 h-5"
                  checked={ownsHome === "rent"}
                  onChange={(e) => handlePropertyInfoChange("ownsHome", e.target.value)}
                />
                <span className="text-base text-center p-4 rounded-md ">No, I rent</span>
              </label>
            </div>
          </div>


        </div>

        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Property Type</label>

          <select value={propertyType} onChange={async (e) => {
            const val = e.target.value; handlePropertyInfoChange("propertyType", val); await validateField("propertyType", val);
          }}
            onBlur={async (e) => await validateField("propertyType", e.target.value)}
            className={`mt-3 text-gray-300 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(8, 1, 1, 0.6)] text-black transition-all ${errors.propertyType ? "border-red-500" : "border-white/30"
              }`}
          >
            {propertyTypes.map((type, index) => (
              <option className="text-black text lg"
                key={index}
                value={index === 0 ? "" : type}
                disabled={index === 0}
              >
                {type}
              </option>
            ))}
          </select>

          {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div> */}
          {getErrorMessage("propertyType", "Please select a property type.")}
        </div>
        {/* Utility Company */}
        {territories.length > 0 && (
          <div className="w-full">
            <label className="block tesla-caption text-base text-gray-300 mb-3">      Utility Company </label>
            <div className="relative group cursor-pointer text-brand-teal" onClick={() => setShowDropdown(!showDropdown)}>

              <input readOnly value={selectedTerritory ? selectedTerritory.name : ""} placeholder="Select a Utility" className="tesla-input w-full px-4 py-2 text-black mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500  text-white" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {showDropdown && (
              <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 text-gray-800 shadow-lg">
                {territories.map((territory) => (
                  <li key={territory.lseId} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition" onClick={async () => {
                    setSelectedTerritory(territory);
                    setShowDropdown(false);
                    await validateField("utility", territory.name);
                  }}>
                    {territory.name}
                  </li>
                ))}
              </ul>
            )}
            {getErrorMessage("utility", "Please select a utility company.")}
          </div>
        )}
        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Average Electric Bill</label>
          <input type="number" value={powerBill === 0 ? "" : powerBill} onChange={(e) => handlePropertyInfoChange("powerBill", parseInt(e.target.value) || 0)}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.powerBill ? "border-red-500" : "border-white/30"}`}
            placeholder="150" />
          {getErrorMessage("powerBill", "Please enter your electric bill amount.")}
          <button className="text-sm text-gray-400 flex items-center mt-5" onClick={() => {
                        onOpenEnergyModal(), setShowKwh(true);
                      }}>
            <img className="mr-2" src={chartImage} /> or enter your energy consumption </button>
          <p className="text-sm text-gray-400 mt-3">By clicking below, I authorize SunLink to call me and send pre-recorded
            messages and text messages to me about SunLink products and services at the telephone number I entered
            above, using an autodialer, even if I am on a national or state "Do Not Call" list. Message and data
            rates may apply. Maximum 10 texts per month. Consent for calls & texts is optional. You can opt out
            anytime. You also agree to <a className="underline text-white" href="#">SunLink's Terms of Use</a> and <a
              className="underline  text-white" href="#">Privacy Policy</a></p>
        </div>
        <div className="w-full mt-10">
          <button onClick={handleContinue} className=" bg-orange hover:bg-orange  py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase rounded-xl">
            Create Account & Continue            {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" /> */}
          </button>
        </div>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-400 text-sm font-medium">
                Loading...
              </p>
            </div>
          </motion.div>
        )}
        {/* Energy Consumption Modal */}
        {showEdit && (
          <div className="w-full bg-slate-800 rounded-xl border border-slate-500 p-4 mb-4 text-white">
            <div className="flex justify-between items-center text-sm mb-3">
              Edit Annual Usage
              <span className="flex items-center gap-2">
                <Check size={16} className="cursor-pointer text-green-400" onClick={() => setShowEdit(false)} />
                <X size={16} className="cursor-pointer text-red-400" onClick={() => setShowEdit(false)} />
              </span>
            </div>

            {/* Toggle View */}
            <div className="flex gap-4 mt-3 rounded-xl border border-slate-500 p-3">
              <div className="w-1/2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="usageType" value="annual" checked={viewMode === 'annual'} onChange={() => setViewMode('annual')}
                    className="accent-blue-600 w-5 h-5" />
                  <span className="text-sm py-4 px-1 rounded-md text-center">Annual Total</span>
                </label>
              </div>

              <div className="w-1/2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="usageType" value="monthly" checked={viewMode === 'monthly'} onChange={() => setViewMode('monthly')} className="accent-blue-600 w-5 h-5" />
                  <span className="text-sm py-4 px-1 rounded-md text-center">Monthly Breakdown</span>
                </label>
              </div>
            </div>

            {/* Annual Usage View */}
            {viewMode === 'annual' && (
              <>
                <div className="text-sm mt-4">Total Annual Usage (kWh)</div>
                <div className="flex justify-between text-white mt-1 bg-slate-800 rounded-xl border border-slate-500 p-3"><span className="text-sm">15000</span></div>
                <div className="text-xs mt-4">Average monthly: 1,287 kWh</div>
              </>
            )}

            {/* Monthly Breakdown View */}
            {viewMode === 'monthly' && (
              <div className="grid grid-cols-3 py-3 gap-3">
                {months.map((month) => (
                  <div key={month} className="space-y-1">
                    <label className="text-xs text-slate-400">{month}</label>
                    <input type="text" defaultValue="1200" className="bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded border border-slate-500 w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

        )}
      </div>

     
    </div>
  );
};
export default SolarForm;

