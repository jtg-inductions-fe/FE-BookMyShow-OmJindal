import { Skeleton } from '@/components/Skeleton';

export const ChipGroupSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-6 w-25 rounded-full" />
    ))}
  </>
);
