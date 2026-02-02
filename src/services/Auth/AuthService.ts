import { api } from '@/services';

import type { SignUpRequest, SignUpResponse } from './AuthService.types';

/**
 * Authentication-related API endpoints.
 */
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Registers a new user account.
     *
     * Sends user credentials to the backend and returns
     * JWT tokens and user details upon successful registration.
     */
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: '/user/signup/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;
