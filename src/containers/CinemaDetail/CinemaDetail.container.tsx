import { useEffect } from 'react';

import { format } from 'date-fns';
import { ClockIcon, MapPinIcon } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { CinemaDetailCard, EmptyState, SlotCard, Typography } from '@/components';
import { API_CONSTANTS, ROUTES } from '@/constants';
import { DateFilter } from '@/containers/DateFilter';
import { useFilters } from '@/hooks';
import { useCinemaDetailQuery } from '@/services';
import { getIdFromSlug, slugGenerator } from '@/utils';

import type { CinemaDetailFilter } from './Cinema.types';
import { CinemaDetailSkeleton } from './CinemaDetail.skeleton';

export const CinemaDetail = () => {
  const { cinemaSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { filters, updateFilter } = useFilters<CinemaDetailFilter>({
    date: { type: 'date', value: format(new Date(), API_CONSTANTS.DATE_FORMAT) },
  });

  const cinemaId = getIdFromSlug(cinemaSlug ?? '');

  const { data, isLoading } = useCinemaDetailQuery(
    { ...filters, cinemaId },
    {
      skip: !cinemaId,
    },
  );

  // To match the cinema name in the URL as received from backend
  useEffect(() => {
    if (!data) return;

    const slug = slugGenerator(`${data.name} ${data.city} ${data.id}`);
    if (slug !== cinemaSlug) {
      void navigate(
        {
          pathname: `${ROUTES.CINEMA_DETAIL.BASE}${slug}`,
          search: location.search,
        },
        { replace: true },
      );
    }
  }, [data, cinemaSlug, location.search, navigate]);

  if (isLoading) {
    return <CinemaDetailSkeleton />;
  }

  if (!data)
    return (
      <EmptyState
        title="No cinema found"
        description="The cinema may have been removed or the link might be incorrect."
      />
    );

  return (
    <div className="w-full flex flex-col gap-10 mb-10">
      {/* Hero section */}
      <section className="bg-primary h-30" aria-label="cinema detail section">
        <CinemaDetailCard
          imgUrl={data.image}
          title={`${data.name}, ${data.city}`}
          subtitle={data.address}
          icon={<MapPinIcon className="text-pink" />}
        />
      </section>
      {/* Description section in mobile view */}
      <section
        className="rounded-2xl p-8 bg-white mx-5 shadow-md md:hidden space-y-1"
        aria-label="cinema description section"
      >
        <Typography variant="h2" title={`${data.name}, ${data.city}`} lineClamp={2}>
          {data.name}, {data.city}
        </Typography>
        <div className="flex gap-1">
          <MapPinIcon className="text-pink" />
          <Typography color="secondary" title={data.address} lineClamp={2}>
            {data.address}
          </Typography>
        </div>
      </section>
      {/* Filter Section */}
      <section
        className="rounded-2xl p-8 bg-white mx-5 shadow-md space-y-3"
        aria-label="Filters for cinema's movies"
      >
        <Typography variant="h2">Select Movie and Show Time</Typography>
        <div className="flex gap-5 md:items-center flex-col sm:flex-row">
          <DateFilter
            value={filters.date}
            onChange={(v) => updateFilter('date', v)}
            disabled={{ before: new Date() }}
          />
        </div>
      </section>
      {/* Movie Slot Section */}
      <section aria-label="Available movies and showtimes">
        <ul className="space-y-10 mx-5 md:mx-10 lg:mx-20">
          {data.movies.length > 0 ? (
            data.movies.map((movie) => (
              <li key={movie.movie.id}>
                <SlotCard
                  imgUrl={movie.movie.poster}
                  title={movie.movie.name}
                  subtitle={movie.movie.duration}
                  icon={<ClockIcon color="grey" />}
                  sections={movie.languages.map((language) => ({
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
            ))
          ) : (
            <EmptyState
              title="No slot found"
              description="Try changing filters by selecting a different date."
            />
          )}
        </ul>
      </section>
    </div>
  );
};
