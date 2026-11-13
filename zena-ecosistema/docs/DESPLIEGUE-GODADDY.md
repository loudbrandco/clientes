# Guía de despliegue — zenaayoub.com + theadventurerscf.org

**Para:** Miguel Alejandro (administra el DNS en GoDaddy)
**Resultado:** dos sitios independientes, cada uno con su propio HTTPS, SEO y sitemap.

| Sitio | Dominio | Carpeta del proyecto | Se publica |
|---|---|---|---|
| A — Zena Ayoub | `www.zenaayoub.com` | `apps/zena` | `apps/zena/dist/` |
| B — Fundación | `theadventurerscf.org` | `apps/fundacion` | `apps/fundacion/dist/` |

Ambos sitios son **HTML estático**, sin base de datos. La única pieza de servidor es `fundacion/api/donacion.php`, que crea los pagos de Stripe; por eso **la fundación debe ir en un hosting con PHP** (GoDaddy cPanel lo tiene). Si se usa Vercel, ese archivo tendría que pasarse a una función serverless.

---

## 0. Antes de tocar el DNS (muy importante)

El dominio hoy apunta a **Squarespace**. Si cambias el DNS antes de tener el nuevo sitio publicado, el sitio se cae.

1. **Revisa la suscripción de Squarespace.** Si el dominio se compró en Squarespace (no en GoDaddy), hay que transferirlo o apuntar sus DNS a GoDaddy primero.
2. **Haz una copia de los registros DNS actuales** en GoDaddy (captura de pantalla de la tabla completa), sobre todo los de **correo**: `MX`, `TXT` (SPF, DKIM, DMARC) y cualquier `CNAME` de verificación. **No los borres:** de ellos dependen `info@zenaayoub.com` y `Theadventurers@zenaayoub.com`.
3. **Baja el TTL** de los registros `A` y `CNAME` de `www` a 600 segundos un día antes del cambio. Así, si algo falla, se revierte rápido.
4. **Prueba primero en un dominio temporal** (ver la opción B: Vercel da uno gratis) antes de mover el dominio real.

---

## Opción A — Hosting de GoDaddy (cPanel)

Úsala si ya tienen un plan de hosting **Linux con cPanel** en GoDaddy.

### A1. Crear el subdominio
1. GoDaddy → **Mis productos** → Hosting → **Administrar** → **cPanel Admin**.
2. **Dominios → Crear un dominio nuevo**: `theadventurerscf.org`.
3. Desmarca "compartir raíz del documento" y define como raíz: `public_html/fundacion`.
4. cPanel crea automáticamente el registro DNS del subdominio si el dominio usa los nameservers de GoDaddy.

### A2. Activar HTTPS
cPanel → **SSL/TLS Status** → selecciona `zenaayoub.com`, `www.zenaayoub.com` y `theadventurerscf.org` → **Run AutoSSL**. Espera entre 5 y 30 minutos.

### A3. Compilar y subir
```bash
npm install
npm run build          # genera apps/zena/dist y apps/fundacion/dist
npm run check:links    # verifica que no haya enlaces rotos
```
- Sube **el contenido** de `apps/zena/dist/` a `public_html/`.
- Sube **el contenido** de `apps/fundacion/dist/` a `public_html/fundacion/`.
- Usa el **Administrador de archivos** de cPanel (sube un .zip y luego "Extraer") o FTP (FileZilla).
- Activa "mostrar archivos ocultos": el archivo **`.htaccess`** debe quedar subido. Ese archivo fuerza HTTPS y redirige las URL antiguas de Squarespace.

### A4. Despliegue automático desde GitHub (opcional, recomendado)
El repositorio incluye `.github/workflows/deploy-godaddy.yml`. Cada vez que se haga *push* a `main`, compila y sube por FTP los dos sitios.
En GitHub → *Settings → Secrets and variables → Actions*, crea:
- `FTP_SERVER` (ej. `ftp.zenaayoub.com`)
- `FTP_USERNAME`
- `FTP_PASSWORD`

Luego cambia `if: false` por `if: true` en el archivo del workflow.

### A5. Apuntar el dominio principal
Si el hosting está en la misma cuenta de GoDaddy, en **DNS → Registros**:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | IP del hosting (cPanel → panel derecho, "Shared IP Address") |
| CNAME | `www` | `@` |
| A | `fundacion` | la misma IP del hosting |

---

## Opción B — Vercel (gratis) con el DNS en GoDaddy

Es la opción más simple de mantener: cada *push* a GitHub publica solo, con HTTPS automático y vistas previas por cambio.

### B1. Crear los dos proyectos
1. Entra a **vercel.com** con la cuenta de GitHub → **Add New → Project** → importa el repo `zena-ecosistema`.
2. **Proyecto 1 — Zena:** *Root Directory* = `apps/zena` · *Framework* = Astro · *Build command* = `npm run build` · *Output* = `dist`.
3. **Proyecto 2 — Fundación:** importa **el mismo repo** otra vez · *Root Directory* = `apps/fundacion` · el resto igual.
4. Cada proyecto entrega una URL temporal (`*.vercel.app`). **Revisa los dos sitios ahí antes de tocar el DNS.**

### B2. Conectar los dominios
- Proyecto Zena → *Settings → Domains* → agrega `zenaayoub.com` y `www.zenaayoub.com` (marca `www` como principal).
- Proyecto Fundación → agrega `theadventurerscf.org`.

### B3. Registros en GoDaddy (DNS → Administrar DNS)

| Tipo | Nombre | Valor | Para qué |
|---|---|---|---|
| A | `@` | `76.76.21.21` | dominio raíz → Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | www → Vercel |
| CNAME | `fundacion` | `cname.vercel-dns.com` | subdominio → Vercel |

> Vercel muestra los valores exactos en cada dominio: si difieren de esta tabla, usa los de Vercel.
> **No modifiques** los registros `MX` ni `TXT` del correo.

HTTPS se activa solo en pocos minutos. Las redirecciones de las URL antiguas ya están en `apps/zena/vercel.json`.

---

## 1. Dominio canónico y SEO (las dos opciones)

- El dominio canónico es **`https://www.zenaayoub.com`** (con www). `zenaayoub.com` sin www redirige allí.
- La fundación es **`https://theadventurerscf.org`**.
- Cada sitio genera su propio `sitemap-index.xml` y `robots.txt`.
- Después de publicar, en **Google Search Console** agrega **dos propiedades** (una por sitio), verifícalas con un registro `TXT` en GoDaddy y envía cada sitemap:
  - `https://www.zenaayoub.com/sitemap-index.xml`
  - `https://theadventurerscf.org/sitemap-index.xml`

### Redirecciones de las URL de Squarespace (ya configuradas)
| Antes | Ahora |
|---|---|
| `/home` | `/` |
| `/programs` | `/las-aventuras-en-turin/` |
| `/contact` | `/contacto/` |
| `/prensa` | `/diario/` |
| `/cart` | `/libros/` |
| `/the-adventurers-children-foundation` | `https://theadventurerscf.org/` |
| `/donate` | `https://theadventurerscf.org/donar/` |

## 2. Variables opcionales (al compilar)

| Variable | Para qué | Ejemplo |
|---|---|---|
| `GA_ZENA` / `GA_FUNDACION` | Google Analytics 4, un ID por sitio | `G-XXXXXXX` |
| `FORM_ENDPOINT_ZENA` / `FORM_ENDPOINT_FUNDACION` | Recibir los formularios por correo (Formspree, gratis hasta 50 envíos/mes) | `https://formspree.io/f/abcd1234` |
| `ZENA_URL` / `FUNDACION_URL` | Probar en dominios temporales | `https://zena.vercel.app` |

En Vercel se configuran en *Settings → Environment Variables*. En el workflow de GoDaddy, como *secrets*.
**Sin endpoint de formularios**, los formularios abren el correo del visitante con el mensaje ya escrito. Funciona, pero se pierden contactos: se recomienda configurar Formspree.

## 3. Lista de verificación final
- [ ] Copia de los registros DNS actuales guardada (sobre todo MX y TXT del correo)
- [ ] Ambos sitios revisados en la URL temporal
- [ ] DNS actualizado y HTTPS activo en los 3 nombres (`@`, `www`, `fundacion`)
- [ ] `https://zenaayoub.com/donate` redirige a la página de donar de la fundación
- [ ] El correo sigue funcionando (enviar y recibir una prueba)
- [ ] Enlaces de Stripe configurados (ver `docs/STRIPE.md`) y donación de prueba hecha
- [ ] Endpoint de formularios configurado y un envío de prueba recibido
- [ ] Sitemaps enviados en Google Search Console
- [ ] Suscripción de Squarespace cancelada **solo después** de verificar todo lo anterior
