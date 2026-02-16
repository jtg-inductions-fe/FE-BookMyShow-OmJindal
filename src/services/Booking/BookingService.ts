import { API_URLS } from '@/constants';
import type { Booking, PageResponse } from '@/types';

import type { BookingApiResponse } from './BookingService.types';
import { api } from '../Api';

/**
 * Booking related API endpoints.
 */
const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieves the authenticated user's bookings from the backend
     * and normalizes the response into the frontend `Booking` model.
     */
    bookingHistory: builder.infiniteQuery<PageResponse<Booking>, void, string | null>({
      query: ({ pageParam }) => {
        if (!pageParam) {
          return {
            url: API_URLS.BOOKING.BOOKING,
            method: 'GET',
          };
        }
        return {
          url: pageParam,
          method: 'GET',
        };
      },
      transformResponse: (response: PageResponse<BookingApiResponse>): PageResponse<Booking> => ({
        ...response,
        results: response.results.map((item) => ({
          id: item.id,
          movie: item.movie,
          status: item.status,
          cinemaName: item.cinema_name,
          cinemaCity: item.cinema_city,
          startTime: item.start_time,
          seats: item.seats.map((seat) => ({
            rowNumber: seat.row_number,
            seatNumber: seat.seat_number,
          })),
        })),
      }),
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.next,
      },
    }),
    /**
     * Cancels an existing booking by its ID.
     *
     * Invalidates Booking tag upon successful cancellation.
     */
    cancelBooking: builder.mutation<void, number>({
      query: (bookingId) => ({
        url: `${API_URLS.BOOKING.BOOKING}${bookingId}/`,
        method: 'PATCH',
      }),
      async onQueryStarted(bookingId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookingApi.util.updateQueryData('bookingHistory', undefined, (draft) => {
            draft.pages.forEach((page) => {
              const booking = page.results.find((b) => b.id === bookingId);
              if (booking) {
                booking.status = 'C';
              }
            });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useBookingHistoryInfiniteQuery, useCancelBookingMutation } = bookingApi;
