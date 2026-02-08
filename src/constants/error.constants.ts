import { VALIDATION_PARAMETERS } from './validation.constants';

/**
 * Constants for error messages.
 */
export const ERROR_MESSAGES = {
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: `Name must be at least ${VALIDATION_PARAMETERS.NAME.MIN_LENGTH} characters`,
    INVALID: 'Name must contain only English alphabets.',
  },
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Invalid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: `Password must be at least ${VALIDATION_PARAMETERS.PASSWORD.MIN_LENGTH} characters`,
    UPPERCASE: 'Must include an uppercase letter',
    LOWERCASE: 'Must include a lowercase letter',
    NUMBER: 'Must include a number',
  },
  CONFIRM_PASSWORD: {
    REQUIRED: 'Confirm password is required',
    MISMATCH: 'Passwords do not match',
  },
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  MISSING_API_BASE_URL:
    'VITE_API_BASE_URL is not defined. Please check your environment variables.',
} as const;
