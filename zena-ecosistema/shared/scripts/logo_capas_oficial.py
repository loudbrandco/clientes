"""Genera las capas del logotipo animado a partir del LOGO OFICIAL (shared/assets/logo-fundacion-oficial.png).
Uso: python3 shared/scripts/logo_capas_oficial.py
Salida (en apps/zena/public/img y apps/fundacion/public/img):
  logo-anim-texto-800.webp / -1500.webp  → tipografía en crema, sin el ave (la «T» caligráfica completa)
  logo-anim-ave.webp                     → el ave sola
Imprime la posición del ave (en % del lienzo) para LogoVuelo.astro.

Pasos: 1) separa el ave por color, 2) recolorea la tipografía para fondo oscuro,
3) reconstruye el tramo de la curva superior que el ave tapa y el remate del asta de la «T»,
4) limpia restos del contorno del ave y exporta.
"""
import numpy as np, cv2
from PIL import Image, ImageDraw

SRC = 'shared/assets/logo-fundacion-oficial.png'
OUT_APPS = ['apps/zena/public/img', 'apps/fundacion/public/img']
CREAM = np.array([247, 242, 230.]); GOLD = np.array([226, 186, 98.])

im = np.array(Image.open(SRC).convert('RGBA'))
H0, W0 = im.shape[:2]
rgb = im[..., :3].astype(int); a = im[..., 3]
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
sat = rgb.max(-1) - rgb.min(-1); lum = rgb.mean(-1)

# 1) Máscara del ave: colores (rojo, morado, amarillo) en la zona del ave, cerrada, rellena y dilatada
reg = np.zeros(a.shape, bool); reg[40:215, 220:480] = True
col = (sat > 70) | ((b - r > 20) & (b - g > 30)) | ((r - b > 40) & (r > 120))
core = (reg & (a > 80) & col).astype(np.uint8) * 255
core = cv2.morphologyEx(core, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
m = cv2.morphologyEx(core, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
fill = np.zeros_like(m); cv2.drawContours(fill, [c for c in cnts if cv2.contourArea(c) > 300], -1, 255, -1)
bird = cv2.dilate(fill, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))) > 0

# 2) Tipografía recoloreada (negro → crema, sombra beige → dorado translúcido)
# El original trae un halo blanco opaco: el blanco pasa a transparente, el negro a crema (con su
# antialias proporcional a lo oscuro) y la sombra beige a dorado translúcido.
beige = (sat >= 14) & (sat <= 70) & (lum > 140) & (lum < 236)
tinta_a = a * np.clip((236 - lum) / (236 - 40), 0, 1)
out = np.zeros(im.shape, float)
out[..., :3] = np.where(beige[..., None], GOLD, CREAM)
out[..., 3] = np.where(beige, a * 0.75 * np.clip((236 - lum) / 50, 0, 1), tinta_a)
out[bird] = 0

# 3) Trazos reconstruidos bajo el ave (supermuestreo 4x)
K = 4
tinta = Image.new('L', (W0 * K, H0 * K), 0); sombra = Image.new('L', (W0 * K, H0 * K), 0)
dt, ds = ImageDraw.Draw(tinta), ImageDraw.Draw(sombra)
def stroke(pts, r0, r1, off=(0, 0), d=None):
    for i, p in enumerate(pts):
        rr = r0 + (r1 - r0) * i / max(1, len(pts) - 1)
        x, y = p[0] + off[0], p[1] + off[1]
        d.ellipse([(x - rr) * K, (y - rr) * K, (x + rr) * K, (y + rr) * K], fill=255)
def bezier(P0, P1, P2, P3, n=500):
    t = np.linspace(0, 1, n)[:, None]
    return (1 - t) ** 3 * P0 + 3 * (1 - t) ** 2 * t * P1 + 3 * (1 - t) * t ** 2 * P2 + t ** 3 * P3
# a) la curva superior baja desde donde la tapa el ala y entra en la parte alta del asta de la «T»
#    (indicación del cliente, 4-nov-2026)
P0, P3 = np.array([272.0, 152.5]), np.array([364.0, 201.0])
t0, t3 = np.array([1, .40]), np.array([1, .62])
curva = bezier(P0, P0 + t0 / np.linalg.norm(t0) * 35, P3 - t3 / np.linalg.norm(t3) * 35, P3)
stroke(curva, 4.2, 4.6, d=dt); stroke(curva, 4.2, 4.6, off=(3, 5), d=ds)
# b) cierre del asta (une la curva con el asta y con el trazo fino que sale hacia el bucle)
cierre = bezier(np.array([352.0, 209.0]), np.array([357.0, 203.0]), np.array([364.0, 200.0]), np.array([376.0, 202.5]), 200)
stroke(cierre, 6.0, 3.2, d=dt); stroke(cierre, 6.0, 3.2, off=(3, 5), d=ds)
# c) el bucle de la derecha nace bajo la cabeza del ave: su inicio se afina en punta
out[104:134, 440:479] = 0   # tramo junto al pico: se rehace para que la punta salga limpia del trazo original
punta = bezier(np.array([488.0, 118.9]), np.array([476.0, 117.6]), np.array([466.0, 117.4]), np.array([457.0, 118.2]), 200)
stroke(punta, 3.3, 0.6, d=dt)
zona = np.zeros(a.shape, bool); zona[108:140, 440:512] = True
out[zona & beige] = 0   # sombra original junto al pico: se rehace en una sola pieza
som = bezier(np.array([512.0, 123.0]), np.array([494.0, 118.6]), np.array([474.0, 117.4]), np.array([460.0, 118.2]), 300)
stroke(som, 3.0, 0.6, off=(3, 5), d=ds)
pm = np.array(tinta.resize((W0, H0), Image.LANCZOS)).astype(float)
ps = np.array(sombra.resize((W0, H0), Image.LANCZOS)).astype(float) * 0.75
sh = (ps > out[..., 3]) & (pm < 10)
out[sh, :3] = GOLD; out[sh, 3] = ps[sh]
ink = pm > 10
out[ink, :3] = CREAM; out[ink, 3] = np.maximum(out[ink, 3], pm[ink])

# 4) Limpieza: restos del contorno del ave (componentes pequeñas en la zona del ave)
txt = out.clip(0, 255).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats((txt[..., 3] > 20).astype(np.uint8), 8)
for i in range(1, n):
    x, y, w, h, area = st[i]
    if area < 60 or (area < 400 and 150 <= x <= 500 and y <= 220):
        txt[lab == i, 3] = 0

# Lienzo común: el área que ocupan tipografía y ave
alpha_all = np.maximum(txt[..., 3], np.where(bird, a, 0))
ys, xs = np.where(alpha_all > 10)
X0, Y0, X1, Y1 = xs.min() - 4, ys.min() - 4, xs.max() + 5, ys.max() + 5
texto = Image.fromarray(txt).crop((X0, Y0, X1, Y1)); W, H = texto.size

bim = im.copy(); bim[~bird, 3] = 0
# quita el halo blanco exterior del ave (conserva el blanco del ojo, que no toca el borde)
blanco = (bird & (lum > 215) & (sat < 25)).astype(np.uint8)
nb, lb, sb, _ = cv2.connectedComponentsWithStats(blanco, 8)
borde = bird & ~cv2.erode(bird.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool)
for i in range(1, nb):
    if (borde & (lb == i)).any() or sb[i, cv2.CC_STAT_AREA] > 400: bim[lb == i, 3] = 0
bys, bxs = np.where(bim[..., 3] > 10)
bx0, bx1, by0, by1 = bxs.min() - 2, bxs.max() + 3, bys.min() - 2, bys.max() + 3
ave = Image.fromarray(bim).crop((bx0, by0, bx1, by1))

for d_ in OUT_APPS:
    for w in (800, 1500):
        t = texto.resize((w, round(H * w / W)), Image.LANCZOS)
        # píxeles transparentes con el color del fondo oscuro (evita bordes claros en algunos navegadores)
        arr = np.array(t); arr[arr[..., 3] == 0, :3] = (24, 56, 42); Image.fromarray(arr).save(f'{d_}/logo-anim-texto-{w}.webp', 'WEBP', quality=92, exact=True)
    ave.save(f'{d_}/logo-anim-ave.webp', 'WEBP', quality=92)
print('lienzo', (W, H), 'ave', ave.size)
print('AVE = { left: %.3f, top: %.3f, width: %.3f }' % ((bx0 - X0) / W * 100, (by0 - Y0) / H * 100, (bx1 - bx0) / W * 100))
