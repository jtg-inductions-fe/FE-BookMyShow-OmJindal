import { MapPin } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

import { CinemaCard, CinemaCardSkeleton, Typography } from '@/components';
import { useCinemaListPaginatedInfiniteQuery } from '@/services';
import { slugGenerator } from '@/utils';

import type { CinemaListGridProps } from './CinemaListGrid.types';

export const CinemaListGrid = ({ filters }: CinemaListGridProps) => {
  const cinemasQuery = useCinemaListPaginatedInfiniteQuery(filters);

  const cinemas = cinemasQuery.data?.pages.flatMap((p) => p.results) ?? [];

  if (cinemasQuery.isLoading) {
    return (
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <CinemaCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cinemas.length === 0) {
    return <Typography>No cinemas found</Typography>;
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
            const slug = slugGenerator(`${cinema.name} ${cinema.city}`);
            const to = `/cinemas/${slug}/${cinema.id}`;
            return (
              <li key={cinema.id}>
                <Link to={to}>
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

          {cinemasQuery.isFetchingNextPage &&
            Array.from({ length: 5 }).map((_, i) => <CinemaCardSkeleton key={`loader-${i}`} />)}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
