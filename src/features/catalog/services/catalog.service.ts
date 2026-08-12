import { apiClient } from '@/infrastructure/api/client/api-client';
import { API_ENDPOINTS } from '@/infrastructure/api/endpoints';

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
    return apiClient.get<CatalogMedia[]>(API_ENDPOINTS.CATALOG.LIST, { signal });
  },
  async getBySlug(slug: string, signal?: AbortSignal) {
    return apiClient.get<WatchMedia>(API_ENDPOINTS.CATALOG.DETAIL(slug), { signal });
  },
};
