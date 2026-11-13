// Contenido verificado del universo editorial (auditoría 28-oct-2026), en español e inglés.
// Fuentes: zenaayoub.com, Amazon, Apple Books, Spotify, TuneIn y prensa publicada.
import { LINKS } from '../../../../shared/sites.mjs';
import type { Txt } from '../../../../shared/i18n';

export type Formato = { tipo: Txt; plataforma: string; url: string };

export const libros: { slug: string; titulo: string; idioma: Txt; orden: Txt; portada: string; resumen: Txt; formatos: Formato[] }[] = [
  {
    slug: 'las-aventuras-en-turin',
    titulo: 'Las Aventuras en Turín',
    idioma: { es: 'Español', en: 'Spanish' },
    orden: { es: 'Libro 1 de la serie', en: 'Book 1 of the series' },
    portada: 'portada-las-aventuras-en-turin',
    resumen: {
      es: 'Relatos de amistad, valentía y amor familiar: rescatar un loro atrapado en un árbol, organizar un picnic improvisado, buscar tesoros escondidos o simplemente compartir en familia.',
      en: 'Stories of friendship, courage and family love: rescuing a parrot stuck in a tree, putting together an impromptu picnic, hunting for hidden treasure or simply spending time as a family.',
    },
    formatos: [
      { tipo: { es: 'Tapa blanda', en: 'Paperback' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FH7NF9P4' },
      { tipo: { es: 'Tapa dura', en: 'Hardcover' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FJFD7NYX' },
      { tipo: { es: 'Kindle', en: 'Kindle' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FH89BNZ1' },
    ],
  },
  {
    slug: 'turin-adventures',
    titulo: 'Turin Adventures',
    idioma: { es: 'Inglés', en: 'English' },
    orden: { es: 'Edición en inglés del libro 1', en: 'English edition of book 1' },
    portada: 'portada-turin-adventures',
    resumen: {
      es: 'La edición en inglés de Las Aventuras en Turín, para familias bilingües y lectores de habla inglesa.',
      en: 'The English edition of Las Aventuras en Turín, for bilingual families and English-speaking readers.',
    },
    formatos: [
      { tipo: { es: 'Tapa blanda', en: 'Paperback' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FH7HBPR2' },
      { tipo: { es: 'Tapa dura', en: 'Hardcover' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FJFJM8X6' },
      { tipo: { es: 'Kindle', en: 'Kindle' }, plataforma: 'Amazon', url: 'https://www.amazon.com/dp/B0FH7PN8RG' },
    ],
  },
  {
    slug: 'las-mascotas-de-michel-y-maria',
    titulo: 'Las Mascotas de Michel y María',
    idioma: { es: 'Español', en: 'Spanish' },
    orden: { es: 'Tercer libro de la serie', en: 'Third book of the series' },
    portada: 'portada-las-mascotas',
    resumen: {
      es: 'Descubre cómo el amor por los animales cambia la vida de las protagonistas. Las ganancias del libro apoyan a The Adventurers Children Foundation.',
      en: 'Discover how the love of animals changes the lives of its young heroines. Proceeds from the book support The Adventurers Children Foundation.',
    },
    formatos: [
      { tipo: { es: 'Libro', en: 'Book' }, plataforma: 'Tienda oficial', url: 'https://lasaventurasenturin.square.site/product/las-mascotas-de-michel-y-mar-a/Z3S5K4JIBG3LZLCYOOWTYOJY' },
      { tipo: { es: 'Audiolibro', en: 'Audiobook' }, plataforma: 'TuneIn', url: LINKS.tunein },
    ],
  },
  {
    // Fuente: tienda oficial (lasaventurasenturin.square.site), nov-2026
    slug: 'navidad-en-turin',
    titulo: 'Navidad en Turín',
    idioma: { es: 'Español', en: 'Spanish' },
    orden: { es: 'Cuento de Navidad de la serie', en: 'Christmas story from the series' },
    portada: 'portada-navidad-en-turin',
    resumen: {
      es: 'Un cuento lleno de tradición y alegría familiar: María y toda su familia se reúnen para celebrar la Navidad; unos preparan la comida, otros decoran el árbol, rezan la novena, cantan villancicos y comparten una noche de amor y unión.',
      en: 'A story full of tradition and family joy: María and her whole family gather to celebrate Christmas; some cook, others decorate the tree, they pray the novena, sing carols and share a night of love and togetherness.',
    },
    formatos: [
      { tipo: { es: 'Libro', en: 'Book' }, plataforma: 'Tienda oficial', url: 'https://lasaventurasenturin.square.site/product/navidad-en-tur-n/3DK5QU4DKB44BUNDVXZVERVP' },
      { tipo: { es: 'Audiolibro', en: 'Audiobook' }, plataforma: 'TuneIn', url: LINKS.tunein },
    ],
  },
];

export const plataformasAudio = [
  { nombre: 'Spotify', url: LINKS.spotify, track: 'escuchar_spotify' },
  { nombre: 'Apple Books', url: LINKS.appleBooks, track: 'escuchar_apple' },
  { nombre: 'TuneIn', url: LINKS.tunein, track: 'escuchar_tunein' },
];

export const audiolibros = [
  { titulo: 'Las Aventuras en Turín', portada: 'portada-las-aventuras-en-turin', links: [{ nombre: 'Apple Books', url: LINKS.appleBooks }, { nombre: 'TuneIn', url: LINKS.tunein }] },
  { titulo: 'Las Mascotas de Michel y María', portada: 'portada-las-mascotas', links: [{ nombre: 'TuneIn', url: LINKS.tunein }] },
  { titulo: 'Navidad en Turín', portada: 'portada-navidad-en-turin', links: [{ nombre: 'TuneIn', url: LINKS.tunein }] },
];

// Embebidos oficiales
export const SPOTIFY_EMBED = 'https://open.spotify.com/embed/show/1pL3XM3JO97d6JHUPBwpYV?utm_source=generator';
export const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/videoseries?list=UUQ1lLlqB2Gl4mv24kf9wdew'; // videos del canal @LasAventurasenTurin

// Episodios publicados en Spotify (14-may-2025)
export const episodios = [
  { titulo: 'Las Aventuras en Turín', min: 2 },
  { titulo: 'La Luz Dorada', min: 3 },
  { titulo: 'El Baile de los Gallos', min: 4 },
  { titulo: 'Camino a la Laguna', min: 4 },
  { titulo: 'La Neblina de la Montaña', min: 3 },
  { titulo: 'María y el Toro', min: 3 },
];

// Prensa (zenaayoub.com/prensa). Los títulos se dejan en el idioma del medio.
export const prensa = [
  { medio: 'Semana', fecha: { es: '8 de abril de 2026', en: 'April 8, 2026' }, titulo: 'Zena Ayoub presentó la tercera entrega de «Las aventuras en Turín»', url: 'https://www.semana.com/cultura/libros/articulo/zena-ayoub-presento-la-tercera-entrega-de-las-aventuras-en-turin-un-libro-que-celebra-la-imaginacion-y-la-alegria-de-estar-en-familia/202633/' },
  { medio: 'El País (Cali)', fecha: { es: '14 de marzo de 2026', en: 'March 14, 2026' }, titulo: 'Zena Ayoub lanza Las Mascotas de Michel y María, un refugio literario frente a la hiperestimulación digital', url: 'https://www.elpais.com.co/entretenimiento/zena-ayoub-lanza-las-mascotas-de-michel-y-maria-un-refugio-literario-frente-a-la-hiperestimulacion-digital-1414.html' },
  { medio: 'Thunder MX (México)', fecha: null, titulo: 'Refugio de papel y calma: Zena Ayoub lanza el tercer volumen de Las Aventuras en Turín', url: 'https://thunder.mx/refugio-de-papel-y-calma-zena-ayoub-lanza-el-tercer-volumen-de-las-aventuras-en-turin-para-rescatar-la-infancia-de-las-pantallas/' },
  { medio: 'Artistas Valientes', fecha: null, titulo: 'Zena Ayoub presenta el tercer libro de Las aventuras en Turín', url: 'https://artistasvalientes.com/tendencias/zena-ayoub-presenta-el-tercer-libro-de-las-aventuras-en-turin-un-proyecto-para-estimular-la-imaginacion-de-los-ninos/' },
  { medio: 'Teleantioquia', fecha: null, titulo: 'Niños irritables y sin dormir bien: alertan por fenómeno creciente de fatiga sensorial', url: 'https://www.teleantioquia.co/estilo-de-vida/ninos-irritables-y-sin-dormir-bien-alertan-por-fenomeno-creciente-de-fatiga-sensorial-en-medellin-567835' },
  { medio: 'Hoy en Finalmente', fecha: null, titulo: 'Zena Ayoub nos contó su experiencia escribiendo cuentos para niños', url: 'https://www.youtube.com/watch?v=QSQZEaq-D-A' },
];
