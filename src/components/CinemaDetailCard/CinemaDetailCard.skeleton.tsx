import { Skeleton } from '@/components/Skeleton';

export const CinemaDetailCardSkeleton = () => (
  <article className="h-full w-full flex flex-row items-center gap-10 p-5 rounded-2xl">
    <div className="h-20 w-20 rounded-xl">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
    <div>
      <Skeleton className="h-10 w-60" />
      <div className="flex gap-1">
        <Skeleton className="w-5 h-7 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-60 rounded-md" />
          <Skeleton className="h-4 w-45 rounded-md" />
        </div>
      </div>
    </div>
  </article>
);
