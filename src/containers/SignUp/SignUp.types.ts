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

/**
 * Props for SignUp Form Component
 */
export type SignUpFormProps = {
  /**
   * Handles input field value changes.
   */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Handles form submission.
   */
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  /**
   * Validation errors mapped to form fields.
   */
  errors: FormErrors;
  /**
   * Current form state.
   */
  form: SignupForm;
  /**
   * Indicates whether signup request is in progress.
   */
  isLoading: boolean;
  /**
   * Toggles password visibility.
   */
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Toggles confirm password visibility.
   */
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
};
