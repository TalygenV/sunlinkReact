import { Dispatch, SetStateAction } from "react";
import { localUserData } from "../../store/solarSlice";

export interface FormContextType {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  userData: localUserData
  setUserData: Dispatch<SetStateAction<localUserData>>;
}
