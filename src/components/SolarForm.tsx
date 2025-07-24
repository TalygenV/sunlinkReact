import { useEffect, useRef, useState } from "react";
import { Search, Lock, Eye, EyeOff, Check, X, ChevronDown, BarChart3, } from "lucide-react";
//import { GenabilityData, SolarData, Tariff } from "../domain/types";
import profile from '../assets/images/profile.svg';
import { useSelector } from 'react-redux';
import { setPersonalInfo, setPassword, setConfirmPassword, setPropertyInfo, togglePasswordVisibility, setFieldError, setMultipleFieldErrors, clearErrors, setLoading, } from "../store";
import { validateField, validatePassword } from "../utils/validation";
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { submitForm } from '../store/solarSlice';
import { RootState } from '../store';
import { ref, set } from "firebase/database";
import { doc, setDoc, getDoc, collection, query, where, getDocs, } from "firebase/firestore";
import { app, auth, db, firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const GENABILITY_APP_ID = import.meta.env.GENABILITY_APP_ID;
const GENABILITY_API_KEY = import.meta.env.GENABILITY_API_KEY;
const base_url = "https://api.genability.com";
const basic_token = "ZGI5MTczMGItNWUwNi00N2I1LWI3MjAtNzcyZDc5ODUyNTA1OjBiY2U1M2RiLTc3NjItNGQ0Zi1iZDA1LWYzODEwNWE1OWI5YQ==";
type Territory = {
  name: string;
  code: string;
  websiteHome: string;
  lseId: number;
};
const SolarForm = () => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, email, phone, password, confirmPassword, ownsHome, propertyType, powerBill, showPassword, showConfirmPassword, errors, zipCode, address } = useAppSelector((state) => state.solar.solarForm);
  const passwordRequirements = validatePassword(password);
  const [showKwh, setShowKwh] = useState(false);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const getErrorMessage = (field: string, message: string) => errors[field] ? (<p className="text-sm text-red-500 mt-1">{message}</p>) : null;
  const handleFieldValidation = (field: string, value: any, relatedValues: { [key: string]: any } = {}) => {
    const isValid = validateField(field, value, relatedValues);
    dispatch(setFieldError({ field, hasError: !isValid }));
    return isValid;
  };
  const handlePersonalInfoChange = (field: string, value: string) => {
    dispatch(setPersonalInfo({ [field]: value }));
    handleFieldValidation(field, value);
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

  const [showDropdown, setShowDropdown] = useState(false);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);

  const [annualUsage, setAnnualUsage] = useState("");
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [energyInputMode, setEnergyInputMode] = useState<"annual" | "monthly">("annual");
  const [monthlyUsages, setMonthlyUsages] = useState(Array(12).fill(""));

  const [showEnergyModal, setShowEnergyModal] = useState(false);

  const handleMonthlyUsageChange = (index: number, value: string) => {
    const newUsages = [...monthlyUsages];
    newUsages[index] = value;
    setMonthlyUsages(newUsages);
  };

  const handleEnergyModal = (value: any) => {
    setShowEnergyModal(value);
  };
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const handleEnergySubmit = () => {
    let estimatedMonthlyBill = 0;

    if (energyInputMode === "annual" && annualUsage) {
      estimatedMonthlyBill = Math.round((Number(annualUsage) * 0.15) / 12);
    } else if (energyInputMode === "monthly") {
      const totalAnnualUsage = monthlyUsages.reduce(
        (sum, usage) => sum + (Number(usage) || 0),
        0
      );
      estimatedMonthlyBill = Math.round((totalAnnualUsage * 0.15) / 12);
    }

    //setPowerBill(estimatedMonthlyBill);
    handleEnergyModal(false);
  };



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
        let postalCode: string | undefined = undefined;
        if (addressInputRef.current?.value)
          dispatch(setPersonalInfo({ ['address']: addressInputRef.current?.value }));
        // Extract postal code from address_components
        if (place.address_components) {
          for (const component of place.address_components) {
            if (component.types.includes("postal_code")) {
              postalCode = component.long_name;
              dispatch(setPersonalInfo({ ['zipCode']: component.long_name }));
              break;
            }
            if (component.types.includes("administrative_area_level_1")) {
              dispatch(setPersonalInfo({ ['state']: component.long_name }));
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

      // Check eligibility
      if (ownsHome === "no") {
        alert("Unfortunately, solar installation is only available for homeowners.");
        dispatch(setLoading(false));
        return;
      }

      if (propertyType === "Townhome" || propertyType === "Condo") {
        alert("Unfortunately, this property type is not eligible for our solar program.");
        dispatch(setLoading(false));
        return;
      }

      // Process form submission
      console.log("Form submitted successfully!");
      dispatch(submitForm());
    } catch (err: unknown) {
      console.error("Error fetching data:", err);

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
          {/* <input type="text" name="fname" placeholder=""
            className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" /> */}

          <input type="text"
            value={firstName}
            onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.firstName ? "border-red-500" : "border-white/30"
              }`}
            placeholder="Enter your first name"
          />
          {getErrorMessage("firstName", "First name is required.")}
        </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Last Name</label>
          {/* <input type="text" name="lname" placeholder="" className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" /> */}

          <input
            type="text"
            value={lastName}
            onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.lastName ? "border-red-500" : "border-white/30"
              }`}
            placeholder="Enter your last name"
          />
          {getErrorMessage("lastName", "Last name is required.")}
        </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Email Address</label>
          {/* <input type="email" name="fname" placeholder="" className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" /> */}
          <input
            type="email"
            value={email}
            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.email ? "border-red-500" : "border-white/30"
              }`}
            placeholder="your@email.com"
          />
          {getErrorMessage("email", "Please enter a valid email address.")}

        </div>
        <div className="w-full sm:w-[calc(50%-0.75rem)]">
          <label className="w-full text-gray-300 text-base ">Phone Number</label>
          {/* <input type="tel" name="lname" placeholder=""
            className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" /> */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              let input = e.target.value;
              if (input.startsWith("+")) {
                input = "+" + input.slice(1).replace(/\D/g, "");
              } else {
                input = input.replace(/\D/g, "");
              }

              const digitCount = input.startsWith("+") ? input.slice(1).length : input.length;
              if (digitCount <= 11) {
                handlePersonalInfoChange("phone", input);
              }
            }}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.phone ? "border-red-500" : "border-white/30"
              }`}
            placeholder="+15551234567"
          />
          {getErrorMessage("phone", "Please enter a valid phone number.")}
        </div>
        <div className="w-full">
          <label className="w-full text-gray-300 text-base ">Create Password</label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`mt-3 w-full px-4 py-4 pl-10 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.password ? "border-red-500" : "border-white/30"
                }`}
              placeholder="Create a secure password"
            />
            <button
              type="button"
              onClick={() => dispatch(togglePasswordVisibility({ field: "password" }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {getErrorMessage("password", "Password must meet all requirements.")}
        </div>

        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className={`mt-3 w-full px-4 py-4 pl-10 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.confirmPassword ? "border-red-500" : "border-white/30"
                }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => dispatch(togglePasswordVisibility({ field: "confirmPassword" }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {getErrorMessage("confirmPassword", "Passwords must match.")}

        </div>
        {/* Password Requirements */}
        {password.length > 0 && (
          <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
            <p className="tesla-caption text-sm text-gray-700 mb-3">
              Password Requirements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div
                className={`flex items-center gap-2 ${passwordRequirements.length ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordRequirements.length ? "text-green-600" : "text-gray-400"}`} />
                <span>At least 8 characters</span>      </div>
              <div className={`flex items-center gap-2 ${passwordRequirements.uppercase ? "text-green-600" : "text-gray-500"}`}  >
                <Check className={`w-3 h-3 ${passwordRequirements.uppercase ? "text-green-600" : "text-gray-400"}`} />
                <span>One uppercase letter</span> </div>
              <div className={`flex items-center gap-2 ${passwordRequirements.lowercase ? "text-green-600" : "text-gray-500"}`} >
                <Check className={`w-3 h-3 ${passwordRequirements.lowercase ? "text-green-600" : "text-gray-400"}`} />
                <span>One lowercase letter</span>
              </div>
              <div
                className={`flex items-center gap-2 ${passwordRequirements.number ? "text-green-600" : "text-gray-500"}`} >
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

      <h4 className="mt-10 flex items-center text-white text-lg"> Property Information</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">

        <div className="w-full ">
          <label className="w-full text-gray-300 text-base">
            Property Address
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-teal w-5 h-5 bg-white" />
            <input
              type="text"
              ref={addressInputRef}
              className="tesla-input w-full px-4 py-2 text-black mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500  text-white"
              placeholder="Enter your address"
              onBlur={async (e) =>
                await validateField("address", e.target.value)
              }
            />
          </div>
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
                <input
                  type="radio"
                  name="ownership"
                  value="rent"
                  className="accent-blue-600 w-5 h-5"
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
          {/* <select
            className="mt-3 text-gray-300 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white">
            <option>Select property type</option>
          </select> */}
          <select value={propertyType} onChange={async (e) => {
            const val = e.target.value; handlePropertyInfoChange("propertyType", val); await validateField("propertyType", val);
          }}
            onBlur={async (e) => await validateField("propertyType", e.target.value)}
            className={`mt-3 text-gray-300 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(8, 1, 1, 0.6)] text-black transition-all ${errors.propertyType ? "border-red-500" : "border-white/30"
              }`}
          >
            {propertyTypes.map((type, index) => (
              <option
                key={index}
                value={index === 0 ? "" : type}
                disabled={index === 0}
              >
                {type}
              </option>
            ))}
          </select>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {getErrorMessage(
            "propertyType",
            "Please select a property type."
          )}
        </div>
        {/* Utility Company */}
        {territories.length > 0 && (
          <div className="w-full">
            <label className="block tesla-caption text-sm text-gray-700 mb-3">
              Utility Company
            </label>
            <div
              className="relative group cursor-pointer text-brand-teal"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-teal w-5 h-5 text-black" />
              <input
                readOnly
                value={
                  selectedTerritory ? selectedTerritory.name : ""
                }
                placeholder="Select a Utility"
                className="tesla-input w-full px-4 py-2 text-black mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500  text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {showDropdown && (
              <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 text-gray-800 shadow-lg">
                {territories.map((territory) => (
                  <li
                    key={territory.lseId}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                    onClick={async () => {
                      setSelectedTerritory(territory);
                      setShowDropdown(false);
                      await validateField("utility", territory.name);
                    }}
                  >
                    {territory.name}
                  </li>
                ))}
              </ul>
            )}
            {getErrorMessage(
              "utility",
              "Please select a utility company."
            )}
          </div>
        )}
        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Average Electric Bill</label>
          {/* <input type="text" name="paddress" placeholder="0"
            className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" /> */}

          <input
            type="number"
            value={powerBill === 0 ? "" : powerBill}
            onChange={(e) => handlePropertyInfoChange("powerBill", parseInt(e.target.value) || 0)}
            className={`mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white transition-all ${errors.powerBill ? "border-red-500" : "border-white/30"
              }`}
            placeholder="150"
          />
          {getErrorMessage("powerBill", "Please enter your electric bill amount.")}
          <button className="text-sm text-gray-400 flex items-center" onClick={() => { handleEnergyModal(true), setShowKwh(true); }}>
            <BarChart3 className="mr-1" /> or enter your energy consumption </button>
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
        {/* Energy Consumption Modal */}
        {showEnergyModal && (
          <div className="p-6 bg-white rounded-lg shadow-lg relative overflow-hidden">
            <div className="tesla-card tesla-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-orange to-brand-teal rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="tesla-heading text-2xl text-gray-900"> Energy Consumption    </h3> </div>
                  <button onClick={() => { handleEnergyModal(false); }} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
                    <X className="w-4 h-4 text-gray-600" />  </button>            </div>

                {/* Toggle Buttons */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                  <button onClick={() => setEnergyInputMode("annual")} className={`tesla-button flex-1 py-3 px-4 ${energyInputMode === "annual" ? "bg-white text-brand-teal shadow-sm" : "text-gray-600 hover:text-gray-800"}`}>Annual Total </button>
                  <button onClick={() => setEnergyInputMode("monthly")} className={`tesla-button flex-1 py-3 px-4 ${energyInputMode === "monthly" ? "bg-white text-brand-teal shadow-sm" : "text-gray-600 hover:text-gray-800"}`}> Month by Month </button>
                </div>

                {/* Annual Input */}
                {energyInputMode === "annual" && (
                  <div className="w-full">
                    <label className="w-full text-gray-300 text-base">
                      Total Annual Energy Usage
                    </label>
                    <div className="relative">
                      <input type="number" value={annualUsage} onChange={(e) => setAnnualUsage(e.target.value)} className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" placeholder="12000" />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"> kWh/year </span>
                    </div>

                    <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10">
                      <p className="tesla-body text-gray-700 text-sm">
                        <strong>Tip:</strong> You can find your annual usage on  your utility bill or by adding up 12 months of usage from your online account.   </p>
                    </div>
                  </div>
                )}

                {/* Monthly Input */}
                {energyInputMode === "monthly" && (
                  <div className="space-y-4">
                    <p className="tesla-body text-gray-600 text-sm mb-4">
                      Enter your monthly energy usage for each month (in kWh).
                      You can find this information on your utility bills.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {monthNames.map((month, index) => (
                        <div key={month}>
                          <label className="block tesla-caption text-xs text-gray-700 mb-1">   {month}           </label>
                          <div className="relative">
                            <input type="number" value={monthlyUsages[index]} onChange={(e) => handleMonthlyUsageChange(index, e.target.value)}
                              className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white" placeholder="1000" />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"> kWh     </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tesla-gradient-bg rounded-lg p-4 border border-brand-orange/10">
                      <p className="tesla-body text-gray-700 text-sm">
                        <strong>Total Annual Usage:</strong>{" "}
                        {monthlyUsages
                          .reduce(
                            (sum, usage) => sum + (parseInt(usage) || 0),
                            0
                          )
                          .toLocaleString()}{" "}
                        kWh
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => {
                      handleEnergyModal(false);
                    }}
                    className="tesla-button flex-1 bg-brand-gray hover:bg-brand-gray/80 text-gray-700 py-3 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEnergySubmit}
                    disabled={
                      (energyInputMode === "annual" && !annualUsage) ||
                      (energyInputMode === "monthly" &&
                        monthlyUsages.every((usage) => !usage))
                    }
                    className="tesla-button flex-1 bg-gradient-to-r from-brand-orange to-brand-teal hover:from-brand-orange-dark hover:to-brand-teal-dark text-white py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Use This Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SolarForm;

