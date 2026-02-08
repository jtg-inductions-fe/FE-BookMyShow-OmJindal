import type { User } from '@/types';

export type ProfileProps = {
  /**
   * The data of the user.
   */
  user?: User;
  /**
   * The function to be called on logout.
   */
  handleLogout: () => void;
  /**
   * Represent the disabled state of logout button.
   */
  isLoading: boolean;
};
