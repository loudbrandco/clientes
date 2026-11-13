# Ecosistema digital — Zena Ayoub + The Adventurers Children Foundation

Dos sitios independientes en un solo repositorio, con un sistema de diseño compartido.

| Sitio | Dominio | Código |
|---|---|---|
| Zena Ayoub · Las Aventuras en Turín | https://www.zenaayoub.com | `apps/zena` |
| The Adventurers Children Foundation | https://theadventurerscf.org | `apps/fundacion` |

## Uso rápido
```bash
npm install
npm run dev:zena          # http://localhost:4321
npm run dev:fundacion     # http://localhost:4321
npm run build             # compila ambos sitios en apps/*/dist
npm run check:links       # verifica enlaces internos y entre sitios
```

## Dónde se edita cada cosa
| Quiero cambiar… | Archivo |
|---|---|
| Libros, audiolibros, prensa, personajes | `apps/zena/src/data/contenido.ts` |
| Programas, proyectos, aliados y su estado | `apps/fundacion/src/data/fundacion.ts` |
| Enlaces de pago de Stripe | `apps/fundacion/src/data/stripe.ts` |
| Correos, redes y enlaces oficiales | `shared/sites.mjs` |
| Documentos PDF publicados | `apps/fundacion/public/documentos/` + `apps/fundacion/src/pages/informes.astro` |
| Colores y tipografías | `apps/*/src/styles/theme.css` |

## Documentación
- [`docs/AUDITORIA.md`](docs/AUDITORIA.md): hallazgos del sitio anterior y arquitectura.
- [`docs/DESPLIEGUE-GODADDY.md`](docs/DESPLIEGUE-GODADDY.md): DNS, HTTPS, subdominio y publicación.
- [`docs/STRIPE.md`](docs/STRIPE.md): configuración de las donaciones.
- [`docs/CONTENIDO-PENDIENTE.md`](docs/CONTENIDO-PENDIENTE.md): lo que falta verificar antes de lanzar.

## Reglas de contenido
1. No se publican títulos, cifras, alianzas, certificaciones ni testimonios sin soporte.
2. Las fotos de banco no se usan como si documentaran actividades reales.
3. Imágenes de menores solo con autorización de sus padres o acudientes.
4. Cada programa declara su estado: *En ejecución*, *En desarrollo* o *Proyecto futuro*.
