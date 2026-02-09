import { API_URLS } from '@/constants';
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
        url: API_URLS.USER.SIGNUP,
        method: 'POST',
        body: data,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then((response) => {
          dispatch(setAuthenticated(response.data.access));
        });
      },
    }),
  }),
});

export const { useSignupMutation } = authApi;
