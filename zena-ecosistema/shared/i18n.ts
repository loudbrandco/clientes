// Utilidades de idioma (español por defecto, inglés bajo /en).
// Cada página vive en src/pages/[...lang]/ y se genera dos veces: /ruta y /en/ruta.

export type Lang = 'es' | 'en';
export type Txt = { es: string; en: string };

/** Rutas a generar para cada página: español (sin prefijo) e inglés (/en). */
export const LANG_PATHS = [{ params: { lang: undefined } }, { params: { lang: 'en' } }];

export const getLang = (param?: string): Lang => (param === 'en' ? 'en' : 'es');

/** Elige el texto según el idioma: t(lang, 'Hola', 'Hello') o t(lang, { es, en }). */
export function t(lang: Lang, es: string | Txt, en?: string): string {
  if (typeof es === 'object') return es[lang];
  return lang === 'en' ? (en ?? es) : es;
}

/** Enlace interno en el idioma actual: href('en', '/donar') → '/en/donar'. */
export const href = (lang: Lang, path: string) => (lang === 'en' ? (path === '/' ? '/en/' : `/en${path}`) : path);

/** Enlace a otro sitio respetando el idioma: ext('en', 'https://x.com', '/donar') → 'https://x.com/en/donar'. */
export const ext = (lang: Lang, base: string, path = '/') => `${base}${lang === 'en' ? '/en' : ''}${path === '/' ? (lang === 'en' ? '/' : '') : path}`;

/** Ruta equivalente en el otro idioma (para el selector ES/EN y hreflang). */
export function altPath(pathname: string, to: Lang): string {
  const clean = pathname.replace(/^\/en(\/|$)/, '/');
  return to === 'en' ? (clean === '/' ? '/en/' : `/en${clean}`) : clean;
}
