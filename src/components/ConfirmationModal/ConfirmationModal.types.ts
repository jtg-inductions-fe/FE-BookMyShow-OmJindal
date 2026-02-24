import type { ReactNode } from 'react';

export type ConfirmationModalProps = {
  /**
   * Decide whether modal is open or not.
   */
  open: boolean;
  /**
   * Dispatch function on modal visibility toggle.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The icon to be displayed inside modal.
   */
  icon?: ReactNode;
  /**
   * The title of the modal.
   */
  title?: string;
  /**
   * The description of the modal.
   */
  description?: string;
  /**
   * Cancel button Label.
   */
  cancelLabel?: string;
  /**
   * Action button Label.
   */
  actionLabel?: string;
  /**
   * Function to be called on clicking
   * cancel button.
   */
  onCancel?: () => void;
  /**
   * Function to be called on clicking
   * action button.
   */
  onAction?: () => void;
  /**
   * Represent the loading state of action.
   */
  loading?: boolean;
};
