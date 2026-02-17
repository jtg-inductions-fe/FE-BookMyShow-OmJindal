import type { AvatarSizes } from '@/components/Avatar';

export type ProfileProps = {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The fallback label in case
   * image is not availabel.
   */
  fallbackLabel: string | null;
  /**
   * The email of the user.
   */
  email: string;
  /**
   * The phone number of the user.
   */
  phoneNumber?: string;
  /**
   * The profile picture URL of the user.
   */
  profilePicture?: string;
  /**
   * The size of the avatar icon.
   */
  size?: AvatarSizes;
};
