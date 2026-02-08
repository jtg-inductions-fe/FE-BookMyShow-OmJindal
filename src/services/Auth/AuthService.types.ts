import type { User } from '@/types';

/**
 * Response returned after a successful user sign-up.
 */
export type SignUpResponse = {
  /**
   * Short-lived JWT used to authorize API requests.
   * Sent in the Authorization header as a Bearer token.
   */
  access: string;
};

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
export type SignInResponse = {
  /**
   * Short-lived JWT used to authorize API requests.
   * Sent in the Authorization header as a Bearer token.
   */
  access: string;
};

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
export type RefreshResponse = {
  /**
   * Short-lived JWT used to authorize API requests.
   * Sent in the Authorization header as a Bearer token.
   */
  access: string;
};

/**
 * API response for the user profile endpoint.
 *
 * Extends basic user name and email and add backend
 * specific fields name.
 * User - {@link User}
 */
export type ProfileResponse = Pick<User, 'name' | 'email'> & {
  /**
   * ID of the city associated with the user.
   */
  city: number;
  /**
   * User's phone number.
   */
  phone_number: string;
  /**
   * URL of the user's profile picture.
   */
  profile_picture: string;
};
