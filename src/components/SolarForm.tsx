import { useEffect, useRef, useState } from "react";
import { Search, Zap, ArrowRight, User, Building2, Mail, Phone, Home, X, BarChart3, Lock, Eye, EyeOff, Check, ChevronLeft, AlertCircle, ChevronDown, CheckCircle, } from "lucide-react";
import { GenabilityData, SolarData, Tariff } from "../domain/types";
import profile from '../assets/images/profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo, setPassword, setConfirmPassword, setPropertyInfo, togglePasswordVisibility, setFieldError, setMultipleFieldErrors, clearErrors, setLoading, } from "../store";
import { validateField, validatePassword } from "../utils/validation";
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateFormData, submitForm } from '../store/solarSlice';
import { Sun, Calendar, DollarSign, MapPin } from 'lucide-react';
import { RootState } from '../store';


const GENABILITY_APP_ID = import.meta.env.GENABILITY_APP_ID || "db91730b-5e06-47b5-b720-772d79852505";
const GENABILITY_API_KEY = import.meta.env.GENABILITY_API_KEY || "e9fd3859-80a0-4802-86b1-add58689c540";
const base_url = "https://api.genability.com";
const basic_token = "ZGI5MTczMGItNWUwNi00N2I1LWI3MjAtNzcyZDc5ODUyNTA1OjBiY2U1M2RiLTc3NjItNGQ0Zi1iZDA1LWYzODEwNWE1OWI5YQ==";

const SolarForm = () => {
  const dispatch = useAppDispatch();

  const { firstName, lastName, email, phone, password, confirmPassword, ownsHome, propertyType, powerBill, showPassword, showConfirmPassword, errors, } = useAppSelector((state) => state.solar.solarForm);
  const passwordRequirements = validatePassword(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const getErrorMessage = (field: string, message: string) =>
    errors[field] ? (
      <p className="text-sm text-red-500 mt-1">{message}</p>
    ) : null;
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
  const user = useSelector((state: RootState) => state.solar);

  // const handleEnergyModal = (value: any) => {
  //   setShowEnergyModal(value);
  // };
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;

    if (addressInputRef.current && window.google) {
      autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address", "geometry"],
          types: ["address"],
        }
      );

      const listener = autocomplete.addListener("place_changed", async () => {
        const place = autocomplete.getPlace();
        const address = addressInputRef.current?.value;
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();

        let postalCode: string | undefined = undefined;

        if (place.address_components) {
          for (const component of place.address_components) {
            if (component.types.includes("postal_code")) {
              postalCode = component.long_name;
              setZipCode(component.long_name);
            }
            if (component.types.includes("administrative_area_level_1")) {
              setstate(component.long_name);
            }
            if (component.types.includes("locality")) {
              setCity(component.long_name);
            } else if (component.types.includes("administrative_area_level_2")) {
              setCity(component.long_name);
            }
          }
        }

        if (address && lat && lng) {
          setFormattedAddress(address);
          setAddress({ lat, lng });
          await validateField("address", { lat, lng });

          try {
            const response = await fetch(
              `${base_url}/rest/public/lses?addressString=${address}&country=US&residentialServiceTypes=ELECTRICITY&sortOn=totalCustomers&sortOrder=DESC`,
              {
                method: "GET",
                headers: {
                  Authorization: `Basic ${basic_token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();

            if (data.status === "success") {
              const filteredList = (data.results || []).filter(
                (u: any) => u.name && u.websiteHome
              );
              setTerritories(filteredList);
            } else {
              setTerritories([]);
            }
          } catch (error) {
            console.error("Error fetching utilities:", error);
          }
        }
      });
    }

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
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

      <h4 className="mt-10 flex items-center text-white text-lg"><img className="mr-2" src={profile} alt="profile" /> Property Information</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">
        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Property Address</label>
          <input type="text"
            className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white"
            placeholder="Enter your address"
            onBlur={async (e) =>
              await validateField("address", e.target.value)
            }
          />
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
          <select
            value={propertyType}
            onChange={async (e) => {
              const val = e.target.value;
              handlePropertyInfoChange("propertyType", val);
              await validateField("propertyType", val);
            }}
            onBlur={async (e) =>
              await validateField("propertyType", e.target.value)
            }
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
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {getErrorMessage(
            "propertyType",
            "Please select a property type."
          )}
        </div>

        <div className="w-full ">
          <label className="w-full text-gray-300 text-base ">Utility Company</label>
          <div className="relative group cursor-pointer text-brand-teal" onClick={() => setShowDropdown(!showDropdown)}>
            {/* <select
            className="mt-3 text-gray-300 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white">
            <option>Select your utility company</option>
          </select> */}
            <input
              type="text"
              className="mt-3 w-full px-4 py-4 border bg-[#ffffff1a] focus:ring-blue-500 focus:border-blue-500 border-[rgba(255,255,255,0.6)] text-white"
              placeholder="Select your utility company"
              readOnly
            />

          </div>

          {getErrorMessage(
            "utility",
            "Please select a utility company."
          )}
        </div>

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

          <p className="text-sm text-gray-400 mt-3">By clicking below, I authorize SunLink to call me and send pre-recorded
            messages and text messages to me about SunLink products and services at the telephone number I entered
            above, using an autodialer, even if I am on a national or state "Do Not Call" list. Message and data
            rates may apply. Maximum 10 texts per month. Consent for calls & texts is optional. You can opt out
            anytime. You also agree to <a className="underline text-white" href="#">SunLink's Terms of Use</a> and <a
              className="underline  text-white" href="#">Privacy Policy</a></p>
        </div>
        <div className="w-full mt-10">
          {/* <Link to="/About"
          className=" bg-orange hover:bg-orange  py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase rounded-xl">Create
          Account </Link> */}
          <button onClick={handleContinue} className=" bg-orange hover:bg-orange  py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase rounded-xl"
          >
            Create Account & Continue
            {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" /> */}
          </button>
        </div>

      </div>
    </div>
  );
};
export default SolarForm;

