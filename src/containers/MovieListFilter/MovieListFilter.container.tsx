import { X } from 'lucide-react';

import { Button, ChipGroup, Typography } from '@/components';
import { CinemaFilter } from '@/containers/CinemaFilter';
import { DateFilter } from '@/containers/DateFilter';
import { GenreFilter } from '@/containers/GenreFilter';
import { LanguageFilter } from '@/containers/LanguageFilter';
import { useCinemaListQuery, useGenreListQuery, useLanguageListQuery } from '@/services';

import type {
  MovieListFilter as MovieListFilterType,
  MovieListFilterProps,
} from './MovieListFilter.types';

export const MovieListFilter = ({ filters, setFilters }: MovieListFilterProps) => {
  const genreQuery = useGenreListQuery();
  const languageQuery = useLanguageListQuery();
  const selectedCinemasQuery = useCinemaListQuery(
    { cinemaIds: filters.cinemas },
    {
      skip: !filters.cinemas.length,
    },
  );

  const genreData = genreQuery.data ?? [];
  const languageData = languageQuery.data ?? [];
  const selectedCinemas = selectedCinemasQuery.data ?? [];

  const updateFilter = (
    key: keyof MovieListFilterType,
    value: MovieListFilterType[keyof MovieListFilterType],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section
      className="bg-white p-5 rounded-2xl flex flex-col gap-3 w-75"
      aria-labelledby="filterHeading"
    >
      <div className="flex flex-row justify-between">
        <Typography tag="h2" variant="h3" id="filterHeading">
          Filters
        </Typography>
        {/* Button to clear all the filters */}
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => {
            setFilters({
              genres: [],
              languages: [],
              cinemas: [],
              date: undefined,
            });
          }}
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {/* Selected genres */}
        <ChipGroup
          ids={filters.genres}
          data={genreData}
          getId={(genre) => genre.id}
          getLabel={(genre) => genre.name}
          onAction={(id) =>
            updateFilter(
              'genres',
              filters.genres.filter((x) => x !== id),
            )
          }
          icon={<X />}
          title="genre"
        />
        {/* Selected languages */}
        <ChipGroup
          ids={filters.languages}
          data={languageData}
          getId={(language) => language.id}
          getLabel={(language) => language.name}
          onAction={(id) =>
            updateFilter(
              'languages',
              filters.languages.filter((x) => x !== id),
            )
          }
          icon={<X />}
          title="language"
        />
        {/* Selected cinemas */}
        <ChipGroup
          ids={filters.cinemas}
          data={selectedCinemas}
          getId={(cinema) => cinema.id}
          getLabel={(cinema) => cinema.name}
          onAction={(id) =>
            updateFilter(
              'cinemas',
              filters.cinemas.filter((x) => x !== id),
            )
          }
          icon={<X />}
          title="cinema"
        />
      </div>
      {/* Cinema search component */}
      <CinemaFilter value={filters.cinemas} onChange={(v) => updateFilter('cinemas', v)} />
      {/* Date Picker component */}
      <DateFilter value={filters.date} onChange={(v) => updateFilter('date', v)} />
      {/* Genre dropdown component */}
      <GenreFilter value={filters.genres} onChange={(v) => updateFilter('genres', v)} />
      {/* Language dropdown component */}
      <LanguageFilter value={filters.languages} onChange={(v) => updateFilter('languages', v)} />
    </section>
  );
};
