import { Skeleton } from '@/components/Skeleton';

import { Avatar } from './Avatar.component';
import type { AvatarSizes } from './Avatar.types';

export const AvatarSkeleton = ({ size = 'default' }: { size?: AvatarSizes }) => (
  <Avatar size={size}>
    <Skeleton />
  </Avatar>
);
