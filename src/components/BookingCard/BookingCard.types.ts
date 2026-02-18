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
  status?: 'success' | 'error' | 'neutral';
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
   * To display the card as visually disabled.
   */
  disabled?: boolean;
  /**
   * Indicates whether the action is in progress.
   */
  loading?: boolean;
  /**
   * Callback fired when the action button is clicked.
   */
  onAction?: () => void;
};
