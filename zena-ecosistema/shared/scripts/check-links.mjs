// Verifica que todos los enlaces internos de ambos sitios compilados apunten a páginas existentes.
// Uso: npm run build && npm run check:links
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const sites = [
  { name: 'zena', dir: 'apps/zena/dist', host: 'www.zenaayoub.com' },
  { name: 'fundacion', dir: 'apps/fundacion/dist', host: 'theadventurerscf.org' },
];
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const exists = (dir, path) => {
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return existsSync(join(dir, 'index.html'));
  return existsSync(join(dir, clean)) && statSync(join(dir, clean)).isFile()
    || existsSync(join(dir, clean, 'index.html'));
};

let errors = 0;
for (const s of sites) {
  for (const file of walk(s.dir).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      let target = null, site = s;
      if (href.startsWith('/') && !href.startsWith('//')) target = href;
      else {
        const other = sites.find((x) => href.startsWith(`https://${x.host}`));
        if (other) { site = other; target = href.replace(`https://${other.host}`, '') || '/'; }
      }
      if (target && !target.startsWith('/_astro') && !exists(site.dir, target)) {
        errors++; console.log(`✗ [${s.name}] ${file.replace(s.dir, '')} → ${href}`);
      }
    }
  }
}
console.log(errors ? `\n${errors} enlace(s) roto(s).` : '✓ Todos los enlaces internos y entre sitios funcionan.');
process.exit(errors ? 1 : 0);
