import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

// Types of filter
type FilterType = 'string' | 'number' | 'string[]' | 'number[]' | 'date';

// Config object containing initial filters along with their types
type FilterConfig<T> = {
  [K in keyof T]: {
    value: T[K];
    type: FilterType;
  };
};

/**
 * Generic hook to sync filters with URL search params.
 */
export const useFilters = <
  T extends Record<string, number | number[] | string | string[] | undefined>,
>(
  config: FilterConfig<T>,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const entries = Object.entries(config) as [keyof T, FilterConfig<T>[keyof T]][];

  const initialFilters = Object.fromEntries(entries.map(([k, v]) => [k, v.value])) as unknown as T;

  // Build initial state from URL of filters
  const [filters, setFilters] = useState<T>(() => {
    const newFilters = { ...initialFilters };

    entries.forEach(([key, value]) => {
      const paramValue = searchParams.get(String(key));
      if (!paramValue) return;

      switch (value.type) {
        case 'number':
          (newFilters[key] as number) = Number(paramValue);
          break;
        case 'string':
          (newFilters[key] as string) = paramValue;
          break;
        case 'number[]':
          (newFilters[key] as Array<number>) = paramValue.split(',').map(Number);
          break;
        case 'string[]':
          (newFilters[key] as Array<string>) = paramValue.split(',');
          break;
        case 'date':
          (newFilters[key] as string | undefined) = !Number.isNaN(Date.parse(paramValue))
            ? paramValue
            : undefined;
          break;
        default:
          (newFilters[key] as unknown) = paramValue;
      }
    });

    return newFilters;
  });

  // Sync filters with URL search params
  useEffect(() => {
    const params: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value) && value.length) {
        params[key] = value.join(',');
        return;
      }
      if (typeof value === 'number' || typeof value === 'string') {
        params[key] = String(value);
        return;
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  return { filters, setFilters };
};
