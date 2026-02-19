import { ERROR_MESSAGES, REGEX, VALIDATION_PARAMETERS } from '@/constants';

import type { EditProfileForm, FormErrors } from './EditProfile.types';

/**
 * Helper function used to validate user form data.
 */
export const validateEditProfileForm = (data: EditProfileForm): FormErrors => {
  const err: FormErrors = {
    name: [],
    phoneNumber: [],
    profilePicture: [],
  };

  const trimmed = data.name.trim();

  if (trimmed && trimmed.length < VALIDATION_PARAMETERS.NAME.MIN_LENGTH) {
    err.name.push(ERROR_MESSAGES.NAME.MIN_LENGTH);
  }
  if (!REGEX.NAME.test(trimmed)) {
    err.name.push(ERROR_MESSAGES.NAME.INVALID);
  }

  if (data.phoneNumber && data.phoneNumber.length < VALIDATION_PARAMETERS.PHONE.MIN_LENGTH) {
    err.phoneNumber = [ERROR_MESSAGES.PHONE.MIN_LENGTH];
  }

  return err;
};

/**
 * Helper function to validate profileImage
 */
export const validateProfileImage = (file: File): string[] => {
  const imageError = [];

  if (!VALIDATION_PARAMETERS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    imageError.push(ERROR_MESSAGES.IMAGE_TYPE);
  }
  if (file.size > VALIDATION_PARAMETERS.MAX_IMAGE_SIZE_BYTES) {
    imageError.push(ERROR_MESSAGES.IMAGE_SIZE);
  }

  return imageError;
};
