import Autoplay from 'embla-carousel-autoplay';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  MovieCard,
  MovieCardSkeleton,
  MovieDetailedCard,
  MovieDetailedCardSkeleton,
  Typography,
} from '@/components';
import { API_DEFAULTS } from '@/constants';
import { useMovieListInfiniteQuery } from '@/services';
import { generateMovieNavigationUrl } from '@/utils';

export const Home = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMovieListInfiniteQuery({ latest_days: API_DEFAULTS.MOVIE.LATEST_DAYS });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex justify-center bg-primary">
        {/* Latest Movie Carousel */}
        <Carousel
          className="overflow-hidden"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {isLoading ? (
              <CarouselItem className="h-120 w-screen">
                <MovieDetailedCardSkeleton />
              </CarouselItem>
            ) : movies?.length === 0 ? (
              <CarouselItem className="w-screen h-120 flex justify-center items-center">
                <Typography color="default">No movies found</Typography>
              </CarouselItem>
            ) : (
              movies.slice(0, 5).map((movie) => (
                <CarouselItem
                  key={'carousel-movie-' + movie.id}
                  className="min-w-5xl w-screen h-80 md:h-100 lg:h-120 bg-primary/10"
                >
                  <Link to={generateMovieNavigationUrl(movie)}>
                    <MovieDetailedCard {...movie} />
                  </Link>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          {movies.length > 0 && (
            <>
              <CarouselPrevious className="hidden sm:block" />
              <CarouselNext className="hidden sm:block" />
            </>
          )}
        </Carousel>
      </div>
      {/* Latest Movie Section */}
      <section className="flex flex-col gap-5 px-5 md:px-10 mb-20" aria-labelledby="movieHeading">
        <Typography tag="h2" id="movieHeading">
          Latest Movie
        </Typography>

        {isLoading ? (
          <div className="p-1 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10 pb-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={null}
          >
            <div className="p-1 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10 pb-10">
              {movies.map((movie) => (
                <Link to={generateMovieNavigationUrl(movie)} key={movie.id}>
                  <MovieCard {...movie} />
                </Link>
              ))}
              {isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={`loader-${i}`} />)}
            </div>
          </InfiniteScroll>
        ) : (
          <Typography>No movies found</Typography>
        )}
      </section>
    </div>
  );
};
