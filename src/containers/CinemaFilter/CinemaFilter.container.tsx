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
    <Combobox
      items={cinemas}
      autoHighlight
      onValueChange={(val: CinemaPaginatedApiResponse | null | undefined) => {
        if (!val) return;

        addCinema(val);
        setInputValue('');
        setSearch('');
      }}
    >
      <ComboboxInput
        placeholder="Search for cinema"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>No cinemas found.</ComboboxEmpty>
        <ComboboxList>
          {(cinema: CinemaPaginatedApiResponse) => (
            <ComboboxItem key={cinema.id} value={cinema}>
              {cinema.name}, {cinema.city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
