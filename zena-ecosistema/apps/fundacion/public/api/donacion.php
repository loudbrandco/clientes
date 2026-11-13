<?php
/**
 * Crea una sesión de Stripe Embedded Checkout para una donación (única o mensual).
 * El navegador recibe solo el "client_secret"; la clave secreta nunca sale del servidor.
 *
 * Requisitos: hosting con PHP 7.4+ y la extensión cURL (estándar en GoDaddy cPanel).
 * La clave secreta se lee, en este orden:
 *   1) variable de entorno STRIPE_SECRET_KEY
 *   2) archivo stripe-secreto.php en la carpeta personal del hosting (FUERA de public_html):
 *        <?php return 'sk_live_...';
 * Ver docs/STRIPE.md.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// --- Configuración -----------------------------------------------------------
// Dominios desde donde se permite iniciar un pago (definitivo y sitio de revisión)
const ORIGENES   = ['https://theadventurerscf.org', 'https://www.theadventurerscf.org', 'https://www.zenaayoub.com', 'https://loudbrandco.com', 'https://www.loudbrandco.com'];
const MONEDA     = 'usd';
const MINIMO     = 500;        // US$ 5,00 en centavos
const MAXIMO     = 1000000;    // US$ 10.000,00
const COMISION   = 0.03;       // 3 % para cubrir costos de procesamiento (opcional para el donante)

function responder(int $codigo, array $datos): void { http_response_code($codigo); echo json_encode($datos); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(405, ['error' => 'Método no permitido.']);

// Solo aceptamos solicitudes que vienen del propio sitio
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen && !in_array($origen, ORIGENES, true)) responder(403, ['error' => 'Origen no autorizado.']);

// Base del sitio según dónde esté instalado (raíz del subdominio o subcarpeta como /zena-fundacion)
$host = 'https://' . ($_SERVER['HTTP_HOST'] ?? 'theadventurerscf.org');
if (!in_array($host, ORIGENES, true)) $host = 'https://theadventurerscf.org';
$SITIO = rtrim($host . str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/api/x.php'))), '/');

// --- Clave secreta -----------------------------------------------------------
$secreta = getenv('STRIPE_SECRET_KEY') ?: '';
if (!$secreta) {
  foreach ([dirname(__DIR__, 3) . '/stripe-secreto.php', dirname(__DIR__, 2) . '/stripe-secreto.php'] as $f) {
    if (is_readable($f)) { $secreta = trim((string) include $f); break; }
  }
}
if (!preg_match('/^(sk|rk)_(live|test)_/', $secreta)) responder(500, ['error' => 'Los pagos en línea aún no están configurados.']);

// --- Datos de la donación ----------------------------------------------------
$entrada  = json_decode(file_get_contents('php://input'), true) ?: [];
$frecuencia = ($entrada['frecuencia'] ?? '') === 'mensual' ? 'mensual' : 'unica';
$monto    = (int) round(((float) ($entrada['monto'] ?? 0)) * 100);
$cubrir   = !empty($entrada['cubrirComision']);
$en       = ($entrada['idioma'] ?? '') === 'en';
if ($monto < MINIMO || $monto > MAXIMO) responder(400, ['error' => 'El monto debe estar entre US$ 5 y US$ 10.000.']);
$total = $cubrir ? (int) round($monto * (1 + COMISION)) : $monto;

$nombre = $frecuencia === 'mensual'
  ? 'Donación mensual · The Adventurers Children Foundation'
  : 'Donación · The Adventurers Children Foundation';

$params = [
  'ui_mode' => 'embedded',
  'mode' => $frecuencia === 'mensual' ? 'subscription' : 'payment',
  'return_url' => $SITIO . ($en ? '/en' : '') . '/gracias/index.html?sesion={CHECKOUT_SESSION_ID}',
  'line_items[0][quantity]' => 1,
  'line_items[0][price_data][currency]' => MONEDA,
  'line_items[0][price_data][unit_amount]' => $total,
  'line_items[0][price_data][product_data][name]' => $nombre,
  'line_items[0][price_data][product_data][description]' => 'Educación ambiental y experiencias familiares en Tena, Cundinamarca.',
  'metadata[frecuencia]' => $frecuencia,
  'metadata[monto_base_centavos]' => $monto,
  'metadata[cubre_comision]' => $cubrir ? 'si' : 'no',
  'locale' => $en ? 'en' : 'es',
];
if ($frecuencia === 'mensual') {
  $params['line_items[0][price_data][recurring][interval]'] = 'month';
  $params['subscription_data[metadata][origen]'] = 'sitio-web';
} else {
  $params['submit_type'] = 'donate';
  $params['customer_creation'] = 'always';
  $params['payment_intent_data[description]'] = $nombre;
  $params['payment_intent_data[metadata][origen]'] = 'sitio-web';
}

// --- Llamada a Stripe --------------------------------------------------------
$ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => http_build_query($params),
  CURLOPT_USERPWD => $secreta . ':',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 20,
  CURLOPT_HTTPHEADER => ['Stripe-Version: 2024-06-20'],
]);
$respuesta = curl_exec($ch);
$codigo = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$json = json_decode((string) $respuesta, true);
if ($codigo !== 200 || empty($json['client_secret'])) {
  error_log('Stripe: ' . $respuesta);
  responder(502, ['error' => 'No pudimos iniciar el pago. Intenta de nuevo en unos minutos.']);
}
responder(200, ['clientSecret' => $json['client_secret']]);
