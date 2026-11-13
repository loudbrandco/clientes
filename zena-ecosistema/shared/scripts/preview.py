"""Arma una vista previa navegable de los dos sitios con rutas relativas.
Uso: python3 shared/scripts/preview.py <salida> [carpeta_zena] [carpeta_fundacion]
Copia apps/zena/dist → <salida>/zena y apps/fundacion/dist → <salida>/fundacion,
y reescribe rutas absolutas ("/libros", "https://theadventurerscf.org/donar")
para que funcionen dentro de una carpeta, sin servidor.
"""
import os, re, shutil, sys

out = sys.argv[1]
Z = sys.argv[2] if len(sys.argv) > 2 else 'zena'
F = sys.argv[3] if len(sys.argv) > 3 else 'fundacion'
SITES = {Z: ('apps/zena/dist', 'https://www.zenaayoub.com'),
         F: ('apps/fundacion/dist', 'https://theadventurerscf.org')}
SKIP = {'.htaccess', '_redirects', 'robots.txt'}

shutil.rmtree(out, ignore_errors=True)
for name, (src, _) in SITES.items():
    shutil.copytree(src, os.path.join(out, name), ignore=lambda d, fs: [f for f in fs if f in SKIP or f.endswith('.xml')])

def resolve(site, path, depth, root_depth):
    """Ruta relativa desde un archivo a 'path' dentro de 'site'."""
    path, _, frag = path.partition('#')
    up = '../' * depth                      # hasta la raíz del sitio actual
    up_root = '../' * root_depth            # hasta la raíz de la vista previa
    base = f'{up_root}{site}/'
    p = path.lstrip('/')
    if p == '' or p.endswith('/'):
        p += 'index.html'
    elif '.' not in os.path.basename(p):
        p += '/index.html'
    return base + p + (f'#{frag}' if frag else '')

for name, (_, host) in SITES.items():
    site_dir = os.path.join(out, name)
    for dirpath, _, files in os.walk(site_dir):
        for f in files:
            if not f.endswith(('.html', '.css', '.js')):
                continue
            fp = os.path.join(dirpath, f)
            rel_depth = os.path.relpath(dirpath, site_dir).count(os.sep) + (0 if os.path.relpath(dirpath, site_dir) == '.' else 1)
            root_depth = rel_depth + 1
            s = open(fp, encoding='utf-8').read()

            def cross(m):
                attr, url = m.group(1), m.group(2)
                for other, (_, h) in SITES.items():
                    if url.startswith(h):
                        return f'{attr}"{resolve(other, url[len(h):] or "/", rel_depth, root_depth)}"'
                return m.group(0)
            s = re.sub(r'((?:href|src)=)"(https://(?:www\.zenaayoub\.com|theadventurerscf\.org)[^"]*)"', cross, s)

            def local(m):
                attr, url = m.group(1), m.group(2)
                return f'{attr}"{resolve(name, url, rel_depth, root_depth)}"'
            s = re.sub(r'((?:href|src)=)"(/(?!/)[^"]*)"', local, s)

            def srcset(m):
                parts = []
                for item in m.group(1).split(','):
                    item = item.strip()
                    url, *rest = item.split(' ')
                    if url.startswith('/'):
                        url = resolve(name, url, rel_depth, root_depth)
                    parts.append(' '.join([url, *rest]))
                return f'srcset="{", ".join(parts)}"'
            s = re.sub(r'srcset="([^"]+)"', srcset, s)
            s = re.sub(r'url\((/(?!/)[^)]+)\)', lambda m: f'url({resolve(name, m.group(1), rel_depth, root_depth)})', s)
            # sin servidor no aplica: quitar redirecciones de canónico
            open(fp, 'w', encoding='utf-8').write(s)

n = sum(len(fs) for _, _, fs in os.walk(out))
print(f'{n} archivos en {out}')
