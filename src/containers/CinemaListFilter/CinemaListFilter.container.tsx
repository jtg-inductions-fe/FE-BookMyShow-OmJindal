import { X } from 'lucide-react';

import { ChipGroup, ChipGroupSkeleton } from '@/components';
import { MultipleCityFilter } from '@/containers/MultipleCityFilter';
import { useCityListQuery } from '@/services';

import type { CinemaListFilterProps } from './CinemaListFilter.types';

export const CinemaListFilter = ({ filters, updateFilter }: CinemaListFilterProps) => {
  const selectedCityQuery = useCityListQuery(
    { cityNames: filters.cities },
    {
      skip: !filters.cities.length,
    },
  );

  const selectedCities = filters.cities.length ? (selectedCityQuery.data ?? []) : [];

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
        {selectedCityQuery.isLoading ? (
          <ChipGroupSkeleton />
        ) : (
          <ChipGroup
            ids={selectedCities.map((city) => city.id)}
            data={selectedCities}
            getId={(city) => city.id}
            getLabel={(city) => city.name}
            onAction={(id) => {
              const selectedCity = selectedCities.find((city) => city.id === id);
              updateFilter(
                'cities',
                filters.cities.filter((cityName) => cityName !== selectedCity?.name),
              );
            }}
            icon={<X />}
            title="city"
          />
        )}
      </div>
    </>
  );
};
