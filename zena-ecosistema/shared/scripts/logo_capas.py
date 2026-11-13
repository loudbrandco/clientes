"""Genera las capas del logotipo animado de la fundación a partir del original.
Uso: python3 shared/scripts/logo_capas.py
Salida (en apps/zena/public/img y apps/fundacion/public/img):
  logo-anim-texto-800.webp / -1500.webp  → tipografía en crema, sin el ave
  logo-anim-ave.webp                     → el ave sola (2x)

Pasos: 1) recorta el lienzo, 2) separa el ave por color y forma, 3) recolorea la tipografía
para fondo oscuro, 4) reconstruye los trazos que el ave tapaba (la curva superior y la
unión de la «T»), 5) limpia restos y exporta.
"""
import numpy as np, cv2
from PIL import Image, ImageDraw

SRC = 'shared/assets/logo-fundacion-original.png'
CROP = (186, 62, 960, 403)  # área útil del logotipo (774 × 341)
OUT_APPS = ['apps/zena/public/img', 'apps/fundacion/public/img']
CREAM = np.array([247, 242, 230.]); GOLD = np.array([226, 186, 98.])

src = Image.open(SRC).crop(CROP).convert('RGBA')
im = np.array(src); W, H = src.size
rgb = im[..., :3].astype(int); a = im[..., 3].astype(float)
sat = rgb.max(-1) - rgb.min(-1); lum = rgb.mean(-1)

# 1) Máscara del ave: píxeles de color (o blancos del ojo) en la zona superior, rellenos y dilatados
reg = np.zeros(a.shape, bool); reg[0:130, 120:300] = True; reg[0:95, 300:360] = True
core = (reg & (a > 80) & ((sat > 35) | (lum > 170))).astype(np.uint8) * 255
core = cv2.morphologyEx(core, cv2.MORPH_OPEN, np.ones((6, 6), np.uint8))
m = cv2.morphologyEx(core, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
ys, xs = np.where(core > 0); sel = (xs >= 262) & (ys < 90)
cv2.drawContours(m, [cv2.convexHull(np.stack([xs[sel], ys[sel]], 1).astype(np.int32))], -1, 255, -1)
cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
fill = np.zeros_like(m); cv2.drawContours(fill, [c for c in cnts if cv2.contourArea(c) > 400], -1, 255, -1)
bird = (cv2.dilate(fill, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))) > 0) & (a > 0)

# 2) Capa del ave
bim = im.copy(); bim[~bird, 3] = 0
ys, xs = np.where(bird); x0, x1, y0, y1 = xs.min() - 2, xs.max() + 3, ys.min(), ys.max() + 3
ave = Image.fromarray(bim).crop((x0, y0, x1, y1))

# 3) Tipografía recoloreada (negro → crema, sombra → dorado translúcido)
out = np.zeros(im.shape, float)
dark = lum < 45
out[..., :3] = np.where(dark[..., None], CREAM, GOLD)
out[..., 3] = np.where(dark, a, a * 0.75)
out[bird] = 0

# 4) Trazos reconstruidos (supermuestreo 4x para bordes suaves)
K = 4
patch = Image.new('L', (W * K, H * K), 0); d = ImageDraw.Draw(patch)
def stroke(points, r0, r1):
    for i, p in enumerate(points):
        r = r0 + (r1 - r0) * i / max(1, len(points) - 1)
        d.ellipse([(p[0] - r) * K, (p[1] - r) * K, (p[0] + r) * K, (p[1] + r) * K], fill=255)
def bezier(P0, P1, P2, P3, n=400):
    t = np.linspace(0, 1, n)[:, None]
    return (1 - t) ** 3 * P0 + 3 * (1 - t) ** 2 * t * P1 + 3 * (1 - t) * t ** 2 * P2 + t ** 3 * P3
def line(A, B, n=200):
    t = np.linspace(0, 1, n)[:, None]; return A + (B - A) * t
# a) curva superior bajo el cuerpo del ave (continúa las tangentes de ambos lados)
P0, P3 = np.array([180, 69.5]), np.array([345, 46.5])
stroke(bezier(P0, P0 + np.array([1, .21]) * 55, P3 - np.array([1, .18]) * 65, P3), 4.0, 2.9)
# b) parte alta del asta de la «T» hasta la unión
stroke(line(np.array([245.0, 116.0]), np.array([252.5, 104.5])), 5.2, 3.6)
# c) trazo que baja hacia la «h», prolongado hasta unirse con el asta
stroke(line(np.array([252.5, 104.5]), np.array([268.0, 113.5])), 3.4, 3.4)
pm = np.array(patch.resize((W, H), Image.LANCZOS)).astype(float)
grow = pm > out[..., 3]
out[grow, :3] = CREAM
out[..., 3] = np.maximum(out[..., 3], pm)

# 5) Limpieza: restos tenues junto al ave y fragmentos sueltos
zone = np.zeros(a.shape, bool); zone[0:126, 155:345] = True
out[zone & (out[..., 3] < 90) & ~(pm > 0), 3] = 0
# restos puntuales del contorno del ala y de la sombra del asta (fuera de los trazos reconstruidos)
for (xa, ya, xb, yb) in [(245, 0, 275, 32), (228, 94, 256, 112)]:
    box = np.zeros(a.shape, bool); box[ya:yb, xa:xb] = True
    out[box & ~(pm > 0), 3] = 0
txt = out.clip(0, 255).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats((txt[..., 3] > 20).astype(np.uint8), 8)
for i in range(1, n):
    if st[i, cv2.CC_STAT_AREA] < 40: txt[lab == i, 3] = 0
texto = Image.fromarray(txt)

for d_ in OUT_APPS:
    for w in (800, 1500):
        texto.resize((w, round(H * w / W)), Image.LANCZOS).save(f'{d_}/logo-anim-texto-{w}.webp', 'WEBP', quality=92)
    ave.resize((ave.width * 2, ave.height * 2), Image.LANCZOS).save(f'{d_}/logo-anim-ave.webp', 'WEBP', quality=92)
print('Ave en %:', dict(left=round(x0 / W * 100, 3), top=round(y0 / H * 100, 3), width=round((x1 - x0) / W * 100, 3)), 'tamaño ave', ave.size)
