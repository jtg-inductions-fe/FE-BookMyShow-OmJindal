/**
 * The props for city filter.
 */
export type CityFilterProps = {
  /**
   * The currently selected city IDs.
   */
  value: string[];
  /**
   * Callback fired whenever the selected city change.
   */
  onChange: (cities: string[]) => void;
};
