import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { MainLayout } from '@/layouts';
import { ErrorPage, HomePage, NotFoundPage, SignInPage, SignUpPage } from '@/pages';

import { GuestRoute } from './Guest.route';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage },
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.SIGNIN, Component: SignInPage },
          { path: ROUTES.SIGNUP, Component: SignUpPage },
        ],
      },
      { path: ROUTES.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
