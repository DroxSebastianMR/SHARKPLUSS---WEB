import { MoreVertical, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/app/router/paths';
import type { MediaItem } from '@/types/media';
import { Button } from '@/components/ui/button';

export function MediaCard({ item }: { item: MediaItem }) {
  const navigate = useNavigate();
  const openMedia = () => navigate(paths.watchMedia(item.slug));
  return (
    <article
      className="group relative w-[132px] shrink-0 cursor-pointer snap-start sm:w-[160px] md:w-[174px] lg:w-[188px] xl:w-[202px]"
      onClick={openMedia}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-800 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-cyan-300">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        {item.badge && (
          <span className="absolute top-2 left-2 rounded-sm bg-white px-2 py-1 text-[11px] font-bold text-slate-950">
            {item.badge}
          </span>
        )}
        <Button
          size="icon"
          className="absolute bottom-2 left-2 size-8 rounded-full opacity-100 transition sm:bottom-3 sm:left-3 sm:size-9 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
          aria-label={`Reproducir ${item.title}`}
          onClick={(event) => {
            event.stopPropagation();
            openMedia();
          }}
        >
          <Play className="size-4 fill-current" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 hidden size-8 opacity-0 transition sm:inline-flex sm:group-hover:opacity-100"
          aria-label={`Más opciones para ${item.title}`}
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
      <h3 className="mt-2 truncate text-[13px] font-semibold text-slate-100 sm:text-sm">{item.title}</h3>
      <p className="mt-0.5 truncate text-[11px] text-slate-400 sm:text-xs">{item.meta}</p>
    </article>
  );
}
