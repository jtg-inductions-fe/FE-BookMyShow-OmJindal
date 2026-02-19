import { API_CONSTANTS, API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type { BookingApiPaginatedResponse, BookingPaginatedResponse } from './BookingService.types';

/**
 * Booking related API endpoints.
 */
const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieves the authenticated user's bookings from the backend
     * and normalizes the response into the frontend `Booking` model.
     */
    bookingHistory: builder.infiniteQuery<BookingPaginatedResponse, void, string | null>({
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
      transformResponse: (response: BookingApiPaginatedResponse): BookingPaginatedResponse => ({
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
     * Optimistically updates booking cache and rollback
     * if any failure occurs.
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
              const selectedBooking = page.results.find((booking) => booking.id === bookingId);
              if (selectedBooking) {
                selectedBooking.status = API_CONSTANTS.BOOKING.STATUS.CANCELLED;
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
