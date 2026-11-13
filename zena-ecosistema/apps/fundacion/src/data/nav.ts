// Menú de la fundación (estructura aprobada por el cliente)
export const grupos = [
  { titulo: { es: 'Quiénes somos', en: 'About us' }, path: '/quienes-somos', links: [] as { path: string; es: string; en: string }[] },
  { titulo: { es: 'Qué hacemos', en: 'What we do' }, path: null, links: [
    { path: '/programas', es: 'Programas', en: 'Programs' },
    { path: '/proyectos', es: 'Proyectos', en: 'Projects' },
  ] },
  { titulo: { es: 'Participa', en: 'Get involved' }, path: null, links: [
    { path: '/donar', es: 'Donar', en: 'Donate' },
    { path: '/voluntariado', es: 'Voluntariado', en: 'Volunteer' },
    { path: '/alianzas', es: 'Alianzas empresariales', en: 'Corporate partnerships' },
  ] },
  { titulo: { es: 'Transparencia', en: 'Transparency' }, path: null, links: [
    { path: '/transparencia', es: 'Impacto y transparencia', en: 'Impact & transparency' },
    { path: '/informes', es: 'Informes y documentos', en: 'Reports & documents' },
    { path: '/preguntas-frecuentes', es: 'Preguntas frecuentes', en: 'FAQ' },
  ] },
  { titulo: { es: 'Contacto', en: 'Contact' }, path: '/contacto', links: [] },
];
export const UBICACION = { es: 'Miami, Florida · Estados Unidos', en: 'Miami, Florida · United States' };
