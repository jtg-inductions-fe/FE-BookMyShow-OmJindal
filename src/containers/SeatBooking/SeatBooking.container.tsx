import { useMemo, useState } from 'react';

import { Calendar, Film, MapPinIcon } from 'lucide-react';
import { useParams } from 'react-router';

import { SeatGrid, Typography } from '@/components';
import { POLLING_INTERVAL } from '@/constants';
import { type SeatStatus, useSlotQuery } from '@/services';
import { dateFormatter, timeFormatter } from '@/utils';

import { SeatBookingSkeleton } from './SeatBooking.skeleton';
import { BookingSummary } from '../BookingSummary';

export const SeatBooking = () => {
  const { slotId } = useParams();

  const { data, isLoading } = useSlotQuery(slotId, {
    pollingInterval: POLLING_INTERVAL,
    skip: !slotId,
  });

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Seat grid generator
  const seatGrid = useMemo(() => {
    if (!data) return [];

    const grid: ({ id: number; status: SeatStatus } | null)[][] = Array.from(
      { length: data.cinema.rows },
      () => Array.from({ length: data.cinema.seatsPerRow }, () => null),
    );

    for (const seat of data.seats) {
      const row = seat.rowNumber - 1;
      const col = seat.seatNumber - 1;

      if (grid[row][col] !== undefined) {
        grid[row][col] = { id: seat.id, status: seat.status };
      }
    }

    return grid;
  }, [data]);

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId],
    );
  };

  if (isLoading) return <SeatBookingSkeleton />;

  if (!data)
    return (
      <div className="flex items-center justify-center mx-auto">
        <Typography tag="h1" variant="h4">
          No slot found
        </Typography>
      </div>
    );

  return (
    <div className="w-full p-5 sm:p-10 space-y-5">
      <section className="bg-white p-5 rounded-2xl space-y-2 shadow-md">
        <Typography variant="h2" tag="h1">
          Select your seats
        </Typography>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Film className="text-purple" />
            <Typography tag="span">{data.movie}</Typography>
          </div>

          <div className="flex items-center gap-2">
            <MapPinIcon className="text-pink" />
            <Typography>
              {data.cinema.name}, {data.cinema.city}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-pink" />
            <Typography>
              {dateFormatter(data.startTime)} at {timeFormatter(data.startTime)}
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

      <SeatGrid grid={seatGrid} selectedSeats={selectedSeats} onSelect={handleSeatSelect} />

      <BookingSummary selectedSeats={selectedSeats} data={data} slotId={slotId} />
    </div>
  );
};
