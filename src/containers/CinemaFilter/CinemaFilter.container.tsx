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
import type { CinemaPaginatedApiResponse } from '@/services';
import { useCinemaListPaginatedInfiniteQuery } from '@/services';

import type { CinemaFilterProps } from './CinemaFilter.types';

export const CinemaFilter = ({ value, onChange }: CinemaFilterProps) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 700);

  const cinemasQuery = useCinemaListPaginatedInfiniteQuery({
    search: debouncedSearch,
  });

  const cinemas = cinemasQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const addCinema = (cinema: CinemaPaginatedApiResponse) => {
    if (!value.includes(cinema.id)) {
      onChange([...value, cinema.id]);
    }
  };

  return (
    <Combobox
      items={cinemas}
      autoHighlight
      onValueChange={(val: CinemaPaginatedApiResponse | null | undefined) => {
        if (val) {
          addCinema(val);
          setSearch('');
        }
      }}
    >
      <ComboboxInput
        placeholder="Search for cinema"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
