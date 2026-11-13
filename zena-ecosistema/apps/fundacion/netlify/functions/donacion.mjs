// Crea una sesión de Stripe Embedded Checkout para una donación (única o mensual).
// Equivalente a public/api/donacion.php, para hosting en Netlify.
// La clave secreta se configura en Netlify como variable de entorno STRIPE_SECRET_KEY (nunca en el código).
// Se publica en /api/donacion (ver netlify.toml).

const MONEDA = 'usd';
const MINIMO = 500;        // US$ 5,00 en centavos
const MAXIMO = 1000000;    // US$ 10.000,00
const COMISION = 0.03;     // 3 % opcional para cubrir costos de procesamiento

const json = (status, data) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Método no permitido.' });

  // Solo se aceptan solicitudes del propio sitio
  const sitio = new URL(req.url).origin;
  const origen = req.headers.get('origin');
  if (origen && origen !== sitio) return json(403, { error: 'Origen no autorizado.' });

  const secreta = process.env.STRIPE_SECRET_KEY || '';
  if (!/^(sk|rk)_(live|test)_/.test(secreta)) return json(500, { error: 'Los pagos en línea aún no están configurados.' });

  let entrada = {};
  try { entrada = await req.json(); } catch {}
  const frecuencia = entrada.frecuencia === 'mensual' ? 'mensual' : 'unica';
  const monto = Math.round(Number(entrada.monto || 0) * 100);
  const cubrir = !!entrada.cubrirComision;
  const en = entrada.idioma === 'en';
  if (!(monto >= MINIMO && monto <= MAXIMO)) return json(400, { error: 'El monto debe estar entre US$ 5 y US$ 10.000.' });
  const total = cubrir ? Math.round(monto * (1 + COMISION)) : monto;

  const nombre = frecuencia === 'mensual'
    ? 'Donación mensual · The Adventurers Children Foundation'
    : 'Donación · The Adventurers Children Foundation';

  const p = new URLSearchParams({
    ui_mode: 'embedded',
    mode: frecuencia === 'mensual' ? 'subscription' : 'payment',
    return_url: `${sitio}${en ? '/en' : ''}/gracias/?sesion={CHECKOUT_SESSION_ID}`,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': MONEDA,
    'line_items[0][price_data][unit_amount]': String(total),
    'line_items[0][price_data][product_data][name]': nombre,
    'line_items[0][price_data][product_data][description]': 'Educación ambiental y experiencias familiares en Tena, Cundinamarca.',
    'metadata[frecuencia]': frecuencia,
    'metadata[monto_base_centavos]': String(monto),
    'metadata[cubre_comision]': cubrir ? 'si' : 'no',
    locale: en ? 'en' : 'es',
  });
  if (frecuencia === 'mensual') {
    p.set('line_items[0][price_data][recurring][interval]', 'month');
    p.set('subscription_data[metadata][origen]', 'sitio-web');
  } else {
    p.set('submit_type', 'donate');
    p.set('customer_creation', 'always');
    p.set('payment_intent_data[description]', nombre);
    p.set('payment_intent_data[metadata][origen]', 'sitio-web');
  }

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(secreta + ':').toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Stripe-Version': '2024-06-20' },
    body: p,
  });
  const datos = await r.json().catch(() => ({}));
  if (!r.ok || !datos.client_secret) {
    console.error('Stripe:', JSON.stringify(datos));
    return json(502, { error: 'No pudimos iniciar el pago. Intenta de nuevo en unos minutos.' });
  }
  return json(200, { clientSecret: datos.client_secret });
};
