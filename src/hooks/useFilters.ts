import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { isValidDate } from '@/utils';

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

  // Build initial state from URL of filters
  const [filters, setFilters] = useState<T>(() => {
    // Extracting data passed by the user
    const entries = Object.entries(config) as [keyof T, FilterConfig<T>[keyof T]][];

    // Creating initial filter object
    const initialFilters = Object.fromEntries(
      entries.map(([k, v]) => [k, v.value]),
    ) as unknown as T;

    const newFilters = { ...initialFilters };

    entries.forEach(([key, value]) => {
      const paramValue = searchParams.get(String(key));
      if (!paramValue) return;

      switch (value.type) {
        case 'number': {
          const parsed = Number(paramValue);
          if (!Number.isNaN(parsed)) {
            (newFilters[key] as number) = parsed;
          }
          break;
        }
        case 'string':
          (newFilters[key] as string) = paramValue;
          break;
        case 'number[]':
          (newFilters[key] as number[]) = paramValue
            .split(',')
            .map(Number)
            .filter((n) => !Number.isNaN(n));
          break;
        case 'string[]':
          (newFilters[key] as string[]) = paramValue.split(',');
          break;
        case 'date':
          (newFilters[key] as string | undefined) = isValidDate(paramValue)
            ? paramValue
            : undefined;
          break;
      }
    });

    return newFilters;
  });

  // Sync filters with URL search params
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(filters).forEach(([key, value]) => {
          if (value === undefined || value === null) {
            next.delete(key);
            return;
          }
          if (Array.isArray(value)) {
            if (value.length) next.set(key, value.join(','));
            else next.delete(key);
            return;
          }
          if (typeof value === 'number' || typeof value === 'string') {
            next.set(key, String(value));
            return;
          }
        });

        return next;
      },
      { replace: true },
    );
  }, [filters, setSearchParams]);

  return { filters, setFilters };
};
