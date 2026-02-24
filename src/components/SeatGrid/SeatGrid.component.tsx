import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { SEAT_STYLE_CONFIG } from './SeatGrid.config';
import type { SeatGridProps } from './SeatGrid.types';

export const SeatGrid = ({ grid, selectedSeats, onSelect, disabled }: SeatGridProps) => {
  const selectedSet = new Set(selectedSeats);

  const handleGridClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;

    const seatEl = target.closest('[data-seat-id]') as HTMLElement;
    if (!seatEl) return;

    const seatId = Number(seatEl.dataset.seatId);
    if (!seatId) return;

    onSelect(seatId);
  };

  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      const target = e.target as HTMLElement;

      const seatId = Number(target.dataset.seatId);
      if (!seatId) return;

      onSelect(seatId);

      e.preventDefault();
    }
  };

  return (
    <ul
      className="flex flex-col gap-2 items-center max-h-80 sm:max-h-120 overflow-auto"
      onClick={handleGridClick}
      onKeyDown={handleGridKeyDown}
    >
      {grid.map((seatArr, i) => (
        <li key={i} className="flex gap-2">
          <div className="w-10">
            <Typography variant="h6">{seatArr.label}</Typography>
          </div>

          <ul className="flex gap-2">
            {seatArr.data.map((seat, j) => {
              if (!seat) return <div key={j} className="h-7 w-7" />;

              const isSelected = selectedSet.has(seat.id);
              const visualState = SEAT_STYLE_CONFIG.resolveState(seat.status, isSelected);
              const config = SEAT_STYLE_CONFIG.states[visualState];

              return (
                <li key={seat.id}>
                  <Button
                    disabled={config.isDisabled || disabled}
                    className={`${SEAT_STYLE_CONFIG.base} ${config.className}`}
                    data-seat-id={seat.id}
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
