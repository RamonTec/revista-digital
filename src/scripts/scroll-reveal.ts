// ============================================================
// scroll-reveal.ts — IntersectionObserver para animaciones
// Añade .is-visible cuando el elemento entra en viewport
// ============================================================

export function initScrollReveal(): void {
  const elementos = document.querySelectorAll('[data-reveal]');

  if (!elementos.length) return;

  // Respetar prefers-reduced-motion
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReduced) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  elementos.forEach((el) => observer.observe(el));
}

// === Parallax sutil ===
export function initParallax(): void {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReduced) return;

  let ticking = false;

  function update() {
    parallaxEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const speed = parseFloat(htmlEl.dataset.parallax || '0.3');
      const rect = htmlEl.getBoundingClientRect();
      const viewportH = window.innerHeight;

      if (rect.bottom > 0 && rect.top < viewportH) {
        const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
        const offset = progress * speed * 100;
        htmlEl.style.transform = `translateY(${offset}px)`;
      }
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallax();
  });
} else {
  initScrollReveal();
  initParallax();
}

// Re-init tras cada transición de View Transitions
document.addEventListener('astro:after-swap', () => {
  initScrollReveal();
  initParallax();
});