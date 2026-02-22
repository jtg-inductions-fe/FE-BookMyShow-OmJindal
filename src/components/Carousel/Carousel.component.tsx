import { type ComponentProps, type KeyboardEvent, useCallback, useEffect, useState } from 'react';

import { type VariantProps } from 'class-variance-authority';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button, type buttonVariants } from '@/components/Button';
import { cn } from '@/utils';

import type { CarouselProps } from './Carousel.types';
import { CarouselContext, useCarousel } from './Carousel.utils';

/**
 * The main container of the carousel component.
 */
export const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<'div'> & CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    handleSelect();

    api.on('reInit', handleSelect);
    api.on('select', handleSelect);

    return () => {
      api.off('reInit', handleSelect);
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

/**
 * The content of the carousel component.
 */
export const CarouselContent = ({ className, ...props }: ComponentProps<'div'>) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
};

/**
 * The item of the carousel component.
 */
export const CarouselItem = ({ className, ...props }: ComponentProps<'div'>) => {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full flex justify-center items-center',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
};

/**
 * The previous button to slide to previous item.
 */
export const CarouselPrevious = ({
  className,
  variant = 'link',
  size = 'icon-lg',
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'rounded-full absolute touch-manipulation',
        orientation === 'horizontal'
          ? 'top-1/2 left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className="ml-3 cn-rtl-flip" color="white" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};

/**
 * The next button to slide to next item.
 */
export const CarouselNext = ({
  className,
  variant = 'link',
  size = 'icon-lg',
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'rounded-full absolute touch-manipulation',
        orientation === 'horizontal'
          ? 'top-1/2 right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className="ml-3 cn-rtl-flip" color="white" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
