import { Skeleton } from '@/components/Skeleton';

export const CinemaCardSkeleton = () => (
  <article className="w-full lg:w-80 p-5 rounded-2xl bg-white space-y-2">
    <div className="h-20 w-20 rounded-xl">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
    <Skeleton className="h-10 w-40 rounded-md" />
    <div className="flex gap-1">
      <Skeleton className="w-5 h-7 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-60 rounded-md" />
        <Skeleton className="h-4 w-45 rounded-md" />
      </div>
    </div>
  </article>
);
