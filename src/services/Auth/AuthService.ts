import { API_TAGS, API_URLS } from '@/constants';
import { logout as logoutAction, setAuthenticated } from '@/features';
import { api } from '@/services/Api';
import { buildFormData } from '@/utils';

import type {
  EditProfileRequest,
  ProfileQueryResponse,
  ProfileResponse,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './AuthService.types';

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
        url: API_URLS.USER.USER,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled.then(
          (response) => {
            dispatch(setAuthenticated(response.data.access));
          },
          () => {},
        );
      },
      invalidatesTags: [API_TAGS.PROFILE],
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
        void queryFulfilled.then(
          (response) => {
            dispatch(setAuthenticated(response.data.access));
          },
          () => {},
        );
      },
      invalidatesTags: [API_TAGS.PROFILE],
    }),

    /**
     * Provides new updated JWT tokens for API requests.
     *
     * Sends refresh token to backend and gets new refresh and
     * access token in return.
     */
    refresh: builder.query<RefreshResponse, void>({
      query: () => ({
        url: API_URLS.USER.REFRESH,
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        void queryFulfilled
          .then(({ data }) => {
            dispatch(setAuthenticated(data.access));
          })
          .catch(() => {
            dispatch(logoutAction());
          });
      },
    }),

    /**
     * Retrieves the authenticated user's profile from the backend
     * and normalizes the response into the frontend `User` model.
     */
    profile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: API_URLS.USER.USER,
        method: 'GET',
      }),
      transformResponse: (response: ProfileQueryResponse): ProfileResponse => ({
        name: response.name,
        email: response.email,
        phoneNumber: response.phone_number ?? undefined,
        profilePicture: response.profile_picture ?? undefined,
        city: response.city ?? undefined,
      }),
      providesTags: [API_TAGS.PROFILE],
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
        void queryFulfilled.then(
          () => {
            dispatch(logoutAction());
            dispatch(api.util.resetApiState());
          },
          () => {},
        );
      },
    }),
    /**
     * Mutation for updating the authenticated user's profile.
     */
    editProfile: builder.mutation<void, EditProfileRequest>({
      query: (data) => ({
        url: API_URLS.USER.USER,
        method: 'PATCH',
        body: buildFormData(data),
      }),
      invalidatesTags: [API_TAGS.PROFILE],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useRefreshQuery,
  useProfileQuery,
  useLogoutMutation,
  useEditProfileMutation,
} = authApi;
