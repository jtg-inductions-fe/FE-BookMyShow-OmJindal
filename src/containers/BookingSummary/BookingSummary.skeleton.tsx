import { Skeleton } from '@/components';

export const BookingSummarySkeleton = () => (
  <div className="grid sm:grid-cols-3 items-center p-8 bg-white rounded-xl gap-5">
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-5 w-1/2" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-5 w-1/2" />
    </div>
    <div className="flex justify-end">
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  </div>
);
