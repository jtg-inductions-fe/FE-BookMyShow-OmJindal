/**
 * Props for DatePicker component.
 */
export type DatePickerProps = {
  /**
   * The date to be selected.
   */
  date?: Date;
  /**
   * The function to execute when a date is selected.
   */
  onSelect: (date?: Date) => void;
};
