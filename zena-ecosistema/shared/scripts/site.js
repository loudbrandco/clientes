// Interacciones compartidas: revelaciones al desplazarse, encabezado, menú móvil,
// formularios sin servidor y consentimiento de analítica. Sin dependencias.

document.documentElement.classList.remove('no-js');

// 1. Revelaciones al desplazarse ------------------------------------------------
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  : null;
document.querySelectorAll('[data-reveal], [data-split]').forEach((el) => {
  if (io) io.observe(el); else el.classList.add('is-in');
});

// 2. Encabezado: estado al hacer scroll y ocultar al bajar ----------------------
const header = document.querySelector('[data-header]');
if (header) {
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    header.classList.toggle('is-hidden', y > 400 && y > last && !document.body.classList.contains('nav-open'));
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 3. Menú móvil ------------------------------------------------------------------
const toggle = document.querySelector('[data-nav-toggle]');
const drawer = document.querySelector('[data-nav-drawer]');
if (toggle && drawer) {
  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    drawer.toggleAttribute('inert', !open);
  };
  drawer.setAttribute('inert', '');
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// 4. Formularios: envía a un endpoint (Formspree u otro) o abre el correo ----------
document.querySelectorAll('form[data-form]').forEach((form) => {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const endpoint = form.dataset.endpoint;
    const to = form.dataset.mailto;
    if (!endpoint) {
      // Sin servidor: armamos un correo con los datos para que el visitante lo envíe.
      const lines = [];
      for (const [k, v] of data.entries()) if (k !== '_gotcha' && k !== 'consentimiento') lines.push(`${k}: ${v}`);
      const subject = encodeURIComponent(form.dataset.subject || 'Mensaje desde el sitio web');
      window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
      if (status) status.textContent = 'Abrimos tu aplicación de correo con el mensaje listo para enviar.';
      return;
    }
    if (status) status.textContent = 'Enviando…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (status) status.textContent = '¡Gracias! Recibimos tu mensaje y te responderemos pronto.';
      window.dispatchEvent(new CustomEvent('form:enviado', { detail: form.dataset.subject }));
    } catch {
      if (status) status.textContent = `No pudimos enviar el formulario. Escríbenos directamente a ${to}.`;
    }
  });
});

// 5. Consentimiento de cookies + Google Analytics 4 (solo si hay ID configurado) --
const gaId = document.documentElement.dataset.ga;
const consentBox = document.querySelector('[data-consent]');
const KEY = 'consentimiento-analitica';
const loadGA = () => {
  if (!gaId || window.gtag) return;
  const s = document.createElement('script');
  s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
};
if (gaId && consentBox) {
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch {}
  if (saved === 'si') loadGA();
  else if (saved !== 'no') consentBox.classList.add('is-open');
  consentBox.addEventListener('click', (e) => {
    const choice = e.target.closest('[data-consent-choice]')?.dataset.consentChoice;
    if (!choice) return;
    try { localStorage.setItem(KEY, choice); } catch {}
    consentBox.classList.remove('is-open');
    if (choice === 'si') loadGA();
  });
}

// Eventos de conversión (clics en donar, comprar, escuchar) → GA4 si está activo.
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track]');
  if (el && window.gtag) window.gtag('event', el.dataset.track, { label: el.dataset.trackLabel || el.textContent.trim() });
});
