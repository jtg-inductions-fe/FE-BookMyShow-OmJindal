import { MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import { CinemaCard, CinemaCardSkeleton, EmptyState } from '@/components';
import { ROUTES } from '@/constants';
import { useCinemaListPaginatedInfiniteQuery, useCityListQuery } from '@/services';
import { slugGenerator } from '@/utils';

import type { CinemaListGridProps } from './CinemaListGrid.types';

export const CinemaListGrid = ({ filters }: CinemaListGridProps) => {
  const selectedCityQuery = useCityListQuery(
    { cityNames: filters.cities },
    {
      skip: !filters.cities.length,
    },
  );

  const selectedCities = filters.cities.length ? (selectedCityQuery.data ?? []) : [];

  const selectedCityIds = selectedCities.map((city) => city.id);

  const cinemasQuery = useCinemaListPaginatedInfiniteQuery({
    cities: selectedCityIds,
  });

  const cinemas = cinemasQuery.data?.pages.flatMap((p) => p.results) ?? [];

  const renderSkeletons = (count: number): ReactNode => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li key={`loader-${i}`}>
          <CinemaCardSkeleton />
        </li>
      ))}
    </>
  );

  if (cinemasQuery.isLoading) {
    return (
      <ul className="list-none w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {renderSkeletons(5)}
      </ul>
    );
  }

  if (cinemas.length === 0) {
    return (
      <EmptyState
        title="No cinemas found"
        description="Try changing filters by selecting a different city"
      />
    );
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={cinemas.length}
        next={cinemasQuery.fetchNextPage}
        hasMore={cinemasQuery.hasNextPage}
        loader={null}
      >
        <ul className="my-2 md:mx-10 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {cinemas.map((cinema) => {
            const slug = slugGenerator(`${cinema.name} ${cinema.city} ${cinema.id}`);
            const to = `${ROUTES.CINEMA_DETAIL.BASE}${slug}`;
            return (
              <li key={cinema.id}>
                <Link to={to} className="h-full block rounded-xl">
                  <CinemaCard
                    imgUrl={cinema.image}
                    icon={<MapPin className="text-pink" />}
                    title={`${cinema.name}, ${cinema.city}`}
                    subtitle={cinema.address}
                  />
                </Link>
              </li>
            );
          })}

          {cinemasQuery.isFetchingNextPage && renderSkeletons(5)}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
