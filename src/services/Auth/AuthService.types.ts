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
  /**
   * Long-lived JWT used to obtain a new access token
   * when the current access token expires.
   */
  refresh: string;
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
