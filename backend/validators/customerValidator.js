export const validateCustomer = (data) => {
  const errors = [];

  // Name
  if (!data.name?.first?.trim()) {
    errors.push("First name is required.");
  }

  // Phone
  if (!data.contact?.phone?.trim()) {
    errors.push("Phone number is required.");
  } else {
    const phoneRegex = /^(?:\+254|254|0)[17]\d{8}$/;

    if (!phoneRegex.test(data.contact.phone.trim())) {
      errors.push("Invalid phone number.");
    }
  }

  // Email (Optional)
  if (data.contact?.email?.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.contact.email.trim())) {
      errors.push("Invalid email address.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};