import { Outlet } from 'react-router-dom';
import { StreamingHeader } from '@/layouts/streaming/streaming-header';

export function StreamingLayout() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06080d] text-white">
      <StreamingHeader />
      <Outlet />
    </main>
  );
}
