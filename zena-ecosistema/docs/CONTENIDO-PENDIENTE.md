# Contenido pendiente y verificaciones antes de publicar

Regla del proyecto: **no se publica nada que no esté respaldado.** Esta es la lista de lo que falta, ordenada por prioridad.

## 🔴 Bloqueantes (antes de lanzar)
| # | Qué | Dónde se usa | Responsable |
|---|---|---|---|
| 1 | **Claves de Stripe**: publicable en `PUBLIC_STRIPE_KEY` y secreta en `~/stripe-secreto.php` del hosting | `/donar` | Fundación + Miguel Alejandro |
| 2 | **Endpoint de formularios** (Formspree u otro) | Variables `FORM_ENDPOINT_*` | Miguel Alejandro |
| 3 | **Soporte del estatus 501(c)(3):** EIN y carta de determinación del IRS | `/transparencia`, `/informes` | Fundación |
| 4 | **Datos legales de la entidad** (razón social, EIN/NIT, domicilio) para la política de datos | `/privacidad`, `/terminos` | Fundación + abogado |
| 5 | **Revisión legal** de privacidad y términos | `/privacidad`, `/terminos` | Abogado |
| 6 | **Autorización de imagen** de los niños de la foto de la jornada de 2026 (`jornada-2026`) | Inicio y `/historias` de la fundación | Fundación |

## 🟠 Importantes
| # | Qué | Nota |
|---|---|---|
| 7 | **Constancia de las alianzas** con la Alcaldía de Tena y la Reserva Natural Tenasuca | Hoy se mencionan solo como texto, tal como en el sitio anterior, sin logotipos. Para mostrar logotipos se necesita autorización escrita. |
| 8 | **Fotografías propias de Tena y de las jornadas**, con permisos | Hoy la fundación usa ilustraciones de los libros y una sola foto real. Se excluyeron 6 fotos de banco del sitio anterior. |
| 9 | **Portada oficial** de Las Mascotas de Michel y María | Hoy se muestra una portada tipográfica provisional. |
| 10 | **Enlace de compra directa** de Las Mascotas de Michel y María | Hoy se dirige a la tienda oficial (Square) y a TuneIn. |
| 11 | **Fecha y enlace** de las entrevistas en Despierta América y La FM | En `/diario` aparecen sin enlace. |
| 12 | **Fuente del dato de El Tambo** (única fuente de agua de La Mesa, Tena y Anapoima) | Proviene de Semana (8-abr-2026). Conviene respaldarlo con la Alcaldía o la CAR. |
| 13 | **Estado real de cada programa** | `apps/fundacion/src/data/fundacion.ts`. Solo «Experiencias familiares» aparece como *en ejecución*. |

## 🟢 Mejoras posteriores
- Primer **informe anual** con indicadores (familias, niños, jornadas, árboles, voluntarios, recursos).
- **Video** corto para el hero de Zena (formato horizontal y vertical, de 10 a 15 s).
- **Recursos descargables** para familias (guías y actividades).
- **Versión en inglés** de la fundación, para donantes internacionales del 501(c)(3).
- **Newsletter** (Mailchimp o Brevo) para nutrir donantes.

## Fuentes verificadas usadas en el sitio
- zenaayoub.com: inicio, sobre-zena, programs, the-adventurers-children-foundation, prensa, contact, donate (auditoría del 28-oct-2026).
- Amazon.com: fichas de *Las Aventuras en Turín* (ASIN B0FH7NF9P4, B0FJFD7NYX, B0FH89BNZ1) y *Turin Adventures* (B0FH7HBPR2, B0FJFJM8X6, B0FH7PN8RG).
- Apple Books: audiolibro id1813115298 · Spotify: programa *Las Aventuras en Turín* · TuneIn: perfil de Zena Ayoub.
- Prensa: El País (14-mar-2026), Semana (8-abr-2026), Thunder MX, Artistas Valientes, Teleantioquia, Hoy en Finalmente.

## Actualización 28-oct-2026 (indicaciones en video del cliente)
- Sitio de Zena: menú solo con Zena, Las Aventuras en Turín (pestañas Libros, Audiolibros y Video) y el acceso destacado a The Adventurers Children Foundation. Bilingüe ES/EN (/en/).
- Fundación: menú Quiénes somos · Qué hacemos (Programas, Proyectos) · Participa (Donar, Voluntariado, Alianzas) · Transparencia (Impacto y transparencia, Informes, Preguntas frecuentes) · Contacto. Bilingüe ES/EN.
- Sede: Miami, Florida, Estados Unidos (con mapa en Contacto). Programas en Tena, Cundinamarca.
- Logo de la fundación más grande (versión recortada sin márgenes) en ambos sitios.
- Proyectos con imagen: cascada El Tambo y fuentes hídricas (ilustraciones, marcadas como tales).
- Pendiente del cliente: informes y documentos para publicar en /informes; EIN y razón social para la política de privacidad; revisión legal de privacidad y términos; revisión de las traducciones al inglés.
