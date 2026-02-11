import { VALIDATION_PARAMETERS } from './validation.constants';

/**
 * Constants for error messages.
 */
export const ERROR_MESSAGES = {
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: `Name must be at least ${VALIDATION_PARAMETERS.NAME.MIN_LENGTH} characters`,
    INVALID: 'Name must contain only English alphabets',
  },
  PHONE: {
    MIN_LENGTH: `Phone number must be at exactly ${VALIDATION_PARAMETERS.PHONE.MIN_LENGTH} digits`,
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
  IMAGE_TYPE: 'Only JPG, PNG, or WEBP images are allowed',
  IMAGE_SIZE: `Image must be smaller than ${VALIDATION_PARAMETERS.MAX_IMAGE_SIZE_MB}MB`,
  MISSING_API_BASE_URL:
    'VITE_API_BASE_URL is not defined. Please check your environment variables.',
  FETCH_ERROR: 'Cannot reach server. Please try again after some time.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
} as const;
