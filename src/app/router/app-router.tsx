import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/features/home';
import { WatchPage } from '@/features/player';
import { StreamingLayout } from '@/layouts/streaming/streaming-layout';
import { paths } from '@/app/router/paths';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StreamingLayout />}>
          <Route index element={<HomePage />} />
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.watch} element={<WatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
