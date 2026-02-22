/**
 * Centralized application route definitions.
 *
 * This object serves as the single source of truth for all route paths
 * used throughout the application.
 */
export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/update',
  MOVIES: '/movies',
  MOVIE_DETAIL: {
    BASE: '/movies/',
    PATH_PARAMETERS: ':movieName/:movieId',
  },
  CINEMAS: '/cinemas',
} as const;
