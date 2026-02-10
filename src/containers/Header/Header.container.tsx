import { Link, useLocation } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@/components';
import { ROUTES } from '@/constants';
import { logout } from '@/features';
import { useAppDispatch, useAppSelector } from '@/store';

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  const isAuthRoute = location.pathname === ROUTES.SIGNIN || location.pathname === ROUTES.SIGNUP;

  return (
    <header className="bg-white w-full sticky top-0 z-1">
      <div className="flex flex-row justify-between items-center h-18 w-full px-2 max-w-480 mx-auto">
        <Link
          to={ROUTES.HOME}
          className="flex flex-row gap-2 items-end"
          aria-label="Navigate to home"
        >
          <div className="h-10 w-10">
            <img
              src="/moviebook.svg"
              alt=""
              className="h-full w-full object-contain"
              aria-hidden="true"
            />
          </div>
          <Typography tag="span" variant="h3">
            Movie Book
          </Typography>
        </Link>
        <div className="flex flex-row items-center gap-3">
          <div className="text-primary">Movies</div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>OJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive" onClick={handleClick}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !isAuthRoute && (
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
