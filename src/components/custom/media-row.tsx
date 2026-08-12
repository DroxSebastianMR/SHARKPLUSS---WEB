import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { MediaItem } from '@/types/media';
import { MediaCard } from '@/components/custom/media-card';

export function MediaRow({ title, items }: { title: string; items: MediaItem[] }) {
  const id = title.replaceAll(' ', '-').toLowerCase();

  return (
    <section className="space-y-3 sm:space-y-4" aria-labelledby={id}>
      <div className="flex items-center justify-between">
        <h2 id={id} className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
          {title}
        </h2>
      </div>
      <Carousel className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <CarouselContent className="pb-4">
          {items.map((item) => (
            <CarouselItem key={item.slug}>
              <MediaCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
