// ============================================================
// page-transitions.ts — Transiciones de página coordinadas
// Maneja: clicks, swipe táctil, teclado, dirección, háptico
// Requiere: ClientRouter de astro:transitions activo en el layout
// ============================================================

import { secciones } from '../data/secciones';

// === Determina el slug de la sección actual desde la URL ===
function obtenerSeccionActual(): string {
  const path = window.location.pathname.replace(/\/$/, '');
  const home = path === '' || path === '/';
  const seccion = secciones.find((s) => {
    if (home) return s.slug === 'portada';
    return s.href === path || s.href === path + '/';
  });
  return seccion?.slug || 'portada';
}

// === Navegar con dirección para que el CSS elija la animación ===
function navegar(url: string, direccion: 'forward' | 'back') {
  const html = document.documentElement;
  html.classList.remove('nav-forward', 'nav-back');
  html.classList.add(direccion === 'forward' ? 'nav-forward' : 'nav-back');

  // ClientRouter intercepta la navegación y dispara la View Transition
  window.location.href = url;
}

// === 1. Clicks en NavPaginas (data-navigate + data-nav-direction) ===
function initClickNav() {
  document.querySelectorAll('[data-navigate]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const enlace = e.currentTarget as HTMLAnchorElement;
      const direccion = enlace.dataset.navDirection as 'forward' | 'back';
      if (!direccion) return;

      e.preventDefault();
      navegar(enlace.href, direccion);
    });
  });
}

// === 2. Swipe horizontal (móvil) ===
function initSwipeNav() {
  const SWIPE_UMBRAL = 50;
  const SWIPE_TIEMPO_MAX = 400;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let tracking = false;

  document.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      tracking = true;
    },
    { passive: true }
  );

  document.addEventListener(
    'touchend',
    (e) => {
      if (!tracking) return;
      tracking = false;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const elapsed = Date.now() - startTime;

      if (Math.abs(deltaX) < SWIPE_UMBRAL) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      if (elapsed > SWIPE_TIEMPO_MAX) return;

      const slug = obtenerSeccionActual();
      const indice = secciones.findIndex((s) => s.slug === slug);

      if (deltaX < 0 && indice < secciones.length - 1) {
        navegar(secciones[indice + 1].href, 'forward');
      } else if (deltaX > 0 && indice > 0) {
        navegar(secciones[indice - 1].href, 'back');
      }
    },
    { passive: true }
  );
}

// === 3. Navegación por teclado (desktop) ===
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const slug = obtenerSeccionActual();
    const indice = secciones.findIndex((s) => s.slug === slug);

    if (e.key === 'ArrowRight' && indice < secciones.length - 1) {
      e.preventDefault();
      navegar(secciones[indice + 1].href, 'forward');
    } else if (e.key === 'ArrowLeft' && indice > 0) {
      e.preventDefault();
      navegar(secciones[indice - 1].href, 'back');
    }
  });
}

// === 4. Feedback háptico + limpieza + reset scroll tras transición ===
function initHaptic() {
  document.addEventListener('astro:after-swap', () => {
    // Resetear scroll al top de la nueva página
    window.scrollTo(0, 0);

    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    document.documentElement.classList.remove('nav-forward', 'nav-back');
  });
}

// === Init todo ===
function init() {
  initClickNav();
  initSwipeNav();
  initKeyboardNav();
  initHaptic();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-init tras cada transición de View Transitions
document.addEventListener('astro:after-swap', init);