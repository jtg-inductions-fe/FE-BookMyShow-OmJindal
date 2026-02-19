/**
 * Represents a data displayed inside the card.
 */
export type InfoItem = {
  /**
   * Label describing the information.
   */
  label: string;
  /**
   * Value associated with the label.
   */
  value: string;
};

/**
 * The status of the booking card.
 */
export type BookingCardStatus = 'error' | 'success';

export type BookingCardProps = {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The description of the card.
   */
  description?: string;
  /**
   * Status used to control styling.
   */
  status?: BookingCardStatus;
  /**
   * Optional badge shown on the top-right of the card.
   */
  badgeText?: string;
  /**
   * Data to be shown inside the card.
   */
  info?: InfoItem[];
  /**
   * Label displayed on the action button.
   */
  actionLabel?: string;
  /**
   * Callback fired when the action button is clicked.
   */
  onAction?: () => void;
  /**
   * Indicates whether the action is in progress.
   */
  disabled?: boolean;
};
