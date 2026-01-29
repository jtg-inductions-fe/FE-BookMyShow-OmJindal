import { AmountConfig } from './amount.config';
import type { AmountFormatTypes } from './amount.types';

/**
 * Converts a number to given currency format.
 * @param num - The number to be formatted.
 * @param format - A valid amount pattern string from {@link AmountFormatTypes}. Default to `INR`.
 * @returns A formatted amount string.
 * @example
 * amountFormatter(1000);
 * // Returns "₹1,000.00"
 */
export const amountFormatter = (num: number, format: AmountFormatTypes = 'INR'): string => {
  if (!Number.isFinite(num)) {
    return '';
  }
  return new Intl.NumberFormat(AmountConfig[format].locale, AmountConfig[format].options).format(
    num,
  );
};
