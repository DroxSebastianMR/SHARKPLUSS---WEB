export const paths = {
  home: '/',
  series: '/series',
  movies: '/peliculas',
  live: '/en-vivo',
  kids: '/ninos-y-familia',
  watch: '/ver/:slug',
  watchMedia: (slug: string) => `/ver/${encodeURIComponent(slug)}`,
} as const;
