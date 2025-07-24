import { configureStore } from '@reduxjs/toolkit';
import solarReducer from './solarSlice';

export const store = configureStore({
  reducer: {
    solar: solarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export actions for convenience
export { 
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
} from './solarSlice';