import { Edit as EditIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button, Profile as ProfileComponent, ProfileSkeleton } from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/services';

export const Profile = () => {
  const { data: user, isLoading: isLoadingUser } = useProfileQuery();

  let profileSection: ReactNode = null;

  if (isLoadingUser) {
    profileSection = <ProfileSkeleton />;
  } else if (user) {
    profileSection = (
      <ProfileComponent
        email={user.email}
        name={user.name}
        profilePicture={user.profilePicture}
        phoneNumber={user.phoneNumber}
        size="xl"
      />
    );
  }

  return (
    <section
      className="flex flex-col sm:flex-row p-4 sm:p-8 sm:items-center gap-5 bg-white shadow-md justify-between rounded-xl"
      aria-label="profile"
    >
      {profileSection}
      <Button size="md" asLink to={ROUTES.EDIT_PROFILE}>
        <EditIcon aria-hidden="true" />
        Edit Profile
      </Button>
    </section>
  );
};
