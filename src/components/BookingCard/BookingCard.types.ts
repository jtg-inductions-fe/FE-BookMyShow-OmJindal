export type BookingCardProps = {
  /**
   * The title of the booking card component.
   */
  title: string;
  /**
   * The subtitle of the booking card component.
   */
  subtitle: string;
  /**
   * The show time label of the booking card component.
   */
  showTimeLabel: string;
  /**
   * The seat label of the booking card component.
   */
  seatLabel: string;
  /**
   * Whether the booking is of future slot.
   */
  isUpcoming: boolean;
  /**
   * Whether the booking is cancelled.
   */
  isCancelled: boolean;
  /**
   * Whether the booking is of past slot.
   */
  isPast: boolean;
  /**
   * Whether the booking is cancelling or not.
   */
  isLoading: boolean;
  /**
   * The action to be performed on button click.
   */
  handleClick: () => void;
};
