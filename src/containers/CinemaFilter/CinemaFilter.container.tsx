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

  const addCinema = (cinema: CinemaPaginatedApiResponse) => {
    if (!value.includes(cinema.id)) {
      onChange([...value, cinema.id]);
    }
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    debouncedSetSearch(val);
  };

  return (
    <Searchbar<CinemaPaginatedApiResponse>
      items={cinemas}
      value={inputValue}
      placeholder="Search for cinema"
      onChange={handleChange}
      emptyLabel="No cinema found."
      onSelect={(val) => {
        addCinema(val);
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
