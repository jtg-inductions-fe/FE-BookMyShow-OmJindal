import { useEffect } from 'react';

import { Clock as ClockIcon, EarthIcon, MapPin } from 'lucide-react';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router';

import { MovieDetailedCard, SlotCard, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { CityFilter } from '@/containers/CityFilter';
import { DateFilter } from '@/containers/DateFilter';
import { useFilters } from '@/hooks';
import { useMovieDetailQuery } from '@/services';
import { formatDurationLabel, getIdFromSlug, getNameFromSlug, slugGenerator } from '@/utils';

import { MovieDetailSkeleton } from './MovieDetail.skeleton';
import type { MovieDetailFilter } from './MovieDetail.types';

export const MovieDetail = () => {
  const { movieSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { filters, updateFilter } = useFilters<MovieDetailFilter>({
    city: { type: 'number' },
    date: { type: 'date' },
  });

  const movieId = getIdFromSlug(movieSlug ?? '');

  const { data, isLoading } = useMovieDetailQuery(
    { ...filters, movieId: getIdFromSlug(movieId) },
    { skip: !movieId },
  );

  // To match the movie name in the URL as received from backend
  useEffect(() => {
    if (!data) return;

    const movieName = getNameFromSlug(movieSlug ?? '');
    const slug = slugGenerator(`${data.name} ${movieId}`);

    if (slug !== movieName) {
      void navigate(
        {
          pathname: `${ROUTES.MOVIE_DETAIL.BASE}${slug}`,
          search: location.search,
        },
        { replace: true },
      );
    }
  }, [data, movieSlug, movieId, navigate, location.search]);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (!data)
    return (
      <div className="flex items-center justify-center text-center w-full">
        <Typography tag="h1" variant="h3">
          No movie found.
        </Typography>
      </div>
    );

  const languageLabel = data.languages.join(', ');
  const durationLabel = formatDurationLabel(data.duration);

  return (
    <div className="w-full flex flex-col gap-10 mb-10">
      {/* Hero section */}
      <section
        className="bg-primary h-85 md:h-120 flex items-center justify-center"
        aria-label="movie detail section"
      >
        <MovieDetailedCard
          title={data.name}
          poster={data.poster}
          description={data.description}
          tags={data.genres}
          info={[
            { icon: <ClockIcon color="white" aria-hidden="true" />, label: durationLabel },
            { icon: <EarthIcon color="white" aria-hidden="true" />, label: languageLabel },
          ]}
        />
      </section>
      {/* Description section in mobile view */}
      <section
        className="rounded-2xl p-8 bg-white mx-5 shadow-md md:hidden space-y-1"
        aria-label="movie description section"
      >
        <Typography variant="h2" tag="h1">
          {data.name}
        </Typography>
        <Typography color="secondary">{data.description}</Typography>
        <div className="flex flex-row gap-2">
          <ClockIcon color="grey" aria-hidden="true" />
          <Typography color="secondary">{durationLabel}</Typography>
        </div>
      </section>
      {/* Filter Section */}
      <section
        className="rounded-2xl p-4 md:p-8 bg-white mx-5 shadow-md space-y-5"
        aria-label="Filters for movie's cinema"
      >
        <Typography tag="h2">Select Cinema and Show Time</Typography>
        <div className="flex gap-5 md:items-center flex-col sm:flex-row">
          <div className="md:w-80">
            <CityFilter onChange={(cityId) => updateFilter('city', cityId)} />
          </div>
          <div className="md:w-80">
            <DateFilter
              value={filters.date}
              onChange={(v) => updateFilter('date', v)}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
      </section>
      {/* Cinema Slot Section */}
      <section aria-label="Available cinemas and showtimes">
        <ul className="space-y-10 mx-5 md:mx-10 lg:mx-20">
          {data.cinemas.map((cinema) => (
            <li key={cinema.cinema.id}>
              <SlotCard
                imgUrl={cinema.cinema.image}
                title={`${cinema.cinema.name}, ${cinema.cinema.city}`}
                icon={<MapPin color="grey" aria-hidden="true" />}
                subtitle={cinema.cinema.address}
                sections={cinema.languages.map((language) => ({
                  data: {
                    id: language.language.id,
                    title: language.language.name,
                  },
                  items: language.slots.map((slot) => ({
                    id: slot.id,
                    price: slot.price,
                    startTime: slot.startTime,
                    to: `${ROUTES.SLOT.BASE}${slot.id}`,
                  })),
                }))}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
