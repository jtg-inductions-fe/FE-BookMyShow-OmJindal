import type { SlotResponse } from '@/services';

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
};
