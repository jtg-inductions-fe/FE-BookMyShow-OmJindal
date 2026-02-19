import type { EditProfileRequest } from '@/services';

/**
 * Represents the data of edit-profile form.
 */
export type EditProfileForm = {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The phone number of the user.
   */
  phoneNumber: string;
  /**
   * The profile picture of the user.
   */
  profilePicture?: File;
};

/**
 * Represents validation errors for the edit-profile form.
 */
export type FormErrors = Record<keyof EditProfileForm, string[]>;

/**
 * Represents validation errors returned by the backend API.
 */
export type QueryError = Partial<Record<keyof EditProfileRequest, string[]>>;
