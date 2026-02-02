import { Navigate, Outlet, useLocation } from 'react-router';

import { ROUTES } from '@/constants';
import { useAppSelector } from '@/store';

/**
 * Route guard for protected pages.
 *
 * Ensures that only authenticated users can access
 * private routes such profile.
 */
export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    <Navigate to={ROUTES.SIGNIN} state={{ from: location }} />;
  }
};
