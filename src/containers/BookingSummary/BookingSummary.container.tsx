import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router';

import { Button, SuccessModal, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { useCreateBookingMutation } from '@/services';
import { amountFormatter, dateFormatter, seatRowFormatter, timeFormatter } from '@/utils';

import type { BookingSummaryProps } from './BookingSummary.types';

export const BookingSummary = ({ selectedSeats, data, slotId }: BookingSummaryProps) => {
  const navigate = useNavigate();

  // State for controlling logout confirmation modal visibility
  const [showModal, setShowModal] = useState(false);

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const openModal = () => {
    setShowModal(true);
  };

  const seatMap = useMemo(() => {
    const map = new Map<number, (typeof data.seats)[number]>();
    for (const seat of data.seats) {
      map.set(seat.id, seat);
    }
    return map;
  }, [data]);

  const formattedSelectedSeats = useMemo(
    () =>
      selectedSeats
        .map((seatId) => {
          const seat = seatMap.get(seatId);
          if (!seat) return null;

          const rowLabel = seatRowFormatter(seat.rowNumber);
          return `${rowLabel}${seat.seatNumber}`;
        })
        .filter(Boolean)
        .join(', '),
    [selectedSeats, seatMap],
  );

  const totalAmount = useMemo(
    () => selectedSeats.length * data.price,
    [selectedSeats.length, data.price],
  );

  const handleBookTicket = () => {
    if (!slotId) return;

    createBooking({
      slot: Number(slotId),
      seats: selectedSeats,
    }).then(
      () => {
        openModal();
      },
      () => {},
    );
  };

  return (
    <>
      <section
        className="grid sm:grid-cols-3 items-center p-8 bg-white rounded-xl gap-5"
        aria-label="Booking summary"
      >
        <div>
          <Typography variant="h6" color="secondary">
            Selected seats:
          </Typography>
          <Typography variant="h6" color="primary">
            {formattedSelectedSeats}
          </Typography>
        </div>

        <div className="sm:text-center">
          <Typography variant="h6" color="secondary">
            Total Amount:
          </Typography>
          <Typography variant="h6" color="primary">
            {amountFormatter(totalAmount)}
          </Typography>
        </div>

        <div className="sm:flex sm:justify-end">
          <Button disabled={!selectedSeats.length || isBooking} onClick={handleBookTicket}>
            Book Tickets
          </Button>
        </div>
      </section>
      {/* Success Modal */}
      <SuccessModal
        open={showModal}
        title="Booking Confirmed!"
        description="Your tickets have been booked successfully"
        primaryLabel="Booking History"
        secondaryLabel="Go Home"
        onPrimary={() => {
          void navigate(ROUTES.PROFILE, { replace: true });
        }}
        onSecondary={() => {
          void navigate(ROUTES.HOME, { replace: true });
        }}
      >
        <div className="w-full border-2 border-grey-border bg-secondary/10 p-5 text-start rounded-xl">
          <Typography variant="h3">{data.movie}</Typography>
          <div className="grid xs:grid-cols-2 mt-2 space-y-2">
            <div>
              <Typography color="secondary" variant="h6">
                Cinema
              </Typography>
              <Typography variant="h6" tag="p">
                {data.cinema.name}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Date & Time
              </Typography>
              <Typography variant="h6" tag="p">
                {dateFormatter(data.startTime)} at {timeFormatter(data.startTime)}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Total seats
              </Typography>
              <Typography variant="h6" tag="p">
                {selectedSeats.length}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Amount
              </Typography>
              <Typography variant="h6" tag="p">
                {totalAmount}
              </Typography>
            </div>
          </div>
        </div>
      </SuccessModal>
    </>
  );
};
