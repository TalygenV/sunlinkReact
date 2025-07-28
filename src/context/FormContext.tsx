// FormContext.tsx
import { FormContextType } from "../domain/interfaces/FormContextInterface";
import React, { createContext, useState, useEffect, useContext, SetStateAction } from "react";
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
  ownsHome: "",
  propertyType: "",
  powerBill: 0,
  state: "",
  genabilityInfo: {} as GenabilityData,
  targetMonthlyBill: 0,
  monthlyConsumption: 0,
  coordinates: { latitude: 0, longitude: 0 },
  isAutoPanelsSupported: false,
  profileComplete: false,
  createdAt: new Date(),
  stepName: "",
  pricePerKwh: undefined,
};

export const FormContext = createContext<FormContextType>({
  showForm: false,
  setShowForm: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userData: defaultUserData || null,
  setUserData: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("userData") !== null;
  });

  const [userData, setUserData] = useState<localUserData | null>(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
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
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within a FormProvider');
  return context;
};
