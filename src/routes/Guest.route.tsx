import { Navigate, Outlet, useLocation } from 'react-router';

import { ROUTES } from '@/constants';
import { useAppSelector } from '@/store';
import type { LocationState } from '@/types';
/**
 * Route guard for guest-only pages.
 *
 * Prevents authenticated users from accessing routes like
 * signIn or signUp pages.
 */
export const GuestRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();
  const state = location.state as LocationState;
  const to = state?.from || ROUTES.HOME;

  if (isAuthenticated) {
    return <Navigate to={to} replace />;
  } else {
    return <Outlet />;
  }
};
