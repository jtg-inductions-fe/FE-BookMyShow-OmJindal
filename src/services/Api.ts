import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ERROR_MESSAGES } from '@/constants';

/**
 * Base URL for the API request.
 */
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

if (!baseUrl) {
  throw new Error(ERROR_MESSAGES.MISSING_API_BASE_URL);
}

/**
 * Base RTK Query, acts as the single entry
 * point for all endpoints in the app.
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: 'include' }),
  endpoints: () => ({}),
});
