import { memo, useState } from 'react';

import { Trash as TrashIcon } from 'lucide-react';

import { BookingCard, ConfirmationModal } from '@/components';
import { useCancelBookingMutation } from '@/services';
import { dateFormatter, seatRowFormatter, timeFormatter } from '@/utils';

import type { BookingCardContainerProps } from './BookingCard.types';

export const BookingCardContainer = memo(function BookingCardContainer({
  id,
  movie,
  cinemaName,
  cinemaCity,
  status,
  startTime,
  seats,
}: BookingCardContainerProps) {
  const [showModal, setShowModal] = useState(false);

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const showTime = new Date(startTime);
  const now = new Date();

  const isPast = showTime < now;
  const isCancelled = status === 'C';
  const isUpcoming = !isPast && !isCancelled;

  const seatLabel = seats.map((s) => `${seatRowFormatter(s.rowNumber)}${s.seatNumber}`).join(', ');
  const showTimeLabel = `${dateFormatter(startTime, 'MMM DD')} at ${timeFormatter(startTime)}`;

  const handleCancel = () => {
    void cancelBooking(id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalChange = (open: boolean) => {
    setShowModal(open);
  };

  const handleConfirm = () => {
    handleCancel();
    setShowModal(false);
  };

  return (
    <>
      <BookingCard
        title={movie}
        description={`${cinemaName}, ${cinemaCity}`}
        status={isCancelled ? 'error' : isUpcoming ? 'success' : 'neutral'}
        disabled={isPast}
        badgeText={!isPast ? (isCancelled ? 'Cancelled' : 'Upcoming') : undefined}
        info={[
          { label: 'Showtime', value: showTimeLabel },
          { label: 'Seats', value: seatLabel },
        ]}
        actionLabel={isUpcoming ? 'Cancel Booking' : undefined}
        onAction={openModal}
        loading={isCancelling}
      />
      {/* Confirm Cancel Modal */}
      <ConfirmationModal
        open={showModal}
        onOpenChange={handleModalChange}
        icon={<TrashIcon />}
        title="Cancel Booking?"
        description="Are you sure you want to cancel this booking? This action cannot be undone and your seats will be released."
        cancelLabel="Keep Booking"
        actionLabel="Yes, Cancel"
        onCancel={closeModal}
        onAction={handleConfirm}
        loading={isCancelling}
      />
    </>
  );
});
