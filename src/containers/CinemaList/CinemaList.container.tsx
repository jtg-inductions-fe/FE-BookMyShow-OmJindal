import { Typography } from '@/components';
import { CinemaListFilter, type CinemaListFilterType } from '@/containers/CinemaListFilter';
import { CinemaListGrid } from '@/containers/CinemaListGrid';
import { useFilters } from '@/hooks';

export const CinemaList = () => {
  const { filters, updateFilter } = useFilters<CinemaListFilterType>({
    cities: { type: 'string[]', value: [] },
  });

  return (
    <div className="w-full space-y-10 m-10">
      <div className=" bg-white shadow-md p-5 rounded-2xl space-y-5">
        <Typography variant="h2" tag="h1">
          Cinemas
        </Typography>
        <CinemaListFilter filters={filters} updateFilter={updateFilter} />
      </div>
      <CinemaListGrid filters={filters} />
    </div>
  );
};
