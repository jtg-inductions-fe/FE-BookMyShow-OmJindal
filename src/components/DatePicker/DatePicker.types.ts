import type { Matcher } from 'react-day-picker';

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
  /**
   * Rules to disable date in Calendar.
   */
  disabled?: Matcher | Matcher[];
  /**
   * The title of the DatePicker component.
   */
  title: string;
};
