import { validateEmail, validateName, validatePhoneNumber } from '@/utils';

import type { EditProfileForm, FormErrors } from './EditProfile.types';

/**
 * Helper function used to validate user form data.
 */
export const validateEditProfileForm = (data: EditProfileForm): FormErrors => {
  const err: FormErrors = {
    name: [],
    email: [],
    phoneNumber: [],
    profilePicture: [],
  };

  const nameError = validateName(data.name);
  const emailError = validateEmail(data.email);

  if (nameError) err.name = nameError;
  if (emailError) err.email = emailError;

  if (data.phoneNumber) {
    const phoneError = validatePhoneNumber(data.phoneNumber);
    if (phoneError) err.phoneNumber = phoneError;
  }

  return err;
};
