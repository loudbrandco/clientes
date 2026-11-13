// Menú principal: solo tres entradas (indicación del cliente)
export const nav = [
  { path: '/sobre-zena', es: 'Quién soy', en: 'About me' },
  { path: '/las-aventuras-en-turin', es: 'Universo narrativo', en: 'Story universe' },
];

// Submenú de Las Aventuras en Turín (cada formato tiene su página)
export const turinSecciones = [
  { id: 'libros', path: '/las-aventuras-en-turin/libros', es: 'Libros', en: 'Books' },
  { id: 'audiolibros', path: '/las-aventuras-en-turin/audiolibros', es: 'Audiolibros', en: 'Audiobooks' },
  { id: 'video', path: '/las-aventuras-en-turin/video', es: 'Video', en: 'Video' },
] as const;
