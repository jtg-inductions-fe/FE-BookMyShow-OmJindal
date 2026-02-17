import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type ModalProps = {
  /**
   * Decide whether modal is open or not.
   */
  isOpen: boolean;
  /**
   * Dispatch function to toggle the state of modal.
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /**
   * The icon to be displayed inside modal.
   */
  icon: ReactNode;
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * The subtitle of the modal.
   */
  subtitle: string;
  /**
   * Button text to close the modal.
   */
  closeModalText: string;
  /**
   * Confirm button text to be displayed.
   */
  confirmText: string;
  /**
   * Function to be called on clicking handle
   * confirm button.
   */
  handleConfirm: () => void;
  /**
   * Represent the loading state of confirm button.
   */
  isLoading: boolean;
};
