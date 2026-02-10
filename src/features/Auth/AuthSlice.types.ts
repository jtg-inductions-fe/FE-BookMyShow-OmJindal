/**
 * Represents the authentication state of the application.
 */
export type AuthState = {
  /**
   * Indicate whether user is authenticated or not.
   */
  isAuthenticated: boolean;
  /**
   * Short-lived access token used to authorize API requests.
   */
  accessToken: string | null;
};
