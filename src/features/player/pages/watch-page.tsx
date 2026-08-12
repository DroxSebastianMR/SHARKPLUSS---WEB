import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '@/app/router/paths';
import { Button } from '@/components/ui/button';
import { catalogService, type WatchMedia } from '@/features/catalog/services/catalog.service';
import { VideoPlayer } from '@/features/player/components/video-player';
import { getApiErrorMessage } from '@/infrastructure/api/client/api-error';

export function WatchPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [content, setContent] = useState<WatchMedia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const invalidSlug = !slug;

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    catalogService
      .getBySlug(slug, controller.signal)
      .then((media) => {
        setContent(media);
        setError(null);
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted)
          setError(getApiErrorMessage(requestError, 'No pudimos cargar este contenido.'));
      });
    return () => controller.abort();
  }, [slug, reloadKey]);

  const displayedError = invalidSlug ? 'El contenido solicitado no es válido.' : error;
  const displayedContent = content?.slug === slug ? content : null;

  return (
    <section className="mx-auto min-h-screen max-w-[1440px] px-4 pt-24 pb-10 sm:px-8 sm:pt-28 lg:px-12">
      <button
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-cyan-200"
        onClick={() => navigate(paths.home)}
      >
        <ArrowLeft className="size-4" /> Volver al inicio
      </button>
      {!displayedContent && !displayedError && <p className="text-slate-300">Cargando contenido…</p>}
      {displayedError && (
        <div className="rounded-xl bg-red-950/50 p-5 text-red-100">
          <p>{displayedError}</p>
          {!invalidSlug && (
            <Button variant="secondary" className="mt-4" onClick={() => setReloadKey((key) => key + 1)}>
              <RotateCcw className="size-4" /> Reintentar
            </Button>
          )}
        </div>
      )}
      {displayedContent && !displayedContent.sourceUrl && (
        <div className="rounded-xl bg-slate-900 p-5 text-slate-200">
          Este contenido todavía no tiene una fuente de reproducción disponible.
        </div>
      )}
      {displayedContent?.sourceUrl && (
        <>
          <VideoPlayer
            content={{
              id: displayedContent.id,
              title: displayedContent.title,
              description: displayedContent.synopsis ?? 'SharkPluss',
              sourceUrl: displayedContent.sourceUrl,
            }}
          />
          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-bold tracking-[.18em] text-cyan-300">SHARKPLUSS</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {displayedContent.title}
            </h1>
            {displayedContent.synopsis && <p className="mt-3 text-slate-300">{displayedContent.synopsis}</p>}
          </div>
        </>
      )}
    </section>
  );
}
