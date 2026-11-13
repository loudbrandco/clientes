# Auditoría y arquitectura — octubre de 2026

## 1. Estado del sitio actual (zenaayoub.com)

| Aspecto | Hallazgo | Impacto |
|---|---|---|
| Plataforma | Squarespace (hecho por Loudbrand). No había repositorio ni código propio. | Sin control de versiones; el subdominio independiente no era viable en esa plataforma. |
| Páginas | 7 en el sitemap: inicio, sobre-zena, programs, the-adventurers-children-foundation, prensa, contact, donate. | No existían Libros, Audiolibros, Personajes, Recursos ni una fundación como sitio propio. |
| Fundación | Una sola página larga dentro del sitio de Zena, sin meta description. | Débil en SEO y en confianza para donantes y empresas. |
| Imágenes de la fundación | 6 fotos de banco (selva de Bali, familias genéricas) presentadas junto a la actividad real. | Riesgo reputacional. Excluidas. |
| Imágenes reales | Retratos de Zena (sesión de agosto de 2025), ilustraciones originales de los libros, logos, 1 foto de una jornada de la fundación (2026). | Reutilizadas y optimizadas a WebP (de 11 MB a 3,8 MB entre ambos sitios). |
| Donaciones | Bloque de donación de Squarespace (USD 10/20/30/40, monto libre, frecuencias, opción de cubrir 3 %), sin página de agradecimiento ni FAQ. | Rediseñado con Stripe Payment Links. |
| Contacto | Solo correos. Sin formulario ni autorización de datos (Ley 1581). | Formularios con consentimiento explícito. |
| Legal | Sin política de privacidad ni términos. | Creadas (requieren revisión legal). |
| Enlaces externos | Tienda Square, Spotify, Apple Books, YouTube, Instagram. | Conservados y centralizados en `shared/sites.mjs`. |
| Afirmaciones sin soporte visible | «Certificada y registrada 501c3», alianzas con la Alcaldía de Tena y la Reserva Tenasuca. | Se mantienen como texto declarado, sin logos, con documentos marcados como pendientes. |

## 2. Lo que se tomó de las referencias (sin copiar)

| Referencia | Aprendizaje aplicado |
|---|---|
| charity: water | Una sola misión en el hero, «otras formas de dar» y una sección explícita de «sabes a dónde va tu donación». → `/donar` con destino del aporte y `/transparencia`. |
| The Children's Society | Menú agrupado (*Qué hacemos · Cómo ayudar · Donar*) y alianzas corporativas como entrada propia. → Menú de 4 grupos en la fundación y `/alianzas` independiente. |
| Pivotal | Pocas categorías con mucho aire tipográfico y la fundadora presentada con sobriedad. → Página de Zena editorial, sin exceso de elementos. |
| Yield Giving | Navegación mínima y texto como protagonista. → Titulares grandes con revelación por líneas y menos «tarjetas». |

## 3. Arquitectura objetivo (implementada)

```
zena-ecosistema/                ← un repositorio, dos sitios
├── apps/zena/                  → www.zenaayoub.com        (12 páginas)
├── apps/fundacion/             → theadventurerscf.org  (18 páginas)
├── shared/                     → sistema de diseño, scripts y configuración común
└── docs/                       → despliegue, Stripe, pendientes
```

- **Framework:** Astro 7 en modo estático. Cada página es un HTML real con su propia URL, sin anclas de una sola página.
- **Independencia:** cada sitio tiene su build, dominio, metadatos, sitemap, robots, analítica y `.htaccess` propios.
- **Conexión:** la cabecera de la fundación enlaza a Zena y a Turín; el sitio de Zena tiene `/fundacion` y CTA hacia el subdominio. `npm run check:links` verifica los enlaces cruzados.
- **Diseño:** tokens compartidos (espaciado, tipografía, radios, movimiento) en `shared/styles/base.css`, con un tema propio por sitio:
  - **Zena** — *cuaderno de campo*: crema, oliva del logo de Turín, terracota del tejado de la finca; Fraunces + Figtree.
  - **Fundación** — *territorio*: verde bosque, azul agua, rojo del ave del logo; Newsreader + Figtree, con curvas de nivel generadas como motivo gráfico.
- **Movimiento:** revelación al desplazarse, titulares línea por línea, transiciones entre páginas (View Transitions) y curvas que se dibujan solas. Todo se desactiva con `prefers-reduced-motion`.
- **Accesibilidad:** enlace de salto, foco visible, menú móvil con `inert` y tecla Esc, `alt` descriptivos y contraste AA (≥ 4.5:1) en textos de cuerpo y etiquetas.
- **Honestidad de contenido:** estados *En ejecución / En desarrollo / Proyecto futuro* en programas y proyectos; indicadores marcados «por publicar», nunca cifras estimadas.

## 4. Verificación realizada
- Compilación sin errores de ambos sitios (30 páginas en total).
- Revisión visual de todas las páginas a 1440 px y 390 px: sin imágenes rotas ni scroll horizontal.
- Enlaces internos y entre sitios: 0 rotos.
- Prueba funcional del selector de donación (frecuencia, montos y monto libre) y del menú móvil: sin errores de JavaScript.
