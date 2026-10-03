// Resolve theme before React renders to avoid a flash of wrong theme.
// Served from /public as an external script (referenced in index.html) so the
// dev-server CSP can forbid inline scripts. Runs render-blocking in <head>.
(function () {
  try {
    var stored = localStorage.getItem('flaitron-viz-theme') || localStorage.getItem('theme');
    var dark =
      stored === 'dark' ||
      (stored !== 'light' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
