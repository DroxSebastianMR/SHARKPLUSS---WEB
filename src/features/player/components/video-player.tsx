import { Expand, LoaderCircle, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { WatchContent } from '@/features/player/types/player.types';

interface VideoPlayerProps {
  content: WatchContent;
}
const time = (value: number) =>
  Number.isFinite(value)
    ? `${Math.floor(value / 60)}:${Math.floor(value % 60)
        .toString()
        .padStart(2, '0')}`
    : '0:00';

export function VideoPlayer({ content }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play().catch(() => setError(true));
    else video.pause();
  };
  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const onTime = () => setCurrent(video.currentTime);
    const onDuration = () => setDuration(video.duration);
    const onReady = () => setLoading(false);
    const onError = () => {
      setLoading(false);
      setError(true);
    };
    video.volume = volume;
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onDuration);
    video.addEventListener('canplay', onReady);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('error', onError);
    void video.play().catch(() => setLoading(false));
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onDuration);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
    };
  }, [volume]);
  return (
    <div
      ref={containerRef}
      className="group relative aspect-video overflow-hidden rounded-xl bg-black shadow-2xl ring-1 shadow-cyan-950/30 ring-white/10"
    >
      <video
        ref={videoRef}
        className="size-full object-contain"
        src={content.sourceUrl}
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040b12]/90 via-transparent to-[#040b12]/30 md:opacity-0 md:transition-opacity md:group-hover:opacity-100" />
      {loading && !error && (
        <div className="absolute inset-0 grid place-items-center">
          <LoaderCircle className="size-8 animate-spin text-cyan-300" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 grid place-items-center bg-[#07131e]/95 p-6 text-center">
          <div>
            <p className="font-semibold text-white">No fue posible cargar el video</p>
            <p className="mt-2 text-sm text-slate-300">Comprueba la conexión o permisos CORS del servidor.</p>
            <Button className="mt-5" onClick={() => window.location.reload()}>
              <RotateCcw className="size-4" /> Reintentar
            </Button>
          </div>
        </div>
      )}
      {!error && (
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
          <input
            aria-label="Progreso"
            className="player-range w-full"
            type="range"
            min="0"
            max={duration || 0}
            step=".1"
            value={current}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (videoRef.current) videoRef.current.currentTime = value;
              setCurrent(value);
            }}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-white hover:bg-cyan-300/20 hover:text-cyan-200 sm:size-10"
                onClick={() => void togglePlayback()}
              >
                {isPlaying ? (
                  <Pause className="size-5 fill-current" />
                ) : (
                  <Play className="size-5 fill-current" />
                )}
              </Button>
              <span className="hidden text-xs text-slate-200 tabular-nums sm:block">
                {time(current)} / {time(duration)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-white hover:bg-cyan-300/20 hover:text-cyan-200 sm:size-10"
                onClick={() => changeVolume(volume ? 0 : 0.8)}
              >
                {volume ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
              </Button>
              <input
                aria-label="Volumen"
                className="player-range hidden w-20 sm:block"
                type="range"
                min="0"
                max="1"
                step=".05"
                value={volume}
                onChange={(event) => changeVolume(Number(event.target.value))}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-white hover:bg-cyan-300/20 hover:text-cyan-200 sm:size-10"
              onClick={() => void containerRef.current?.requestFullscreen()}
            >
              <Expand className="size-5" />
            </Button>
          </div>
        </div>
      )}
      {!isPlaying && !loading && !error && (
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 z-10 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 text-slate-950 hover:bg-cyan-200"
          onClick={() => void togglePlayback()}
        >
          <Play className="size-6 fill-current" />
        </Button>
      )}
    </div>
  );
}
