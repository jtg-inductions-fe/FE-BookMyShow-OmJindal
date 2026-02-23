import { Skeleton } from '../Skeleton';

export const SeatGridSkeleton = () => (
  <div className="flex flex-col gap-2 items-center max-h-80 sm:max-h-120 overflow-hidden">
    {Array.from({ length: 10 }).map((_, row) => (
      <div key={row} className="flex gap-2">
        <Skeleton className="h-6 w-6" />
        <div className="flex gap-2">
          {Array.from({ length: 15 }).map((__, col) => (
            <Skeleton key={col} className="h-7 w-7 rounded-sm" />
          ))}
        </div>
      </div>
    ))}
  </div>
);
