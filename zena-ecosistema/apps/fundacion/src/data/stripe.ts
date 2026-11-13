// =====================================================================
// DONACIONES CON STRIPE — PAGO DIRECTO EN LA PÁGINA (Embedded Checkout)
// =====================================================================
// El formulario de pago de Stripe se muestra dentro de /donar. No hay redirección.
// Acepta tarjeta, Apple Pay y Google Pay; donación única o mensual; cualquier monto.
//
// Solo hay que completar la CLAVE PUBLICABLE (empieza por pk_live_ o pk_test_).
// Es pública por diseño: puede ir en el código sin riesgo.
// La CLAVE SECRETA (sk_...) va solo en el servidor; ver docs/STRIPE.md.
// =====================================================================

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.PUBLIC_STRIPE_KEY || '';

// Servicio que crea la sesión de pago.
//  · Netlify: /api/donacion (función netlify/functions/donacion.mjs) → se define con PUBLIC_STRIPE_ENDPOINT
//  · Hosting con PHP: ../api/donacion.php (relativo a /donar/, funciona también en subcarpetas)
export const STRIPE_ENDPOINT = import.meta.env.PUBLIC_STRIPE_ENDPOINT || '../api/donacion.php';

export const MONEDA = 'USD';
export const MONTOS = [10, 20, 30, 40]; // Montos sugeridos (los mismos del sitio anterior)
export const MONTO_MINIMO = 5;
export const COMISION = 0.03; // opción "cubrir el 3 % de comisión", como en el sitio anterior

// Portal de clientes de Stripe para que donantes mensuales cancelen o cambien su donación.
export const STRIPE_PORTAL = '';
