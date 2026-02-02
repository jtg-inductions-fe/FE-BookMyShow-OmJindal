import { Link, useLocation } from 'react-router';

import { Button, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { logout } from '@/features';
import { useAppDispatch, useAppSelector } from '@/store';

import { AvatarDropdown } from './Header.component';

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem('refreshToken');
  };

  return (
    <header className="bg-white text-white w-full sticky top-0 z-1">
      <div className="flex flex-row justify-between items-center h-18 w-full px-2 max-w-480 mx-auto">
        <Link
          to={ROUTES.HOME}
          className="flex flex-row gap-2 items-end"
          aria-label="Navigate to home"
        >
          <div className="h-10 w-10">
            <img src="/moviebook.svg" alt="" className="h-full w-full" aria-hidden="true" />
          </div>
          <Typography className="text-primary" variant="h3" as="span">
            Movie Book
          </Typography>
        </Link>
        <div className="flex flex-row items-center gap-3">
          <div className="text-primary">Movies</div>
          {isAuthenticated ? (
            <AvatarDropdown handleClick={handleClick} user={user} />
          ) : (
            location.pathname != ROUTES.SIGNIN &&
            location.pathname != ROUTES.SIGNUP && (
              <Button size="sm" to={ROUTES.SIGNIN} asLink>
                Sign In
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};
