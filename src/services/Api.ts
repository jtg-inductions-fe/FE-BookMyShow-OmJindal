import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base RTK Query, acts as the single entry
 * point for all endpoints in the app.
 */

const baseUrl: string =
  (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://127.0.0.1:8000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});
