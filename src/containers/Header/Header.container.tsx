import { useState } from 'react';

import { LogOutIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { Button, ConfirmationModal, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { AuthUserMenu } from '@/containers/AuthMenu';
import { Sidebar } from '@/containers/Sidebar';
import { useLogoutMutation } from '@/services';

export const Header = () => {
  const location = useLocation();

  // State for controlling logout confirmation modal visibility
  const [showModal, setShowModal] = useState(false);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Action to be performed on logout
  const handleLogout = () => {
    logout().then(
      () => {
        setShowModal(false);
      },
      () => {},
    );
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
          <AuthUserMenu isLoggingOut={isLoggingOut} openModal={openModal} />
        </div>
        {/* Sidebar */}
        <Sidebar isLoggingOut={isLoggingOut} openModal={openModal} />
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
