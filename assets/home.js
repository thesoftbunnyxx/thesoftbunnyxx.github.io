'use strict';
/* Homepage motion: gentle reveals, numbers that count up once, a light that glides after the pointer,
   and the brand-stories arrows. Decorative only; reduced motion gets a still page. */
(() => {
  const root = document.documentElement;
  const still = () => root.classList.contains('rm') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.dataset.motion = 'live';

  // Reveal: siblings arriving together are staggered a little.
  const items = [...document.querySelectorAll('[data-r]')];
  const seen = new Map();
  items.forEach(el => {
    const n = seen.get(el.parentElement) || 0;
    el.style.setProperty('--d', `${Math.min(n, 6) * 110}ms`);
    seen.set(el.parentElement, n + 1);
  });

  const countUp = el => {
    const target = +el.dataset.count;
    const suffix = el.textContent.replace(/^\d+/, '');
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - (1 - p) ** 3)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const reveal = el => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    const num = el.querySelector('[data-count]');
    if (num && !still()) countUp(num);
  };
  if (still() || !('IntersectionObserver' in window)) items.forEach(reveal);
  else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }
  const motionSwitch = document.querySelector('#sb-motion');
  motionSwitch && motionSwitch.addEventListener('change', () => { if (motionSwitch.checked) items.forEach(reveal); });

  // Header turns to frosted glass once the page moves.
  let ticking = false;
  const onScroll = () => {
    root.classList.toggle('scrolled', scrollY > 8);
    if (root.scrollHeight - innerHeight - scrollY < 4) items.forEach(reveal);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // The light behind the arch drifts slowly toward the pointer (mouse only).
  const hero = document.querySelector('.hero');
  const light = hero && hero.querySelector('.hero-light');
  if (hero && light) {
    const rest = [72, 52];
    let to = rest, at = rest, frame = 0;
    const glide = () => {
      at = [at[0] + (to[0] - at[0]) * .05, at[1] + (to[1] - at[1]) * .05];
      light.style.setProperty('--mx', at[0].toFixed(2) + '%');
      light.style.setProperty('--my', at[1].toFixed(2) + '%');
      frame = Math.abs(to[0] - at[0]) + Math.abs(to[1] - at[1]) > .05 ? requestAnimationFrame(glide) : 0;
    };
    hero.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || still()) return;
      const r = light.getBoundingClientRect();
      // Pulled halfway toward the pointer so it stays near the photograph.
      to = [rest[0] + ((e.clientX - r.left) / r.width * 100 - rest[0]) * .5, rest[1] + ((e.clientY - r.top) / r.height * 100 - rest[1]) * .5];
      frame = frame || requestAnimationFrame(glide);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { to = rest; frame = frame || requestAnimationFrame(glide); }, { passive: true });
  }

  // Brand stories: arrows move one screenful.
  const rail = document.querySelector('.stories');
  document.querySelectorAll('.stories-nav .round').forEach(btn => btn.addEventListener('click', () => {
    if (!rail) return;
    rail.scrollBy({ left: +btn.dataset.dir * rail.clientWidth * .8, behavior: still() ? 'auto' : 'smooth' });
  }));
})();
