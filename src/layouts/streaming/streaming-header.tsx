import { Bookmark, Menu, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { paths } from '@/app/router/paths';
import { AppLogo } from '@/components/custom/app-logo';
import { Button } from '@/components/ui/button';

const navigation = [
  ['Inicio', paths.home],
  ['Series', paths.series],
  ['Películas', paths.movies],
  ['En vivo', paths.live],
  ['Niños y familia', paths.kids],
] as const;

export function StreamingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12">
      <AppLogo />
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegación principal">
        {navigation.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `border-b-2 pb-2 text-sm font-semibold transition hover:text-white 2xl:text-base ${isActive ? 'border-cyan-300 text-white' : 'border-transparent text-slate-300'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Mi lista">
          <Bookmark className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Abrir menú">
          <Menu className="size-5" />
        </Button>
        <div className="ml-2 grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-indigo-500 text-xs font-black text-slate-950">
          SM
        </div>
      </div>
    </header>
  );
}
