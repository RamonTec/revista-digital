// ============================================================
// redirect-to-flipbook.ts — Redirección a /flipbook si hay JS
// Se ejecuta en la portada estática (index.astro)
// Crawlers sin JS se quedan en la página estática para SEO
// ============================================================

// Pequeño delay para permitir que el HTML estático se pinte
// y los crawlers con JS parcial puedan indexar
function redirectToFlipbook() {
  // No redirigir si el userAgent es un crawler conocido
  const ua = navigator.userAgent.toLowerCase();
  const isCrawler =
    /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|semrushbot/i.test(
      ua
    );

  if (isCrawler) return;

  // No redirigir si ya estamos en /flipbook
  if (window.location.pathname.startsWith('/flipbook')) return;

  // Redirigir a /flipbook
  window.location.replace('/flipbook');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', redirectToFlipbook);
} else {
  redirectToFlipbook();
}