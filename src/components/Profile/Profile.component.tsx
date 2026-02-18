import { Mail, Phone } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Typography } from '@/components/Typography';

import type { ProfileProps } from './Profile.types';

/**
 * The user profile component showing avatar and basic details
 */
export const Profile = ({
  name,
  email,
  phoneNumber,
  profilePicture,
  size = 'default',
}: ProfileProps) => (
  <div className="flex flex-row gap-4 items-center">
    <Avatar size={size}>
      <AvatarImage src={profilePicture} alt="User avatar" />
      <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>

    <div className="space-y-1">
      {name && (
        <Typography tag="p" variant="h4">
          {name}
        </Typography>
      )}
      {email && (
        <div className="flex gap-1 text-secondary">
          <Mail className="h-5 w-5" />
          <Typography tag="p" variant="small" color="secondary">
            {email}
          </Typography>
        </div>
      )}
      {phoneNumber && (
        <div className="flex gap-1 text-secondary">
          <Phone className="h-5 w-5" />
          <Typography tag="p" variant="small" color="secondary">
            {phoneNumber}
          </Typography>
        </div>
      )}
    </div>
  </div>
);
