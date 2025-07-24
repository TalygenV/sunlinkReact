import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SolarFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  lat: number;
  lng: number;
  zipCode: number;
  state: string,
  city: string,
  ownsHome: string;
  propertyType: string;
  utility: string;
  powerBill: number;
  showPassword: boolean;
  showConfirmPassword: boolean;
  errors: { [key: string]: boolean };
  showKwh: boolean;
}

interface SolarState {
  solarForm: SolarFormData;
  isLoading: boolean;
  isSubmitted: boolean;
  estimatedSavings: number;
}

const initialState: SolarState = {
  solarForm: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    zipCode: 0,
    lat: 0,
    lng: 0,
    city: "",
    state: "",
    ownsHome: 'own',
    propertyType: '',
    utility: '',
    powerBill: 0,
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
    showKwh: false,
  },
  isLoading: false,
  isSubmitted: false,
  estimatedSavings: 0,
};

const solarSlice = createSlice({
  name: 'solar',
  initialState,
  reducers: {
    setPersonalInfo: (
      state,
      action: PayloadAction<{ [key: string]: string | number | boolean }>
    ) => {
      Object.keys(action.payload).forEach(key => {
        if (key in state.solarForm) {
          (state.solarForm as any)[key] = action.payload[key];
        }
      });
    },
    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.solarForm.password = action.payload.password;
    },
    setConfirmPassword: (state, action: PayloadAction<{ confirmPassword: string }>) => {
      state.solarForm.confirmPassword = action.payload.confirmPassword;
    },
    setPropertyInfo: (state, action: PayloadAction<{ [key: string]: any }>) => {
      Object.keys(action.payload).forEach(key => {
        if (key in state.solarForm) {
          (state.solarForm as any)[key] = action.payload[key];
        }
      });
    },
    togglePasswordVisibility: (state, action: PayloadAction<{ field: string }>) => {
      if (action.payload.field === 'password') {
        state.solarForm.showPassword = !state.solarForm.showPassword;
      } else if (action.payload.field === 'confirmPassword') {
        state.solarForm.showConfirmPassword = !state.solarForm.showConfirmPassword;
      }
    },
    setFieldError: (state, action: PayloadAction<{ field: string; hasError: boolean }>) => {
      state.solarForm.errors[action.payload.field] = action.payload.hasError;
    },
    setMultipleFieldErrors: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.solarForm.errors = { ...state.solarForm.errors, ...action.payload };
    },
    clearErrors: (state) => {
      state.solarForm.errors = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<SolarFormData>>) => {
      state.solarForm = { ...state.solarForm, ...action.payload };
    },
    submitForm: (state) => {
      state.isSubmitted = true;
      state.isLoading = false;
      // Calculate estimated savings based on power bill
      state.estimatedSavings = state.solarForm.powerBill * 12 * 0.8;
    },
    resetForm: (state) => {
      state.solarForm = initialState.solarForm;
      state.isSubmitted = false;
      state.estimatedSavings = 0;
    },
  },
});

export const {
  setPersonalInfo,
  setPassword,
  setConfirmPassword,
  setPropertyInfo,
  togglePasswordVisibility,
  setFieldError,
  setMultipleFieldErrors,
  clearErrors,
  setLoading,
  updateFormData,
  submitForm,
  resetForm
} = solarSlice.actions;

export default solarSlice.reducer;