import { Skeleton } from '@/components/Skeleton';

export const BookingCardSkeleton = () => (
  <div className="relative flex rounded-xl border-2 bg-white">
    <div className="w-2 rounded-l-xl bg-secondary/50" />
    <div className="flex-1 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 w-full">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="mt-3 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="mt-5">
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>
    </div>
  </div>
);
