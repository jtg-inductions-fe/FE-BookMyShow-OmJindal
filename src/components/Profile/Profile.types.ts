import type { To } from 'react-router';

import type { ProfileResponse } from '@/services';

export type ProfileProps = {
  /**
   * The data of the user.
   */
  user: ProfileResponse;
  /**
   * The function to be called on logout.
   */
  handleClick: () => void;
  /**
   * Represent the active state of profile button.
   */
  isActive: boolean;
  /**
   * The route to be navigate to on click of profile button.
   */
  to: To;
};
