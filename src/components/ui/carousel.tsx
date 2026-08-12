import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext, type ComponentProps, type PropsWithChildren, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

type CarouselApi = UseEmblaCarouselType[1] | null;

const CarouselContext = createContext<CarouselApi | null>(null);

export function Carousel({ children, className }: PropsWithChildren<ComponentProps<'div'>>) {
  const [viewportRef, api] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });

  return (
    <CarouselContext.Provider value={api}>
      <div className={cn('relative', className)}>
        <div ref={viewportRef} className="overflow-hidden">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('-ml-3 flex touch-pan-y', className)} {...props} />;
}

export function CarouselItem({ className, ...props }: ComponentProps<'div'>) {
  return <div role="group" className={cn('min-w-0 shrink-0 grow-0 basis-auto pl-3', className)} {...props} />;
}

function useCarousel() {
  return useContext(CarouselContext);
}

export function CarouselPrevious({ className, ...props }: ComponentProps<typeof Button>) {
  const api = useCarousel();
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        'absolute top-1/2 left-2 z-10 hidden size-10 -translate-y-1/2 rounded-full lg:inline-flex',
        className,
      )}
      aria-label="Anterior"
      disabled={!api}
      onClick={() => api?.scrollPrev()}
      {...props}
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
}

export function CarouselNext({ className, ...props }: ComponentProps<typeof Button>) {
  const api = useCarousel();
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        'absolute top-1/2 right-2 z-10 hidden size-10 -translate-y-1/2 rounded-full lg:inline-flex',
        className,
      )}
      aria-label="Siguiente"
      disabled={!api}
      onClick={() => api?.scrollNext()}
      {...props}
    >
      <ChevronRight className="size-5" />
    </Button>
  );
}
