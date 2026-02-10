import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/features';
import { api } from '@/services';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
