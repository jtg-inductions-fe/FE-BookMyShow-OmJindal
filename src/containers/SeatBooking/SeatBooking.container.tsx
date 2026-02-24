import { useEffect, useState } from 'react';

import { Calendar, MapPinIcon } from 'lucide-react';
import { useParams } from 'react-router';

import { SeatGrid, Typography } from '@/components';
import { API_CONSTANTS, POLLING_INTERVAL } from '@/constants';
import { BookingSummary } from '@/containers/BookingSummary';
import { type SeatStatus, useCreateBookingMutation, useSlotQuery } from '@/services';
import { dateFormatter, seatRowFormatter, timeFormatter } from '@/utils';

import { SeatBookingSkeleton } from './SeatBooking.skeleton';

export const SeatBooking = () => {
  const { slotId } = useParams();

  const { data, isLoading } = useSlotQuery(slotId, {
    pollingInterval: POLLING_INTERVAL,
    skip: !slotId,
  });

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // To update the selected seat when latest seat data is fetched.
  useEffect(() => {
    if (!data) return;

    const setter = () => {
      const availableIds = new Set(
        data.seats.filter((s) => s.status === API_CONSTANTS.SEAT.STATUS.AVAILABLE).map((s) => s.id),
      );
      setSelectedSeats((prev) => prev.filter((id) => availableIds.has(id)));
    };

    setter();
  }, [data]);

  if (isLoading) return <SeatBookingSkeleton />;

  if (!data)
    return (
      <div className="flex items-center justify-center mx-auto">
        <Typography tag="h1" variant="h4">
          No slot found
        </Typography>
      </div>
    );

  const seatGrid: Array<{
    label: string;
    data: Array<{ id: number; status: SeatStatus } | null>;
  }> = Array.from({ length: data.cinema.rows }).map((_, index) => ({
    label: seatRowFormatter(index + 1),
    data: Array.from({ length: data.cinema.seatsPerRow }, () => null),
  }));

  for (const seat of data.seats) {
    const row = seat.rowNumber - 1;
    const col = seat.seatNumber - 1;

    if (row >= 0 && row < seatGrid.length && col >= 0 && col < seatGrid[0].data.length) {
      seatGrid[row].data[col] = { id: seat.id, status: seat.status };
    }
  }

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId],
    );
  };

  const durationLabel = `${dateFormatter(data.startTime)} at ${timeFormatter(data.startTime)}`;

  return (
    <div className="w-full p-5 sm:p-5 space-y-5">
      <section className="bg-white p-5 rounded-2xl space-y-2 shadow-md">
        <Typography variant="h2" tag="h1">
          {data.movie}
        </Typography>

        <div className="flex md:items-center gap-3 flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-pink" />
            <Typography title={`${data.cinema.name}, ${data.cinema.city}`} lineClamp={2}>
              {data.cinema.name}, {data.cinema.city}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-pink" />
            <Typography title={durationLabel} lineClamp={2}>
              {durationLabel}
            </Typography>
          </div>
        </div>
      </section>

      <div className="bg-linear-to-r from-purple to-pink h-3 w-full rounded-full"></div>

      <div className="flex justify-center gap-3">
        <div className="flex gap-2 items-center">
          <div className="bg-white border-2 border-purple h-7 w-7 rounded-sm"></div>
          <Typography variant="h6">Available</Typography>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-purple border-2 border-purple h-7 w-7 rounded-sm"></div>
          <Typography variant="h6">Selected</Typography>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-secondary/20 h-7 w-7 border-2 border-secondary/20 rounded-sm"></div>
          <Typography variant="h6">Sold</Typography>
        </div>
      </div>

      <SeatGrid
        grid={seatGrid}
        selectedSeats={selectedSeats}
        onSelect={handleSeatSelect}
        disabled={isBooking}
      />

      <BookingSummary
        selectedSeats={selectedSeats}
        data={data}
        slotId={slotId}
        createBooking={createBooking}
        isBooking={isBooking}
      />
    </div>
  );
};
