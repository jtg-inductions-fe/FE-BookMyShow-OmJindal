import { SeatGridSkeleton, Skeleton } from '@/components';
import { BookingSummarySkeleton } from '@/containers/BookingSummary';

export const SeatBookingSkeleton = () => (
  <div className="w-full p-5 sm:p-10 space-y-5">
    <section className="bg-white p-5 rounded-2xl space-y-3 shadow-md">
      <Skeleton className="h-6 w-48" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </section>

    <Skeleton className="h-3 w-full rounded-full" />

    <div className="flex justify-center gap-6">
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-7 w-20" />
    </div>

    <SeatGridSkeleton />

    <BookingSummarySkeleton />
  </div>
);
