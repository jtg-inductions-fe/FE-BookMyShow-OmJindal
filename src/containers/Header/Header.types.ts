import type { User } from '@/types';

export type AvatarDropdownProps = {
  user: User | null;
  handleClick: () => void;
};
