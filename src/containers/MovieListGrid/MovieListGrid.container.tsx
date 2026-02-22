import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import { MovieCard, MovieCardSkeleton, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { useMovieListInfiniteQuery } from '@/services';
import { slugGenerator } from '@/utils';

import type { MovieListGridProps } from './MovieListGrid.types';

export const MovieListGrid = ({ filters }: MovieListGridProps) => {
  const moviesQuery = useMovieListInfiniteQuery(filters);

  const movies = moviesQuery.data?.pages.flatMap((page) => page.results) ?? [];

  if (moviesQuery.isLoading) {
    return (
      <div className="m-2 gap-10 grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <Typography tag="p">No movies found</Typography>;
  }

  return (
    <section className="w-full" aria-label="Filtered movies list">
      <InfiniteScroll
        dataLength={movies.length}
        next={moviesQuery.fetchNextPage}
        hasMore={moviesQuery.hasNextPage}
        loader={null}
      >
        <ul className="m-2 gap-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {movies.map((movie) => {
            const to = `${ROUTES.MOVIE_DETAIL.BASE}${slugGenerator(movie.name)}/${movie.id}`;
            const genreLabel = movie.genres.join(', ');
            const languageLabel = movie.languages.join(', ');
            return (
              <li key={movie.id}>
                <Link to={to}>
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

          {moviesQuery.isFetchingNextPage &&
            Array.from({ length: 5 }).map((_, i) => (
              <li key={`loader-${i}`}>
                <MovieCardSkeleton />
              </li>
            ))}
        </ul>
      </InfiniteScroll>
    </section>
  );
};
