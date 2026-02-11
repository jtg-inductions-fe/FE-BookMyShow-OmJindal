import { memo, useState } from 'react';

import { Trash as TrashIcon } from 'lucide-react';

import { BookingCard, Modal } from '@/components';
import { useCancelBookingMutation } from '@/services';
import { dateFormatter, seatRowFormatter, timeFormatter } from '@/utils';

import type { BookingCardContainerProps } from './BookingCard.types';

export const BookingCardContainer = memo(function BookingCardContainer({
  startTime,
  seats,
  id,
  cinemaCity,
  cinemaName,
  movie,
  status,
  isFetching,
}: BookingCardContainerProps) {
  const [showModal, setShowModal] = useState(false);

  const [cancelBooking, { isLoading }] = useCancelBookingMutation();

  const showTime = new Date(startTime);
  const now = new Date();

  const isPast = showTime < now;
  const isCancelled = status === 'C';
  const isUpcoming = !isPast && !isCancelled;

  const seatLabel = seats.map((s) => `${seatRowFormatter(s.rowNumber)}${s.seatNumber}`).join(', ');
  const showTimeLabel = `${dateFormatter(startTime, 'MMM DD')} at ${timeFormatter(startTime, 'HHMM A')}`;

  const handleCancel = () => {
    void cancelBooking(String(id));
  };

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  const handleConfirm = () => {
    handleCancel();
    handleClick();
  };

  return (
    <>
      <BookingCard
        title={movie}
        subtitle={`${cinemaName}, ${cinemaCity}`}
        seatLabel={seatLabel}
        showTimeLabel={showTimeLabel}
        isPast={isPast}
        isCancelled={isCancelled}
        isUpcoming={isUpcoming}
        handleClick={handleClick}
        isLoading={isLoading || isFetching}
      />
      {/* Confirm Cancel Modal */}
      <Modal
        isOpen={showModal}
        setIsOpen={handleClick}
        icon={<TrashIcon />}
        title="Cancel Booking?"
        subtitle="Are you sure you want to cancel this booking? This action cannot be undone and your seats will be released."
        closeModalText="Keep Booking"
        confirmText="Yes, Cancel"
        handleConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </>
  );
});
