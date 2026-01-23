import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { MainLayout } from '@/layouts';
import { ErrorPage, HomePage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage },
      { path: ROUTES.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
