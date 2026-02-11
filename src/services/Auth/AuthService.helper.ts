import type { EditProfileRequest } from './AuthService.types';

/**
 * Converts an object to FormData.
 */
export const buildEditProfileFormData = (data: EditProfileRequest): FormData => {
  const formData = new FormData();
  if (data.name) {
    formData.append('name', data.name);
  }
  if (data.phone_number) {
    formData.append('phone_number', data.phone_number);
  }
  if (data.profile_picture) {
    formData.append('profile_picture', data.profile_picture);
  }
  return formData;
};
