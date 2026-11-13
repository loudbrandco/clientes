// Configuración compartida entre los dos sitios.
// Las URLs se pueden sobrescribir con variables de entorno al compilar
// (útil para probar en un dominio temporal antes de conectar el DNS real).

// Modo revisión (sitio de prueba en otro dominio): todas las páginas llevan noindex.
export const STAGING = process.env.STAGING === '1';

export const ZENA_URL = process.env.ZENA_URL || 'https://www.zenaayoub.com';
export const FUNDACION_URL = process.env.FUNDACION_URL || 'https://theadventurerscf.org';

// ID de Google Analytics 4 por sitio. Vacío = no se carga ningún script de analítica.
export const GA_ZENA = process.env.GA_ZENA || '';
export const GA_FUNDACION = process.env.GA_FUNDACION || '';

// Endpoint para formularios (por ejemplo Formspree: https://formspree.io/f/xxxxxx).
// Vacío = los formularios abren el correo del visitante con los datos ya escritos (mailto).
export const FORM_ENDPOINT_ZENA = process.env.FORM_ENDPOINT_ZENA || '';
export const FORM_ENDPOINT_FUNDACION = process.env.FORM_ENDPOINT_FUNDACION || '';

// Enlaces verificados en la auditoría del 28-oct-2026 (no inventar nuevos).
export const LINKS = {
  instagram: 'https://www.instagram.com/lasaventurasenturin/',
  youtube: 'https://www.youtube.com/@LasAventurasenTurin',
  spotify: 'https://open.spotify.com/show/1pL3XM3JO97d6JHUPBwpYV',
  appleBooks: 'https://books.apple.com/us/audiobook/las-aventuras-en-turin/id1813115298',
  tunein: 'https://tunein.com/radio/Stream-Zena-Ayoub-a169994/',
  tienda: 'https://lasaventurasenturin.square.site/',
  tena: 'https://www.tena-cundinamarca.gov.co',
  emailZena: 'info@zenaayoub.com',
  emailFundacion: 'Theadventurers@zenaayoub.com',
};
