import type { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import { EmptyState, MovieCard, MovieCardSkeleton } from '@/components';
import { ROUTES } from '@/constants';
import { useGenreListQuery, useLanguageListQuery, useMovieListInfiniteQuery } from '@/services';
import { slugGenerator } from '@/utils';

import type { MovieListGridProps } from './MovieListGrid.types';

export const MovieListGrid = ({ filters }: MovieListGridProps) => {
  const languageQuery = useLanguageListQuery();
  const genreQuery = useGenreListQuery();

  const languageIds = languageQuery.data
    ?.filter((lang) => filters.languages.includes(lang.name))
    .map((lang) => lang.id);

  const genreIds = genreQuery.data
    ?.filter((genre) => filters.genres.includes(genre.name))
    .map((lang) => lang.id);

  const moviesQuery = useMovieListInfiniteQuery(
    {
      date: filters.date,
      cinemas: filters.cinemas,
      languages: languageIds,
      genres: genreIds,
    },
    {
      skip: languageQuery.isLoading || genreQuery.isLoading,
    },
  );

  const movies = moviesQuery.data?.pages.flatMap((page) => page.results) ?? [];

  const renderSkeletons = (count: number): ReactNode => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li key={`loader-${i}`}>
          <MovieCardSkeleton />
        </li>
      ))}
    </>
  );

  if (moviesQuery.isLoading) {
    return (
      <ul className="m-2 gap-10 grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 list-none">
        {renderSkeletons(5)}
      </ul>
    );
  }

  if (movies.length === 0) {
    return (
      <EmptyState
        title="No movies found"
        description="Try changing filters or selecting a different date."
      />
    );
  }

  return (
    <section className="w-full" aria-label="Filtered movies list">
      <InfiniteScroll
        dataLength={movies.length}
        next={moviesQuery.fetchNextPage}
        hasMore={moviesQuery.hasNextPage}
        loader={null}
      >
        <ul className="m-2 gap-10 grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {movies.map((movie) => {
            const to = `${ROUTES.MOVIE_DETAIL.BASE}${slugGenerator(`${movie.name} ${movie.id}`)}`;
            const genreLabel = movie.genres.join(', ');
            const languageLabel = movie.languages.join(', ');
            return (
              <li key={movie.id}>
                <Link to={to} className="h-full block rounded-xl">
                  <MovieCard
                    title={movie.name}
                    poster={movie.poster}
                    primaryLabel={genreLabel}
                    secondaryLabel={languageLabel}
                  />
                </Link>
              </li>
            );
          })}

          {moviesQuery.isFetchingNextPage && renderSkeletons(5)}
        </ul>
      </InfiniteScroll>
    </section>
  );
};
