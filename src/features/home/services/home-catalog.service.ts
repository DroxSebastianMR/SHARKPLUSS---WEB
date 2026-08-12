import type { CatalogMedia } from '@/features/catalog/services/catalog.service';
import type { HomeCatalog } from '@/features/home/types/home.types';

const fallbackPoster = 'https://placehold.co/500x750/0f172a/e2e8f0?text=SharkPluss';

export function toHomeCatalog(media: CatalogMedia[]): HomeCatalog {
  const items = media.map((item) => ({
    slug: item.slug,
    title: item.title,
    image: item.posterUrl ?? item.backdropUrl ?? fallbackPoster,
    meta: item.type === 'MOVIE' ? 'Película' : item.type === 'SERIES' ? 'Serie' : 'En vivo',
  }));

  return { featured: items, continueWatching: [] };
}
