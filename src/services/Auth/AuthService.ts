import { setAuthenticated } from '@/features';

import type { SignUpRequest, SignUpResponse } from './AuthService.types';
import { api } from '../Api';

/**
 * Authentication-related API endpoints.
 */
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Registers a new user account.
     *
     * Sends user credentials to the backend and returns
     * JWT tokens upon successful registration.
     */
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: '/user/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setAuthenticated(data.access));
          }
        } catch {}
      },
    }),
  }),
});

export const { useSignupMutation } = authApi;
