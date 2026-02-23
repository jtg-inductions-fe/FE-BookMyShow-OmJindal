import { useState } from 'react';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import type { CityApiResponse } from '@/services';
import { useCityListPaginatedInfiniteQuery } from '@/services';

import type { CityFilterProps } from './CityFilter.types';

export const CityFilter = ({ onChange }: CityFilterProps) => {
  // UI value
  const [inputValue, setInputValue] = useState('');

  // API value
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useDebounce((val: string) => {
    setSearch(val);
  }, SEARCH_DEBOUNCE_DELAY);

  const cityQuery = useCityListPaginatedInfiniteQuery({ search });

  const cities = cityQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const addCity = (city: CityApiResponse) => {
    onChange(city.id);
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  return (
    <Combobox
      items={cities}
      autoHighlight
      onValueChange={(val: CityApiResponse | null | undefined) => {
        if (!val) return;

        addCity(val);
        setInputValue(val.name);
        setSearch('');
      }}
    >
      <ComboboxInput
        placeholder="Search for city"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
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
