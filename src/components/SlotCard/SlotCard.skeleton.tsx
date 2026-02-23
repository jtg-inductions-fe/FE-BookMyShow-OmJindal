import { Skeleton } from '@/components/Skeleton';

import type { SlotCardSkeletonProps } from './SlotCard.types';

export const SlotCardSkeleton = ({ children }: SlotCardSkeletonProps) => (
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
      {children}
    </div>
  </article>
);
