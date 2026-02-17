import { X } from 'lucide-react';

import { ChipGroup } from '@/components';
import { MultipleCityFilter } from '@/containers/MultipleCityFilter';
import { useCityListQuery } from '@/services';

import type {
  CinemaListFilter as CinemaListFilterType,
  CinemaListFilterProps,
} from './CinemaListFilter.types';

export const CinemaListFilter = ({ filters, setFilters }: CinemaListFilterProps) => {
  const { data: cityData, isLoading } = useCityListQuery({ cityIds: filters.cities });

  if (isLoading || !cityData) return;

  const updateFilter = (
    key: keyof CinemaListFilterType,
    value: CinemaListFilterType[keyof CinemaListFilterType],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="max-w-80">
        <MultipleCityFilter
          value={filters.cities}
          onChange={(cities) => {
            updateFilter('cities', cities);
          }}
        />
      </div>
      <div className="space-x-2 space-y-2">
        <ChipGroup
          ids={filters.cities}
          data={cityData}
          getId={(city) => city.id}
          getLabel={(city) => city.name}
          onAction={(id) =>
            updateFilter(
              'cities',
              filters.cities.filter((cityId) => cityId !== id),
            )
          }
          icon={<X />}
          title="city"
        />
      </div>
    </>
  );
};
