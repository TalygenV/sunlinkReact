export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUSPhoneNumber = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, "");
  
  // Accept either 10 digits (no country code) or 11 digits starting with '1' (with +1)
  if (digitsOnly.length === 10) return true;
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) return true;
  
  return false;
};

export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateField = (field: string, value: any, relatedValues: { [key: string]: any } = {}): boolean => {
  switch (field) {
    case "firstName":
    case "lastName":
      return !!value.trim();
      
    case "email":
      return !!value.trim() && isValidEmail(value.trim());
      
    case "phone":
      return !!value.trim() && isValidUSPhoneNumber(value);
      
    case "address":
      return !!(value.lat && value.lng);
      
    case "ownsHome":
      return !!value.trim();
      
    case "propertyType":
      return !!value && value !== "";
      
    case "utilityCompany":
      return !!value;
      
    case "powerBill":
      return !!value && Number(value) > 0;
      
    case "password":
      const requirements = validatePassword(value);
      return Object.values(requirements).every(Boolean);
      
    case "confirmPassword":
      return !!value && value === relatedValues?.password;
      
    default:
      return true;
  }
};