'use strict';
(() => {
  const root = document.documentElement;
  const get = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const set = (key, value) => { try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (_) {} };
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  const EMAIL = 'TheSoftBunnyxx@gmail.com';
  const IG_DM = 'https://ig.me/m/thesoftbunnyxx';
  const svg = body => `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICON = {
    sliders: svg('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    chat: svg('<path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4.5 19.5l1.4-4.1A7.5 7.5 0 1 1 20 11.5z"/><path d="M12.4 14.2s-2.6-1.6-2.6-3.3a1.3 1.3 0 0 1 2.6-.4 1.3 1.3 0 0 1 2.6.4c0 1.7-2.6 3.3-2.6 3.3z" fill="currentColor" stroke="none"/>'),
    instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
    email: svg('<rect x="3.2" y="5.6" width="17.6" height="12.8" rx="3"/><path d="m4.4 7.6 7.6 5.6 7.6-5.6"/>'),
  };

  /* ---------- display preferences (same storage keys as before) ---------- */
  const prefs = {
    theme: () => { const v = get('sb-site-theme'); return ['light', 'dark', 'mono'].includes(v) ? v : 'auto'; },
    size: () => { const v = get('sb-textsize'); return ['lg', 'xl'].includes(v) ? v : 'md'; },
    motion: () => root.classList.contains('rm'),
  };
  function applyTheme(v) {
    root.classList.toggle('dark', v === 'dark' || (v === 'auto' && scheme.matches));
    root.classList.toggle('mono', v === 'mono');
    set('sb-site-theme', v === 'auto' ? null : v);
  }
  function applySize(v) {
    root.classList.remove('ts-lg', 'ts-xl');
    if (v !== 'md') root.classList.add('ts-' + v);
    set('sb-textsize', v === 'md' ? null : v);
  }
  function applyMotion(on) {
    root.classList.toggle('rm', on);
    set('sb-motion', on ? '1' : null);
    if (on) root.classList.remove('reveal-ready');
  }
  if (scheme.addEventListener) scheme.addEventListener('change', () => { if (prefs.theme() === 'auto') applyTheme('auto'); });

  /* ---------- floating corner: settings + messages ---------- */
  const seg = (name, label, i18n, options, current) => `
    <fieldset class="sb-field"><legend data-i18n="${i18n}">${label}</legend>
      <div class="sb-seg">${options.map(([value, text, key, extra]) => `
        <label${extra ? ` class="${extra}"` : ''}><input type="radio" name="${name}" value="${value}"${value === current ? ' checked' : ''}><span${key ? ` data-i18n="${key}"` : ''}>${text}</span></label>`).join('')}
      </div></fieldset>`;
  const dock = document.createElement('div');
  dock.className = 'sb-dock';
  dock.innerHTML = `
    <button type="button" class="sb-fab sb-fab-settings" aria-controls="sb-settings" aria-expanded="false" aria-label="Display settings">${ICON.sliders}</button>
    <button type="button" class="sb-fab sb-fab-message" aria-controls="sb-message" aria-expanded="false" aria-label="Message me">${ICON.chat}<span class="sb-fab-tip">message me</span></button>
    <div class="sb-pop" id="sb-message" role="dialog" aria-label="Message me" hidden>
      <p class="sb-pop-title">say hello 🐇</p>
      <p class="sb-pop-sub">Pick whichever is easiest for you.</p>
      <a class="sb-pop-link" href="${IG_DM}" target="_blank" rel="noopener noreferrer"><span class="sb-pop-ico">${ICON.instagram}</span><span><strong>DM on Instagram</strong><small>@thesoftbunnyxx</small></span></a>
      <a class="sb-pop-link" href="mailto:${EMAIL}?subject=${encodeURIComponent('Hello from thesoftbunnyxx.com')}"><span class="sb-pop-ico">${ICON.email}</span><span><strong>Send an email</strong><small>${EMAIL}</small></span></a>
      <button type="button" class="sb-copy">Copy email address</button>
      <p class="sb-copy-status" role="status"></p>
    </div>`;
  const drawer = document.createElement('div');
  drawer.className = 'sb-drawer-wrap';
  drawer.hidden = true;
  drawer.innerHTML = `
    <div class="sb-backdrop" data-close></div>
    <aside class="sb-drawer" id="sb-settings" role="dialog" aria-modal="true" aria-labelledby="sb-settings-title" tabindex="-1">
      <div class="sb-drawer-head"><p id="sb-settings-title"><span aria-hidden="true">✧</span> <span data-i18n="set.title">display</span></p>
        <button type="button" class="sb-close" data-close aria-label="Close display settings">${ICON.close}</button></div>
      ${seg('sb-theme', 'Appearance', 'set.theme', [['auto', 'Auto', 'th.auto'], ['light', 'Light', 'th.light'], ['dark', 'Dark', 'th.dark'], ['mono', 'Contrast', 'th.mono']], prefs.theme())}
      ${seg('sb-size', 'Text size', 'set.text', [['md', 'A', '', 'a-md'], ['lg', 'A', '', 'a-lg'], ['xl', 'A', '', 'a-xl']], prefs.size())}
      <label class="sb-switch"><span data-i18n="set.motion">Reduce motion</span><input type="checkbox" role="switch" id="sb-motion"${prefs.motion() ? ' checked' : ''}><i aria-hidden="true"></i></label>
      <p class="sb-drawer-foot">Saved on this device only.</p>
    </aside>`;
  document.body.append(dock, drawer);

  const settingsBtn = dock.querySelector('.sb-fab-settings');
  const messageBtn = dock.querySelector('.sb-fab-message');
  const pop = dock.querySelector('#sb-message');
  const panel = drawer.querySelector('.sb-drawer');
  let lastFocus = null;

  function openDrawer() {
    closePop();
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('open'));
    settingsBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('sb-locked');
    panel.focus({ preventScroll: true });
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove('open');
    settingsBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sb-locked');
    const done = () => { drawer.hidden = true; };
    root.classList.contains('rm') ? done() : setTimeout(done, 380);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  function openPop() { pop.hidden = false; requestAnimationFrame(() => pop.classList.add('open')); messageBtn.setAttribute('aria-expanded', 'true'); }
  function closePop() { if (pop.hidden) return; pop.classList.remove('open'); messageBtn.setAttribute('aria-expanded', 'false'); setTimeout(() => { if (!pop.classList.contains('open')) pop.hidden = true; }, 260); }

  settingsBtn.addEventListener('click', () => (drawer.hidden ? openDrawer() : closeDrawer()));
  messageBtn.addEventListener('click', () => (pop.hidden ? openPop() : closePop()));
  drawer.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeDrawer(); });
  document.addEventListener('click', e => { if (!pop.hidden && !e.target.closest('.sb-pop, .sb-fab-message')) closePop(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDrawer(); closePop(); }
    if (e.key === 'Tab' && !drawer.hidden) {   // keep focus inside the open panel
      const f = [...panel.querySelectorAll('button, input')];
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  panel.addEventListener('change', e => {
    const t = e.target;
    if (t.name === 'sb-theme') applyTheme(t.value);
    if (t.name === 'sb-size') applySize(t.value);
    if (t.id === 'sb-motion') applyMotion(t.checked);
  });
  dock.querySelector('.sb-copy').addEventListener('click', async () => {
    const status = dock.querySelector('.sb-copy-status');
    try { await navigator.clipboard.writeText(EMAIL); status.textContent = 'Copied ♡'; }
    catch (_) { status.textContent = EMAIL; }
  });
  const filters = document.querySelector('.filter-row');
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('.work-item').forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
    });
  }
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    const field = document.querySelector('#service');
    if (field) field.value = link.dataset.service;
  }));
  const form = document.querySelector('#inquiry-form');
  if (form) {
    // A draft composer, not a network submission. No private form values enter analytics.
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const fields = new FormData(form);
      const body = `Hello Soft Bunny,\n\nMy name is ${fields.get('name').trim()}.\nBrand / website: ${fields.get('brand').trim() || 'Not supplied'}\nProject: ${fields.get('service')}\nBudget (USD): ${fields.get('budget')}\nTiming: ${fields.get('timing').trim() || 'Flexible'}\n\nThe idea:\n${fields.get('idea').trim()}\n\nPlease let me know the next steps. Thank you!`;
      const subject = `Project enquiry — ${fields.get('service')}`;
      document.querySelector('#draft-text').value = `To: TheSoftBunnyxx@gmail.com\nSubject: ${subject}\n\n${body}`;
      document.querySelector('#email-link').href = `mailto:TheSoftBunnyxx@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const draft = document.querySelector('#email-draft');
      draft.hidden = false;
      document.querySelector('#email-link').focus({ preventScroll: true });
      draft.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    });
    document.querySelector('#copy-draft').addEventListener('click', async () => {
      const text = document.querySelector('#draft-text');
      const status = document.querySelector('#copy-status');
      try { await navigator.clipboard.writeText(text.value); status.textContent = 'Brief copied. Paste it into your email and send when you’re ready.'; }
      catch (_) { text.focus(); text.select(); status.textContent = 'Select and copy the brief above, then paste it into your email.'; }
    });
    // Without JavaScript, do not expose an unusable submit control or send a GET request.
    form.querySelector('button[type="submit"]').disabled = false;
  }
  document.querySelectorAll('.print-button').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
})();
