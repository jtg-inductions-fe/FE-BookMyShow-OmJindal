/**
 * The props for Date filter.
 */
export type DateFilterProps = {
  /**
   * The currently selected Date string.
   */
  value?: string;
  /**
   * Callback fired whenever the selected date changes.
   */
  onChange: (date?: string) => void;
};
