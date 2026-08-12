import { Link } from 'react-router-dom';
import { paths } from '@/app/router/paths';

export function AppLogo() {
  return (
    <Link className="text-2xl font-black tracking-[-.12em] text-white" to={paths.home}>
      SHARK<span className="text-cyan-300">+</span>
    </Link>
  );
}
