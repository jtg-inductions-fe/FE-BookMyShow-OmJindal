import { API_CONSTANTS, API_TAGS, API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type { SlotApiResponse, SlotResponse } from './SlotService.types';

export const SlotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * API endpoint to fetch the data of the slot including
     * movie, cinema and seat structure and availability information.
     */
    slot: builder.query<SlotResponse, string | undefined>({
      query: (slotId) => ({
        url: `${API_URLS.SLOT.SLOT}${slotId}/`,
        method: 'GET',
      }),
      transformResponse: (response: SlotApiResponse): SlotResponse => ({
        price: response.price,
        language: response.language,
        startTime: response.start_time,
        movie: response.movie,
        cinema: {
          name: response.cinema.name,
          city: response.cinema.city,
          rows: response.cinema.rows,
          seatsPerRow: response.cinema.seats_per_row,
        },
        seats: response.seats.map((seat) => ({
          id: seat.id,
          rowNumber: seat.row_number,
          seatNumber: seat.seat_number,
          status: seat.is_available
            ? API_CONSTANTS.SEAT.STATUS.AVAILABLE
            : API_CONSTANTS.SEAT.STATUS.BOOKED,
        })),
      }),
      providesTags: [API_TAGS.SLOT],
    }),
  }),
});

export const { useSlotQuery } = SlotApi;
