/* Beauty Bazaar — site logic
   ------------------------------------------------------------
   EDIT HERE: everything the salon may want to change lives in
   CONFIG below (contact details, hours, team, services, prices).
   price: number in Rand, or null  -> shows "Price on request"
   mins:  number of minutes, or null -> shows "Time varies"
   ------------------------------------------------------------ */
const CONFIG = {
  salon: {
    name: 'Beauty Bazaar',
    address: '24 Plein Street, Cape Town City Centre, 8000',
    landmark: 'Same block as The Goldman, Supreme Finance and Ackermans',
    maps: 'https://www.google.com/maps/search/?api=1&query=24+Plein+Street+Cape+Town+8000',
    phone: '27732113167',        // salon line from public listings
    whatsapp: null,              // add the salon WhatsApp number (e.g. '2773xxxxxxx') to let "Any available professional" requests go by WhatsApp
    email: null                  // add an email address if the salon has one
  },
  // 0 = Sunday ... 6 = Saturday. null = closed
  hours: { 0: null, 1: ['09:00', '18:00'], 2: ['09:00', '18:00'], 3: ['09:00', '18:00'], 4: ['09:00', '18:00'], 5: ['09:00', '18:00'], 6: ['09:00', '18:00'] },
  slotEvery: 90,          // minutes between start times
  bookAhead: 60,          // how many days ahead customers can request
  team: [
    { id: 'laura',   name: 'Laura',   biz: 'Laura Beauty Studio',   spec: 'Nails',                 wa: '27634790344', ig: 'laurabeauty_studioo', photo: 'assets/work/laura-french.jpg' },
    { id: 'jenn',    name: 'Jenn',    biz: 'Jaded by Jenn',         spec: 'Nails & nail art',      ig: 'jaded_by_jenn_', photo: 'assets/work/jenn-dots.jpg' },
    { id: 'ness',    name: 'Ness',    biz: 'Ness Nail Bar',         spec: 'Gelish manicures & pedicures', ig: 'nessnailbar' },
    { id: 'grace',   name: 'Grace',   biz: 'Grace Beauty',          spec: 'Braids & styling',      wa: '27627061468', ig: 'grace_beauty_black_hairstyle' },
    { id: 'eunice',  name: 'Eunice',  biz: 'Eunic ebraids',         spec: 'Braids · salon or home', wa: '27633451913', ig: 'eunic.ebraids' },
    { id: 'sara',    name: 'Sara',    biz: 'Braiding by Sara',      spec: 'Braids & bridal makeup', wa: '27685804591', ig: 'braidingbysara', web: 'https://braidingbysara.co.za/' },
    { id: 'tinashe', name: 'Tinashe', biz: 'Tinashe Magical Dreads', spec: 'Locs',                 ig: 'tinashemagicaldreads' },
    { id: 'lauret',  name: 'Lauret',  biz: 'Lauret Beauty',         spec: 'Makeup',                wa: '27611505140' }
  ],
  alsoInHouse: 'Patricia (braids), Tania (braids), Mireille (braids) and Ursula (cuts and styling). Ask for them at the front.',
  cats: [
    { id: 'nails',  name: 'Nails',  note: 'Gel, acrylic, French tips and nail art.', img: 'assets/work/laura-french.jpg' },
    { id: 'braids', name: 'Braids', note: 'Knotless, box braids and cornrows.' },
    { id: 'locs',   name: 'Locs',   note: 'Retwists, maintenance and crochet locs.' },
    { id: 'hair',   name: 'Hair',   note: 'Weaves, wigs, cuts and blowouts.' },
    { id: 'makeup', name: 'Makeup', note: 'Soft glam and bridal makeup.' },
    { id: 'brows',  name: 'Brows',  note: 'Threading.' }
  ],
  services: [
    { id: 'gel',       cat: 'nails',  name: 'Gel nails',          desc: 'Gel polish or gel overlay.',            img: 'assets/work/laura-pink.jpg', mins: null, price: null, team: ['laura', 'jenn'] },
    { id: 'acrylic',   cat: 'nails',  name: 'Acrylic set',        desc: 'Full set with tips, any length.',       img: 'assets/work/laura-red.jpg', mins: null, price: null, team: ['laura'] },
    { id: 'french',    cat: 'nails',  name: 'French tips',        desc: 'Classic or coloured French.',           img: 'assets/work/laura-french.jpg', mins: null, price: null, team: ['laura', 'jenn'] },
    { id: 'nailart',   cat: 'nails',  name: 'Nail art',           desc: 'Designs, crystals and 3D details.',     img: 'assets/work/jenn-dots.jpg', mins: null, price: null, team: ['laura', 'jenn'] },
    { id: 'gelish',    cat: 'nails',  name: 'Gelish manicure',    desc: 'Long-lasting gel colour on natural nails.', mins: null, price: null, team: ['ness'] },
    { id: 'pedicure',  cat: 'nails',  name: 'Pedicure',           desc: 'Soak, shape and polish.',               mins: null, price: null, team: ['laura', 'ness'] },
    { id: 'knotless',  cat: 'braids', name: 'Knotless braids',    desc: 'Any size and length.',                  mins: null, price: null, team: ['grace', 'eunice', 'sara'] },
    { id: 'box',       cat: 'braids', name: 'Box braids',         desc: 'Classic box braids.',                   mins: null, price: null, team: ['eunice', 'sara'] },
    { id: 'cornrows',  cat: 'braids', name: 'Cornrows',           desc: 'Straight-back or styled.',              mins: null, price: null, team: ['grace'] },
    { id: 'retwist',   cat: 'locs',   name: 'Loc retwist',        desc: 'Maintenance and retwist.',              mins: null, price: null, team: ['tinashe'] },
    { id: 'crochet',   cat: 'locs',   name: 'Crochet locs',       desc: 'Starter or repair with crochet.',       mins: null, price: null, team: ['tinashe'] },
    { id: 'weave',     cat: 'hair',   name: 'Weave or wig install', desc: 'Sew-in, frontal or wig.',             mins: null, price: null, team: [] },
    { id: 'cut',       cat: 'hair',   name: 'Cut and blowout',    desc: 'Wash, cut and blow-dry.',               mins: null, price: null, team: [] },
    { id: 'glam',      cat: 'makeup', name: 'Soft glam makeup',   desc: 'For events and nights out.',            mins: null, price: null, team: ['lauret', 'sara'] },
    { id: 'bridal',    cat: 'makeup', name: 'Bridal makeup',      desc: 'For your wedding day.',                 mins: null, price: null, team: ['sara', 'lauret'] },
    { id: 'threading', cat: 'brows',  name: 'Brow threading',     desc: 'Shape and tidy.',                       mins: null, price: null, team: [] }
  ],
  popular: ['nails', 'braids', 'locs', 'makeup'],
  work: [
    ['laura-red.jpg', 'Deep red, long square', 'laura'],
    ['laura-black.jpg', 'Matte black, 3D drops', 'laura'],
    ['jenn-dots.jpg', 'Polka-dot French', 'jenn'],
    ['laura-bling.jpg', 'Nude with crystals', 'laura'],
    ['laura-french.jpg', 'White French', 'laura'],
    ['laura-pink.jpg', 'Pink hearts', 'laura']
  ]
};

{
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const T = id => CONFIG.team.find(p => p.id === id);
const SV = id => CONFIG.services.find(s => s.id === id);
const CAT = id => CONFIG.cats.find(c => c.id === id);
const fmtPhone = n => '0' + n.slice(2, 4) + ' ' + n.slice(4, 7) + ' ' + n.slice(7);
const price = s => s.price ? 'R' + s.price : 'Price on request';
const mins = s => s.mins ? (s.mins >= 60 ? (Math.floor(s.mins / 60) + 'h' + (s.mins % 60 ? ' ' + (s.mins % 60) + 'min' : '')) : s.mins + ' min') : 'Time varies';
const proSvcs = id => CONFIG.services.filter(s => s.team.includes(id));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ICON = {
  braids: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3c4 3-4 6 0 9s-4 6 0 9 0 6 0 8M20 3c-4 3 4 6 0 9s4 6 0 9 0 6 0 8"/></svg>',
  locs: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 4v22M14 4v24M19 4v22M24 4v18"/><circle cx="9" cy="27" r="1"/><circle cx="19" cy="27" r="1"/></svg>',
  hair: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 28c0-10 2-22 8-22s8 12 8 22"/><path d="M12 28c0-8 1-16 4-16s4 8 4 16"/></svg>',
  makeup: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="11" y="16" width="10" height="12" rx="1.5"/><path d="M12 16V10l8-5v11"/></svg>',
  brows: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 18c6-7 14-8 24-4"/><path d="M8 22c5-3 11-3 16 0"/></svg>',
  nails: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 28V12a4 4 0 0 1 8 0v16"/><path d="M13 12a3 3 0 0 1 6 0v3h-6z"/></svg>',
  pedicure: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 4c0 8-2 14-2 18 0 4 3 6 8 6h6c2 0 3-1 3-3s-2-3-5-3h-3c-2 0-3-2-3-5V4"/><ellipse cx="24" cy="25" rx="1.6" ry="1.2" fill="currentColor"/></svg>',
  gelish: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="13" y="4" width="6" height="8" rx="1"/><path d="M11 12h10l2 4v10a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V16z"/><path d="M12 18h8" opacity=".6"/></svg>',
  check: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};
const thumb = s => `<span class="thumb" aria-hidden="true">${s.img ? `<img src="${esc(s.img)}" alt="" loading="lazy">` : (ICON[s.id] || ICON[s.cat] || '')}</span>`;
const avatar = (p, cls = 'av') => `<span class="${cls}">${p.photo ? `<img src="${esc(p.photo)}" alt="" loading="lazy">` : esc(p.name[0])}</span>`;

/* ---------- routing ---------- */
const VIEWS = ['home', 'services', 'team', 'book', 'contact'];
const links = $('#links'), burger = $('#burger');
function route() {
  const v = VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  $$('.view').forEach(s => { s.hidden = s.dataset.view !== v; });
  $$('#links a').forEach(a => a.dataset.v === v ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  $('#mbook').classList.toggle('hide', v === 'book');
  document.body.classList.toggle('booking', v === 'book');
  links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
  if (v === 'book') renderBook();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  document.title = (v === 'home' ? '' : $('#links a[data-v="' + v + '"]').textContent + ' · ') + 'Beauty Bazaar Cape Town';
  observeReveals();
}
burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); });
addEventListener('hashchange', route);
function go(view) { if (location.hash === '#' + view) route(); else location.hash = view; }

/* ---------- home ---------- */
$('#pop').innerHTML = CONFIG.popular.map(id => {
  const c = CAT(id);
  return `<a class="tile${c.img ? '' : ' noimg'}" href="#book" data-cat="${c.id}">${c.img ? `<img src="${esc(c.img)}" alt="" loading="lazy">` : `<span class="mark">${ICON[c.id] || ''}</span>`}<b>${esc(c.name)}</b><span>${esc(c.note)}</span></a>`;
}).join('');
$('#faces').innerHTML = CONFIG.team.map(p => `<a class="face" href="#book" data-pro="${p.id}">${avatar(p)}<b>${esc(p.name)}</b><span>${esc(p.spec.split(/[&·]/)[0].trim())}</span></a>`).join('');
$('#reel').innerHTML = CONFIG.work.map(([f, t, who]) => { const p = T(who); return `<figure class="shot"><div class="ph"><img src="assets/work/${esc(f)}" alt="${esc(t)} nails by ${esc(p.name)} at Beauty Bazaar" loading="lazy" width="900" height="1125"></div><figcaption><span>${esc(t)}</span><a href="https://www.instagram.com/${esc(p.ig)}/" target="_blank" rel="noopener">${esc(p.name)}</a></figcaption></figure>`; }).join('');

/* sparkles: a few, slow, staggered */
function sparkle(host, n, area) {
  if (reduce || !host) return;
  host.innerHTML = Array.from({ length: n }, () => {
    const s = 5 + Math.random() * 7, d = 9 + Math.random() * 10, dl = Math.random() * 14;
    return `<i style="left:${area.x0 + Math.random() * (area.x1 - area.x0)}%;top:${area.y0 + Math.random() * (area.y1 - area.y0)}%;--s:${s.toFixed(1)}px;--d:${d.toFixed(1)}s;--dl:${dl.toFixed(1)}s"></i>`;
  }).join('');
}
sparkle($('.glints'), 5, { x0: 4, x1: 96, y0: 6, y1: 90 });
sparkle($('.sparkles'), 9, { x0: 2, x1: 98, y0: 2, y1: 92 });

/* ---------- contact ---------- */
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function hoursRows() {
  const h = CONFIG.hours, rows = [];
  const same = [1, 2, 3, 4, 5, 6].every(d => h[d] && h[1] && h[d][0] === h[1][0] && h[d][1] === h[1][1]);
  if (same) rows.push(['Monday – Saturday', h[1][0] + ' – ' + h[1][1]]);
  else [1, 2, 3, 4, 5, 6].forEach(d => rows.push([DAYS[d], h[d] ? h[d][0] + ' – ' + h[d][1] : 'Closed']));
  rows.push(['Sunday', h[0] ? h[0][0] + ' – ' + h[0][1] : 'Closed']);
  return rows.map(([a, b]) => `<div class="c-row"><span>${a}</span><b>${b}</b></div>`).join('');
}
function contactHTML(full) {
  const S = CONFIG.salon;
  return `<div class="contact">
  <div class="c-block">
    ${full ? '' : '<h2 style="margin-bottom:18px">Visit us</h2>'}
    <div class="c-row"><span>Address</span><b>${esc(S.address)}</b></div>
    <div class="c-row"><span>Phone</span><b><a href="tel:+${S.phone}">${fmtPhone(S.phone)}</a></b></div>
    ${S.whatsapp ? `<div class="c-row"><span>WhatsApp</span><b><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">${fmtPhone(S.whatsapp)}</a></b></div>` : ''}
    ${S.email ? `<div class="c-row"><span>Email</span><b><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></b></div>` : ''}
    <p class="c-note">${esc(S.landmark)}.</p>
    <div class="c-actions">
      <a class="btn small ghost" href="${S.maps}" target="_blank" rel="noopener">Directions</a>
      <a class="btn small ghost" href="tel:+${S.phone}">Call ${fmtPhone(S.phone)}</a>
      ${S.whatsapp ? `<a class="btn small ghost" href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
    </div>
  </div>
  <div class="c-block">
    <h3>Opening hours</h3>
    ${hoursRows()}
    <p class="c-note">Each professional keeps their own hours. Some take early or late bookings.</p>
    ${full ? `<h3 style="margin-top:30px">Instagram</h3><div class="socials">${CONFIG.team.filter(p => p.ig).map(p => `<a href="https://www.instagram.com/${esc(p.ig)}/" target="_blank" rel="noopener">${esc(p.name)} · @${esc(p.ig)}</a>`).join('')}</div>` : ''}
  </div></div>`;
}
$('#home-contact').innerHTML = contactHTML(false);
$('#contactFull').innerHTML = contactHTML(true) + '<div style="height:60px"></div>';

/* ---------- services page ---------- */
let svcTab = 'all';
function renderServices() {
  $('#svcTabs').innerHTML = [['all', 'All'], ...CONFIG.cats.map(c => [c.id, c.name])].map(([id, n]) => `<button class="tab" role="tab" data-tab="${id}" aria-selected="${svcTab === id}">${n}</button>`).join('');
  $('#svcList').innerHTML = CONFIG.cats.filter(c => svcTab === 'all' || c.id === svcTab).map(c => `
    <div class="cat"><div class="cat-head"><div class="ci">${c.img ? `<img src="${esc(c.img)}" alt="" loading="lazy">` : `<span style="width:40%">${ICON[c.id] || ''}</span>`}</div><div><h2>${esc(c.name)}</h2><p>${esc(c.note)}</p></div></div>
    ${CONFIG.services.filter(s => s.cat === c.id).map(s => `<div class="svc">${thumb(s)}<div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div><a class="btn small ghost" href="#book" data-svc="${s.id}">Book</a><div class="meta">${mins(s)} · ${price(s)}${s.team.length ? ' · ' + s.team.map(id => T(id).name).join(', ') : ''}</div></div>`).join('')}
    </div>`).join('');
}
$('#svcTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { svcTab = b.dataset.tab; renderServices(); } });
renderServices();

/* ---------- team page ---------- */
$('#team').innerHTML = CONFIG.team.map(p => `<article class="pro">
  <div class="pic${p.photo ? '' : ' mono'}">${p.photo ? `<img src="${esc(p.photo)}" alt="Work by ${esc(p.name)}" loading="lazy">` : `<span class="initial">${esc(p.name[0])}</span>`}</div>
  <div class="body"><h3>${esc(p.name)}</h3><p class="spec">${esc(p.spec)}</p><p class="biz">${esc(p.biz)}</p>
  <ul>${proSvcs(p.id).map(s => `<li>${esc(s.name)}</li>`).join('')}</ul>
  <div class="acts"><a class="btn small primary" href="#book" data-pro="${p.id}">Book with ${esc(p.name)}</a>${p.ig ? `<a class="btn small ghost" href="https://www.instagram.com/${esc(p.ig)}/" target="_blank" rel="noopener">Instagram</a>` : ''}${p.web ? `<a class="btn small ghost" href="${esc(p.web)}" target="_blank" rel="noopener">Website</a>` : ''}</div></div></article>`).join('');
$('#also').textContent = 'Also working at Beauty Bazaar: ' + CONFIG.alsoInHouse;

/* ---------- booking ---------- */
const STEPS = ['Service', 'Professional', 'Date', 'Time', 'Details', 'Confirm'];
const B = { step: 1, cat: 'all', svc: null, pro: null, lockPro: false, date: null, time: null, name: '', phone: '', email: '', sent: false, month: null };
const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const longDate = s => fromIso(s).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const toT = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
const proFor = () => B.pro === 'any' ? null : T(B.pro);

function dayOpen(d) {
  const t = today0(), max = new Date(t); max.setDate(max.getDate() + CONFIG.bookAhead);
  if (d < t || d > max) return false;
  const h = CONFIG.hours[d.getDay()];
  if (!h) return false;
  return slotsFor(iso(d)).length > 0;
}
function slotsFor(ds) {
  const d = fromIso(ds), h = CONFIG.hours[d.getDay()];
  if (!h) return [];
  const len = (B.svc && SV(B.svc).mins) || 60, out = [];
  for (let m = toMin(h[0]); m + Math.min(len, 60) <= toMin(h[1]); m += CONFIG.slotEvery) out.push(m);
  if (ds === iso(new Date())) { const now = new Date(), cut = now.getHours() * 60 + now.getMinutes() + 60; return out.filter(m => m >= cut).map(toT); }
  return out.map(toT);
}

function stepper() {
  $('#steps').innerHTML = STEPS.map((s, i) => `<li class="${i + 1 < B.step ? 'done' : i + 1 === B.step ? 'now' : ''}"${i + 1 === B.step ? ' aria-current="step"' : ''}><span>${i + 1}. ${s}</span></li>`).join('');
}
function chosen() {
  const bits = [];
  if (B.svc) bits.push(['Service', SV(B.svc).name]);
  if (B.pro) bits.push(['With', B.pro === 'any' ? 'Any available' : T(B.pro).name]);
  if (B.date) bits.push(['Date', longDate(B.date)]);
  if (B.time) bits.push(['Time', B.time]);
  return bits.length ? `<div class="chosen">${bits.map(([a, b]) => `<span>${a}: <b>${esc(b)}</b></span>`).join('')}</div>` : '';
}
function nav(backOk, nextOk, nextLabel = 'Continue') {
  return `<div class="navrow">${B.step > 1 ? `<button class="btn" data-act="back"${backOk === false ? ' disabled' : ''}>Back</button>` : '<span></span>'}${nextLabel ? `<button class="btn primary" data-act="next"${nextOk ? '' : ' disabled'}>${nextLabel}</button>` : ''}</div>`;
}

function renderBook() {
  stepper();
  const el = $('#booker');
  if (B.sent) return renderDone(el);
  if (B.step === 1) {
    const pool = B.lockPro && B.pro && B.pro !== 'any' ? proSvcs(B.pro) : CONFIG.services;
    const cats = CONFIG.cats.filter(c => pool.some(s => s.cat === c.id));
    if (B.cat !== 'all' && !cats.some(c => c.id === B.cat)) B.cat = 'all';
    el.innerHTML = `<h2 class="q">What would you like to book?</h2><p class="qsub">Choose your service.</p>${chosen()}
      ${cats.length > 1 ? `<div class="cats">${[['all', 'All'], ...cats.map(c => [c.id, c.name])].map(([id, n]) => `<button class="tab" data-bcat="${id}" aria-selected="${B.cat === id}">${n}</button>`).join('')}</div>` : ''}
      ${pool.filter(s => B.cat === 'all' || s.cat === B.cat).map(s => `<button class="opt svc-opt" data-svc="${s.id}" aria-pressed="${B.svc === s.id}">${thumb(s)}<span><b>${esc(s.name)}</b><small>${mins(s)} · ${price(s)}</small></span><span class="sel">${B.svc === s.id ? 'Selected' : 'Select'}</span></button>`).join('')}
      ${nav(true, !!B.svc)}`;
  }
  if (B.step === 2) {
    const s = SV(B.svc), pros = s.team.map(T);
    el.innerHTML = `<h2 class="q">Who would you like to book with?</h2><p class="qsub">${pros.length ? 'Choose a professional, or any available.' : 'This service is booked through the salon.'}</p>${chosen()}
      ${pros.map(p => `<button class="opt pro-opt" data-pro="${p.id}" aria-pressed="${B.pro === p.id}">${avatar(p)}<span><b>${esc(p.name)}</b><small>${esc(p.spec)}</small></span><span class="sel">${B.pro === p.id ? 'Selected' : 'Book with ' + esc(p.name)}</span></button>`).join('')}
      <button class="opt pro-opt" data-pro="any" aria-pressed="${B.pro === 'any'}"><span class="av" style="font-size:20px">✦</span><span><b>Any available professional</b><small>The salon will match you</small></span><span class="sel">${B.pro === 'any' ? 'Selected' : 'Select'}</span></button>
      ${nav(true, !!B.pro)}`;
  }
  if (B.step === 3) {
    const t = today0();
    if (!B.month) B.month = new Date(t.getFullYear(), t.getMonth(), 1);
    const m = B.month, first = new Date(m.getFullYear(), m.getMonth(), 1), lead = (first.getDay() + 6) % 7, dim = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const max = new Date(t); max.setDate(max.getDate() + CONFIG.bookAhead);
    const canPrev = m > new Date(t.getFullYear(), t.getMonth(), 1), canNext = new Date(m.getFullYear(), m.getMonth() + 1, 1) <= max;
    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<span></span>';
    for (let d = 1; d <= dim; d++) {
      const dt = new Date(m.getFullYear(), m.getMonth(), d), k = iso(dt), ok = dayOpen(dt);
      cells += `<button class="day${k === iso(t) ? ' today' : ''}" data-date="${k}" aria-label="${dt.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}${ok ? '' : ', unavailable'}" ${ok ? '' : 'aria-disabled="true"'} aria-pressed="${B.date === k}">${d}</button>`;
    }
    el.innerHTML = `<h2 class="q">Choose a date</h2><p class="qsub">Days the salon is closed are crossed out.</p>${chosen()}
      <div class="cal"><div class="cal-top"><button data-mon="-1" aria-label="Previous month" ${canPrev ? '' : 'disabled'}>‹</button><b>${m.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</b><button data-mon="1" aria-label="Next month" ${canNext ? '' : 'disabled'}>›</button></div>
      <div class="grid7">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => `<span class="wd">${w}</span>`).join('')}${cells}</div>
      <div class="legend"><span>Closed Sundays</span><span>Book up to ${CONFIG.bookAhead} days ahead</span></div></div>
      ${nav(true, !!B.date)}`;
  }
  if (B.step === 4) {
    const sl = slotsFor(B.date);
    el.innerHTML = `<h2 class="q">Choose a time</h2><p class="qsub">Times within salon hours. ${B.pro === 'any' ? 'The salon' : esc(proFor().name)} confirms the exact time with you.</p>${chosen()}
      ${sl.length ? `<div class="slots">${sl.map(t => `<button class="slot" data-time="${t}" aria-pressed="${B.time === t}">${t}</button>`).join('')}</div>` : '<p class="empty">No times left on this day. Please choose another date.</p>'}
      ${nav(true, !!B.time)}`;
  }
  if (B.step === 5) {
    el.innerHTML = `<h2 class="q">Your details</h2><p class="qsub">So we can confirm your appointment.</p>${chosen()}
      <form class="form" id="details" novalidate>
        <div class="field"><label for="fn">Full name</label><input id="fn" name="name" autocomplete="name" value="${esc(B.name)}" required><span class="err" id="fn-e"></span></div>
        <div class="field"><label for="fp">Phone number</label><input id="fp" name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="e.g. 082 123 4567" value="${esc(B.phone)}" required><span class="err" id="fp-e"></span></div>
        <div class="field"><label for="fe">Email <i>(optional)</i></label><input id="fe" name="email" type="email" inputmode="email" autocomplete="email" value="${esc(B.email)}"><span class="err" id="fe-e"></span></div>
      </form>
      ${nav(true, true)}`;
  }
  if (B.step === 6) {
    const s = SV(B.svc), p = proFor(), via = channel();
    el.innerHTML = `<h2 class="q">Check your appointment</h2><p class="qsub">${via.lead}</p>
      <div class="sum"><h3>Your appointment</h3>${summaryDL()}
      <p class="how">${via.how}</p></div>
      <div class="navrow"><button class="btn" data-act="back">Back</button>${via.btn}</div>`;
  }
  // focus heading for screen readers / keyboard
  const q = $('.q', el); if (q) { q.tabIndex = -1; q.focus({ preventScroll: true }); }
}
function summaryDL() {
  const s = SV(B.svc), p = proFor();
  const rows = [['Service', s.name], ['Professional', p ? p.name + ' · ' + p.biz : 'Any available'], ['Date', longDate(B.date)], ['Time', B.time], ['Duration', mins(s)], ['Price', price(s)], ['Name', B.name], ['Phone', B.phone]];
  if (B.email) rows.push(['Email', B.email]);
  return `<dl>${rows.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`;
}
function message() {
  const s = SV(B.svc), p = proFor();
  return [`Hi ${p ? p.name : 'Beauty Bazaar'}, I'd like to book an appointment.`, '', `Service: ${s.name}`, `Date: ${longDate(B.date)}`, `Time: ${B.time}`, `Name: ${B.name}`, `Phone: ${B.phone}`, B.email ? `Email: ${B.email}` : '', '', 'Booked from the Beauty Bazaar website. Please confirm if this time works.'].filter((l, i, a) => l !== '' || (a[i - 1] !== '' && i)).join('\n');
}
function channel() {
  const p = proFor(), S = CONFIG.salon, msg = encodeURIComponent(message());
  if (p && p.wa) return { kind: 'wa', who: p.name, lead: `Your request goes to ${esc(p.name)} on WhatsApp.`, how: `Tap the button to open WhatsApp with this message to ${esc(p.name)} (${fmtPhone(p.wa)}), then press send. You're booked once ${esc(p.name)} confirms.`, btn: `<a class="btn primary" data-act="send" href="https://wa.me/${p.wa}?text=${msg}" target="_blank" rel="noopener">Send request on WhatsApp</a>` };
  if (p && p.ig) return { kind: 'ig', who: p.name, lead: `${esc(p.name)} takes bookings by Instagram message.`, how: `Tap the button to copy your booking and open ${esc(p.name)}'s Instagram. Paste it into a message. You're booked once ${esc(p.name)} confirms.`, btn: `<a class="btn primary" data-act="send" data-copy="1" href="https://ig.me/m/${esc(p.ig)}" target="_blank" rel="noopener">Copy and open Instagram</a>` };
  if (S.whatsapp) return { kind: 'wa', who: 'the salon', lead: 'Your request goes to the salon on WhatsApp.', how: `Tap the button to open WhatsApp with this message, then press send. You're booked once the salon confirms.`, btn: `<a class="btn primary" data-act="send" href="https://wa.me/${S.whatsapp}?text=${msg}" target="_blank" rel="noopener">Send request on WhatsApp</a>` };
  return { kind: 'call', who: 'the salon', lead: 'Bookings with any available professional are made by phone.', how: `Call the salon on ${fmtPhone(S.phone)} and read out these details. You're booked once the salon confirms.`, btn: `<a class="btn primary" data-act="send" href="tel:+${S.phone}">Call ${fmtPhone(S.phone)}</a>` };
}
function renderDone(el) {
  const c = B.sentVia;
  const title = c.kind === 'call' ? 'Call to finish booking' : c.kind === 'wa' ? 'Press send in WhatsApp' : 'Paste and send on Instagram';
  const line = c.kind === 'wa' ? `WhatsApp has opened with your request to ${esc(c.who)}. Press send there. You're booked once ${esc(c.who)} confirms.`
    : c.kind === 'ig' ? `Your booking was copied. Paste it into your Instagram message to ${esc(c.who)}. You're booked once ${esc(c.who)} confirms.`
    : `Call ${fmtPhone(CONFIG.salon.phone)} to book. You're booked once the salon confirms.`;
  $('#steps').innerHTML = '';
  el.innerHTML = `<div class="done-mark">${ICON.check}</div><h2 class="q">${title}</h2><p class="qsub">${line}</p>
    <div class="sum"><h3>Your appointment request</h3>${summaryDL()}<p class="how">Address: ${esc(CONFIG.salon.address)}</p></div>
    <div class="navrow" style="position:static;background:none;border:0;padding:22px 0 0;backdrop-filter:none">${channel().btn.replace('Send request on WhatsApp', 'Open WhatsApp again').replace('Copy and open Instagram', 'Copy again')}<button class="btn" data-act="new">New booking</button></div>`;
  const q = $('.q', el); q.tabIndex = -1; q.focus({ preventScroll: true });
}

function validate() {
  const name = $('#fn').value.trim(), phone = $('#fp').value.trim(), email = $('#fe').value.trim();
  const digits = phone.replace(/[\s()-]/g, '');
  const errs = {
    fn: name.replace(/[^\p{L}]/gu, '').length < 2 ? 'Please enter your name.' : '',
    fp: !/^(\+27|0027|0)[1-9]\d{8}$/.test(digits) && !/^\+\d{9,15}$/.test(digits) ? 'Please enter a valid phone number, e.g. 082 123 4567.' : '',
    fe: email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'Please check your email address.' : ''
  };
  let first = null;
  for (const [id, m] of Object.entries(errs)) { $('#' + id).setAttribute('aria-invalid', m ? 'true' : 'false'); $('#' + id + '-e').textContent = m; if (m && !first) first = id; }
  if (first) { $('#' + first).focus(); return false; }
  B.name = name; B.phone = phone; B.email = email; return true;
}
function next() {
  if (B.step === 5 && !validate()) return;
  if (B.step === 1 && B.lockPro && B.pro && !SV(B.svc).team.includes(B.pro)) B.lockPro = false;
  B.step = Math.min(6, B.step + 1);
  if (B.step === 2 && B.lockPro && B.pro) B.step = 3;
  renderBook(); scrollTo({ top: 0 });
}
function back() {
  if (B.step === 5) { B.name = $('#fn').value.trim(); B.phone = $('#fp').value.trim(); B.email = $('#fe').value.trim(); }
  B.step = Math.max(1, B.step - 1);
  if (B.step === 2 && B.lockPro) B.step = 1;
  renderBook(); scrollTo({ top: 0 });
}
function reset() { Object.assign(B, { step: 1, cat: 'all', svc: null, pro: null, lockPro: false, date: null, time: null, sent: false, month: null, sentVia: null }); }

$('#booker').addEventListener('click', async e => {
  const t = e.target.closest('button,a'); if (!t) return;
  if (t.dataset.bcat) { B.cat = t.dataset.bcat; return renderBook(); }
  if (t.dataset.svc) { if (B.svc !== t.dataset.svc) { B.svc = t.dataset.svc; B.time = null; if (!B.lockPro) B.pro = null; } return renderBook(); }
  if (t.dataset.pro) { B.pro = t.dataset.pro; return renderBook(); }
  if (t.dataset.mon) { B.month = new Date(B.month.getFullYear(), B.month.getMonth() + Number(t.dataset.mon), 1); return renderBook(); }
  if (t.dataset.date) { if (t.getAttribute('aria-disabled') === 'true') return; B.date = t.dataset.date; B.time = null; return renderBook(); }
  if (t.dataset.time) { B.time = t.dataset.time; return renderBook(); }
  const a = t.dataset.act;
  if (a === 'next') next();
  if (a === 'back') back();
  if (a === 'new') { reset(); renderBook(); }
  if (a === 'send') {
    if (t.dataset.copy) { try { await navigator.clipboard.writeText(message()); } catch (_) { /* clipboard blocked: message is still shown in the summary */ } }
    B.sentVia = channel(); B.sent = true;
    setTimeout(renderBook, 60); // let the link open first
  }
});
$('#booker').addEventListener('submit', e => { e.preventDefault(); next(); });

/* entry points into booking from anywhere */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href="#book"]'); if (!a || a.closest('#booker')) return;
  if (a.dataset.svc || a.dataset.pro || a.dataset.cat || B.sent) reset();
  if (a.dataset.svc) { B.svc = a.dataset.svc; B.step = 2; }
  if (a.dataset.pro) { B.pro = a.dataset.pro; B.lockPro = true; B.step = 1; }
  if (a.dataset.cat) { B.cat = a.dataset.cat; B.step = 1; }
  if (location.hash === '#book') { e.preventDefault(); renderBook(); scrollTo({ top: 0 }); }
});

/* ---------- reveal on scroll ---------- */
let io;
function observeReveals() {
  if (reduce || !('IntersectionObserver' in window)) { $$('.reveal').forEach(r => r.classList.add('in')); return; }
  io = io || new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal:not(.in)').forEach(r => io.observe(r));
}

$('#yr').textContent = new Date().getFullYear();
route();
}
