import type { PropsWithChildren } from 'react';

/** Punto único para providers globales (sesión, tema, cache y reproductor). */
export function AppProviders({ children }: PropsWithChildren) {
  return children;
}
