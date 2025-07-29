import React from "react";
import { ClipLoader } from "react-spinners";
import { useLoader } from "../context/LoaderContext";

const GlobalSpinner: React.FC = () => {
  const { loading, message } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center space-y-4 text-white">
      <ClipLoader color="#ffffff" size={80} />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default GlobalSpinner;
