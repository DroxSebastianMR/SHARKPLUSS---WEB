export const API_ENDPOINTS = {
  CATALOG: {
    LIST: '/catalog',
    DETAIL: (slug: string) => `/catalog/${encodeURIComponent(slug)}`,
  },
} as const;
