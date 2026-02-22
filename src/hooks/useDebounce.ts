import { useEffect, useRef } from 'react';

/**
 *  A generic React hook that returns a debounced version of a function.
 */
export const useDebounce = <Args extends unknown[]>(fn: (...args: Args) => void, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = (...args: Args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return debouncedFn;
};
