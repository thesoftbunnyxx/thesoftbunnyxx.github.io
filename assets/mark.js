'use strict';
/* the soft bunny xx · the light mark (v4)
   Draws the logo and the aurora as true vectors. Usage:
     <div data-logo="stack|row|mark" data-word="a|b|c" data-mode="day|night|ink" data-tag data-live style="--s:40px"></div>
     <div class="sbx-stage day|night" data-aurora></div>
   The two bunnies are the Seraphic Styler pair, unchanged in shape. */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const BUN = '<ellipse cx="21.5" cy="34" rx="11" ry="11.5"/><circle cx="13.5" cy="21" r="7"/><ellipse cx="11.5" cy="8" rx="2.3" ry="8" transform="rotate(-7 11.5 8)"/><ellipse cx="17" cy="8.5" rx="2.3" ry="8" transform="rotate(9 17 8.5)"/><circle cx="32" cy="40" r="3"/><ellipse cx="13" cy="44" rx="5" ry="2"/>';
  const stops = list => list.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('');
  // Pastel rainbow, deepened a touch by day so a hairline still reads on white.
  const DAY = [[0, '#ff94c6'], [.26, '#fbcf8e'], [.5, '#8fe0b8'], [.74, '#85c8f5'], [1, '#c79df2']];
  const NIGHT = [[0, '#ffc4df'], [.26, '#fdf3c4'], [.5, '#d6f7e3'], [.74, '#b7e4fb'], [1, '#ead0fb']];

  const defs = document.createElementNS(NS, 'svg');
  defs.setAttribute('width', 0); defs.setAttribute('height', 0); defs.setAttribute('aria-hidden', 'true');
  defs.style.position = 'absolute';
  defs.innerHTML = `<defs>
    <symbol id="sbx-bun" viewBox="0 0 36 46" overflow="visible">${BUN}</symbol>
    <g id="sbx-bun-shapes">${BUN}</g>
    <g id="sbx-bun-line">${BUN.replace(/\/>/g, ' vector-effect="non-scaling-stroke"/>')}</g>
    <mask id="sbx-rim" maskUnits="userSpaceOnUse" x="-4" y="-4" width="44" height="54"><rect x="-4" y="-4" width="44" height="54" fill="#fff"/><use href="#sbx-bun-shapes" fill="#000"/></mask>
    <linearGradient id="sbx-rb-day" gradientUnits="userSpaceOnUse" x1="4" y1="2" x2="34" y2="46">${stops(DAY)}</linearGradient>
    <linearGradient id="sbx-rb-night" gradientUnits="userSpaceOnUse" x1="4" y1="2" x2="34" y2="46">${stops(NIGHT)}</linearGradient>
    <linearGradient id="sbx-hz-day" gradientUnits="userSpaceOnUse" x1="4" y1="0" x2="146" y2="0">${stops([[0, '#ff94c6', 0], [.16, '#ff94c6'], [.36, '#fbcf8e'], [.52, '#8fe0b8'], [.68, '#85c8f5'], [.84, '#c79df2'], [1, '#c79df2', 0]])}</linearGradient>
    <linearGradient id="sbx-hz-night" gradientUnits="userSpaceOnUse" x1="4" y1="0" x2="146" y2="0">${stops([[0, '#fff', 0], [.2, '#ffd9ec'], [.5, '#fff'], [.8, '#cfe6ff'], [1, '#fff', 0]])}</linearGradient>
    <linearGradient id="sbx-star-day" x1="0" y1="0" x2="1" y2="1">${stops([[0, '#ff94c6'], [.55, '#c79df2'], [1, '#85c8f5']])}</linearGradient>
    <radialGradient id="sbx-pool-day">${stops([[0, '#f3d9fb', .85], [.5, '#cfe4fd', .4], [1, '#cfe4fd', 0]])}</radialGradient>
    <radialGradient id="sbx-pool-night">${stops([[0, '#fff', .6], [.5, '#fff', .16], [1, '#fff', 0]])}</radialGradient>
    <symbol id="sbx-star" viewBox="0 0 24 24"><path d="M12 0C12.5 7.6 16.4 11.5 24 12C16.4 12.5 12.5 16.4 12 24C11.5 16.4 7.6 12.5 0 12C7.6 11.5 11.5 7.6 12 0Z"/></symbol>
    <linearGradient id="sbx-au-day" x1="0" y1="0" x2="1" y2="0">${stops([[0, '#ffadd3'], [.24, '#fcf6bd'], [.48, '#d0f4de'], [.74, '#a9def9'], [1, '#e4c1f9']])}</linearGradient>
    <linearGradient id="sbx-au-night" x1="0" y1="0" x2="1" y2="0">${stops([[0, '#ff9fd0'], [.24, '#ffe9a8'], [.46, '#a8f5cd'], [.72, '#8fd6ff'], [1, '#d7a8ff']])}</linearGradient>
    <linearGradient id="sbx-au-fade" gradientUnits="userSpaceOnUse" x1="0" y1="400" x2="0" y2="20">${stops([[0, '#fff', 1], [.16, '#fff', .62], [.5, '#fff', .2], [1, '#fff', 0]])}</linearGradient>
    <linearGradient id="sbx-au-rays" x1="0" y1="0" x2="1" y2="0">${stops([[0, '#fff', .1], [.07, '#fff', .55], [.13, '#fff', .15], [.22, '#fff', .7], [.3, '#fff', .2], [.41, '#fff', .6], [.47, '#fff', .12], [.58, '#fff', .75], [.66, '#fff', .25], [.77, '#fff', .6], [.86, '#fff', .15], [.94, '#fff', .5], [1, '#fff', .1]])}</linearGradient>
    <mask id="sbx-au-mask" maskUnits="userSpaceOnUse" x="-60" y="-40" width="1320" height="700"><rect x="-60" y="-40" width="1320" height="700" fill="url(#sbx-au-fade)"/></mask>
    <filter id="sbx-halo" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.5"/></filter>
    <filter id="sbx-au-soft" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>`;
  document.body.prepend(defs);

  const bunny = (cls, transform) => `<g class="${cls}" transform="${transform}"><use href="#sbx-bun-shapes" class="bg"/><use href="#sbx-bun-shapes" class="bf"/><use href="#sbx-bun-line" class="bo" mask="url(#sbx-rim)"/></g>`;
  const MARK = `<svg class="sbx-mark" viewBox="0 0 150 70" role="img" aria-label="Two glowing bunnies on a line of light">
    <ellipse class="pl" cx="75" cy="57" rx="52" ry="21"/>
    <line class="hz" x1="4" y1="60" x2="146" y2="60"/>
    <g class="buns">${bunny('big', 'translate(47 14)')}${bunny('kit', 'translate(104.6 32.4) scale(-.6 .6)')}</g>
    <use class="st" href="#sbx-star" x="110" y="9" width="9" height="9"/><use class="st" href="#sbx-star" x="29" y="23" width="5" height="5"/><use class="st" href="#sbx-star" x="127" y="31" width="3.6" height="3.6"/>
    <circle class="bd" cx="22" cy="13" r=".7"/><circle class="bd" cx="97" cy="6" r=".6"/><circle class="bd" cx="138" cy="19" r=".6"/><circle class="bd" cx="40" cy="40" r=".5"/>
  </svg>`;

  document.querySelectorAll('[data-logo]').forEach(el => {
    const kind = el.dataset.logo, word = el.dataset.word || 'b', mode = el.dataset.mode || 'day';
    el.classList.add('sbx', mode);
    if (kind === 'row') el.classList.add('row');
    if ('live' in el.dataset) el.classList.add('live');
    if ('small' in el.dataset) el.classList.add('small');
    if ('pure' in el.dataset) el.classList.add('pure');
    el.innerHTML = MARK
      + (kind === 'mark' ? '' : `<p class="sbx-wm ${word}">the soft bunny <i>xx</i></p>`)
      + ('tag' in el.dataset ? '<p class="sbx-tag">plant-based food, made beautiful</p>' : '');
  });

  /* The aurora: one ribbon folding back on itself. Crisp lower edge, light rising and fading above it. */
  const EDGE_A = 'M-40,330 C140,296 262,398 430,358 C560,328 612,246 762,260 C900,272 966,348 1240,296';
  const EDGE_B = 'M-40,236 C196,204 372,282 560,226 C724,178 898,214 1240,160';
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  document.querySelectorAll('[data-aurora]').forEach(el => {
    const night = el.classList.contains('night');
    const grad = night ? 'sbx-au-night' : 'sbx-au-day';
    const veil = (edge, cls, strength) => `<g class="veil ${cls}">
      <g mask="url(#sbx-au-mask)" opacity="${strength}">
        <path d="${edge} L1240,-40 L-40,-40 Z" fill="url(#${grad})"/>
        <path d="${edge} L1240,-40 L-40,-40 Z" fill="url(#sbx-au-rays)" opacity="${night ? .28 : .5}" style="mix-blend-mode:${night ? 'screen' : 'soft-light'}"/>
      </g>
      <path d="${edge}" fill="none" stroke="url(#${grad})" stroke-width="10" opacity="${night ? .4 : .35}" filter="url(#sbx-au-soft)"/>
      <path d="${edge}" fill="none" stroke="${night ? '#fff' : `url(#${grad})`}" stroke-width=".7" opacity="${night ? .8 : .9}" vector-effect="non-scaling-stroke"/>
    </g>`;
    let stars = '';
    for (let i = 0; i < 26; i++) {
      const x = rnd() * 1200, y = rnd() * 250 + 14, big = rnd() > .72, size = big ? 9 + rnd() * 9 : 0;
      stars += big
        ? `<use class="twk" href="#sbx-star" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" style="animation-delay:-${(rnd() * 6).toFixed(1)}s"/>`
        : `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1 + rnd() * 1.3).toFixed(1)}" opacity="${(.45 + rnd() * .5).toFixed(2)}"/>`;
    }
    el.insertAdjacentHTML('afterbegin', `<svg class="sbx-aurora" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform="translate(0 -118)">${veil(EDGE_B, 'b', night ? .5 : .42)}${veil(EDGE_A, 'a', night ? .85 : .7)}</g>
      <g fill="${night ? '#fff' : '#c9a8f0'}">${stars}</g>
    </svg>`);
  });
})();
