import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthState } from './AuthSlice.types';

const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('refreshToken')),
  accessToken: null,
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
     * Clears authentication state and removes
     * refresh token from storage.
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
