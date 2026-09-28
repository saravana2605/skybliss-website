/**
 * Validation utilities for Skybliss reservation forms
 */

export function cleanPhoneNumber(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  // Strip leading 91 if pasted with country code (12 digits) or 0 (11 digits)
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  // Strictly enforce 10 digits with first digit being 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(phone);
}

export interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequest: string;
}

export function validateReservationForm(data: ReservationFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  } else if (!isValidIndianPhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!data.date.trim()) {
    errors.date = "Please select a date.";
  }

  if (!data.time.trim()) {
    errors.time = "Please select your preferred time.";
  }

  if (!data.guests.trim()) {
    errors.guests = "Please select the number of guests.";
  }

  return errors;
}
