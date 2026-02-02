/**
 * Validator for name.
 *
 * Rules:
 * - Must not be empty
 * - Must be at least 2 characters long
 * - Must contain only English alphabets and spaces
 */
export const validateName = (name: string): string | undefined => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Name is required';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]*$/.test(trimmed)) {
    return 'Name must contain only english alphabets.';
  }
  return undefined;
};

/**
 * Validator for email.
 * Rules:
 * - Must not be empty
 * - Must match a standard email format
 */
export const validateEmail = (email: string): string | undefined => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
    return 'Invalid email address';
  }
  return undefined;
};

/**
 * Validator for password strength.
 *
 * Rules:
 * - Must not be empty
 * - Must be at least 8 characters long
 * - Must include at least one uppercase letter
 * - Must include at least one lowercase letter
 * - Must include at least one number
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Must include an uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Must include a lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Must include a number';
  }
  return undefined;
};
