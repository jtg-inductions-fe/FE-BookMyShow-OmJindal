import { useEffect } from 'react';

import { Clock as ClockIcon, EarthIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { MovieDetailedCard, SlotCard, Typography } from '@/components';
import { CityFilter } from '@/containers/CityFilter';
import { DateFilter } from '@/containers/DateFilter';
import { useFilters } from '@/hooks';
import { useMovieDetailQuery } from '@/services';
import { slugGenerator } from '@/utils';

import { MovieDetailSkeleton } from './MovieDetail.skeleton';
import type { MovieDetailFilter } from './MovieDetail.types';

export const MovieDetail = () => {
  const { movieName, movieId } = useParams();
  const navigate = useNavigate();

  const { filters, setFilters } = useFilters<MovieDetailFilter>({
    city: { type: 'number', value: undefined },
    date: { type: 'date', value: undefined },
  });

  const { data, isLoading } = useMovieDetailQuery({ ...filters, movieId: movieId });

  useEffect(() => {
    if (!data) return;

    const slug = slugGenerator(data.name);
    if (slug !== movieName) {
      void navigate(`/movies/${slug}/${movieId}`, { replace: true });
    }
  }, [data, movieName, movieId, navigate]);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (!data) return null;

  const languageLabel = data.languages.join(', ');
  const durationLabel = `${data.duration.slice(0, 2)}h ${data.duration.slice(3, 5)}m`;

  const updateFilter = (
    key: keyof MovieDetailFilter,
    value: MovieDetailFilter[keyof MovieDetailFilter],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
          {data?.name}
        </Typography>
        <Typography color="secondary">{data?.description}</Typography>
        <div className="flex flex-row gap-2">
          <ClockIcon color="grey" aria-hidden="true" />
          <Typography color="secondary">{data?.duration}</Typography>
        </div>
      </section>
      {/* Filter Section */}
      <section
        className="rounded-2xl p-8 bg-white mx-5 shadow-md space-y-3"
        aria-label="Filters for movie's cinema"
      >
        <Typography tag="h2">Select Cinema and Show Time</Typography>
        <div className="flex gap-5 md:items-center flex-col sm:flex-row">
          <div className="w-80">
            <CityFilter onChange={(v) => updateFilter('city', v)} />
          </div>
          <div className="w-80">
            <DateFilter value={filters.date} onChange={(v) => updateFilter('date', v)} />
          </div>
        </div>
      </section>
      {/* Cinema Slot Section */}
      <section aria-label="Available cinemas and showtimes">
        <ul className="space-y-10 mx-5 md:mx-10 lg:mx-20">
          {data?.cinemas.map((cinema) => (
            <SlotCard
              key={cinema.cinema.id}
              imgUrl={cinema.cinema.image}
              title={`${cinema.cinema.name}, ${cinema.cinema.city}`}
              icon={<MapPin color="grey" aria-hidden="true" />}
              subtitle={cinema.cinema.address}
              group={{
                label: 'Showtimes',
                sections: cinema.languages.map((language) => ({
                  data: {
                    id: language.language.id,
                    title: language.language.name,
                  },
                  items: language.slots,
                })),
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
