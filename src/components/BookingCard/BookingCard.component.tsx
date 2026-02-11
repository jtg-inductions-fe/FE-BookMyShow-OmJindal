import type { BookingCardProps } from './BookingCard.types';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { Typography } from '../Typography';

export const BookingCard = ({
  title,
  subtitle,
  showTimeLabel,
  isUpcoming,
  isCancelled,
  isPast,
  seatLabel,
  handleClick,
  isLoading,
}: BookingCardProps) => (
  <div
    className={`flex rounded-xl border-2 bg-white
        ${!isUpcoming ? 'opacity-50' : 'opacity-100'}`}
  >
    <div
      className={`w-2 rounded-l-xl ${isCancelled ? 'bg-error' : isUpcoming ? 'bg-success' : 'bg-secondary/50'}`}
    />
    <div className="flex-1 p-4">
      <div className="flex items-start justify-between">
        <div>
          <Typography variant="h3" tag="h2">
            {title}
          </Typography>
          <Typography color="secondary">{subtitle}</Typography>
        </div>
        {!isPast && (
          <Chip
            size="chip"
            className={`${isCancelled ? `bg-error/20 text-error` : `bg-success/20 text-green-700`}`}
          >
            {isCancelled ? 'Cancelled' : 'Upcoming'}
          </Chip>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-3 text-sm">
        <div>
          <Typography variant="small" tag="p" color="secondary">
            Showtime
          </Typography>
          <Typography color="primary" tag="p" variant="h6">
            {showTimeLabel}
          </Typography>
        </div>

        <div>
          <Typography variant="small" tag="p" color="secondary">
            Seats
          </Typography>
          <Typography color="primary" tag="p" variant="h6">
            {seatLabel}
          </Typography>
        </div>
      </div>

      {isUpcoming && (
        <div className="mt-4">
          <Button onClick={handleClick} variant="outline" size="sm" disabled={isLoading}>
            Cancel Booking
          </Button>
        </div>
      )}
    </div>
  </div>
);
