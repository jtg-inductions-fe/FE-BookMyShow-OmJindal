import type { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import { MovieCard, MovieCardSkeleton, Typography } from '@/components';
import { API_DEFAULTS, ROUTES } from '@/constants';
import { useMovieListInfiniteQuery } from '@/services';
import { slugGenerator } from '@/utils';

export const LatestMovieGrid = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMovieListInfiniteQuery({ latest_days: API_DEFAULTS.MOVIE.LATEST_DAYS });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const movieGridSkeleton = Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />);

  let movieGridContent: ReactNode = null;

  if (isLoading) {
    movieGridContent = (
      <div className="p-2 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
        {movieGridSkeleton}
      </div>
    );
  } else if (!movies.length) {
    movieGridContent = <Typography>No movies found</Typography>;
  } else {
    movieGridContent = (
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={null}
      >
        <div className="p-2 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
          {movies.map((movie) => {
            const to = `${ROUTES.MOVIE_DETAIL.BASE}${slugGenerator(movie.name)}/${movie.id}`;
            const genreLabel = movie.genres.join(', ');
            const languageLabel = movie.languages.join(', ');
            return (
              <Link to={to} key={movie.id}>
                <MovieCard
                  title={movie.name}
                  poster={movie.poster}
                  primaryLabel={genreLabel}
                  secondaryLabel={languageLabel}
                />
              </Link>
            );
          })}
          {isFetchingNextPage && movieGridSkeleton}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <section className="space-y-5 px-5 md:px-10 mb-20" aria-labelledby="movieHeading">
      <Typography tag="h2" id="movieHeading">
        Latest Movies
      </Typography>
      {movieGridContent}
    </section>
  );
};
