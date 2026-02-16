import InfiniteScroll from 'react-infinite-scroll-component';

import { BookingCardSkeleton, Typography } from '@/components';
import { useBookingHistoryInfiniteQuery } from '@/services';

import { BookingCardContainer } from '../BookingCard';

export const Booking = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookingHistoryInfiniteQuery();

  const bookings = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <section className="space-y-5" aria-labelledby="bookingHeading">
      <Typography tag="h1" variant="h2" id="bookingHeading">
        Booking History
      </Typography>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <InfiniteScroll
          dataLength={bookings.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={null}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {bookings.map((booking) => (
              <BookingCardContainer key={'booking-' + booking.id} {...booking} />
            ))}

            {isFetchingNextPage &&
              Array.from({ length: 5 }).map((_, i) => <BookingCardSkeleton key={`loader-${i}`} />)}
          </div>
        </InfiniteScroll>
      ) : (
        <Typography>No bookings found</Typography>
      )}
    </section>
  );
};
