import type { AmountConfigTypes, AmountFormatTypes } from './amount.types';

/**
 * Maps amount formats to their respective amount
 * configuration object.
 */
export const AmountConfig = {
  INR: {
    locale: 'en-IN',
    options: {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    },
  },
} satisfies Record<AmountFormatTypes, AmountConfigTypes>;
