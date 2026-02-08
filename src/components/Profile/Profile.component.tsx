import { useState } from 'react';

import { LogOutIcon } from 'lucide-react';

import { ROUTES } from '@/constants';

import type { ProfileProps } from './Profile.types';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Separator } from '../Separator';
import { Typography } from '../Typography';

/**
 * The user profile component showing avatar and basic details
 * along with profile and logout buttons.
 */
export const Profile = ({ user, handleLogout, isLoading }: ProfileProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <div>
          <Avatar className="h-15 w-15">
            <AvatarImage
              src={typeof user?.profilePicture === 'string' ? user.profilePicture : undefined}
              alt={user?.name ? `${user.name} avatar` : 'User avatar'}
            />
            <AvatarFallback>{user?.name?.trim()?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Typography tag="p" variant="h4">
            {user?.name}
          </Typography>
          <Typography tag="p" variant="small" color="secondary">
            {user?.email}
          </Typography>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Button
          asLink
          to={ROUTES.PROFILE}
          variant={location.pathname === ROUTES.PROFILE ? 'purple' : 'secondary'}
        >
          Profile
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        >
          Log out
        </Button>
      </div>
      {/* Confirm Logout Modal */}
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
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
