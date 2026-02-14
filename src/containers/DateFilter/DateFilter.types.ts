/**
 * The props for Date filter.
 */
export type DateFilterProps = {
  /**
   * The currently selected Date string.
   */
  value?: string;
  /**
   * Callback fired whenever the selected date change.
   */
  onChange: (date?: string) => void;
};
