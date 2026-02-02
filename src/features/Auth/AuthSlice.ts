import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/types';

import type { AuthState } from './AuthSlice.types';

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('refreshToken') ? true : false,
  accessToken: null,
  user: null,
};

/**
 * Slice responsible for authentication state.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Marks the user as authenticated and stores
     * the access token in auth state.
     */
    setAuthenticated: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    /**
     * Updates the user's profile information.
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    /**
     * Clears authentication state and removes
     * refresh token from storage.
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuthenticated, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
