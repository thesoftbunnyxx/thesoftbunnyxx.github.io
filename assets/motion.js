'use strict';
/* Scroll motion: blur-to-focus reveals, an aurora glow that shifts colour per section,
   and a thin aurora progress line. Decorative only; reduced-motion visitors get a static page. */
(() => {
  const root = document.documentElement;
  const still = () => root.classList.contains('rm') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.dataset.motion = 'live';

  // Ambient glow layer (three soft orbs) + progress line, injected so the HTML stays clean.
  const glow = document.createElement('div');
  glow.className = 'aurora-glow';
  glow.setAttribute('aria-hidden', 'true');
  glow.innerHTML = '<i></i><i></i><i></i>';
  document.body.prepend(glow);
  const bar = document.createElement('div');
  bar.className = 'scroll-glow';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  const targets = [
    '.hero-copy > *', '.hero-art', '.proof li', '.section-heading', '.pillar', '.filter-row',
    '.work-item', '.archive-note', '.archive', '.brand-wall li', '.partner-card',
    '.about > div', '.contact-simple > *', '.footer-card', '.footer-bottom',
    '.links-intro > *', '.link-card', '.social-links a'
  ];

  // Hero: a soft beacon light follows the pointer (kept behind the photos by a CSS mask).
  const hero = document.querySelector('.hero');
  if (hero && !still()) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    }, { passive: true });
    // Bokeh: a few soft, out-of-focus lights drifting behind the photos.
    const art = hero.querySelector('.hero-art');
    [[ '6%', '22%', 38, '0s', 'p'], ['86%', '4%', 22, '-3s', 'l'], ['72%', '78%', 54, '-6s', 'b'],
     ['18%', '86%', 26, '-9s', 'p'], ['96%', '46%', 16, '-4s', 'l'], ['40%', '-4%', 30, '-11s', 'b']]
      .forEach(([x, y, size, delay, tint]) => {
        const b = document.createElement('span');
        b.className = 'bokeh bokeh-' + tint; b.setAttribute('aria-hidden', 'true');
        b.style.cssText = `left:${x};top:${y};width:${size}px;height:${size}px;animation-delay:${delay}`;
        art && art.append(b);
      });
  }
  const items = [...document.querySelectorAll(targets.join(','))];

  // Stagger siblings that enter together (cards, tiles, hero lines).
  const groups = new Map();
  items.forEach(el => {
    const list = groups.get(el.parentElement) || [];
    el.style.setProperty('--d', `${Math.min(list.length, 9) * 90}ms`);
    list.push(el);
    groups.set(el.parentElement, list);
  });
  document.querySelectorAll('.brand-wall li').forEach((el, i) => el.style.setProperty('--d', `${(i % 10) * 45}ms`));

  const reveal = el => el.classList.add('in');
  if (still() || !('IntersectionObserver' in window)) {
    items.forEach(reveal);
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    items.forEach(el => io.observe(el));
  }

  // Section mood: the glow drifts to a new palette as each part of the page arrives.
  const moods = [['#intro', 'blush'], ['.proof', 'blush'], ['#share', 'lilac'], ['#gallery', 'peach'],
                 ['#brands', 'sky'], ['#about', 'blush'], ['#connect', 'lilac']];
  const moodIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) root.dataset.glow = e.target.dataset.mood;
  }), { rootMargin: '-45% 0px -45% 0px' });
  moods.forEach(([sel, mood]) => {
    const el = document.querySelector(sel);
    if (el) { el.dataset.mood = mood; moodIO.observe(el); }
  });
  root.dataset.glow = 'blush';

  // Scroll-linked values (progress + gentle orb parallax), batched to one frame.
  let ticking = false;
  const update = () => {
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
    root.style.setProperty('--sy', Math.round(scrollY));
    root.classList.toggle('scrolled', scrollY > 10);
    if (max - scrollY < 4) items.forEach(reveal); // nothing stays hidden at the very end of the page
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();

  // If the visitor turns on "Reduce motion" mid-visit, show everything at once.
  const motion = document.querySelector('#sb-motion');
  if (motion) motion.addEventListener('change', () => { if (motion.checked) items.forEach(reveal); });
})();
