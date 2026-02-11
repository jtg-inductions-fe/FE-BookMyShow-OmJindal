/**
 * Constants used for validation.
 */
export const VALIDATION_PARAMETERS = {
  NAME: {
    MIN_LENGTH: 2,
  },
  PHONE: {
    MIN_LENGTH: 10,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
  },
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'] as readonly string[],
  MAX_IMAGE_SIZE_MB: 2,
  MAX_IMAGE_SIZE_BYTES: 2 * 1024 * 1024,
} as const;
