import { Skeleton } from '@/components';

export const SlotSkeleton = () => (
  <>
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
  </>
);
