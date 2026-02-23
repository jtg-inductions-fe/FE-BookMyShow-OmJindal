import type { ReactNode } from 'react';

export type SuccessModalProps = {
  /**
   * Decide whether modal is open or not.
   */
  open: boolean;
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * The description of the modal.
   */
  description?: string;
  /**
   * Secondary button label.
   */
  secondaryLabel?: string;
  /**
   * Primary button label.
   */
  primaryLabel?: string;
  /**
   * Function to be called on clicking
   * secondary button.
   */
  onSecondary?: () => void;
  /**
   * Function to be called on clicking
   * primary button.
   */
  onPrimary?: () => void;
  /**
   * The child component
   */
  children?: ReactNode;
};
