/* Restore display choices before paint; storage is optional. */
(function () {
  try {
    var root = document.documentElement;
    var theme = localStorage.getItem('sb-site-theme');
    root.classList.toggle('dark', theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches));
    root.classList.toggle('mono', theme === 'mono');
    var size = localStorage.getItem('sb-textsize');
    if (size === 'lg' || size === 'xl') root.classList.add('ts-' + size);
    if (localStorage.getItem('sb-motion') === '1') root.classList.add('rm');
  } catch (_) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
  }
})();
/* Scroll reveals: hide-then-reveal only when motion is welcome; a 2.5 s failsafe shows everything if the motion script never runs. */
(function () {
  var root = document.documentElement;
  try {
    if (root.classList.contains('rm') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('reveal-ready');
    setTimeout(function () { if (!root.dataset.motion) root.classList.remove('reveal-ready'); }, 2500);
  } catch (_) {}
})();
