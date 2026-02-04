/**
 * Represents the data of sign-up form.
 */
export type SignupForm = {
  /**
   * User's full name.
   */
  name: string;
  /**
   * User's email address.
   */
  email: string;
  /**
   * User's password.
   */
  password: string;
  /**
   * Confirmation of the chosen password.
   */
  confirmPassword: string;
};

/**
 * Represents validation errors for the sign-up form.
 *
 * Each key corresponds to signup form fields.
 */
export type FormErrors = Partial<Record<keyof SignupForm, string>> & {
  detail?: string;
};

/**
 * Represents validation errors returned by the backend API.
 */
export type QueryError = {
  /**
   * Errors related to the name field.
   */
  name?: string[];
  /**
   * Errors related to the email field.
   */
  email?: string[];
  /**
   * Errors related to the password field.
   */
  password?: string[];
};
