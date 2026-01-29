import type { DateConfigTypes, DateFormatTypes } from './date.types';

/**
 * Maps date formats to their respective date
 * configuration object.
 */
export const DateConfig = {
  DDMMYY: {
    locale: 'en-IN',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
} satisfies Record<DateFormatTypes, DateConfigTypes>;
