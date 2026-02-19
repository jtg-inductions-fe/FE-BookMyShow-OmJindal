import type { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { BookingCardSkeleton, Typography } from '@/components';
import { BookingCardContainer } from '@/containers/BookingCard';
import { useBookingHistoryInfiniteQuery } from '@/services';

export const Booking = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookingHistoryInfiniteQuery();

  const bookings = data?.pages.flatMap((page) => page.results) ?? [];

  let bookingGrid: ReactNode = null;

  if (isLoading) {
    bookingGrid = (
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <BookingCardSkeleton />
          </li>
        ))}
      </ul>
    );
  } else if (bookings.length > 0) {
    bookingGrid = (
      <InfiniteScroll
        dataLength={bookings.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={null}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {bookings.map((booking) => (
            <li key={'booking-' + booking.id} className="h-full">
              <BookingCardContainer {...booking} />
            </li>
          ))}

          {isFetchingNextPage &&
            Array.from({ length: 5 }).map((_, i) => (
              <li key={`loader-${i}`}>
                <BookingCardSkeleton />
              </li>
            ))}
        </ul>
      </InfiniteScroll>
    );
  } else {
    bookingGrid = <Typography color="secondary">No bookings found</Typography>;
  }

  return (
    <section className="space-y-5" aria-labelledby="bookingHeading">
      <Typography tag="h1" variant="h2" id="bookingHeading">
        Booking History
      </Typography>

      {bookingGrid}
    </section>
  );
};
