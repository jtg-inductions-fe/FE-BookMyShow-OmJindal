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
