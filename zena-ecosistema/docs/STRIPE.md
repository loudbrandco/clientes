# Donaciones con Stripe: pago directo en la página

**Cómo funciona:** en `/donar`, el donante elige la frecuencia (única o mensual), el monto (US$ 10, 20, 30, 40 o el que quiera, desde US$ 5) y, si quiere, cubre el 3 % de comisión. Al hacer clic, el **formulario de pago de Stripe aparece dentro de la misma tarjeta**, sin salir del sitio. Acepta tarjeta, Apple Pay y Google Pay. Al terminar, Stripe lo lleva a `/gracias` y le envía el recibo por correo.

```
Navegador ──(monto, frecuencia)──▶ /api/donacion.php ──(clave secreta)──▶ Stripe
Navegador ◀──────────(client_secret)────────────────┘
Navegador ──(datos de tarjeta, directo a Stripe)──▶ Stripe   ← la fundación nunca ve la tarjeta
```

**Archivos:**
- `apps/fundacion/src/pages/donar.astro`: el formulario.
- `apps/fundacion/public/api/donacion.php`: crea la sesión de pago. Requiere PHP 7.4+ con cURL, estándar en GoDaddy cPanel.
- `apps/fundacion/src/data/stripe.ts`: montos sugeridos, mínimo y comisión.

No hay que crear productos, precios ni Payment Links en Stripe: el monto se envía en cada pago.

## Configuración (20 minutos)

### 1. Obtener las claves
En el Dashboard de Stripe (la cuenta que hoy recibe las donaciones de Squarespace) entra a **Desarrolladores → Claves de API**:
- **Clave publicable** (`pk_live_...`). Es pública y va en el sitio.
- **Clave secreta** (`sk_live_...`). **Nunca** se pega en el código, en el chat ni en un correo.

Recomendado: haz primero todo con las claves de **modo de prueba** (`pk_test_` / `sk_test_`) y paga con la tarjeta de prueba `4242 4242 4242 4242`.

### 2. Clave publicable → sitio
Al compilar se define la variable `PUBLIC_STRIPE_KEY`:
- En local: archivo `.env` en la raíz (copia de `.env.example`).
- En GitHub Actions: *secret* `PUBLIC_STRIPE_KEY`.
- En Vercel: *Settings → Environment Variables*.

Sin clave, `/donar` muestra la vista previa del formulario y no cobra.

### 3. Clave secreta → servidor (solo Miguel Alejandro)
En el **Administrador de archivos de cPanel**, en la carpeta personal (la que **contiene** `public_html`, **no dentro** de ella), crea `stripe-secreto.php` con:
```php
<?php return 'TU-CLAVE-SECRETA-sk_live';
```
Permisos del archivo: `600`. Al quedar fuera de `public_html`, nadie puede descargarlo desde internet.
*Alternativa:* definir la variable de entorno `STRIPE_SECRET_KEY` si el hosting lo permite.

### 4. Comprobar
1. Abre `https://theadventurerscf.org/donar`, elige US$ 10 y continúa. Debe aparecer el formulario de Stripe.
2. Paga con la tarjeta de prueba (en modo prueba) o con una real, y reembólsala desde el Dashboard.
3. Verifica que llegue el recibo y que la página final sea `/gracias`.
4. Repite con «Mensual» y comprueba en **Stripe → Suscripciones** que se creó la suscripción.

### 5. Recomendado en Stripe
- **Configuración → Correos → Pagos exitosos:** activar los recibos automáticos.
- **Configuración → Facturación → Portal de clientes:** activarlo y copiar el enlace en `STRIPE_PORTAL` (`stripe.ts`), para que los donantes mensuales cancelen solos.
- **Configuración → Branding:** logo y color `#1D3A2B`, para que el formulario se vea con la identidad de la fundación.
- **Configuración → Métodos de pago:** activar Apple Pay y Google Pay, y registrar el dominio `theadventurerscf.org` para Apple Pay.

## Protecciones incluidas
- Monto validado en el servidor (US$ 5 a US$ 10.000); el navegador no puede alterar el cobro.
- Solo se aceptan solicitudes que vienen del propio sitio.
- La clave secreta nunca llega al navegador.

## Métricas a seguir
- **Conversión de /donar** = pagos completados ÷ visitas (meta inicial: 2–4 %). Al no salir del sitio, debería ser mayor que con redirección.
- **Donación promedio**, **% de donaciones mensuales** y **% que cubre la comisión**. Los dos últimos son la palanca de ingreso recurrente.
- **Churn mensual** de donantes recurrentes.
- En GA4: `inicio_pago` (se abrió el formulario) frente a `donacion_completada` (llegó a /gracias). La diferencia es el abandono dentro del pago.
