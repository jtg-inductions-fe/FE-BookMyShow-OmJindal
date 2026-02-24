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
  <div className="flex flex-row gap-4 items-center max-w-100">
    <Avatar size={size}>
      <AvatarImage src={profilePicture} alt="User avatar" />
      <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>

    <div className="space-y-1 min-w-0">
      {name && (
        <Typography tag="p" variant="h4" title={name} truncate={1}>
          {name}
        </Typography>
      )}
      {email && (
        <div className="flex gap-1 text-secondary">
          <Mail className="min-w-5" />
          <Typography tag="p" variant="small" color="secondary" title={email} truncate={1}>
            {email}
          </Typography>
        </div>
      )}
      {phoneNumber && (
        <div className="flex gap-1 text-secondary">
          <Phone className="min-w-5" />
          <Typography tag="p" variant="small" color="secondary" title={phoneNumber} truncate={1}>
            {phoneNumber}
          </Typography>
        </div>
      )}
    </div>
  </div>
);
