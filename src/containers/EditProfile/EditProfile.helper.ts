import { ERROR_MESSAGES, VALIDATION_PARAMETERS } from '@/constants';

import type { EditProfileForm, FormErrors } from './EditProfile.types';

/**
 * Helper function used to validate user form data.
 */
export const validateEditProfileForm = (data: EditProfileForm): FormErrors => {
  const err: FormErrors = {};

  if (data.name && data.name.length < VALIDATION_PARAMETERS.NAME.MIN_LENGTH) {
    err.name = [ERROR_MESSAGES.NAME.MIN_LENGTH];
  }
  if (data.phoneNumber && data.phoneNumber.length < VALIDATION_PARAMETERS.PHONE.MIN_LENGTH) {
    err.phoneNumber = [ERROR_MESSAGES.PHONE.MIN_LENGTH];
  }

  return err;
};

/**
 * Helper function to validate profileImage
 */
export const validateProfileImage = (file: File) => {
  if (!VALIDATION_PARAMETERS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return [ERROR_MESSAGES.IMAGE_TYPE];
  }
  if (file.size > VALIDATION_PARAMETERS.MAX_IMAGE_SIZE_BYTES) {
    return [ERROR_MESSAGES.IMAGE_SIZE];
  }
  return undefined;
};
