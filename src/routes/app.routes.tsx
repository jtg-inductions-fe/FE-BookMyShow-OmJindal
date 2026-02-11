import { lazy } from 'react';

import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { MainLayout } from '@/layouts';

import { GuestRoute } from './Guest.route';

const HomePage = lazy(() => import('@/pages/Home.page'));
const SignInPage = lazy(() => import('@/pages/SignIn.page'));
const SignUpPage = lazy(() => import('@/pages/SignUp.page'));
const NotFoundPage = lazy(() => import('@/pages/NotFound.page'));
const ErrorPage = lazy(() => import('@/pages/Error.page'));

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
