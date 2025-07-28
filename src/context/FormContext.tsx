// FormContext.tsx
import { FormContextType } from "../domain/interfaces/FormContextInterface";
import React, { createContext, useState, useEffect } from "react";
import { localUserData } from "../store/solarSlice"; // assuming this is an interface
import { GenabilityData } from "../store/solarSlice"; // import it from proper location

const defaultUserData: localUserData = {
  firstName: "",
  lastName: "",
  email: "",
  uid:"",
  phone: "",
  password: "",
  address: "",
  ownsHome: false,
  propertyType: "",
  powerBill: 0,
  state: "",
  genabilityInfo: {} as GenabilityData,
  targetMonthlyBill: 0,
  monthlyConsumption: 0,
  coordinates: { latitude: 0, longitude: 0 },
  isAutoPanelsSupported: false,
  profileComplete: false,
  createdAt: new Date().toISOString(),
  stepName: "",
  pricePerKwh: undefined,
};

export const FormContext = createContext<FormContextType>({
  showForm: false,
  setShowForm: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userData: defaultUserData,
  setUserData: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    console.log("localStorage.getIte",localStorage.getItem("userData"));
    return localStorage.getItem("userData") !== null;
  });

  const [userData, setUserData] = useState<localUserData>(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : defaultUserData;
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData, isAuthenticated]);

  return (
    <FormContext.Provider
      value={{
        showForm,
        setShowForm,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
