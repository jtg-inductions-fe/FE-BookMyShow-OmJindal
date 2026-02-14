import { format, isValid, parse } from 'date-fns';

/**
 * Validates whether a given string is a real calendar date
 * in the `yyyy-MM-dd` format.
 */
export const isValidDate = (value: string) => {
  const parsed = parse(value, 'yyyy-MM-dd', new Date());

  return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
};
