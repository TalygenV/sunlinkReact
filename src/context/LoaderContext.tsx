import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoaderContextType {
  loading: boolean;
  message: string;
  showLoader: (msg?: string) => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
};

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const showLoader = (msg: string = "Loading...") => {
    setMessage(msg);
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
    setMessage("Loading...");
  };

  return (
    <LoaderContext.Provider value={{ loading, message, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
