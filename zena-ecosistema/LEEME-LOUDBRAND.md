# Para el repositorio de Loudbrand

Esta carpeta es el proyecto completo: código fuente, documentación e historial de Git.

## Qué publicar para la revisión del cliente (loudbrandco.com/zena)
Las carpetas listas para publicar están en **`dist-revision/`**:

```
dist-revision/
├── zena/             → loudbrandco.com/zena            (sitio de Zena Ayoub)
└── zena-fundacion/   → loudbrandco.com/zena-fundacion  (sitio de la fundación)
```
Cópialas a la carpeta que publica loudbrandco.com: la raíz del sitio, `public/` o `static/`, según el proyecto. Están marcadas «noindex», así Google no las indexa.

## Si se sube todo el proyecto al repositorio
- El código fuente está en `apps/zena`, `apps/fundacion` y `shared/`.
- Para regenerar `dist-revision/` después de un cambio: `npm install` y luego `bash shared/scripts/paquete-revision.sh`.
- Para el lanzamiento definitivo en zenaayoub.com sigue `docs/DESPLIEGUE-GODADDY.md`.
- Nunca subas al repositorio la clave secreta de Stripe (`sk_...`). Ver `docs/STRIPE.md`.

## Documentación
- `README.md`: cómo está organizado el proyecto.
- `docs/AUDITORIA.md`: hallazgos del sitio anterior y arquitectura.
- `docs/STRIPE.md`: pagos.
- `docs/CONTENIDO-PENDIENTE.md`: lo que falta antes de lanzar.
