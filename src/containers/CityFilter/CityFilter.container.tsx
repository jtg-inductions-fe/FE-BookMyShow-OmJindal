import { useState } from 'react';

import { Searchbar } from '@/components';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import type { CityApiResponse } from '@/services';
import { useCityListPaginatedInfiniteQuery } from '@/services';

import type { CityFilterProps } from './CityFilter.types';

export const CityFilter = ({ value, onChange }: CityFilterProps) => {
  // UI value
  const [inputValue, setInputValue] = useState(value?.name || '');

  // API value
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useDebounce((val: string) => {
    setSearch(val);
  }, SEARCH_DEBOUNCE_DELAY);

  const cityQuery = useCityListPaginatedInfiniteQuery({ search });

  const cities = cityQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const handleChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  return (
    <Searchbar<CityApiResponse>
      items={cities}
      value={inputValue}
      selectedValue={[]}
      placeholder="Search for city"
      emptyLabel="No city found"
      onChange={handleChange}
      onSelect={(vals) => {
        const city = vals[0];
        if (!city) return;

        onChange(city.name);
        setInputValue(city.name);
        setSearch('');
      }}
      getKey={(city) => city.id}
      renderItem={(city) => <>{city.name}</>}
    />
  );
};
