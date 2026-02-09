import { useState } from 'react';

import { LogOutIcon } from 'lucide-react';
import { useLocation } from 'react-router';

import { Modal, Profile } from '@/components';
import { ROUTES } from '@/constants';

import type { ProfileContainerProps } from './Profile.types';

export const ProfileContainer = ({ handleLogout, isLoading, user }: ProfileContainerProps) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === ROUTES.PROFILE;

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Profile handleClick={handleClick} to={ROUTES.PROFILE} user={user} isActive={isActive} />
      {/* Confirm Logout Modal */}
      <Modal
        isOpen={showModal}
        setIsOpen={handleClick}
        icon={<LogOutIcon />}
        title="Logout from Account?"
        subtitle="Are you sure you want to logout? You'll need to sign in again to access your account and bookings."
        closeModalText="Stay Logged In"
        confirmText="Yes, Log out"
        handleConfirm={handleLogout}
        isLoading={isLoading}
      />
    </>
  );
};
