import { Dispatch, SetStateAction } from "react";
import { localUserData } from "../../store/solarSlice";

export interface FormContextType {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: localUserData | null; // ✅ Fix here
  setUserData: React.Dispatch<React.SetStateAction<localUserData | null>>; // ✅ Fix here too
}
