import { Skeleton } from '@/components/Skeleton';

export const MovieDetailedCardSkeleton = () => (
  <div className="flex flex-row items-center gap-10">
    <div className="h-70 md:h-80 w-80 rounded-2xl">
      <Skeleton />
    </div>
    <div className="space-y-5 hidden md:block">
      <Skeleton className="h-8 w-64" />
      <div className="flex flex-row gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-105" />
        <Skeleton className="h-4 w-95" />
      </div>
    </div>
  </div>
);
