import { type ReactNode, useMemo } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import { Clock as ClockIcon, EarthIcon } from 'lucide-react';
import { Link } from 'react-router';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  MovieDetailedCard,
  MovieDetailedCardSkeleton,
  Typography,
} from '@/components';
import { API_DEFAULTS } from '@/constants';
import { useMovieListInfiniteQuery } from '@/services';
import { formatDurationLabel, slugGenerator } from '@/utils';

export const LatestMovieCarousel = () => {
  const { data, isLoading } = useMovieListInfiniteQuery({
    latest_days: API_DEFAULTS.MOVIE.LATEST_DAYS,
  });

  const plugins = useMemo(() => [Autoplay({ delay: 3000 })], []);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  let carouselContent: ReactNode = null;

  if (isLoading) {
    carouselContent = (
      <CarouselItem className="h-80 md:h-100 lg:h-120">
        <MovieDetailedCardSkeleton />
      </CarouselItem>
    );
  } else if (movies.length === 0) {
    carouselContent = (
      <CarouselItem className="h-80 md:h-100 lg:h-120">
        <Typography color="default">No movies found</Typography>
      </CarouselItem>
    );
  } else {
    carouselContent = movies.slice(0, 5).map((movie) => {
      const to = `/movies/${slugGenerator(movie.name)}/${movie.id}`;
      const languageLabel = movie.languages.join(', ');
      const durationLabel = formatDurationLabel(movie.duration);
      return (
        <CarouselItem key={'carousel-movie-' + movie.id} className="h-80 md:h-100 lg:h-120">
          <Link to={to}>
            <MovieDetailedCard
              title={movie.name}
              poster={movie.poster}
              description={movie.description}
              tags={movie.genres}
              info={[
                { icon: <ClockIcon color="white" />, label: durationLabel },
                { icon: <EarthIcon color="white" />, label: languageLabel },
              ]}
            />
          </Link>
        </CarouselItem>
      );
    });
  }

  return (
    <Carousel
      className="bg-primary"
      plugins={plugins}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>{carouselContent}</CarouselContent>
      {movies.length > 0 && (
        <>
          <CarouselPrevious className="hidden sm:block" />
          <CarouselNext className="hidden sm:block" />
        </>
      )}
    </Carousel>
  );
};
