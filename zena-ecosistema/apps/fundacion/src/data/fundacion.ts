// Contenido de The Adventurers Children Foundation, en español e inglés.
// Textos en español tomados del sitio original (zenaayoub.com/the-adventurers-children-foundation
// y portada de zenaayoub.com). El inglés es traducción fiel de esos textos.
// Datos externos verificados: Semana (8-abr-2026), cascada El Tambo; El País (14-mar-2026), libro.
import type { Txt } from '../../../../shared/i18n';

const T = (es: string, en: string): Txt => ({ es, en });

export const certificada = T('Fundación certificada y registrada 501(c)(3)', 'Certified and registered 501(c)(3) foundation');

export const puente = [
  T('Somos un puente entre continentes.', 'We are a bridge between continents.'),
  T('Entre empresas y comunidades.', 'Between companies and communities.'),
  T('Entre familias y naturaleza.', 'Between families and nature.'),
  T('Entre educación y acción.', 'Between education and action.'),
];
export const futuro = T(
  'Porque cuando una familia vive una aventura con propósito, no solo crea recuerdos; crea futuro.',
  'Because when a family lives an adventure with purpose, it doesn’t just create memories; it creates a future.',
);

// Portada de zenaayoub.com
export const origen = T('Lo que comenzó como historias para formar valores, hoy se convierte en acción real.', 'What began as stories to build values is now becoming real action.');
export const dondeTrabajamos = T(
  'Nuestra fundación trabaja principalmente en Tena, Cundinamarca (Colombia), desarrollando proyectos ecológicos, educación ambiental y actividades al aire libre que fortalecen la conexión familiar y fomentan el uso consciente de la tecnología.',
  'Our foundation works mainly in Tena, Cundinamarca (Colombia), developing ecological projects, environmental education and outdoor activities that strengthen family bonds and encourage the mindful use of technology.',
);
export const turinPueblo = T(
  '¿Sabías que este es el pueblo donde realmente está ubicado Las Aventuras en Turín en Colombia, y es aquí donde desarrollamos nuestros programas?',
  'Did you know this is the town in Colombia where Las Aventuras en Turín really takes place, and where we run our programs?',
);

export const porQue = [
  T('Existimos porque la conservación del medio ambiente comienza en casa.', 'We exist because caring for the environment begins at home.'),
  T(
    'Creemos que las familias no necesitan más regalos materiales; necesitan experiencias con sentido; experiencias que enseñen a cuidar la naturaleza, proteger el planeta donde vivimos y crear recuerdos que formen conciencia y valores duraderos.',
    'We believe families don’t need more material gifts; they need meaningful experiences: experiences that teach them to care for nature, protect the planet we live on and create memories that build awareness and lasting values.',
  ),
];
export const educacion = T(
  'Sabemos que la educación más poderosa no se enseña con discursos: se vive a través de experiencias.',
  'We know the most powerful education isn’t taught through speeches: it is lived through experiences.',
);

export const comoLoHacemos = [
  T('Reconectan a padres e hijos con la naturaleza', 'Reconnect parents and children with nature'),
  T('Promueven el uso consciente y equilibrado de la tecnología', 'Promote a mindful, balanced use of technology'),
  T('Transforman eventos en impacto ambiental real', 'Turn events into real environmental impact'),
  T('Financian y apoyan proyectos ecológicos en Tena, Cundinamarca', 'Fund and support ecological projects in Tena, Cundinamarca'),
];

export const aliadosTexto = T(
  'Con el apoyo de organizaciones privadas, la Alcaldía del municipio de Tena, Cundinamarca, y fundaciones aliadas como la Reserva Natural Tenasuca, creamos programas sostenibles de conservación y educación ambiental.',
  'With the support of private organizations, the Municipality of Tena, Cundinamarca, and partner foundations such as the Tenasuca Nature Reserve, we create sustainable conservation and environmental education programs.',
);
export const aliados = ['Alcaldía de Tena, Cundinamarca', 'Reserva Natural Tenasuca'];

export const activamos = [
  T('Voluntariado corporativo', 'Corporate volunteering'),
  T('Alianzas estratégicas público-privadas', 'Strategic public-private partnerships'),
  T('Participación comunitaria', 'Community participation'),
  T('Redes internacionales de familias conscientes', 'International networks of mindful families'),
];

export const movilizamos = [T('No organizamos eventos.', 'We don’t organize events.'), T('Movilizamos comunidades.', 'We mobilize communities.')];

// «Qué hacemos» del sitio original → programas
export const programas = [
  { slug: 'experiencias-familiares', img: 'fundacion-aros-ninos', titulo: T('Experiencias familiares con impacto ambiental', 'Family experiences with environmental impact'), texto: T('Organizamos experiencias familiares con impacto ambiental, que reconectan a padres e hijos con la naturaleza.', 'We organize family experiences with environmental impact that reconnect parents and children with nature.') },
  { slug: 'educacion-ambiental', img: 'fundacion-lectura-ninos', titulo: T('Proyectos ecológicos y educativos', 'Ecological and educational projects'), texto: T('Desarrollamos proyectos ecológicos y educativos, y promovemos el uso consciente y equilibrado de la tecnología.', 'We develop ecological and educational projects, and promote a mindful, balanced use of technology.') },
  { slug: 'conservacion-reforestacion', img: 'ilus-boceto-montana', titulo: T('Jornadas de conservación y reforestación', 'Conservation and reforestation days'), texto: T('Promovemos jornadas de conservación y reforestación en Tena, Cundinamarca.', 'We promote conservation and reforestation days in Tena, Cundinamarca.') },
  { slug: 'fuentes-hidricas', img: '/img/proyecto-fuentes.svg', titulo: T('Protección de fuentes hídricas', 'Protecting water sources'), texto: T('Apoyamos la protección de fuentes hídricas.', 'We support the protection of water sources.') },
  { slug: 'voluntariado-corporativo', img: 'ilus-finca', titulo: T('Voluntariado corporativo', 'Corporate volunteering'), texto: T('Implementamos programas de voluntariado corporativo.', 'We run corporate volunteering programs.') },
  { slug: 'comunidades-internacionales', img: '/img/proyecto-el-tambo.svg', titulo: T('Comunidades internacionales y causas locales', 'International communities, local causes'), texto: T('Conectamos comunidades internacionales con causas locales.', 'We connect international communities with local causes.') },
];

// Proyectos (datos externos verificados)
export const proyectos = [
  {
    slug: 'cascada-el-tambo', img: '/img/proyecto-el-tambo.svg',
    estado: T('Prioridad', 'Priority'),
    titulo: T('Protección de la cascada El Tambo', 'Protecting the El Tambo waterfall'),
    texto: T(
      'Una de las prioridades de la fundación es proteger la cascada El Tambo, en Tena, señalada como la única fuente de agua potable de la zona, que abastece a La Mesa, Tena y Anapoima.',
      'One of the foundation’s priorities is protecting the El Tambo waterfall in Tena, described as the area’s only source of drinking water, supplying La Mesa, Tena and Anapoima.',
    ),
    fuente: { medio: 'Semana', fecha: T('8 de abril de 2026', 'April 8, 2026'), url: 'https://www.semana.com/cultura/libros/articulo/zena-ayoub-presento-la-tercera-entrega-de-las-aventuras-en-turin-un-libro-que-celebra-la-imaginacion-y-la-alegria-de-estar-en-familia/202633/' },
  },
  {
    slug: 'fuentes-hidricas-familias', img: '/img/proyecto-fuentes.svg',
    estado: T('Prioridad', 'Priority'),
    titulo: T('Cuidado de fuentes hídricas con familias locales', 'Caring for water sources with local families'),
    texto: T(
      'La fundación trabaja con familias locales en el cuidado de las fuentes hídricas de Tena, Cundinamarca.',
      'The foundation works with local families to care for the water sources of Tena, Cundinamarca.',
    ),
    fuente: { medio: 'Semana', fecha: T('8 de abril de 2026', 'April 8, 2026'), url: 'https://www.semana.com/cultura/libros/articulo/zena-ayoub-presento-la-tercera-entrega-de-las-aventuras-en-turin-un-libro-que-celebra-la-imaginacion-y-la-alegria-de-estar-en-familia/202633/' },
  },
];

// Apoyo del libro (El País, 14-mar-2026)
export const apoyoLibro = {
  texto: T('Las ganancias del libro Las Mascotas de Michel y María apoyan el trabajo de la fundación.', 'Proceeds from the book Las Mascotas de Michel y María support the foundation’s work.'),
  fuente: { medio: 'El País (Cali)', fecha: T('14 de marzo de 2026', 'March 14, 2026'), url: 'https://www.elpais.com.co/entretenimiento/zena-ayoub-lanza-las-mascotas-de-michel-y-maria-un-refugio-literario-frente-a-la-hiperestimulacion-digital-1414.html' },
};

export const cierre = [
  T('Cada aventura se convierte en acción.', 'Every adventure becomes action.'),
  T('Cada experiencia se convierte en conservación.', 'Every experience becomes conservation.'),
  T('Cada familia se convierte en agente de cambio.', 'Every family becomes an agent of change.'),
];

// Biografía (zenaayoub.com/sobre-zena, resumida sin añadir datos)
export const zena = [
  T(
    'Profesional en Ciencia Política y Gobierno de la Universidad del Rosario (Bogotá, Colombia), con más de 15 años de experiencia en logística, marketing estratégico, relaciones públicas y gestión de proyectos con impacto social y cultural. Cuenta con énfasis en Gerencia y un diplomado en Cooperación Internacional para el Desarrollo Sostenible.',
    'Political Science and Government graduate of Universidad del Rosario (Bogotá, Colombia), with more than 15 years of experience in logistics, strategic marketing, public relations and the management of projects with social and cultural impact. She holds an emphasis in Management and a diploma in International Cooperation for Sustainable Development.',
  ),
  T(
    'Es autora y productora de Las Aventuras en Turín y fundadora de The Adventurers Children Foundation, organización sin fines de lucro dedicada a promover experiencias educativas al aire libre, fortalecer los lazos familiares y fomentar el liderazgo consciente en la infancia.',
    'She is the author and producer of Las Aventuras en Turín and the founder of The Adventurers Children Foundation, a nonprofit dedicated to promoting outdoor educational experiences, strengthening family bonds and fostering mindful leadership in childhood.',
  ),
  T(
    'La fundación amplía el propósito social del proyecto narrativo, transformando la inspiración en acción concreta y acceso a experiencias significativas para más niños y comunidades.',
    'The foundation extends the social purpose of the storytelling project, turning inspiration into concrete action and access to meaningful experiences for more children and communities.',
  ),
];

// Ubicación (dato del cliente)
export const MIAMI = { lat: 25.7617, lng: -80.1918 };
// Tena: coordenadas del mapa de la página de contacto del sitio original
export const TENA = { lat: 4.6746875, lng: -74.3745625 };
export const sedes = [
  { id: 'tena', ...TENA, foto: 'fundacion-sede-tena', titulo: 'Tena, Cundinamarca', pais: T('Colombia', 'Colombia'), rol: T('Casa de la fundación · donde desarrollamos nuestros programas', 'Foundation house · where we run our programs'),
    mapa: `https://www.google.com/maps?q=${TENA.lat},${TENA.lng}&z=16&hl=es&output=embed`, enlace: `https://www.google.com/maps/search/?api=1&query=${TENA.lat}%2C${TENA.lng}` },
  { id: 'miami', ...MIAMI, foto: null, titulo: 'Miami, Florida', pais: T('Estados Unidos', 'United States'), rol: T('Sede en Estados Unidos', 'United States office'),
    mapa: 'https://www.google.com/maps?q=Miami,+FL&z=11&hl=es&output=embed', enlace: 'https://www.google.com/maps/search/?api=1&query=Miami%2C+FL' },
];

// Equipo (textos entregados por la fundación, nov-2026). Orden indicado por Zena: Zena, su hermana Nawal, Masha, Guiovanna.
export const equipo = [
  {
    id: 'nawal-saieh', nombre: 'Nawal Saieh', foto: 'equipo-nawal-saieh', widths: [400, 800],
    rol: T('Miembro de la junta directiva · Filántropa', 'Board member · Philanthropist'),
    bio: [
      T('Nawal Saieh es filántropa, madre y defensora del bienestar y la educación de los niños, radicada en Miami. Nacida en Colombia, llegó a Estados Unidos hace 15 años para abrirse camino en la industria de la moda.',
        'Nawal Saieh is a Miami-based philanthropist, mother, and dedicated advocate for children’s well-being and education. Originally from Colombia, she moved to the United States 15 years ago to pursue opportunities in the fashion industry.'),
      T('Antes de mudarse a Estados Unidos, Nawal y su hermana trabajaron juntas en Colombia en iniciativas para desarrollar programas de protección ambiental y crear conciencia sobre la importancia de preservar los recursos naturales. Esas primeras experiencias formaron su compromiso con la responsabilidad social, el trabajo con la comunidad y el deseo de generar un impacto positivo.',
        'Before moving to the United States, Nawal and her sister collaborated on initiatives in Colombia aimed at developing environmental protection programs and raising awareness about the importance of preserving natural resources. These early experiences helped shape her commitment to social responsibility, community engagement, and making a positive impact on the world around her.'),
      T('Hoy canaliza esa pasión en iniciativas que apoyan a los niños y les abren oportunidades para su futuro. Como miembro de la junta directiva de The Adventurers Children Foundation, apoya el trabajo de la fundación para mejorar la vida de los niños, ampliar su acceso a oportunidades y ayudarlos a construir un futuro mejor. Cree que todo niño merece la oportunidad de prosperar, sin importar sus circunstancias.',
        'Today, Nawal continues to channel that passion into initiatives that support children and create meaningful opportunities for their future. As a board member of The Adventurers Children Foundation, she is committed to supporting the foundation’s work to improve children’s lives, expand access to opportunities, and help young people build brighter futures. She believes that every child deserves the chance to thrive, regardless of their circumstances.'),
      T('Junto a su esposo, Steve, apoya iniciativas filantrópicas que promueven la educación, la creatividad y las oportunidades para las nuevas generaciones. Orgullosa madre de dos hijos, cree profundamente en la familia, la compasión y en devolver a la comunidad, y mantiene su compromiso de dejar una huella duradera en la vida de los niños y de sus comunidades.',
        'Together with her husband, Steve, she supports philanthropic efforts that promote education, creativity, and opportunities for future generations. A proud mother of two, Nawal believes deeply in the importance of family, compassion, and giving back. She remains committed to making a lasting difference in the lives of children and the communities they call home.'),
    ],
  },
  {
    id: 'masha-gutic', nombre: 'Masha Gutic', foto: 'equipo-masha-gutic', widths: [400, 800],
    rol: T('Humanitaria y defensora de la niñez', 'Humanitarian & children’s advocate'),
    bio: [
      T('Masha Gutic nació en Rusia y vive en Estados Unidos desde hace 19 años. Su origen internacional, sus experiencias y su trayectoria profesional han formado sus valores y fortalecido su convicción en la compasión, la generosidad y la importancia de devolver a la comunidad.',
        'Masha Gutic was born in Russia and has called the United States home for the past 19 years. Her international background, diverse experiences, and professional journey have shaped her values and strengthened her belief in compassion, generosity, and the importance of giving back.'),
      T('Durante su carrera como modelo trabajó con marcas reconocidas internacionalmente en moda y belleza, como Estée Lauder, L’Oréal, Dior y la revista Vogue. Esa experiencia le permitió conectar con personas de distintas culturas, ampliar su perspectiva y usar su experiencia e influencia en causas con sentido.',
        'Throughout her modeling career, Masha had the opportunity to work with internationally recognized names in fashion and beauty, including Estée Lauder, L’Oréal, Dior, and Vogue magazine. Her experience in the fashion industry allowed her to connect with people from different cultures and backgrounds, broadening her perspective and inspiring her to use her experience and influence for meaningful causes.'),
      T('Más allá de la moda, ha demostrado un profundo compromiso con el trabajo humanitario, en especial con los niños y las personas vulnerables. Durante tres años trabajó con Unitas, una organización benéfica dedicada a combatir la trata de personas, crear conciencia y proteger a quienes están en riesgo.',
        'Beyond the world of fashion, Masha has demonstrated a deep commitment to humanitarian work, particularly supporting children and vulnerable individuals. For three years, she worked with Unitas, a charitable organization dedicated to combating human trafficking, raising awareness, and protecting those at risk. This experience further strengthened her passion for advocacy and making a positive impact on the lives of others.'),
      T('Con un lugar especial en su corazón para los niños, sigue apoyando iniciativas enfocadas en su seguridad, su bienestar y sus oportunidades. Cree que todo niño merece crecer rodeado de amor, protección y esperanza.',
        'With a special place in her heart for children, Masha continues to support charitable initiatives focused on their safety, well-being, and opportunities for a brighter future. She believes that every child deserves to grow up surrounded by love, protection, and hope.'),
    ],
  },
  {
    id: 'guiovanna-rojas', nombre: 'Guiovanna Rojas', foto: 'equipo-guiovanna-rojas', widths: [400],
    rol: T('Filántropa · Colaboradora', 'Philanthropist · Collaborator'),
    bio: [
      T('Guiovanna Rojas nació en Bogotá, Colombia. Tiene 42 años y reside en Miami desde hace 20 años. Estudió Comunicación Social y conserva un profundo vínculo con sus raíces colombianas.',
        'Guiovanna Rojas was born in Bogotá, Colombia. She is 42 years old and has lived in Miami for 20 years. She studied Social Communication and keeps a deep bond with her Colombian roots.'),
      T('Su vocación filantrópica nace del deseo de contribuir al bienestar de los demás. A lo largo de los años ha colaborado con distintas fundaciones en Colombia que trabajan en favor de los niños, apoyando iniciativas orientadas a su bienestar y a brindarles mejores oportunidades.',
        'Her philanthropic calling comes from a desire to contribute to the well-being of others. Over the years she has worked with several foundations in Colombia that serve children, supporting initiatives aimed at their well-being and better opportunities.'),
      T('Ahora inicia una nueva etapa de compromiso social al sumarse como colaboradora a The Adventurers Children Foundation, una organización dedicada a la educación ambiental y la conservación, que conecta a niños, familias y comunidades. A través de este nuevo proyecto, busca seguir aportando a causas que unen el bienestar de la infancia con el cuidado del entorno.',
        'She now begins a new chapter of social commitment by joining The Adventurers Children Foundation as a collaborator, an organization dedicated to environmental education and conservation that connects children, families and communities. Through this new project, she seeks to keep supporting causes that bring together children’s well-being and care for the environment.'),
      T('La empatía, la solidaridad y el amor por Colombia inspiran su compromiso de contribuir a un futuro con más oportunidades para las nuevas generaciones.',
        'Empathy, solidarity and her love for Colombia inspire her commitment to a future with more opportunities for new generations.'),
    ],
  },
];
