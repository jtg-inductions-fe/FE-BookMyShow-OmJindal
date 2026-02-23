import { useState } from 'react';

import { Searchbar } from '@/components';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import type { CityApiResponse } from '@/services';
import { useCityListPaginatedInfiniteQuery } from '@/services';

import type { CityFilterProps } from './MultipleCityFilter.types';

export const MultipleCityFilter = ({ value, onChange }: CityFilterProps) => {
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
    if (!value.includes(city.id)) {
      onChange([...value, city.id]);
    }
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  return (
    <Searchbar<CityApiResponse>
      items={cities}
      value={inputValue}
      placeholder="Search for city"
      emptyLabel="No city found"
      onChange={handleChange}
      onSelect={(val) => {
        addCity(val);
        setInputValue(val.name);
        setSearch('');
      }}
      getKey={(city) => city.id}
      renderItem={(city) => <>{city.name}</>}
    />
  );
};
