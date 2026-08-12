import { apiClient } from '@/lib/api-client';

export interface CatalogMedia {
  id: string;
  slug: string;
  title: string;
  synopsis: string | null;
  type: 'MOVIE' | 'SERIES' | 'LIVE';
  posterUrl: string | null;
  backdropUrl: string | null;
  durationSec: number | null;
}

export interface WatchMedia extends CatalogMedia {
  sourceUrl: string | null;
}

export const catalogService = {
  async list(signal?: AbortSignal) {
    const { data } = await apiClient.get<CatalogMedia[]>('/catalog', { signal });
    return data;
  },
  async getBySlug(slug: string, signal?: AbortSignal) {
    const { data } = await apiClient.get<WatchMedia>(`/catalog/${encodeURIComponent(slug)}`, { signal });
    return data;
  },
};
