import { site, hasPhone, hasEmail } from '../site.config.mjs'

// ── apufunktiot ─────────────────────────────────────────────
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const abs = (p) => new URL(p, site.url).href

// ── kuvat ───────────────────────────────────────────────────
// [leveys, korkeus] alkuperäisestä kuvasta. Kuvat on optimoitu WebP-muotoon
// leveyksiin 480 / 800 / 1376 px (src/assets/img).
export const IMAGES = {
  'kylpyhuone-kuopio': [1376, 768],
  'kalkinpoisto-suihkulasi': [1376, 768],
  'kylpyhuoneen-saumojen-puhdistus': [1376, 768],
  'nanopinnoitus-vesipisarat': [1376, 768],
  'kylpyhuone-ja-sauna': [1376, 768],
  'puhdistusvalineet': [928, 1152],
  'suihkulasi-ennen': [1376, 768],
  'suihkulasi-jalkeen': [1376, 768],
  'saumat-ennen': [1376, 768],
  'saumat-jalkeen': [1376, 768],
  'hana-ennen': [1376, 768],
  'hana-jalkeen': [1376, 768],
}
const STEPS = [480, 800, 1376]

export function imgSrc(name, w = 800) {
  const [max] = IMAGES[name]
  const widths = STEPS.filter((s) => s <= max)
  const pick = widths.find((s) => s >= w) ?? widths.at(-1)
  return `/assets/img/${name}-${pick}.webp`
}

export function img(name, alt, { sizes = '100vw', eager = false, cls = '', attrs = '' } = {}) {
  const [max, h] = IMAGES[name]
  const widths = STEPS.filter((s) => s <= max)
  const srcset = widths.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ')
  const largest = widths.at(-1)
  return `<img src="/assets/img/${name}-${widths[1] ?? largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${largest}" height="${Math.round((h / max) * largest)}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'} ${attrs}>`
}

// ── ikonit ──────────────────────────────────────────────────
const svg = (d, extra = '') =>
  `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`
export const icon = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  drop: svg('<path d="M12 2.7C9 7 5.5 10.6 5.5 14.6a6.5 6.5 0 0 0 13 0c0-4-3.5-7.6-6.5-11.9Z"/>'),
  sparkle: svg('<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 15.5l.8 2 2 .8-2 .7-.8 2-.7-2-2-.7 2-.8z"/>'),
  shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>'),
  pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  leaf: svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>'),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  tag: svg('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z"/><circle cx="7" cy="7" r="1.5"/>'),
  camera: svg('<path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5z"/><circle cx="12" cy="13" r="3.5"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  chevron: svg('<path d="m6 9 6 6 6-6"/>'),
}

export const logoMark = (cls = 'logo-mark') => `
<svg class="${cls}" viewBox="0 0 48 56" aria-hidden="true">
  <path d="M24 3C17 14 5 25 5 35a19 19 0 0 0 38 0C43 25 31 14 24 3Z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/>
  <g fill="currentColor"><rect x="13" y="27" width="8.6" height="8.6" rx="1.6"/><rect x="23.4" y="27" width="8.6" height="8.6" rx="1.6"/><rect x="13" y="37.4" width="8.6" height="8.6" rx="1.6"/><rect x="23.4" y="37.4" width="8.6" height="8.6" rx="1.6"/></g>
  <path class="logo-spark" d="M34 11.5l1.7 4.9 4.8 1.6-4.8 1.7L34 24.5l-1.7-4.8-4.8-1.7 4.8-1.6z" fill="var(--teal-400)"/>
  <path d="M2.5 46.5c9 4.5 30.5-1 43-15.5" fill="none" stroke="var(--teal-400)" stroke-width="2.8" stroke-linecap="round"/>
</svg>`

export const logo = (href = '/') =>
  `<a class="logo" href="${href}" aria-label="NanoSavo – etusivulle">${logoMark()}<span class="logo-word">Nano<span>Savo</span></span></a>`

// ── navigaatio ──────────────────────────────────────────────
export const SERVICES = [
  {
    path: '/kylpyhuoneen-puhdistus-kuopio/',
    short: 'Kylpyhuoneen puhdistus',
    nav: 'Kylpyhuoneen puhdistus',
    lead: 'Lattiasta kattoon: saumat, laatat, suihkutila, kalusteet ja lattiakaivo perusteellisesti puhtaiksi.',
    image: 'kylpyhuoneen-saumojen-puhdistus',
    alt: 'Kylpyhuoneen laattasaumojen harjaus puhtaaksi Kuopiossa',
  },
  {
    path: '/kalkinpoisto-kuopio/',
    short: 'Kalkinpoisto',
    nav: 'Kalkinpoisto',
    lead: 'Vesikivi ja kalkkitahrat pois suihkulaseista, hanoista ja laatoista – pintaa vahingoittamatta.',
    image: 'kalkinpoisto-suihkulasi',
    alt: 'Kalkinpoisto suihkulasista mikrokuituliinalla',
  },
  {
    path: '/nanopinnoitus-kuopio/',
    short: 'Nanopinnoitus',
    nav: 'Kylpyhuoneen nanopinnoitus',
    lead: 'Näkymätön suoja, jossa vesi helmeilee pois ja kalkki tarttuu heikommin. Siivous helpottuu selvästi.',
    image: 'nanopinnoitus-vesipisarat',
    alt: 'Vesipisarat helmeilevät nanopinnoitetulla suihkulasilla',
  },
]

const ctaHref = (page) => (page.form === false ? '/tarjouspyynto/' : '#tarjous')

export function header(page) {
  const current = (p) => (page.path === p ? ' aria-current="page"' : '')
  const phone = hasPhone()
    ? `<a class="nav-phone" href="tel:${site.phone}">${icon.phone}<span>${esc(site.phoneDisplay)}</span></a>`
    : ''
  return `
<a class="skip" href="#sisalto">Siirry sisältöön</a>
<header class="site-header" data-header>
  <div class="wrap header-inner">
    ${logo()}
    <nav class="main-nav" aria-label="Päävalikko">
      <ul class="nav-list">
        <li class="has-sub">
          <a href="/#palvelut" class="nav-link">Palvelut ${icon.chevron}</a>
          <ul class="sub">
            ${SERVICES.map((s) => `<li><a href="${s.path}"${current(s.path)}><strong>${s.nav}</strong><span>${s.lead.split('.')[0].split(':')[0]}</span></a></li>`).join('')}
          </ul>
        </li>
        <li><a class="nav-link" href="/#ennen-jalkeen">Ennen &amp; jälkeen</a></li>
        <li><a class="nav-link" href="/#tyotapa">Näin toimimme</a></li>
        <li><a class="nav-link" href="/#ukk">Kysymykset</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      ${phone}
      <a class="btn btn-primary btn-sm" href="${ctaHref(page)}">Pyydä tarjous ${icon.arrow}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-btn>
        <span class="visually-hidden">Avaa valikko</span><span class="burger" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-menu hidden>
  <nav aria-label="Mobiilivalikko">
    <p class="mm-label">Palvelut</p>
    <ul>
      ${SERVICES.map((s, i) => `<li style="--i:${i}"><a href="${s.path}"${current(s.path)}>${s.nav}</a></li>`).join('')}
    </ul>
    <p class="mm-label">Tutustu</p>
    <ul class="mm-small">
      <li style="--i:3"><a href="/#ennen-jalkeen">Ennen &amp; jälkeen</a></li>
      <li style="--i:4"><a href="/#tyotapa">Näin toimimme</a></li>
      <li style="--i:5"><a href="/#ukk">Usein kysyttyä</a></li>
      <li style="--i:6"><a href="/tarjouspyynto/">Tarjouspyyntö</a></li>
    </ul>
    <div class="mm-cta">
      <a class="btn btn-primary btn-lg" href="${ctaHref(page)}" data-close-menu>Pyydä maksuton tarjous ${icon.arrow}</a>
      ${hasPhone() ? `<a class="btn btn-ghost btn-lg" href="tel:${site.phone}">${icon.phone} Soita ${esc(site.phoneDisplay)}</a>` : ''}
    </div>
  </nav>
</div>`
}

export function mobileBar(page) {
  if (page.form === false && !hasPhone()) return ''
  return `
<div class="mobile-bar" data-mobile-bar>
  ${hasPhone() ? `<a class="mb-call" href="tel:${site.phone}">${icon.phone}<span>Soita</span></a>` : ''}
  <a class="mb-quote" href="${ctaHref(page)}">Pyydä maksuton tarjous ${icon.arrow}</a>
</div>`
}

export function footer() {
  const contact = [
    hasPhone() && `<li><a href="tel:${site.phone}">${icon.phone}${esc(site.phoneDisplay)}</a></li>`,
    hasEmail() && `<li><a href="mailto:${site.email}">${icon.mail}${esc(site.email)}</a></li>`,
    `<li><span>${icon.pin}${site.address.street ? esc(site.address.street) + ', ' : ''}${esc(site.address.postalCode ? site.address.postalCode + ' ' : '')}${esc(site.address.city)}</span></li>`,
    ...site.openingHours.map((o) => `<li><span>${icon.clock}${esc(o.label)}</span></li>`),
  ].filter(Boolean)
  const social = Object.entries(site.social).filter(([, v]) => v)
  return `
<footer class="site-footer">
  <div class="footer-glow" aria-hidden="true"></div>
  <div class="wrap">
    <div class="footer-cta">
      <p class="footer-cta-title">Kylpyhuone, joka <em>kiiltää</em> taas.</p>
      <a class="btn btn-primary btn-lg" href="/tarjouspyynto/">Pyydä maksuton tarjous ${icon.arrow}</a>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        ${logo()}
        <p>Kylpyhuoneiden perusteellinen puhdistus, kalkinpoisto ja nanopinnoitus Kuopiossa ja lähikunnissa. Paikallinen, huolellinen ja helposti tavoitettava.</p>
        ${social.length ? `<p class="social">${social.map(([k, v]) => `<a href="${esc(v)}" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join(' · ')}</p>` : ''}
      </div>
      <div>
        <p class="footer-h">Palvelut</p>
        <ul>${SERVICES.map((s) => `<li><a href="${s.path}">${s.nav} Kuopio</a></li>`).join('')}<li><a href="/tarjouspyynto/">Tarjouspyyntö</a></li></ul>
      </div>
      <div>
        <p class="footer-h">Palvelualue</p>
        <ul class="footer-area">${site.areaServed.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      </div>
      <div>
        <p class="footer-h">Yhteystiedot</p>
        <ul class="footer-contact">${contact.join('')}</ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} ${esc(site.legalName)}${site.businessId ? ` · Y-tunnus ${esc(site.businessId)}` : ''}</p>
      <p><a href="/tietosuoja/">Tietosuojaseloste</a> · <a href="/sitemap.xml">Sivukartta</a></p>
    </div>
  </div>
</footer>`
}

// ── sisältölohkot ───────────────────────────────────────────
export function beforeAfter({ before, after, alt, caption, cls = '', sizes = '(min-width: 1100px) 1100px, 100vw', start = 50 }) {
  return `
<figure class="ba ${cls}" data-ba style="--pos:${start}%">
  <div class="ba-stage">
    ${img(after, `Jälkeen: ${alt.after}`, { sizes, cls: 'ba-img' })}
    <div class="ba-before">${img(before, `Ennen: ${alt.before}`, { sizes, cls: 'ba-img' })}</div>
    <span class="ba-tag ba-tag-before" aria-hidden="true">Ennen</span>
    <span class="ba-tag ba-tag-after" aria-hidden="true">Jälkeen</span>
    <span class="ba-handle" aria-hidden="true"><span class="ba-knob"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6-6 6 6 6M15 6l6 6-6 6"/></svg></span></span>
    <input class="ba-range" type="range" min="0" max="100" value="${start}" aria-label="Vertaa ennen ja jälkeen: ${esc(caption)}">
  </div>
  <figcaption><strong>${esc(caption)}</strong><span>Havainnekuva · vedä vertaillaksesi</span></figcaption>
</figure>`
}

export const BA = {
  glass: {
    before: 'suihkulasi-ennen',
    after: 'suihkulasi-jalkeen',
    caption: 'Suihkulasi: kalkinpoisto ja nanopinnoitus',
    alt: { before: 'kalkkikerroksen sumentama suihkulasi', after: 'kirkas, kalkiton suihkulasi kalkinpoiston ja nanopinnoituksen jälkeen' },
  },
  grout: {
    before: 'saumat-ennen',
    after: 'saumat-jalkeen',
    caption: 'Laattasaumat: perusteellinen puhdistus',
    alt: { before: 'tummuneet ja likaiset kylpyhuoneen laattasaumat', after: 'vaaleat, puhtaat laattasaumat kylpyhuoneen puhdistuksen jälkeen' },
  },
  tap: {
    before: 'hana-ennen',
    after: 'hana-jalkeen',
    caption: 'Hana ja allas: vesikiven poisto',
    alt: { before: 'paksun kalkkikerroksen peittämä pesualtaan hana', after: 'kiiltävä kromihana ja puhdas pesuallas kalkinpoiston jälkeen' },
  },
}

export function faqBlock(faqs, { title = 'Usein kysyttyä', eyebrow = 'Kysymykset', id = 'ukk', intro = '' } = {}) {
  return `
<section class="section faq-section" id="${id}" aria-labelledby="${id}-title">
  <div class="wrap faq-grid">
    <div class="faq-head reveal">
      <p class="eyebrow">${eyebrow}</p>
      <h2 id="${id}-title">${title}</h2>
      ${intro ? `<p class="muted">${intro}</p>` : ''}
      <a class="link-arrow" href="#tarjous">Kysy suoraan tarjouspyynnöllä ${icon.arrow}</a>
    </div>
    <div class="faq-list">
      ${faqs.map((f, i) => `
      <details class="faq reveal" style="--d:${i * 60}ms"${i === 0 ? ' open' : ''}>
        <summary><h3>${f.q}</h3><span class="faq-icon" aria-hidden="true">${icon.plus}</span></summary>
        <div class="faq-body"><p>${f.a}</p></div>
      </details>`).join('')}
    </div>
  </div>
</section>`
}

export function processBlock({ title = 'Tarjouspyynnöstä kiiltävään kylpyhuoneeseen', id = 'tyotapa' } = {}) {
  const steps = [
    ['Jätä tarjouspyyntö', 'Kerro lyhyesti kylpyhuoneesta ja liitä halutessasi kuva. Se vie noin minuutin.'],
    ['Saat selkeän tarjouksen', 'Arvioimme pinnat ja tarpeen. Saat kiinteän hinnan ennen kuin mitään sovitaan.'],
    ['Puhdistamme huolella', 'Poistamme kalkin ja lian materiaalille sopivilla aineilla ja menetelmillä.'],
    ['Suojaamme ja opastamme', 'Teemme sovitut pinnoitukset ja annamme selkeät ohjeet jatkohoitoon.'],
  ]
  return `
<section class="section process" id="${id}" aria-labelledby="${id}-title">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">Näin toimimme</p>
      <h2 id="${id}-title">${title}</h2>
      <p class="muted">Ei yllätyksiä eikä epämääräisiä lupauksia. Tiedät aina etukäteen, mitä tehdään ja mitä se maksaa.</p>
    </div>
    <ol class="steps">
      ${steps.map(([h, p], i) => `
      <li class="step reveal" style="--d:${i * 90}ms">
        <span class="step-num">0${i + 1}</span>
        <h3>${h}</h3>
        <p>${p}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>`
}

export function areaBlock() {
  return `
<section class="section area" aria-labelledby="alue-title">
  <div class="wrap area-grid">
    <div class="reveal">
      <p class="eyebrow">Palvelualue</p>
      <h2 id="alue-title">Kuopiossa ja lähikunnissa</h2>
      <p class="muted">Tulemme kotiisi, vapaa-ajan asunnollesi tai taloyhtiöösi kaikkialle Kuopion alueelle. Lähikuntien osalta mahdolliset matkakulut kerrotaan aina tarjouksessa etukäteen.</p>
      <ul class="area-list">${site.areaServed.map((a) => `<li>${icon.pin}${esc(a)}</li>`).join('')}</ul>
    </div>
    <div class="marquee reveal" aria-hidden="true">
      ${[0, 1, 2].map((r) => `<div class="marquee-row" style="--dir:${r % 2 ? 'reverse' : 'normal'};--dur:${38 + r * 8}s"><div>${[...site.districts.slice(r * 5), ...site.districts.slice(0, r * 5)].map((d) => `<span>${esc(d)}</span>`).join('')}</div><div>${[...site.districts.slice(r * 5), ...site.districts.slice(0, r * 5)].map((d) => `<span>${esc(d)}</span>`).join('')}</div></div>`).join('')}
    </div>
  </div>
</section>`
}

export function relatedServices(currentPath) {
  const others = SERVICES.filter((s) => s.path !== currentPath)
  return `
<section class="section related" aria-labelledby="related-title">
  <div class="wrap">
    <div class="section-head reveal"><p class="eyebrow">Muut palvelut</p><h2 id="related-title">Paras lopputulos syntyy yhdistämällä</h2></div>
    <div class="related-grid">
      ${others.map((s, i) => `
      <a class="service-card reveal" href="${s.path}" style="--d:${i * 90}ms">
        <div class="sc-media">${img(s.image, s.alt, { sizes: '(min-width: 900px) 50vw, 100vw' })}</div>
        <div class="sc-body"><h3>${s.nav} Kuopio</h3><p>${s.lead}</p><span class="link-arrow">Lue lisää ${icon.arrow}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>`
}

export function trustStrip() {
  const items = [
    [icon.tag, 'Maksuton tarjous', 'Kiinteä hinta etukäteen'],
    [icon.shield, 'Pintoja kunnioittaen', 'Materiaalille sopivat aineet'],
    [icon.pin, 'Paikallinen yritys', 'Kuopio ja lähikunnat'],
    [icon.clock, 'Nopea vastaus', 'Yleensä saman arkipäivän aikana'],
  ]
  return `
<div class="trust" role="list">
  ${items.map(([i, t, s], n) => `<div class="trust-item reveal" role="listitem" style="--d:${n * 70}ms">${i}<div><strong>${t}</strong><span>${s}</span></div></div>`).join('')}
</div>`
}

// ── tarjouslomake (Netlify Forms) ───────────────────────────
export const SERVICE_OPTIONS = [
  ['puhdistus-ja-nanopinnoitus', 'Puhdistus + nanopinnoitus', 'Suosituin'],
  ['kylpyhuoneen-puhdistus', 'Kylpyhuoneen puhdistus', ''],
  ['kalkinpoisto', 'Kalkinpoisto', ''],
  ['nanopinnoitus', 'Nanopinnoitus', ''],
  ['en-tieda', 'En osaa vielä sanoa', ''],
]

export function quoteForm({ selected = 'puhdistus-ja-nanopinnoitus' } = {}) {
  return `
<form class="quote-form" name="tarjouspyynto" method="POST" action="/kiitos/" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data" data-quote-form>
  <input type="hidden" name="form-name" value="tarjouspyynto">
  <input type="hidden" name="subject" value="Uusi tarjouspyyntö – NanoSavo (%{submissionId})">
  <input type="hidden" name="lahde" value="" data-source>
  <fieldset class="field chips">
    <legend>Mitä tarvitset?</legend>
    <div class="chip-row">
      ${SERVICE_OPTIONS.map(([v, l, badge]) => `<label class="chip"><input type="radio" name="palvelu" value="${l}"${v === selected ? ' checked' : ''}><span>${l}${badge ? ` <em>${badge}</em>` : ''}</span></label>`).join('')}
    </div>
  </fieldset>
  <div class="form-row">
    <div class="field"><label for="f-nimi">Nimi <span aria-hidden="true">*</span></label><input id="f-nimi" name="nimi" type="text" autocomplete="name" required placeholder="Etunimi Sukunimi"></div>
    <div class="field"><label for="f-puhelin">Puhelin <span aria-hidden="true">*</span></label><input id="f-puhelin" name="puhelin" type="tel" autocomplete="tel" inputmode="tel" required placeholder="040 123 4567"></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="f-email">Sähköposti</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="nimi@esimerkki.fi"></div>
    <div class="field"><label for="f-paikka">Paikkakunta tai kaupunginosa <span aria-hidden="true">*</span></label><input id="f-paikka" name="paikkakunta" type="text" autocomplete="address-level2" required placeholder="Kuopio, Petonen"></div>
  </div>
  <div class="field">
    <label for="f-koko">Kylpyhuoneen koko</label>
    <div class="select"><select id="f-koko" name="koko">
      <option value="En tiedä">En tiedä tarkalleen</option>
      <option value="Alle 4 m²">Pieni (alle 4 m²)</option>
      <option value="4–7 m²">Keskikokoinen (4–7 m²)</option>
      <option value="Yli 7 m²">Suuri (yli 7 m²)</option>
      <option value="Kylpyhuone ja sauna">Kylpyhuone + sauna</option>
    </select>${icon.chevron}</div>
  </div>
  <div class="field">
    <label for="f-viesti">Kerro lyhyesti tilanteesta</label>
    <textarea id="f-viesti" name="viesti" rows="4" placeholder="Esim. suihkulasissa on paksu kalkkikerros ja saumat ovat tummuneet. Toivoisin myös pinnoituksen."></textarea>
  </div>
  <div class="field file-field">
    <label class="file-drop" for="f-kuva">${icon.camera}<span><strong>Liitä kuva</strong> (valinnainen) <small data-file-name>Kuva nopeuttaa tarjousta · enintään 8 Mt</small></span></label>
    <input id="f-kuva" name="kuva" type="file" accept="image/*" data-file>
  </div>
  <p class="visually-hidden" aria-hidden="true"><label>Jätä tämä kenttä tyhjäksi <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
  <button class="btn btn-primary btn-lg btn-block" type="submit" data-submit>Lähetä tarjouspyyntö ${icon.arrow}</button>
  <p class="form-note">${icon.shield}<span>Maksuton ja sitoumukseton. Vastaamme yleensä saman arkipäivän aikana. Tietojasi käytetään vain tarjouspyyntösi käsittelyyn – <a href="/tietosuoja/">tietosuojaseloste</a>.</span></p>
</form>`
}

export function contactSection({ title = 'Pyydä maksuton tarjous', text, selected } = {}) {
  return `
<section class="section contact" id="tarjous" aria-labelledby="tarjous-title">
  <div class="contact-bg" aria-hidden="true"></div>
  <div class="wrap contact-grid">
    <div class="contact-copy reveal">
      <p class="eyebrow eyebrow-light">Tarjouspyyntö</p>
      <h2 id="tarjous-title">${title}</h2>
      <p>${text ?? 'Kerro muutamalla sanalla, millainen kylpyhuoneesi on ja mikä siinä harmittaa. Lähetämme selkeän, kiinteän hinta-arvion – ilman velvoitteita.'}</p>
      <ul class="contact-points">
        <li>${icon.check}Tarjous on maksuton eikä sido mihinkään</li>
        <li>${icon.check}Kiinteä hinta etukäteen, ei piilokuluja</li>
        <li>${icon.check}Kuvan perusteella saat arvion usein heti</li>
      </ul>
      ${hasPhone() || hasEmail() ? `<div class="contact-direct">
        <p>Tai ota yhteyttä suoraan</p>
        ${hasPhone() ? `<a href="tel:${site.phone}">${icon.phone}${esc(site.phoneDisplay)}</a>` : ''}
        ${hasEmail() ? `<a href="mailto:${site.email}">${icon.mail}${esc(site.email)}</a>` : ''}
      </div>` : ''}
    </div>
    <div class="form-card reveal" style="--d:120ms">${quoteForm({ selected })}</div>
  </div>
</section>`
}

export function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="Murupolku"><ol>${items
    .map((it, i) => (i < items.length - 1 ? `<li><a href="${it.path}">${esc(it.name)}</a></li>` : `<li aria-current="page">${esc(it.name)}</li>`))
    .join('')}</ol></nav>`
}

export function serviceHero({ eyebrow, title, lead, image, alt, crumbs, chips = [] }) {
  return `
<section class="hero hero-sub" aria-labelledby="page-title">
  <div class="hero-media">${img(image, alt, { eager: true, sizes: '100vw' })}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow eyebrow-light hero-in" style="--d:60ms">${eyebrow}</p>
    <h1 id="page-title" class="hero-in" style="--d:140ms">${title}</h1>
    <p class="hero-lead hero-in" style="--d:240ms">${lead}</p>
    <div class="hero-cta hero-in" style="--d:340ms">
      <a class="btn btn-primary btn-lg" href="#tarjous">Pyydä maksuton tarjous ${icon.arrow}</a>
      ${hasPhone() ? `<a class="btn btn-glass btn-lg" href="tel:${site.phone}">${icon.phone} ${esc(site.phoneDisplay)}</a>` : `<a class="btn btn-glass btn-lg" href="#ennen-jalkeen">Katso ennen &amp; jälkeen</a>`}
    </div>
    ${chips.length ? `<ul class="hero-chips hero-in" style="--d:440ms">${chips.map((c) => `<li>${icon.check}${c}</li>`).join('')}</ul>` : ''}
  </div>
</section>`
}

// ── rakenteinen data ────────────────────────────────────────
export const BUSINESS_ID = `${site.url}/#yritys`

export function localBusinessSchema() {
  const s = {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url + '/',
    logo: abs('/assets/img/nanosavo-logo.png'),
    image: [abs('/assets/img/og-nanosavo.jpg'), abs(imgSrc('kylpyhuone-kuopio', 1376))],
    description: 'Kylpyhuoneiden perusteellinen puhdistus, kalkinpoisto ja nanopinnoitus Kuopiossa ja lähialueilla.',
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      ...(site.address.street && { streetAddress: site.address.street }),
      ...(site.address.postalCode && { postalCode: site.address.postalCode }),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: site.openingHours.map((o) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: o.days, opens: o.opens, closes: o.closes })),
    knowsLanguage: ['fi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kylpyhuonepalvelut',
      itemListElement: SERVICES.map((sv) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: sv.nav, url: abs(sv.path) } })),
    },
  }
  if (hasPhone()) s.telephone = site.phone
  if (hasEmail()) s.email = site.email
  if (site.businessId) s.vatID = `FI${site.businessId.replace('-', '')}`
  const sameAs = Object.values(site.social).filter(Boolean)
  if (sameAs.length) s.sameAs = sameAs
  return s
}

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${site.url}/#sivusto`,
  url: site.url + '/',
  name: site.name,
  inLanguage: 'fi-FI',
  publisher: { '@id': BUSINESS_ID },
})

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
})

export const serviceSchema = ({ name, serviceType, description, path, image }) => ({
  '@type': 'Service',
  '@id': abs(path) + '#palvelu',
  name,
  serviceType,
  description,
  url: abs(path),
  image: abs(imgSrc(image, 1376)),
  provider: { '@id': BUSINESS_ID },
  areaServed: site.areaServed.map((n) => ({ '@type': 'City', name: n })),
  offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', description: 'Maksuton, kiinteähintainen tarjous kohteen mukaan' },
})
