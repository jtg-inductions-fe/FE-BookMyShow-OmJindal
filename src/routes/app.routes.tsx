import { lazy } from 'react';

import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { MainLayout } from '@/layouts';

import { GuestRoute } from './Guest.route';
import { ProtectedRoute } from './Protected.route';

const HomePage = lazy(() => import('@/pages/Home.page'));
const SignInPage = lazy(() => import('@/pages/SignIn.page'));
const SignUpPage = lazy(() => import('@/pages/SignUp.page'));
const NotFoundPage = lazy(() => import('@/pages/NotFound.page'));
const ErrorPage = lazy(() => import('@/pages/Error.page'));
const ProfilePage = lazy(() => import('@/pages/Profile.page'));
const EditProfilePage = lazy(() => import('@/pages/EditProfile.page'));
const MovieListPage = lazy(() => import('@/pages/MovieList.page'));
const MovieDetailPage = lazy(() => import('@/pages/MovieDetail.page'));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage },
      { path: ROUTES.MOVIES, Component: MovieListPage },
      { path: ROUTES.MOVIE_DETAIL, Component: MovieDetailPage },
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.SIGNIN, Component: SignInPage },
          { path: ROUTES.SIGNUP, Component: SignUpPage },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.PROFILE, Component: ProfilePage },
          { path: ROUTES.EDIT_PROFILE, Component: EditProfilePage },
        ],
      },
      { path: ROUTES.NOT_FOUND, Component: NotFoundPage },
    ],
  },
]);
