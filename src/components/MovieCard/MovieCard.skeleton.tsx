import { Skeleton } from '@/components/Skeleton';

export const MovieCardSkeleton = () => (
  <article className="w-full xs:w-58 border-2 border-border-grey rounded-xl">
    <div className="w-full h-50 rounded-t-xl">
      <Skeleton className="h-full w-full rounded-t-xl" />
    </div>
    <div className="p-3 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </article>
);
