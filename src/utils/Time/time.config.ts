import type { TimeConfigTypes, TimeFormatTypes } from './time.types';

/**
 * Maps time formats to their respective time
 * configuration object.
 */
export const TimeConfig = {
  'HHMM A': {
    locale: 'en-IN',
    options: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    },
  },
} satisfies Record<TimeFormatTypes, TimeConfigTypes>;
