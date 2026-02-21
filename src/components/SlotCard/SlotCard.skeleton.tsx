import { Skeleton } from '@/components/Skeleton';

export const SlotCardSkeleton = () => (
  <article className="flex flex-col md:flex-row gap-10 p-5 bg-white rounded-2xl shadow-md border-grey-border border-2">
    <div className="w-40 h-40 rounded-xl">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-10 w-75 rounded-md" />
      <div className="flex gap-1">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
      <Skeleton className="h-4 w-30 rounded-md" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={'ll' + i} className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="h-14 w-24 rounded-lg" />
            <Skeleton className="h-14 w-24 rounded-lg" />
            <Skeleton className="h-14 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  </article>
);
