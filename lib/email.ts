/** One definition of a valid email, shared by the server schema and the lightweight client check. */
export const EMAIL_MESSAGE = "Enter a valid email address.";
export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
