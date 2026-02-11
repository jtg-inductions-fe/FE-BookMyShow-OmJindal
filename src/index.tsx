import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from '@/routes';
import { store } from '@/store';

import { Spinner, Toaster } from './components';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </Provider>
  </StrictMode>,
);
