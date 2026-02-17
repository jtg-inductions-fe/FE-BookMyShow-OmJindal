import { useState } from 'react';

import { LogOutIcon, Menu } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';
import { Link, useLocation } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ConfirmationModal,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Profile,
  ProfileSkeleton,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  Typography,
} from '@/components';
import { ROUTES } from '@/constants';
import { type ProfileResponse, useLogoutMutation, useProfileQuery } from '@/services';
import { useAppSelector } from '@/store';

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // State for controlling logout confirmation modal visibility
  const [showModal, setShowModal] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Action to be performed on logout
  const handleLogout = () => {
    void logout();
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalChange = (open: boolean) => {
    setShowModal(open);
  };

  const getUser = (userData: ProfileResponse) => ({
    name: userData.name,
    email: userData.email,
    profilePicture: userData.profilePicture,
  });

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
              size={'sm'}
            >
              Movies
            </Button>
            <Button
              variant={location.pathname === ROUTES.CINEMAS ? 'active' : 'link'}
              to={ROUTES.CINEMAS}
              asLink
              size={'sm'}
            >
              Cinemas
            </Button>
          </nav>
          {/* Pop over component */}
          {isAuthenticated ? (
            isLoadingUser ? (
              <Avatar>
                <AvatarFallback></AvatarFallback>
              </Avatar>
            ) : (
              user && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="icon" className="rounded-full">
                      {/* Avatar */}
                      <Avatar>
                        <AvatarImage src={user.profilePicture} alt={`${user.name} avatar`} />
                        <AvatarFallback>{user.name.trim()[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="end" className="w-64 p-2">
                    {/* Profile Component */}
                    <Link to={ROUTES.PROFILE}>
                      <Profile {...getUser(user)} size="lg" />
                    </Link>
                    <Separator />
                    <Button variant="destructive" onClick={openModal} disabled={isLoggingOut}>
                      Log out
                    </Button>
                  </PopoverContent>
                </Popover>
              )
            )
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
            <VisuallyHidden.VisuallyHidden>
              <SheetTitle>Navigation menu</SheetTitle>
              <SheetDescription>Browse movies, cinemas, and account options</SheetDescription>
            </VisuallyHidden.VisuallyHidden>
            {/* Profile Component */}
            {isAuthenticated ? (
              isLoadingUser ? (
                <ProfileSkeleton />
              ) : (
                user && (
                  <>
                    <Link to={ROUTES.PROFILE}>
                      <Profile {...getUser(user)} size="lg" />
                    </Link>
                    <Separator />
                  </>
                )
              )
            ) : null}
            {/* Navigation Links */}
            <Typography>Browse</Typography>
            <nav className="w-full flex flex-col gap-4">
              <Button
                variant={location.pathname === ROUTES.MOVIES ? 'primary' : 'secondary'}
                to={ROUTES.MOVIES}
                asLink
              >
                Movies
              </Button>
              <Button
                variant={location.pathname === ROUTES.CINEMAS ? 'primary' : 'secondary'}
                to={ROUTES.CINEMAS}
                asLink
              >
                Cinemas
              </Button>
            </nav>
            {/* Signin */}
            <SheetFooter>
              {isAuthenticated ? (
                <Button variant="destructive" onClick={openModal} disabled={isLoggingOut}>
                  Log out
                </Button>
              ) : (
                <Button to={ROUTES.SIGNIN} asLink>
                  Sign In
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <ConfirmationModal
        open={showModal}
        onOpenChange={handleModalChange}
        icon={<LogOutIcon />}
        title="Logout from Account?"
        description="Are you sure you want to logout? You'll need to sign in again to access your account and bookings."
        cancelLabel="Stay Logged In"
        actionLabel="Yes, Log out"
        onCancel={closeModal}
        onAction={handleLogout}
        loading={isLoggingOut}
      />
    </header>
  );
};
