import type { ProfileResponse } from '@/services';

export type ProfileContainerProps = {
  /**
   * The data of the user.
   */
  user: ProfileResponse;
  /**
   * The function to be called on logout.
   */
  handleLogout: () => void;
  /**
   * Represent the disabled state of logout button.
   */
  isLoading: boolean;
};
