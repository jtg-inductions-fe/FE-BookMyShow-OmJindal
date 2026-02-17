import { ERROR_MESSAGES, REGEX, VALIDATION_PARAMETERS } from '@/constants';

/**
 * Validator for name.
 *
 * Rules:
 * - Must not be empty
 * - Must be at least 2 characters long
 * - Must contain only English alphabets and spaces
 */
export const validateName = (name: string): string[] | void => {
  const trimmed = name.trim();

  if (!trimmed) {
    return [ERROR_MESSAGES.NAME.REQUIRED];
  }

  const err = [];

  if (trimmed.length < VALIDATION_PARAMETERS.NAME.MIN_LENGTH) {
    err.push(ERROR_MESSAGES.NAME.MIN_LENGTH);
  }
  if (!REGEX.NAME.test(trimmed)) {
    err.push(ERROR_MESSAGES.NAME.INVALID);
  }

  if (err.length) return err;
};

/**
 * Validator for email.
 * Rules:
 * - Must not be empty
 * - Must match a standard email format
 */
export const validateEmail = (email: string): string[] | void => {
  const trimmed = email.trim();

  if (!trimmed) {
    return [ERROR_MESSAGES.EMAIL.REQUIRED];
  }

  if (!REGEX.EMAIL.test(trimmed)) {
    return [ERROR_MESSAGES.EMAIL.INVALID];
  }
};

/**
 * Validator for password strength.
 *
 * Rules:
 * - Must not be empty
 * - Must be at least 8 characters long
 * - Must include at least one uppercase letter
 * - Must include at least one lowercase letter
 * - Must include at least one number
 */
export const validatePassword = (password: string): string[] | void => {
  if (!password) {
    return [ERROR_MESSAGES.PASSWORD.REQUIRED];
  }

  const err = [];

  if (password.length < VALIDATION_PARAMETERS.PASSWORD.MIN_LENGTH) {
    err.push(ERROR_MESSAGES.PASSWORD.MIN_LENGTH);
  }
  if (!REGEX.PASSWORD_UPPERCASE.test(password)) {
    err.push(ERROR_MESSAGES.PASSWORD.UPPERCASE);
  }
  if (!REGEX.PASSWORD_LOWERCASE.test(password)) {
    err.push(ERROR_MESSAGES.PASSWORD.LOWERCASE);
  }
  if (!REGEX.PASSWORD_NUMBER.test(password)) {
    err.push(ERROR_MESSAGES.PASSWORD.NUMBER);
  }

  if (err.length) return err;
};
