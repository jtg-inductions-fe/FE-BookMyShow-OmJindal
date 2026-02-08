/**
 * Represents the data of sign-in form.
 */
export type SignInForm = {
  /**
   * User's email address.
   */
  email: string;
  /**
   * User's password.
   */
  password: string;
};

/**
 * Represents validation errors returned by the backend API.
 */
export type QueryError = {
  detail?: string;
};

/**
 * Represents validation errors for the sign-in form.
 *
 * Each key corresponds to sign-in form fields.
 */
export type FormErrors = Partial<Record<keyof SignInForm, string>> & QueryError;
