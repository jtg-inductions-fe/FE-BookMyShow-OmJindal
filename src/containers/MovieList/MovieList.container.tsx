import { Filter as FilterIcon } from 'lucide-react';

import { Button, Popover, PopoverContent, PopoverTrigger, Typography } from '@/components';
import { MovieListFilter, type MovieListFilterType } from '@/containers/MovieListFilter';
import { MovieListGrid } from '@/containers/MovieListGrid';
import { useFilters } from '@/hooks';

export const MovieList = () => {
  const { filters, setFilters } = useFilters<MovieListFilterType>({
    cinemas: { type: 'number[]', value: [] },
    genres: { type: 'number[]', value: [] },
    languages: { type: 'number[]', value: [] },
    date: { type: 'date', value: undefined },
  });

  return (
    <div className="flex flex-col gap-10 w-full p-5 lg:p-10">
      <div className="flex flex-row justify-between">
        <Typography tag="h1" variant="h2">
          All movies
        </Typography>
        {/* Display Filter Popover in mobile view */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="md" variant="secondary">
                <FilterIcon />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-80 rounded-2xl p-0">
              <MovieListFilter filters={filters} setFilters={setFilters} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 w-full">
        {/* Display Filter in desktop view */}
        <div className="hidden md:block">
          <MovieListFilter filters={filters} setFilters={setFilters} />
        </div>
        {/* Movie List Grid */}
        <MovieListGrid filters={filters} />
      </div>
    </div>
  );
};
