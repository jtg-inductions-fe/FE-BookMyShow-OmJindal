import { useState } from 'react';

import { Searchbar } from '@/components';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import type { CinemaPaginatedApiResponse } from '@/services';
import { useCinemaListPaginatedInfiniteQuery } from '@/services';

import type { CinemaFilterProps } from './CinemaFilter.types';

export const CinemaFilter = ({ value, onChange }: CinemaFilterProps) => {
  // UI value
  const [inputValue, setInputValue] = useState('');

  // API value
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useDebounce((val: string) => {
    setSearch(val);
  }, SEARCH_DEBOUNCE_DELAY);

  const cinemasQuery = useCinemaListPaginatedInfiniteQuery({
    search,
  });

  const cinemas = cinemasQuery.data?.pages.flatMap((page) => page.results) ?? [];

  const selectedCinemas = cinemas.filter((c) => value.includes(c.id));

  const setCinema = (selected: CinemaPaginatedApiResponse[]) => {
    const newIds = selected.map((c) => c.id);
    onChange(newIds);
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  return (
    <Searchbar<CinemaPaginatedApiResponse>
      items={cinemas}
      selectedValue={selectedCinemas}
      value={inputValue}
      placeholder="Search for cinema"
      onChange={handleChange}
      emptyLabel="No cinema found."
      onSelect={(val) => {
        setCinema(val);
        setInputValue('');
        setSearch('');
      }}
      getKey={(cinema) => cinema.id}
      renderItem={(cinema) => (
        <>
          {cinema.name}, {cinema.city}
        </>
      )}
    />
  );
};
