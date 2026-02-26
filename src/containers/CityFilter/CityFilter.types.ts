import type { City } from '@/types';

/**
 * The props for city filter.
 */
export type CityFilterProps = {
  /**
   * Callback fired whenever the selected city changes.
   */
  onChange: (cityName: string) => void;
  /**
   * The current selected value
   */
  value?: Pick<City, 'id' | 'name'>;
};
