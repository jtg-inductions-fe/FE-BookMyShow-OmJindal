/**
 * Constants for API URL's.
 */
export const API_URLS = {
  USER: {
    USER: '/user/',
    SIGNIN: '/user/login/',
    REFRESH: '/user/refresh/',
    LOGOUT: '/user/logout/',
  },
  BOOKING: {
    BOOKING: '/bookings/',
  },
  MOVIE: {
    LIST: '/movies/',
  },
} as const;

/**
 * Constant for API's
 */
export const API_DEFAULTS = {
  MOVIE: {
    LATEST_DAYS: 15,
  },
} as const;

/**
 * Constants for API TAG's
 */
export const API_TAGS = {
  PROFILE: 'Profile',
} as const;

/**
 * Constants for API data.
 */
export const API_CONSTANTS = {
  BOOKING: {
    STATUS: {
      BOOKED: 'B',
      CANCELLED: 'C',
    },
  },
} as const;
