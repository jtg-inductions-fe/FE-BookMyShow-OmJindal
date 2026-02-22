import { format, isValid, parse } from 'date-fns';

/**
 * Validates whether a given string is a real calendar date
 * in the provided format.
 */
export const isValidDate = (value: string, dateFormat: string): boolean => {
  if (!value) return false;

  const parsed = parse(value, dateFormat, new Date());

  return isValid(parsed) && format(parsed, dateFormat) === value;
};
