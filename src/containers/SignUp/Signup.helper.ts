import { ERROR_MESSAGES } from '@/constants';
import { validateEmail, validateName, validatePassword } from '@/utils';

import type { FormErrors, SignupForm } from './SignUp.types';

/**
 * Helper function used to validate user form data.
 */
export const validateSignUpForm = (data: SignupForm): FormErrors => {
  const err: FormErrors = {};

  const nameError = validateName(data.name);
  const emailError = validateEmail(data.email);
  const passwordError = validatePassword(data.password);

  if (nameError) err.name = nameError;
  if (emailError) err.email = emailError;
  if (passwordError) err.password = passwordError;

  if (!data.confirmPassword) {
    err.confirmPassword = ERROR_MESSAGES.CONFIRM_PASSWORD.REQUIRED;
  } else if (data.confirmPassword !== data.password) {
    err.confirmPassword = ERROR_MESSAGES.CONFIRM_PASSWORD.MISMATCH;
  }

  return err;
};
