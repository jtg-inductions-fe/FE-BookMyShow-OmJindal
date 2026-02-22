import { X } from 'lucide-react';

import { Button, ChipGroup, ChipGroupSkeleton, Typography } from '@/components';
import { CinemaFilter } from '@/containers/CinemaFilter';
import { DateFilter } from '@/containers/DateFilter';
import { GenreFilter } from '@/containers/GenreFilter';
import { LanguageFilter } from '@/containers/LanguageFilter';
import { useCinemaListQuery } from '@/services';

import type { MovieListFilterProps, MovieListFilterType } from './MovieListFilter.types';

export const MovieListFilter = ({ filters, setFilters }: MovieListFilterProps) => {
  const selectedCinemasQuery = useCinemaListQuery(
    { cinemaIds: filters.cinemas },
    {
      skip: !filters.cinemas.length,
    },
  );

  const selectedCinemas = selectedCinemasQuery.data ?? [];

  const updateFilter = <K extends keyof MovieListFilterType>(
    key: K,
    value: MovieListFilterType[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilter = () => {
    setFilters({
      genres: [],
      languages: [],
      cinemas: [],
      date: undefined,
    });
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
        <Button variant="tertiary" size="sm" onClick={handleClearFilter}>
          Clear All
        </Button>
      </div>
      {/* Cinema search component */}
      <Typography tag="h3" variant="h4">
        Cinema
      </Typography>
      <CinemaFilter
        value={filters.cinemas}
        onChange={(cinemaIds) => updateFilter('cinemas', cinemaIds)}
      />
      {/* Selected cinemas */}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedCinemasQuery.isLoading ? (
          <ChipGroupSkeleton />
        ) : (
          <ChipGroup
            ids={filters.cinemas}
            data={selectedCinemas}
            getId={(cinema) => cinema.id}
            getLabel={(cinema) => cinema.name}
            onAction={(id) =>
              updateFilter(
                'cinemas',
                filters.cinemas.filter((cinemaId) => cinemaId !== id),
              )
            }
            icon={<X />}
            title="cinema"
          />
        )}
      </div>
      {/* Date Picker component */}
      <Typography tag="h3" variant="h4">
        Date
      </Typography>
      <DateFilter
        value={filters.date}
        onChange={(date) => updateFilter('date', date)}
        disabled={{ before: new Date() }}
      />
      {/* Genre dropdown component */}
      <GenreFilter
        value={filters.genres}
        onChange={(genreIds) => updateFilter('genres', genreIds)}
      />
      {/* Language dropdown component */}
      <LanguageFilter
        value={filters.languages}
        onChange={(languageIds) => updateFilter('languages', languageIds)}
      />
    </section>
  );
};
