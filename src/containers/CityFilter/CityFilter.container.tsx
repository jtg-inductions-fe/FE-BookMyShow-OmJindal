import { useState } from 'react';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { useDebounce } from '@/hooks';
import type { CityApiResponse } from '@/services';
import { useCityListPaginatedInfiniteQuery } from '@/services';

import type { CityFilterProps } from './CityFilter.types';

export const CityFilter = ({ onChange }: CityFilterProps) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 700);

  const cityQuery = useCityListPaginatedInfiniteQuery({ search: debouncedSearch });

  const cities = cityQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const addCity = (city: CityApiResponse) => {
    onChange(city.id);
  };

  return (
    <Combobox
      items={cities}
      autoHighlight
      onValueChange={(val: CityApiResponse | null | undefined) => {
        if (val) {
          addCity(val);
          setSearch('');
        }
      }}
    >
      <ComboboxInput
        placeholder="Search for city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>No city found.</ComboboxEmpty>
        <ComboboxList>
          {(city: CityApiResponse) => (
            <ComboboxItem key={city.id} value={city}>
              {city.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
