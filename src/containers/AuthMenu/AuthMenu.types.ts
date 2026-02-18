export type AuthMenuProps = {
  /**
   * Function to open the modal on
   * log out button click.
   */
  openModal: () => void;
  /**
   * Represents the loading state
   * of logout mutation.
   */
  isLoggingOut: boolean;
};
