import { useState } from 'react';

import { MapPin, X } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import {
  Chip,
  CinemaCard,
  CinemaCardSkeleton,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Typography,
} from '@/components';
import { useDebounce, useFilters } from '@/hooks';
import { useCinemaListPaginatedInfiniteQuery, useCityListInfiniteQuery } from '@/services';
import type { City } from '@/types';
import { generateCinemaNavigationUrl } from '@/utils';

import type { CinemaListFilter } from './CinemaList.types';

export const CinemaList = () => {
  const [search, setSearch] = useState('');

  const { filters, setFilters } = useFilters<CinemaListFilter>({
    cities: { type: 'number[]', value: [] },
  });

  const debouncedSearch = useDebounce(search, 700);

  const cityQuery = useCityListInfiniteQuery({ search: debouncedSearch });
  const cinemasQuery = useCinemaListPaginatedInfiniteQuery(filters);

  const cities = cityQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const cinemas = cinemasQuery.data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <div className="w-full space-y-10 m-10">
      <div className="w-full bg-white shadow-md p-5 rounded-2xl space-y-5">
        <Typography variant="h2" tag="h1">
          Cinemas
        </Typography>
        <Combobox
          items={cities}
          onValueChange={(value: City | null | undefined) => {
            if (value) {
              setFilters((prev) => ({
                ...prev,
                cities: prev.cities?.includes(value.id)
                  ? prev.cities
                  : [...(prev.cities ?? []), value.id],
              }));
              setSearch('');
            }
          }}
          autoHighlight
        >
          <ComboboxInput
            placeholder="Search for city"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="max-w-80"
          />
          <ComboboxContent>
            <ComboboxEmpty>No city found.</ComboboxEmpty>
            <ComboboxList>
              {(city: City) => (
                <ComboboxItem key={city.id} value={city}>
                  {city.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <div className="flex flex-wrap gap-2">
          {(filters.cities ?? []).map((c) => {
            const city = cities?.find((x) => x.id === c);
            if (!city) return;
            return (
              <Chip
                key={`chip-city-${c}`}
                size="chip"
                variant="purple"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    cities: (prev.cities ?? []).filter((id) => id !== c),
                  }));
                }}
              >
                {city.name} <X />
              </Chip>
            );
          })}
        </div>
      </div>

      {cinemasQuery.isLoading ? (
        <div className="w-full md:mx-10 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <CinemaCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <InfiniteScroll
            dataLength={cinemas.length}
            next={cinemasQuery.fetchNextPage}
            hasMore={!!cinemasQuery.hasNextPage}
            loader={null}
          >
            <div className="md:mx-10 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {cinemas.map((cinema) => {
                const to = generateCinemaNavigationUrl(cinema.id, `${cinema.name} ${cinema.city}`);
                return (
                  <Link to={to} key={cinema.id}>
                    <CinemaCard
                      imgUrl={cinema.image}
                      icon={<MapPin className="text-pink" />}
                      title={`${cinema.name}, ${cinema.city}`}
                      subtitle={cinema.address}
                    />
                  </Link>
                );
              })}

              {cinemasQuery.isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, i) => <CinemaCardSkeleton key={`loader-${i}`} />)}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
