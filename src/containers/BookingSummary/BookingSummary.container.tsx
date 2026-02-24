import { useState } from 'react';

import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button, ConfirmationModal, SuccessModal, Typography } from '@/components';
import { ROUTES } from '@/constants';
import { amountFormatter, dateFormatter, seatRowFormatter, timeFormatter } from '@/utils';

import type { BookingSummaryProps } from './BookingSummary.types';

export const BookingSummary = ({
  selectedSeats,
  data,
  slotId,
  createBooking,
  isBooking,
}: BookingSummaryProps) => {
  const navigate = useNavigate();

  const [booking, setBooking] = useState<{
    seats: number[];
    amount: number;
  } | null>(null);

  // State for controlling booking success modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const map = new Map<number, (typeof data.seats)[number]>();

  data.seats.forEach((seat) => {
    map.set(seat.id, seat);
  });

  const formattedSelectedSeats = selectedSeats
    .map((seatId) => {
      const seat = map.get(seatId);
      if (!seat) return null;

      const rowLabel = seatRowFormatter(seat.rowNumber);
      return `${rowLabel}${seat.seatNumber}`;
    })
    .filter(Boolean)
    .join(', ');

  const totalAmount = selectedSeats.length * data.price;

  const handleBookTicket = () => {
    if (!slotId) return;

    createBooking({
      slot: Number(slotId),
      seats: selectedSeats,
    })
      .unwrap()
      .then(() => {
        openSuccessModal();
        setBooking({
          seats: [...selectedSeats],
          amount: totalAmount,
        });
      })
      .catch(() => {
        openFailModal();
      });
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const openFailModal = () => {
    setShowFailModal(true);
  };

  const closeFailModal = () => {
    setShowFailModal(false);
  };

  const dateTimeLabel = `${dateFormatter(data.startTime)} at ${timeFormatter(data.startTime)}`;

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
          <Typography variant="h6" color="primary" title={formattedSelectedSeats} lineClamp={2}>
            {formattedSelectedSeats}
          </Typography>
        </div>

        <div className="sm:text-center">
          <Typography variant="h6" color="secondary">
            Total Amount:
          </Typography>
          <Typography variant="h6" color="primary" title={String(totalAmount)} lineClamp={2}>
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
        open={showSuccessModal}
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
              <Typography variant="h6" tag="p" title={data.cinema.name} lineClamp={2}>
                {data.cinema.name}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Date &amp; Time
              </Typography>
              <Typography variant="h6" tag="p" title={dateTimeLabel} lineClamp={2}>
                {dateTimeLabel}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Total seats
              </Typography>
              <Typography variant="h6" tag="p">
                {booking?.seats.length}
              </Typography>
            </div>
            <div>
              <Typography color="secondary" variant="h6">
                Amount
              </Typography>
              <Typography
                variant="h6"
                tag="p"
                title={amountFormatter(booking?.amount ?? 0)}
                lineClamp={2}
              >
                {amountFormatter(booking?.amount ?? 0)}
              </Typography>
            </div>
          </div>
        </div>
      </SuccessModal>
      <ConfirmationModal
        open={showFailModal}
        icon={<X />}
        title="Booking Failed!"
        description="Something went wrong! We are unable to confirm your booking"
        cancelLabel="Try again"
        actionLabel="Go Home"
        onCancel={closeFailModal}
        onAction={() => {
          void navigate(ROUTES.HOME, { replace: true });
        }}
      />
    </>
  );
};
