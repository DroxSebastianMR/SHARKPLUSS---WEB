import { useEffect, useState } from 'react';
import { MediaRow } from '@/components/custom/media-row';
import { catalogService } from '@/features/catalog/services/catalog.service';
import { HeroBanner } from '@/features/home/components/hero-banner';
import { toHomeCatalog } from '@/features/home/services/home-catalog.service';
import type { HomeCatalog } from '@/features/home/types/home.types';
import { getApiErrorMessage } from '@/lib/api-client';

export function HomePage() {
  const [catalog, setCatalog] = useState<HomeCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    catalogService
      .list(controller.signal)
      .then((media) => setCatalog(toHomeCatalog(media)))
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted)
          setError(getApiErrorMessage(requestError, 'No pudimos cargar el catálogo.'));
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <HeroBanner />
      <div className="relative z-10 mx-auto -mt-5 max-w-[1600px] space-y-9 px-5 pb-16 sm:-mt-8 sm:space-y-10 sm:px-8 sm:pb-20 lg:-mt-14 lg:space-y-11 lg:px-12">
        {error && <p className="rounded-lg bg-red-950/50 p-4 text-sm text-red-200">{error}</p>}
        {!catalog && !error && <p className="text-sm text-slate-300">Cargando catálogo…</p>}
        {catalog?.featured.length ? <MediaRow title="Destacados" items={catalog.featured} /> : null}
        {catalog && !catalog.featured.length && (
          <p className="text-sm text-slate-300">Aún no hay contenido publicado.</p>
        )}
      </div>
    </>
  );
}
