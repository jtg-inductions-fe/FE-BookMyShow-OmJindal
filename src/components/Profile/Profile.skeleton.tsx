import { Separator } from '../Separator';
import { Skeleton } from '../Skeleton';

export const ProfileSkeleton = () => (
  <>
    <div className="flex flex-row gap-4 items-center">
      <div>
        <Skeleton className="h-15 w-15 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    <Separator />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  </>
);
