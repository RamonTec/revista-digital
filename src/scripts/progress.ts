// ============================================================
// progress.ts — Barra de progreso de lectura
// Actualiza el ancho según el scroll del documento
// ============================================================

export function initProgress(): void {
  const fill = document.getElementById('progress-fill');
  const bar = document.getElementById('progress-bar');

  if (!fill || !bar) return;

  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    fill.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;

    // Mostrar/ocultar la barra según posición
    if (scrollTop < 100) {
      bar.style.opacity = '0.5';
    } else {
      bar.style.opacity = '1';
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgress);
} else {
  initProgress();
}

// Re-init tras cada transición de View Transitions
document.addEventListener('astro:after-swap', initProgress);