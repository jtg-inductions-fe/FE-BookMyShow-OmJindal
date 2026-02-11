import { Skeleton } from '@/components/Skeleton';

export const ProfileCardSkeleton = () => (
  <div className="flex flex-col sm:flex-row p-4 sm:p-8 sm:items-center gap-5 bg-white shadow-md justify-between rounded-xl">
    <div className="flex flex-row gap-4 items-center">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
    <Skeleton className="h-9 sm:w-32 rounded-md" />
  </div>
);
