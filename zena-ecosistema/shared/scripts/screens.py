"""Capturas de revisión visual (desktop y móvil) de un sitio compilado.
Uso: python3 shared/scripts/screens.py apps/zena/dist /ruta/salida / /libros ...
Levanta un servidor local temporal, fuerza las animaciones de entrada y guarda PNG de página completa.
"""
import sys, threading, http.server, socketserver, functools, os
from playwright.sync_api import sync_playwright

root, out, *paths = sys.argv[1:]
os.makedirs(out, exist_ok=True)
Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
Handler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), Handler)
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

FORCE = """
document.querySelectorAll('[data-reveal],[data-split]').forEach(e=>e.classList.add('is-in'));
document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');
"""
with sync_playwright() as p:
    b = p.chromium.launch()
    for label, vp in (('desk', {'width': 1440, 'height': 900}), ('movil', {'width': 390, 'height': 844})):
        pg = b.new_page(viewport=vp, device_scale_factor=1)
        for path in paths:
            pg.goto(f'http://127.0.0.1:{port}{path}', wait_until='networkidle')
            pg.evaluate(FORCE)
            pg.wait_for_timeout(1500)
            name = (path.strip('/') or 'inicio').replace('/', '_')
            pg.screenshot(path=f'{out}/{name}-{label}.png', full_page=True)
            errs = pg.evaluate("[...document.querySelectorAll('img')].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)")
            ovf = pg.evaluate("document.documentElement.scrollWidth > window.innerWidth")
            print(label, path, 'imgs rotas:', errs, '| scroll horizontal:', ovf)
        pg.close()
    b.close()
srv.shutdown()
