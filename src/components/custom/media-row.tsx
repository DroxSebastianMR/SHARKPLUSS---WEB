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
        <button className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 sm:text-sm">
          Ver todo
        </button>
      </div>
      <div className="-mx-5 flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:gap-4 sm:px-8 lg:-mx-12 lg:px-12">
        {items.map((item) => (
          <MediaCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
