import { Bookmark, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/app/router/paths';
import { Button } from '@/components/ui/button';

const featuredSlides = [
  {
    id: 'avengers-infinity-war',
    trailerId: '6ZfuNTqbHE8',
    videoFit: 'cover',
    eyebrow: 'MARVEL STUDIOS',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/fr/3/30/Avengers-infinity-war.png?utm_source=fr.wikipedia.org&utm_campaign=index&utm_content=original',
    title: (
      <>
        EL ÚLTIMO
        <br />
        <span className="text-cyan-300">MAREA</span>
      </>
    ),
    meta: ['2018', '13+', '2 h 29 min', 'Acción · Ciencia ficción'],
    bannerDescription:
      'Los Vengadores y sus aliados deben sacrificarlo todo para derrotar al poderoso Thanos antes de que su devastación ponga fin al universo.',
    bannerBackdrop:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdv410eKMp1TmNurIZLhTsrcOOMzp0Q_EWo40MiNpa5YUUBFNzfoi1hdA&s=10',
    description:
      'Una oceanógrafa descubre una señal imposible bajo el mar y deberá decidir cuánto está dispuesta a perder para revelar la verdad.',
    backdrop:
      "bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=85')]",
  },
  {
    id: 'nuevo-destacado',
    trailerId: 'ykHeGtN4m94',
    videoFit: 'cover',
    eyebrow: 'ESTRENO EXCLUSIVO',
    logoUrl: undefined,
    bannerDescription: undefined,
    bannerBackdrop: undefined,
    title: (
      <>
        UNA NUEVA
        <br />
        <span className="text-cyan-300">HISTORIA</span>
      </>
    ),
    meta: ['2026', '13+', 'Película', 'Suspenso'],
    description: 'Una historia que cambiará todo. Descubre el próximo destacado de SharkPluss.',
    backdrop:
      "bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=85')]",
  },
] as const;

export function HeroBanner() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeSlide = featuredSlides[activeIndex];
  const embedUrl = useMemo(() => {
    return `https://www.youtube-nocookie.com/embed/${activeSlide.trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&loop=1&playlist=${activeSlide.trailerId}&rel=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`;
  }, [activeSlide.trailerId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsTrailerVisible(true), 5000);
    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  const changeSlide = (direction: 1 | -1) => {
    setIsTrailerVisible(false);
    setActiveIndex((current) => (current + direction + featuredSlides.length) % featuredSlides.length);
  };

  const sendPlayerCommand = (func: 'mute' | 'unMute' | 'setVolume', args: number[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      'https://www.youtube-nocookie.com',
    );
  };

  const toggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    sendPlayerCommand(nextState ? 'unMute' : 'mute');
    if (nextState) sendPlayerCommand('setVolume', [25]);
  };

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden sm:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px]">
      <div
        className={`absolute inset-0 -z-20 bg-cover bg-center transition-opacity duration-700 ${activeSlide.backdrop} ${isTrailerVisible ? 'opacity-0' : 'opacity-100'}`}
        style={
          activeSlide.bannerBackdrop ? { backgroundImage: `url("${activeSlide.bannerBackdrop}")` } : undefined
        }
      />
      <iframe
        ref={iframeRef}
        key={activeSlide.trailerId}
        className={`pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-video -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-[1800ms] ${activeSlide.videoFit === 'cover' ? 'h-[56.25vw] min-h-full w-[177.78vh] min-w-full' : 'h-auto max-h-full w-full'} ${isTrailerVisible ? 'opacity-100' : 'opacity-0'}`}
        src={embedUrl}
        title="Tráiler destacado"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          if (isSoundEnabled) {
            sendPlayerCommand('setVolume', [25]);
            sendPlayerCommand('unMute');
          }
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(5,7,12,.92)_0%,rgba(5,7,12,.68)_100%),linear-gradient(0deg,#06080d_0%,transparent_42%,rgba(6,8,13,.4)_100%)] sm:bg-[linear-gradient(90deg,rgba(5,7,12,.96)_0%,rgba(5,7,12,.72)_34%,rgba(5,7,12,.12)_70%),linear-gradient(0deg,#06080d_0%,transparent_42%,rgba(6,8,13,.5)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1600px] flex-col justify-end px-4 pt-16 pb-20 sm:min-h-[680px] sm:px-8 sm:pt-20 sm:pb-24 lg:min-h-[720px] lg:px-12 xl:min-h-[760px]">
        <p className="mb-3 text-[10px] font-bold tracking-[.2em] text-cyan-200 sm:mb-4 sm:text-xs sm:tracking-[.22em]">
          {activeSlide.eyebrow}
        </p>
        {activeSlide.logoUrl ? (
          <img
            src={activeSlide.logoUrl}
            alt="Avengers: Infinity War"
            className="max-h-32 max-w-xl object-contain object-left sm:max-h-40"
          />
        ) : (
          <h1 className="max-w-xl text-[42px] leading-[.88] font-black tracking-[-.06em] sm:text-7xl lg:text-8xl">
            {activeSlide.title}
          </h1>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-200 sm:mt-6 sm:text-sm">
          {activeSlide.meta.map((item, index) =>
            index === 1 ? (
              <span key={item} className="rounded border border-slate-300/70 px-1.5 py-0.5 text-xs">
                {item}
              </span>
            ) : (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg">
          {activeSlide.bannerDescription ?? activeSlide.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
          <Button
            className="h-10 min-w-32 px-4 sm:h-11 sm:min-w-36 sm:px-5"
            onClick={() => navigate(paths.watchMedia(activeSlide.id))}
          >
            <Play className="size-5 fill-current" /> Ver ahora
          </Button>
          <Button
            variant="secondary"
            className="h-10 px-4 sm:h-11 sm:px-5"
            onClick={() => setIsSaved((current) => !current)}
          >
            <Bookmark className={`size-5 ${isSaved ? 'fill-current' : ''}`} />{' '}
            {isSaved ? 'En mi lista' : 'Mi lista'}
          </Button>
        </div>
      </div>

      <button
        className="absolute top-1/2 left-3 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white backdrop-blur transition hover:border-cyan-300/60 hover:bg-cyan-300/15 lg:block"
        aria-label="Destacado anterior"
        onClick={() => changeSlide(-1)}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white backdrop-blur transition hover:border-cyan-300/60 hover:bg-cyan-300/15 lg:block"
        aria-label="Siguiente destacado"
        onClick={() => changeSlide(1)}
      >
        <ChevronRight />
      </button>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:bottom-9">
        {featuredSlides.map((slide, index) => (
          <button
            key={slide.id}
            className={`size-2.5 rounded-full transition ${index === activeIndex ? 'bg-cyan-200' : 'bg-white/45 hover:bg-white/80'}`}
            aria-label={`Mostrar ${slide.id}`}
            aria-current={index === activeIndex}
            onClick={() => {
              setIsTrailerVisible(false);
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      <button
        className="absolute right-4 bottom-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:border-cyan-300/60 hover:text-cyan-200 sm:right-7 sm:bottom-8"
        aria-label={isSoundEnabled ? 'Silenciar tráiler' : 'Activar sonido del tráiler'}
        onClick={toggleSound}
      >
        {isSoundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
        <span className="hidden sm:inline">{isSoundEnabled ? 'Silenciar (25%)' : 'Activar sonido'}</span>
      </button>
    </section>
  );
}
