/**
 * Constants for error messages.
 */
export const ERROR_MESSAGES = {
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 'Name must be at least 2 characters',
    INVALID: 'Name must contain only English alphabets.',
  },
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Invalid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 8 characters',
    UPPERCASE: 'Must include an uppercase letter',
    LOWERCASE: 'Must include a lowercase letter',
    NUMBER: 'Must include a number',
  },
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  MISSING_API_BASE_URL:
    'VITE_API_BASE_URL is not defined. Please check your environment variables.',
};
