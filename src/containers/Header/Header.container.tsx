import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Profile,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  Typography,
} from '@/components';
import { SheetDescription, SheetTitle } from '@/components/Sheet';
import { ROUTES } from '@/constants';
import { useLogoutMutation, useProfileQuery } from '@/services';
import { useAppSelector } from '@/store';

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const { data: user } = useProfileQuery(undefined, { skip: !isAuthenticated });
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => {
    void logout();
  };

  const isAuthRoute = location.pathname === ROUTES.SIGNIN || location.pathname === ROUTES.SIGNUP;

  return (
    <header className="bg-white w-full sticky top-0 z-1">
      <div className="flex flex-row justify-between items-center h-18 w-full px-4 max-w-480 mx-auto">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex flex-row gap-2 items-end"
          aria-label="Navigate to home"
        >
          <div className="h-10 w-10">
            <img
              src="/moviebook.svg"
              alt="Movie Book Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <Typography tag="span" variant="h3">
            Movie Book
          </Typography>
        </Link>
        <div className="hidden sm:flex flex-row items-center gap-4">
          {/* Navigation Links */}
          <nav>
            <Button
              variant={location.pathname === ROUTES.MOVIES ? 'active' : 'link'}
              to={ROUTES.MOVIES}
              asLink
              size={'md'}
            >
              Movies
            </Button>
            <Button
              variant={location.pathname === ROUTES.CINEMAS ? 'active' : 'link'}
              to={ROUTES.CINEMAS}
              asLink
              size={'md'}
            >
              Cinemas
            </Button>
          </nav>
          {/* Pop over component */}
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" className="rounded-full">
                  {/* Avatar */}
                  <Avatar size="lg">
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.name ? `${user.name} avatar` : 'User avatar'}
                    />
                    <AvatarFallback>{user?.name?.trim()?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" className="w-64 p-2">
                {/* Profile Component */}
                <Profile
                  user={user}
                  handleLogout={() => {
                    void handleLogout();
                  }}
                  isLoading={isLoading}
                />
              </PopoverContent>
            </Popover>
          ) : (
            !isAuthRoute && (
              <Button to={ROUTES.SIGNIN} asLink>
                Sign In
              </Button>
            )
          )}
        </div>
        {/* Sidebar */}
        <Sheet>
          {/* Sidebar trigger element */}
          <SheetTrigger asChild className="sm:hidden">
            <button type="button" aria-label="Toggle Sidebar">
              <Menu color="white" className="bg-purple p-1 rounded-md" size={40} />
            </button>
          </SheetTrigger>
          {/* The content of the sidebar */}
          <SheetContent>
            <VisuallyHidden>
              <SheetTitle aria-hidden="true">Navigation menu</SheetTitle>
              <SheetDescription>Browse movies, cinemas, and account options</SheetDescription>
            </VisuallyHidden>
            {/* Profile Component */}
            {isAuthenticated && (
              <>
                <Profile
                  user={user}
                  handleLogout={() => {
                    void handleLogout();
                  }}
                  isLoading={isLoading}
                />
                <Separator />
              </>
            )}
            {/* Navigation Links */}
            <Typography>Browse</Typography>
            <nav className="w-full flex flex-col gap-4">
              <Button
                variant={location.pathname === ROUTES.MOVIES ? 'purple' : 'secondary'}
                to={ROUTES.MOVIES}
                asLink
              >
                Movie
              </Button>
              <Button
                variant={location.pathname === ROUTES.CINEMAS ? 'purple' : 'secondary'}
                to={ROUTES.CINEMAS}
                asLink
              >
                Cinema
              </Button>
            </nav>
            {/* Signin */}
            <SheetFooter>
              {!isAuthenticated && (
                <Button to={ROUTES.SIGNIN} asLink>
                  Sign In
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
