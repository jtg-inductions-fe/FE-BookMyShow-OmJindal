import { API_URLS } from '@/constants';
import { logout, setAuthenticated } from '@/features';

import type {
  ProfileQueryResponse,
  ProfileResponse,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './AuthService.types';
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
     *
     * Invalidates profile tag upon successful signup.
     */
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: API_URLS.USER.SIGNUP,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then((response) => {
          dispatch(setAuthenticated(response.data.access));
        });
      },
      invalidatesTags: ['Profile'],
    }),

    /**
     * Authenticates a user using email and password credentials.
     *
     * Sends user credentials to the backend and returns
     * JWT tokens upon successful authentication.
     *
     * Invalidates profile tag upon successful signin.
     */
    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: (data) => ({
        url: API_URLS.USER.SIGNIN,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then((response) => {
          dispatch(setAuthenticated(response.data.access));
        });
      },
      invalidatesTags: ['Profile'],
    }),

    /**
     * Provides new updated JWT tokens for API requests.
     *
     * Sends refresh token to backend and gets new refresh and
     * access token in return.
     */
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: API_URLS.USER.REFRESH,
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then((response) => {
          dispatch(setAuthenticated(response.data.access));
        });
      },
    }),

    /**
     * Retrieves the authenticated user's profile from the backend
     * and normalizes the response into the frontend `User` model.
     */
    profile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: API_URLS.USER.PROFILE,
        method: 'GET',
      }),
      transformResponse: (response: ProfileQueryResponse): ProfileResponse => ({
        email: response.email,
        name: response.name,
        phoneNumber: response.phone_number,
        profilePicture: response.profile_picture,
        cityId: response.city,
      }),
      providesTags: ['Profile'],
    }),

    /**
     * Sends the logout request to backend and upon successful
     * authentication remove the refresh token from cookie and clear
     * the state.
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_URLS.USER.LOGOUT,
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then(() => {
          dispatch(logout());
          dispatch(api.util.resetApiState());
        });
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useRefreshMutation,
  useProfileQuery,
  useLogoutMutation,
} = authApi;
