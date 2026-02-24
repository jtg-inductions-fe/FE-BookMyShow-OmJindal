import type { SlotResponse, useCreateBookingMutation } from '@/services';

/**
 * Create booking trigger mutation.
 */
type CreateBookingTrigger = ReturnType<typeof useCreateBookingMutation>[0];

/**
 * Props for the BookingSummary component.
 */
export type BookingSummaryProps = {
  /**
   * Array of seat IDs currently selected by the user.
   */
  selectedSeats: number[];
  /**
   * The id of the slot.
   */
  slotId?: string;
  /**
   *  Slot response data returned from the Slot API.
   */
  data: SlotResponse;
  /**
   * RTK Query mutation trigger function.
   */
  createBooking: CreateBookingTrigger;
  /**
   * Loading state of booking mutation.
   */
  isBooking: boolean;
};
