import { Mutex } from 'async-mutex';
import { toast } from 'sonner';

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_TAGS, API_URLS, ERROR_MESSAGES } from '@/constants';
import { logout, setAuthenticated } from '@/features';
import type { RootState } from '@/store';

const mutex = new Mutex();

/**
 * Base URL for the API request.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!BASE_URL) {
  throw new Error(ERROR_MESSAGES.MISSING_API_BASE_URL);
}

/**
 * List of RTK Query endpoints that require
 * an Authorization header.
 */
const authEndpoints = ['profile', 'logout', 'bookingHistory', 'cancelBooking', 'editProfile'];
/**
 * List of RTK Query endpoints that does not
 * call refresh again when api returns 401.
 */
const nonReauthEndpoints = ['signin', 'refresh'];

/**
 * Base query configuration.
 *
 * Attaches the Bearer token to requests for
 * authenticated endpoints only.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token && authEndpoints.includes(endpoint)) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Base query wrapper that automatically handles
 * access token expiration.
 *
 * If access token expires it makes a call to /refresh to
 * get get new access and refresh token.
 *
 * If refresh token in absent or get expired it immediately
 * calls the dispatch logout to logout the user.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const err = result.error;
    if (err.status === 'FETCH_ERROR') {
      toast.error(ERROR_MESSAGES.FETCH_ERROR, { position: 'top-center' });
    }
    if (typeof err.status === 'number' && err.status >= 500) {
      toast.error(ERROR_MESSAGES.SERVER_ERROR, { position: 'top-center' });
    }
  }

  if (result.error?.status !== 401) {
    return result;
  }

  if (nonReauthEndpoints.includes(api.endpoint)) {
    return result;
  }

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      const refreshResult = await baseQuery(
        {
          url: API_URLS.USER.REFRESH,
          method: 'POST',
          credentials: 'include',
        },
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        const { access } = refreshResult.data as { access: string };
        api.dispatch(setAuthenticated(access));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch {
      api.dispatch(logout());
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

/**
 * Base RTK Query, acts as the single entry
 * point for all endpoints in the app.
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(API_TAGS),
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
