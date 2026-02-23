/**
 * The props for city filter.
 */
export type CityFilterProps = {
  /**
   * Callback fired whenever the selected city changes.
   */
  onChange: (cityId: number) => void;
};
