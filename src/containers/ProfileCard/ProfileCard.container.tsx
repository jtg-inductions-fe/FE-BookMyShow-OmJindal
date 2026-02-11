import { Edit as EditIcon, MailIcon, Phone as PhoneIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage, Button, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { useProfileQuery } from '@/services';

import { ProfileCardSkeleton } from './ProfileCard.skeleton';

export const ProfileCard = () => {
  const { data: user, isLoading } = useProfileQuery();

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  return (
    <section
      className="flex flex-col sm:flex-row p-4 sm:p-8 sm:items-center gap-5 bg-white shadow-md justify-between rounded-xl"
      aria-label="profile"
    >
      <div className="flex flex-row gap-4 items-center">
        <Avatar className=" h-20 w-20">
          <AvatarImage
            src={user?.profilePicture as string}
            alt={user?.name ? `${user.name} avatar` : 'User avatar'}
          />
          <AvatarFallback>{user?.name?.trim()?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <Typography tag="h2" variant="h3">
            {user?.name}
          </Typography>
          <div className="flex flex-row gap-1 text-secondary items-center">
            <MailIcon className="h-5 w-5" />
            <Typography tag="span" variant="h5" color="secondary">
              {user?.email}
            </Typography>
          </div>
          {user?.phoneNumber && (
            <div className="flex flex-row gap-1 text-secondary items-center">
              <PhoneIcon className="h-5 w-5" />
              <Typography tag="span" variant="h5" color="secondary">
                {user?.phoneNumber}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <Button size="sm" asLink to={ROUTES.EDIT_PROFILE}>
        <EditIcon />
        Edit Profile
      </Button>
    </section>
  );
};
