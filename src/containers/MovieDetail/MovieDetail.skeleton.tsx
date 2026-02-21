import { MovieDetailedCardSkeleton, Skeleton, SlotCardSkeleton } from '@/components';

export const MovieDetailSkeleton = () => (
  <div className="w-full flex flex-col gap-10 mb-10">
    <section
      className="bg-primary h-85 md:h-120 flex items-center justify-center"
      aria-label="movie detail section"
    >
      <MovieDetailedCardSkeleton />
    </section>
    <section
      className="rounded-2xl p-8 bg-white mx-5 shadow-md md:hidden space-y-3"
      aria-label="movie description section"
    >
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </section>
    <section
      className="rounded-2xl p-8 bg-white mx-5 shadow-md space-y-5"
      aria-label="Filters for movie's cinema"
    >
      <Skeleton className="h-6 w-64" />

      <div className="flex gap-5 md:items-center flex-col sm:flex-row">
        <Skeleton className="w-80 h-10 rounded-lg" />
        <Skeleton className="w-80 h-10 rounded-lg" />
      </div>
    </section>
    <section aria-label="Available cinemas and showtimes">
      <ul className="space-y-10 mx-5 md:mx-10 lg:mx-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <SlotCardSkeleton key={'skeleton-' + i} />
        ))}
      </ul>
    </section>
  </div>
);
