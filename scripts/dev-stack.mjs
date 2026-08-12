import { execFileSync, spawn } from 'node:child_process';

const commands = [
  { name: 'web', args: ['dev'] },
  { name: 'api', args: ['--dir', '../sharkpluss-Api-Backend', 'dev'] },
];

const children = commands.map(({ name, args }) => {
  const child = spawn('pnpm', args, { shell: process.platform === 'win32', stdio: 'inherit' });
  child.on('exit', (code) => {
    if (code && code !== 0) console.error(`[${name}] finalizó con código ${code}`);
  });
  return child;
});

let isStopping = false;
function stop() {
  if (isStopping) return;
  isStopping = true;

  children.forEach((child) => {
    if (!child.pid) return;
    if (process.platform === 'win32') {
      try {
        execFileSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
      } catch {
        // El hijo pudo haberse detenido por sí mismo.
      }
      return;
    }
    child.kill('SIGTERM');
  });
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
