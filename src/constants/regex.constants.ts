/**
 * Regex constants for validations.
 */
export const REGEX = {
  NAME: /^[a-zA-Z\s]*$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_NUMBER: /[0-9]/,
  PHONE: /^\d*$/,
  SLUG_INVALID_CHARS: /[^a-z0-9\s-]/g,
  SLUG_WHITESPACE: /\s+/g,
} as const;
