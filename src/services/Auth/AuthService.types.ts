import type { User } from '@/types';

/**
 * Access token response from backend API.
 */
export type AccessTokenResponse = {
  /**
   * Short-lived JWT used to authorize API requests.
   * Sent in the Authorization header as a Bearer token.
   */
  access: string;
};

/**
 * Response returned after a successful user sign-up.
 */
export type SignUpResponse = AccessTokenResponse;

/**
 * Payload sent to the backend when registering a new user.
 *
 * Extends basic user name and email.
 * User - {@link User}
 */
export type SignUpRequest = Pick<User, 'name' | 'email'> & {
  /**
   * The password of the user.
   */
  password: string;
  /**
   * The confirmation of the password.
   */
  confirm_password: string;
};

/**
 * Response returned after a successful user sign-in.
 */
export type SignInResponse = AccessTokenResponse;
/**
 * Payload sent to the backend when we sign-in.
 *
 * Extends user's email.
 * User - {@link User}
 */
export type SignInRequest = Pick<User, 'email'> & {
  /**
   * The password of the user.
   */
  password: string;
};

/**
 * Response returned after a successful refresh
 * token request.
 */
export type RefreshResponse = AccessTokenResponse;

/**
 * API response for the user profile endpoint query.
 *
 * Extends basic user details  and add backend
 * specific fields name.
 * User - {@link User}
 */
export type ProfileQueryResponse = Pick<User, 'name' | 'email'> & {
  /**
   * ID of the city associated with the user.
   */
  city: number | null;
  /**
   * User's phone number.
   */
  phone_number: string | null;
  /**
   * URL of the user's profile picture.
   */
  profile_picture: string | null;
};

/**
 * API response for the user profile endpoint.
 *
 * Extends basic user details.
 * User - {@link User}
 */
export type ProfileResponse = Pick<User, 'name' | 'email' | 'city' | 'phoneNumber'> & {
  /**
   * The URL of the profile picture.
   */
  profilePicture?: string;
};

/**
 * Payload sent to the backend when updating user profile.
 *
 * Extends user fields and add backend-specific fields.
 * User - {@link User}
 */
export type EditProfileRequest = Partial<Pick<User, 'name' | 'email'>> & {
  /**
   * The phone number of the user.
   */
  phone_number?: string;
  /**
   * The profile picture of the user.
   */
  profile_picture?: File;
};
