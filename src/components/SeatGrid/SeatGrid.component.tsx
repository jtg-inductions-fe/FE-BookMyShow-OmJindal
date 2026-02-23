import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { seatRowFormatter } from '@/utils';

import { SEAT_STYLE_CONFIG } from './SeatGrid.config';
import type { SeatGridProps } from './SeatGrid.types';

export const SeatGrid = ({ grid, selectedSeats, onSelect }: SeatGridProps) => {
  const selectedSet = new Set(selectedSeats);
  return (
    <ul className="flex flex-col gap-2 items-center max-h-80 sm:max-h-120 overflow-auto">
      {grid.map((seatArr, i) => (
        <li key={i} className="flex gap-2">
          <Typography variant="h6">{seatRowFormatter(i + 1)}</Typography>

          <ul className="flex gap-2">
            {seatArr.map((seat, j) => {
              if (!seat) return <div key={j} className="h-7 w-7" />;

              const isSelected = selectedSet.has(seat.id);
              const visualState = SEAT_STYLE_CONFIG.resolveState(seat.status, isSelected);
              const config = SEAT_STYLE_CONFIG.states[visualState];

              return (
                <li key={seat.id}>
                  <Button
                    disabled={config.isDisabled}
                    className={`${SEAT_STYLE_CONFIG.base} ${config.className}`}
                    onClick={() => onSelect(seat.id)}
                    size="icon"
                  >
                    <Typography variant="h6" color={config.textColor}>
                      {j + 1}
                    </Typography>
                  </Button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};
