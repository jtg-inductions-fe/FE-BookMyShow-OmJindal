import { Skeleton } from '../Skeleton';

export const MovieDetailedCardSkeleton = () => (
  <article className="w-full h-full flex items-center justify-center">
    <div className="flex flex-row justify-center items-center gap-10">
      <div className="h-70 md:h-80 w-80 rounded-2xl">
        <Skeleton />
      </div>
      <div className="flex-col gap-5 hidden md:flex">
        <Skeleton className="h-8 w-64" />
        <div className="flex flex-row gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
        <div className="flex flex-row gap-5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-105" />
          <Skeleton className="h-4 w-95" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>
    </div>
  </article>
);
