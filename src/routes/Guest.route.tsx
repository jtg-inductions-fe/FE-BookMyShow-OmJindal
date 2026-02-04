import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '@/constants';
import { useAppSelector } from '@/store';

/**
 * Route guard for guest-only pages.
 *
 * Prevents authenticated users from accessing routes like
 * signIn or signUp pages.
 */
export const GuestRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  } else {
    return <Outlet />;
  }
};
