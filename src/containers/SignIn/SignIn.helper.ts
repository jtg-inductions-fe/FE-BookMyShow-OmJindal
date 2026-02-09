import { validateEmail } from '@/utils';

import type { FormErrors, SignInForm } from './SignIn.types';

/**
 * Helper function used to validate user form data.
 */
export const validateSignInForm = (data: SignInForm): FormErrors => {
  const err: FormErrors = {};

  const emailError = validateEmail(data.email);

  if (emailError) err.email = emailError;

  if (!data.password) err.password = 'Password is required.';

  return err;
};
