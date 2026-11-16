import { site, hasPhone } from '../site.config.mjs'
import {
  esc, icon, img, SERVICES, BA, beforeAfter, faqBlock, processBlock, areaBlock, relatedServices, trustStrip,
  contactSection, serviceHero, quoteForm, localBusinessSchema, websiteSchema, breadcrumbSchema, faqSchema, serviceSchema,
} from './components.mjs'

const HOME = { name: 'Etusivu', path: '/' }

// ══════════════════════════════════════════════════════════════
//  ETUSIVU
// ══════════════════════════════════════════════════════════════
const homeFaq = [
  { q: 'Mitä kylpyhuoneen puhdistus ja nanopinnoitus maksaa?', a: 'Hinta riippuu kylpyhuoneen koosta, pintamateriaaleista ja siitä, kuinka paljon kalkkia ja likaa on kertynyt. Saat aina kiinteän hinnan etukäteen – lähetä tarjouspyyntö ja liitä mukaan kuva, niin arvio on nopea ja tarkka.' },
  { q: 'Poistaako nanopinnoitus kalkin?', a: 'Ei. Olemassa oleva kalkki ja lika poistetaan ensin huolellisesti. Nanopinnoite levitetään vasta täysin puhtaalle pinnalle, jolloin se suojaa pintaa ja hidastaa uuden kalkin ja lian kiinnittymistä.' },
  { q: 'Kuinka kauan käynti kestää?', a: 'Tavallisen kodin kylpyhuoneen puhdistus kestää yleensä muutamasta tunnista puoleen päivään. Jos mukaan tulee nanopinnoitus, pinnoitteen on annettava kuivua ennen suihkun käyttöä. Kerromme tarkan aikataulun tarjouksessa.' },
  { q: 'Tarvitseeko minun olla kotona?', a: 'Ei välttämättä. Monet asiakkaamme antavat avaimen tai ovikoodin ja palaavat valmiiseen kylpyhuoneeseen. Sovimme käytännöt kanssasi etukäteen.' },
  { q: 'Mille alueille tulette?', a: `Palvelemme koko Kuopion alueella, mukaan lukien Nilsiä, Maaninka, Karttula, Juankoski ja Vehmersalmi, sekä lähikunnissa kuten ${site.areaServed.filter((a) => a !== 'Kuopio').join(', ')}. Mahdolliset matkakulut näkyvät aina tarjouksessa.` },
  { q: 'Ovatko käyttämänne aineet turvallisia?', a: 'Valitsemme aineet aina pintamateriaalin mukaan, jotta saumat, kromi, luonnonkivi ja lasi eivät vaurioidu. Tuuletamme tilan työn aikana ja kerromme, milloin kylpyhuonetta voi taas käyttää normaalisti.' },
]

const packages = [
  { tag: 'Nopea raikastus', name: 'Kalkki pois', value: 'kalkinpoisto', text: 'Kohdennettu kalkinpoisto sinne, missä sitä eniten näkyy.', items: ['Suihkulasit ja -seinät', 'Hanat, suihkut ja allas', 'Kalkkitahrat laatoista', 'Lopputarkastus yhdessä'] },
  { tag: 'Suosituin', name: 'Puhdas & suojattu', value: 'puhdistus-ja-nanopinnoitus', featured: true, text: 'Koko kylpyhuoneen perusteellinen puhdistus ja kestävä nanosuojaus. Paras lopputulos ja helpoin arki.', items: ['Kalkinpoisto koko tilasta', 'Saumojen ja laattojen syväpuhdistus', 'Lattiakaivo, WC ja kalusteet', 'Nanopinnoitus soveltuville pinnoille', 'Kirjalliset hoito-ohjeet'] },
  { tag: 'Suojaa puhtaat pinnat', name: 'Lasit & laatat', value: 'nanopinnoitus', text: 'Kun kylpyhuone on jo siisti, mutta haluat sen myös pysyvän sellaisena.', items: ['Pintojen esipuhdistus', 'Suihkulasien nanopinnoitus', 'Seinälaattojen pinnoitus', 'Hoito-ohjeet'] },
]

function home() {
  const page = {
    path: '/',
    title: 'Kylpyhuoneen puhdistus, kalkinpoisto ja nanopinnoitus Kuopio | NanoSavo',
    description: 'Kylpyhuoneen puhdistus, kalkinpoisto ja nanopinnoitus Kuopiossa ja lähialueilla. Kalkki pois, saumat puhtaiksi ja pinnoille kestävä suoja. Pyydä maksuton tarjous!',
    preload: 'kylpyhuone-kuopio',
    sitemap: { priority: '1.0', changefreq: 'monthly' },
    schema: [localBusinessSchema(), websiteSchema(), faqSchema(homeFaq)],
  }
  page.body = `
<section class="hero hero-home" aria-labelledby="page-title">
  <div class="hero-media">${img('kylpyhuone-kuopio', 'Puhdas, valoisa kylpyhuone kirkkaalla suihkulasilla ja kiiltävillä laatoilla Kuopiossa', { eager: true, sizes: '100vw' })}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <p class="eyebrow eyebrow-light hero-in" style="--d:60ms">${icon.pin} Kuopio &amp; lähialueet</p>
    <h1 id="page-title" class="hero-in" style="--d:140ms"><span class="h1-kicker">Kylpyhuoneen puhdistus ja nanopinnoitus Kuopiossa</span>Kylpyhuone, joka <em>kiiltää</em> taas.</h1>
    <p class="hero-lead hero-in" style="--d:240ms">Poistamme pinttyneen kalkin, puhdistamme saumat ja suojaamme pinnat nanopinnoitteella. Saat takaisin raikkaan kylpyhuoneen – ja arjen, jossa siivous on huomattavasti helpompaa.</p>
    <div class="hero-cta hero-in" style="--d:340ms">
      <a class="btn btn-primary btn-lg" href="#tarjous">Pyydä maksuton tarjous ${icon.arrow}</a>
      <a class="btn btn-glass btn-lg" href="#ennen-jalkeen">Katso ennen &amp; jälkeen</a>
    </div>
    <ul class="hero-chips hero-in" style="--d:440ms"><li>${icon.check}Kiinteä hinta etukäteen</li><li>${icon.check}Pintoja vahingoittamatta</li><li>${icon.check}Tarjous ei sido</li></ul>
  </div>
  <div class="hero-card hero-in" style="--d:600ms" aria-hidden="true">
    <div class="hc-drops"><i></i><i></i><i></i><i></i><i></i></div>
    <p class="hc-title">Nanopinnoitettu pinta</p>
    <p class="hc-text">Vesi helmeilee pois – kalkki ja lika tarttuvat heikommin.</p>
  </div>
  <a class="scroll-cue" href="#palvelut" aria-label="Vieritä palveluihin"><span></span></a>
</section>

<div class="wrap trust-wrap">${trustStrip()}</div>

<section class="section intro" aria-labelledby="intro-title">
  <div class="wrap intro-grid">
    <div class="intro-media reveal">
      ${img('puhdistusvalineet', 'NanoSavon ammattilaisen kylpyhuoneen puhdistusvälineet: mikrokuituliinat, harjat ja materiaaliystävälliset puhdistusaineet', { sizes: '(min-width: 900px) 40vw, 100vw' })}
      <div class="intro-badge"><strong>3 in 1</strong><span>Kalkinpoisto · Syväpuhdistus · Nanosuoja</span></div>
    </div>
    <div class="intro-copy reveal" style="--d:120ms">
      <p class="eyebrow">Miksi NanoSavo</p>
      <h2 id="intro-title">Kun tavallinen pesu ei enää riitä</h2>
      <p class="lead">Vesikivi, harmaantuneet saumat ja sumea suihkulasi eivät ole merkki huonosta siivoamisesta. Kylpyhuoneen kova kosteus ja kalkki tekevät pinnoista ajan myötä sellaisia, ettei kaupan pesuaine enää auta.</p>
      <p>Me palautamme pinnat lähes uuden veroisiksi oikeilla aineilla, ammattivälineillä ja kärsivällisyydellä. Lopuksi suojaamme ne nanopinnoitteella, jotta saavutettu puhtaus myös pysyy.</p>
      <ul class="benefits">
        <li>${icon.sparkle}<div><strong>Näkyvä ero heti</strong><span>Kirkkaat lasit, vaaleat saumat ja kiiltävät hanat.</span></div></li>
        <li>${icon.drop}<div><strong>Helpompi arki</strong><span>Pinnoitetulta pinnalta vesi valuu pois ja lika irtoaa kevyemmin.</span></div></li>
        <li>${icon.shield}<div><strong>Pinnat turvassa</strong><span>Menetelmä valitaan aina materiaalin mukaan – ei hankaavia oikoteitä.</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section services" id="palvelut" aria-labelledby="palvelut-title">
  <div class="wrap">
    <div class="section-head section-head-row reveal">
      <div><p class="eyebrow">Palvelut</p><h2 id="palvelut-title">Kolme tapaa raikkaampaan kylpyhuoneeseen</h2></div>
      <p class="muted">Valitse yksittäinen palvelu tai yhdistä ne. Paras ja pitkäikäisin lopputulos syntyy, kun kylpyhuone ensin puhdistetaan ja kalkki poistetaan, ja pinnat sen jälkeen suojataan.</p>
    </div>
    <div class="service-grid">
      ${SERVICES.map((s, i) => `
      <a class="service-card reveal" href="${s.path}" style="--d:${i * 100}ms">
        <div class="sc-media">${img(s.image, s.alt, { sizes: '(min-width: 1000px) 33vw, (min-width: 700px) 50vw, 100vw' })}<span class="sc-num">0${i + 1}</span></div>
        <div class="sc-body"><h3>${s.nav} <span>Kuopio</span></h3><p>${s.lead}</p><span class="link-arrow">Tutustu palveluun ${icon.arrow}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section ba-section" id="ennen-jalkeen" aria-labelledby="ba-title">
  <div class="wrap">
    <div class="section-head center reveal">
      <p class="eyebrow">Ennen &amp; jälkeen</p>
      <h2 id="ba-title">Ero näkyy – ja tuntuu</h2>
      <p class="muted">Vedä liukusäädintä ja vertaa. Juuri tällaisia muutoksia teemme kuopiolaisissa kylpyhuoneissa joka viikko.</p>
    </div>
    <div class="ba-grid">
      ${beforeAfter({ ...BA.glass, cls: 'ba-large reveal', start: 52 })}
      ${beforeAfter({ ...BA.grout, cls: 'reveal', sizes: '(min-width: 900px) 50vw, 100vw' })}
      ${beforeAfter({ ...BA.tap, cls: 'reveal', sizes: '(min-width: 900px) 50vw, 100vw' })}
    </div>
  </div>
</section>

<section class="section nano-band" aria-labelledby="nano-title">
  <div class="nano-bg">${img('nanopinnoitus-vesipisarat', 'Vesipisarat helmeilevät nanopinnoitetulla lasipinnalla', { sizes: '100vw' })}</div>
  <div class="wrap nano-inner">
    <div class="nano-copy reveal">
      <p class="eyebrow eyebrow-light">Kylpyhuoneen nanopinnoitus</p>
      <h2 id="nano-title">Näkymätön suoja, joka tekee <em>siivouksesta kevyttä</em></h2>
      <p>Nanopinnoite täyttää pinnan mikroskooppiset huokoset ja muodostaa ohuen, vettä hylkivän kerroksen. Vesi ei jää pinnalle kuivumaan, vaan helmeilee ja valuu pois – mukanaan kalkki ja saippuajäämät.</p>
      <a class="btn btn-glass" href="/nanopinnoitus-kuopio/">Lue lisää nanopinnoituksesta ${icon.arrow}</a>
    </div>
    <ul class="nano-points">
      <li class="reveal" style="--d:80ms"><span>${icon.drop}</span><strong>Hylkii vettä</strong><p>Pisarat helmeilevät ja valuvat pois sen sijaan, että kuivuisivat tahroiksi.</p></li>
      <li class="reveal" style="--d:160ms"><span>${icon.shield}</span><strong>Kalkki tarttuu heikommin</strong><p>Vesikivi ja saippuakalvo eivät pääse kiinnittymään yhtä lujasti.</p></li>
      <li class="reveal" style="--d:240ms"><span>${icon.clock}</span><strong>Nopeampi siivous</strong><p>Suihkulasi pysyy pidempään kirkkaana ja pyyhkiytyy puhtaaksi kevyesti.</p></li>
    </ul>
  </div>
</section>

<section class="section packages" id="paketit" aria-labelledby="paketit-title">
  <div class="wrap">
    <div class="section-head center reveal">
      <p class="eyebrow">Palvelukokonaisuudet</p>
      <h2 id="paketit-title">Valitse sopiva kokonaisuus</h2>
      <p class="muted">Hinta määräytyy kylpyhuoneen koon ja kunnon mukaan. Saat aina kiinteän hinnan ennen kuin mitään sovitaan.</p>
    </div>
    <div class="package-grid">
      ${packages.map((p, i) => `
      <article class="package reveal${p.featured ? ' featured' : ''}" style="--d:${i * 100}ms">
        <p class="pk-tag">${p.featured ? icon.sparkle : ''}${p.tag}</p>
        <h3>${p.name}</h3>
        <p class="pk-text">${p.text}</p>
        <ul>${p.items.map((it) => `<li>${icon.check}${it}</li>`).join('')}</ul>
        <a class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-block" href="#tarjous" data-select="${p.value}">Pyydä tarjous ${icon.arrow}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

${processBlock()}
${areaBlock()}
${faqBlock(homeFaq, { title: 'Hyvä tietää ennen tilausta', intro: 'Etkö löydä vastausta? Kysy rohkeasti tarjouspyynnön yhteydessä – vastaamme mielellämme.' })}
${contactSection({ title: 'Raikkaampi kylpyhuone on <em>minuutin päässä</em>' })}`
  return page
}

// ══════════════════════════════════════════════════════════════
//  PALVELUSIVUN POHJA
// ══════════════════════════════════════════════════════════════
function servicePage(cfg) {
  const crumbs = [HOME, { name: cfg.crumb, path: cfg.path }]
  const page = {
    path: cfg.path,
    title: cfg.title,
    description: cfg.description,
    preload: cfg.image,
    ogImage: cfg.image,
    sitemap: { priority: '0.9', changefreq: 'monthly' },
    schema: [
      localBusinessSchema(),
      serviceSchema({ name: cfg.schemaName, serviceType: cfg.serviceType, description: cfg.description, path: cfg.path, image: cfg.image }),
      breadcrumbSchema(crumbs),
      faqSchema(cfg.faq),
    ],
  }
  page.body = `
${serviceHero({ eyebrow: cfg.eyebrow, title: cfg.h1, lead: cfg.lead, image: cfg.image, alt: cfg.imageAlt, crumbs, chips: cfg.chips })}
<div class="wrap trust-wrap">${trustStrip()}</div>

<section class="section intro" aria-labelledby="intro-title">
  <div class="wrap intro-grid${cfg.introFlip ? ' flip' : ''}">
    <div class="intro-copy reveal">
      <p class="eyebrow">${cfg.introEyebrow}</p>
      <h2 id="intro-title">${cfg.introTitle}</h2>
      ${cfg.intro}
    </div>
    <div class="intro-media wide reveal" style="--d:120ms">
      ${img(cfg.introImage, cfg.introImageAlt, { sizes: '(min-width: 900px) 50vw, 100vw' })}
    </div>
  </div>
</section>

<section class="section includes" aria-labelledby="includes-title">
  <div class="wrap">
    <div class="section-head reveal"><p class="eyebrow">Sisältö</p><h2 id="includes-title">${cfg.includesTitle}</h2>${cfg.includesIntro ? `<p class="muted">${cfg.includesIntro}</p>` : ''}</div>
    <ul class="include-grid">
      ${cfg.includes.map(([h, p], i) => `<li class="include reveal" style="--d:${(i % 3) * 80}ms"><span class="inc-ico">${icon.check}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section ba-section ba-single" id="ennen-jalkeen" aria-labelledby="ba-title">
  <div class="wrap ba-split">
    <div class="reveal">
      <p class="eyebrow">Ennen &amp; jälkeen</p>
      <h2 id="ba-title">${cfg.baTitle}</h2>
      <p class="muted">${cfg.baText}</p>
      <a class="btn btn-primary" href="#tarjous">Haluan saman lopputuloksen ${icon.arrow}</a>
    </div>
    ${beforeAfter({ ...BA[cfg.ba], cls: 'reveal', sizes: '(min-width: 900px) 60vw, 100vw' })}
  </div>
</section>

${cfg.extra ?? ''}

${processBlock({ title: cfg.processTitle })}
${faqBlock(cfg.faq, { title: cfg.faqTitle })}
${relatedServices(cfg.path)}
${contactSection({ title: cfg.contactTitle, text: cfg.contactText, selected: cfg.formSelect })}`
  return page
}

// ══════════════════════════════════════════════════════════════
//  KYLPYHUONEEN PUHDISTUS
// ══════════════════════════════════════════════════════════════
const cleaning = () => servicePage({
  path: '/kylpyhuoneen-puhdistus-kuopio/',
  crumb: 'Kylpyhuoneen puhdistus',
  title: 'Kylpyhuoneen puhdistus Kuopio – saumat, laatat ja suihkutila | NanoSavo',
  description: 'Kylpyhuoneen perusteellinen puhdistus Kuopiossa: saumat, laatat, suihkulasit, lattiakaivo ja kalusteet. Kalkki ja home pois ammattilaisen otteella. Pyydä tarjous!',
  schemaName: 'Kylpyhuoneen puhdistus Kuopio',
  serviceType: 'Kylpyhuoneen perusteellinen puhdistus',
  eyebrow: 'Kylpyhuoneen puhdistus Kuopio',
  h1: 'Kylpyhuoneen puhdistus Kuopiossa – <em>lattiasta kattoon</em>',
  lead: 'Tummuneet saumat, saippuakalvo ja pinttynyt lika lähtevät, kun puhdistus tehdään oikeilla aineilla ja ammattivälineillä. Saat kylpyhuoneen, joka näyttää ja tuoksuu taas puhtaalta.',
  image: 'kylpyhuone-ja-sauna',
  imageAlt: 'Perusteellisesti puhdistettu kylpyhuone ja sauna kuopiolaisessa kodissa',
  chips: ['Saumat vaaleiksi', 'Lattiakaivo ja WC mukana', 'Sopii muuttoon ja myyntiin'],
  introEyebrow: 'Syväpuhdistus',
  introTitle: 'Enemmän kuin tavallinen siivous',
  intro: `<p class="lead">Viikkosiivous pitää kylpyhuoneen siistinä, mutta ei poista saumoihin imeytynyttä likaa, lattiakaivoon kertynyttä sakkaa tai laattojen pintaan kovettunutta saippuakalvoa.</p>
<p>Kylpyhuoneen perusteellisessa puhdistuksessa käymme läpi koko tilan järjestelmällisesti ylhäältä alas. Käytämme pintamateriaalille sopivia ammattiaineita ja välineitä – esimerkiksi saumoille omia harjoja ja kromille happamia aineita vain hallitusti – jotta lopputulos on puhdas, mutta pinnat säilyvät ehjinä.</p>
<p>Palvelu sopii omakotitaloihin, kerrostalo- ja rivitaloasuntoihin, vuokra-asuntoihin sekä vapaa-ajan asuntoihin kaikkialla Kuopiossa ja lähikunnissa.</p>`,
  introImage: 'kylpyhuoneen-saumojen-puhdistus',
  introImageAlt: 'Kylpyhuoneen laattasaumojen puhdistus harjalla Kuopiossa',
  includesTitle: 'Mitä kylpyhuoneen puhdistukseen sisältyy?',
  includesIntro: 'Räätälöimme sisällön aina kohteen mukaan. Tyypillisesti puhdistamme ainakin seuraavat:',
  includes: [
    ['Laattasaumat', 'Tummuneet ja harmaantuneet saumat harjataan ja puhdistetaan, jotta niiden alkuperäinen sävy palautuu.'],
    ['Seinä- ja lattialaatat', 'Saippuakalvo, rasva ja kalkkikerrostumat poistetaan koko laattapinnalta.'],
    ['Suihkutila ja -lasit', 'Suihkuseinät, -lasit, suihkutangot ja -letkut puhdistetaan kirkkaiksi.'],
    ['Hanat ja kalusteet', 'Hanat, pesuallas, peilit, kaapistojen pinnat ja valaisinten ulkopinnat.'],
    ['WC-istuin', 'Istuin puhdistetaan perusteellisesti myös saranoiden ja reunojen alta.'],
    ['Lattiakaivo', 'Kaivon kansi ja hajulukko avataan ja puhdistetaan – usein ratkaisu hajuhaittoihin.'],
    ['Pinttyneet tahrat', 'Ruoste-, väri- ja hometahrat käsitellään tahrakohtaisesti niille sopivilla aineilla.'],
    ['Sauna (lisäpalvelu)', 'Lauteiden pesu, seinien ja lattian puhdistus sekä kiukaan ympäristö.'],
    ['Lopputarkastus', 'Käymme lopputuloksen läpi kanssasi ja annamme vinkit puhtauden ylläpitoon.'],
  ],
  ba: 'grout',
  baTitle: 'Saumat, jotka näyttävät taas uusilta',
  baText: 'Tummuneet saumat ovat yksi yleisimmistä syistä, miksi kylpyhuone näyttää vanhalta, vaikka se olisi juuri siivottu. Perusteellinen puhdistus palauttaa saumojen vaalean sävyn – eikä remonttia tarvita.',
  extra: `
<section class="section when" aria-labelledby="when-title">
  <div class="wrap">
    <div class="section-head reveal"><p class="eyebrow">Milloin tilata</p><h2 id="when-title">Tilanteet, joissa perusteellinen puhdistus kannattaa</h2></div>
    <div class="when-grid">
      ${[
        ['Muutto ja asunnon luovutus', 'Jätä vuokra-asunto tai myyty koti siistiin kuntoon – tai aloita uudessa kodissa puhtaalta pöydältä.'],
        ['Asunnon myynti', 'Raikas kylpyhuone on yksi tärkeimmistä ensivaikutelmista esittelyssä ja myynti-ilmoituksen kuvissa.'],
        ['Kerran vuodessa', 'Vuosittainen syväpuhdistus pitää saumat ja pinnat hyvässä kunnossa ja pidentää niiden käyttöikää.'],
        ['Ennen nanopinnoitusta', 'Pinnoite vaatii täysin puhtaan alustan. Puhdistus ja pinnoitus samalla käynnillä on edullisin ratkaisu.'],
      ].map(([h, p], i) => `<article class="when-card reveal" style="--d:${i * 80}ms"><span class="when-num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}
    </div>
  </div>
</section>`,
  processTitle: 'Näin kylpyhuoneen puhdistus etenee',
  faqTitle: 'Kysymyksiä kylpyhuoneen puhdistuksesta',
  faq: [
    { q: 'Kuinka kauan kylpyhuoneen puhdistus kestää?', a: 'Tavallisen kodin kylpyhuoneen perusteellinen puhdistus kestää tyypillisesti 2–5 tuntia riippuen koosta ja likaisuudesta. Arvioimme keston tarjouksen yhteydessä.' },
    { q: 'Saako tummuneet saumat oikeasti vaaleiksi?', a: 'Useimmiten kyllä. Pinnalle kertynyt lika ja saippuakalvo saadaan pois, jolloin saumojen alkuperäinen sävy palautuu. Jos sauma on rikki tai home on tunkeutunut syvälle saumaan, kerromme sen rehellisesti ja ehdotamme sopivaa jatkotoimenpidettä.' },
    { q: 'Poistatteko myös homeen?', a: 'Poistamme pintahomeen ja hometahrat laatoista, saumoista ja silikoneista. Toistuva home voi kertoa ilmanvaihdon tai rakenteiden ongelmasta – silloin suosittelemme myös asiantuntijan arviota.' },
    { q: 'Puhdistatteko myös saunan?', a: 'Kyllä. Saunan pesu on suosittu lisäpalvelu kylpyhuoneen puhdistuksen yhteydessä: lauteet, seinät, lattia ja kiukaan ympäristö.' },
    { q: 'Tarvitsenko omia puhdistusaineita tai välineitä?', a: 'Et tarvitse. Tuomme mukanamme kaikki tarvittavat ammattiaineet ja -välineet.' },
    { q: 'Kannattaako puhdistuksen yhteydessä tehdä nanopinnoitus?', a: 'Usein kyllä. Pinnoite vaatii täysin puhtaan alustan, joten se on järkevintä tehdä heti puhdistuksen perään. Näin lopputulos myös säilyy pidempään.' },
  ],
  contactTitle: 'Pyydä tarjous kylpyhuoneen puhdistuksesta',
  contactText: 'Kerro kylpyhuoneen koko ja mikä siinä eniten harmittaa. Saat kiinteän hinta-arvion kylpyhuoneen puhdistuksesta Kuopiossa – maksutta ja ilman sitoumuksia.',
  formSelect: 'kylpyhuoneen-puhdistus',
})

// ══════════════════════════════════════════════════════════════
//  KALKINPOISTO
// ══════════════════════════════════════════════════════════════
const descaling = () => servicePage({
  path: '/kalkinpoisto-kuopio/',
  crumb: 'Kalkinpoisto',
  title: 'Kalkinpoisto Kuopio – suihkulasit, hanat ja laatat | NanoSavo',
  description: 'Ammattimainen kalkinpoisto Kuopiossa. Poistamme vesikiven ja kalkkitahrat suihkulaseista, hanoista, laatoista ja altaista pintoja vahingoittamatta. Maksuton tarjous.',
  schemaName: 'Kalkinpoisto Kuopio',
  serviceType: 'Kalkinpoisto ja vesikiven poisto',
  eyebrow: 'Kalkinpoisto Kuopio',
  h1: 'Kalkinpoisto Kuopiossa – <em>vesikivi pois</em> pinnat säästäen',
  lead: 'Sumea suihkulasi, valkoinen kuorrutus hanan ympärillä ja laatoissa näkyvät vesitahrat. Poistamme kalkin perusteellisesti, materiaalin ehdoilla – ilman naarmuja ja syöpymiä.',
  image: 'kalkinpoisto-suihkulasi',
  imageAlt: 'Suihkulasin kalkinpoisto mikrokuituliinalla kuopiolaisessa kylpyhuoneessa',
  chips: ['Suihkulasit kirkkaiksi', 'Hanat kiiltäviksi', 'Turvallisesti eri materiaaleille'],
  introEyebrow: 'Miksi kalkkia kertyy',
  introTitle: 'Kalkki ei lähde väkisin – mutta se lähtee oikein',
  intro: `<p class="lead">Kun vesi kuivuu pinnalle, siihen liuenneet mineraalit jäävät jäljelle. Kerros kerrokselta syntyy kova, valkoinen vesikivi, joka sitoo itseensä myös saippuaa ja likaa.</p>
<p>Kuopion seudun vesijohtovesi on melko pehmeää, mutta jatkuva kosteus tekee kalkista silti näkyvän ongelman lähes jokaisessa kylpyhuoneessa. Lähikuntien omakotitaloissa ja mökeillä porakaivovesi sisältää usein selvästi enemmän kalkkia, rautaa ja mangaania – silloin tahrat syntyvät nopeasti.</p>
<p>Kotikonstit, kuten hankaavat sienet tai liian vahvat happamat aineet, voivat naarmuttaa lasia, himmentää kromia ja syövyttää saumoja tai luonnonkiveä. Siksi valitsemme menetelmän aina pinnan mukaan ja etenemme hallitusti.</p>`,
  introImage: 'hana-jalkeen',
  introImageAlt: 'Kiiltävä kromihana ja puhdas pesuallas kalkinpoiston jälkeen',
  introFlip: true,
  includesTitle: 'Mistä kaikkialta poistamme kalkin?',
  includes: [
    ['Suihkulasit ja -seinät', 'Sumentunut lasi kirkastuu, kun kalkki- ja saippuakalvo poistetaan perusteellisesti.'],
    ['Hanat ja suihkut', 'Kromipintojen kalkkikuorrutus pois, suihkusuuttimet ja poreilijat puhtaiksi.'],
    ['Laatat ja saumat', 'Vesitahrat ja valkoiset raidat pois seinä- ja lattialaatoista.'],
    ['Pesuallas ja WC', 'Kalkkirenkaat ja ruskeat jäämät posliinista ja keraamisista pinnoista.'],
    ['Peilit ja metallipinnat', 'Pisaroiden jäljet ja kalkkiläikät peileistä, pyyhekuivaimista ja listoista.'],
    ['Porakaivoveden tahrat', 'Rauta- ja mangaanitahrat sekä kova kalkki mökeiltä ja omakotitaloista.'],
  ],
  ba: 'tap',
  baTitle: 'Kalkin alta paljastuu kiiltävä pinta',
  baText: 'Paksukin kalkkikerros saadaan yleensä poistettua kokonaan. Kun hana ja allas kiiltävät taas, koko kylpyhuone näyttää uudemmalta.',
  extra: `
<section class="section tips" aria-labelledby="tips-title">
  <div class="wrap tips-grid">
    <div class="reveal">
      <p class="eyebrow">Vinkit</p>
      <h2 id="tips-title">Näin hidastat uuden kalkin kertymistä</h2>
      <p class="muted">Pienillä arjen tavoilla on yllättävän suuri vaikutus. Tehokkain keino on kuitenkin nanopinnoitus kalkinpoiston jälkeen.</p>
      <a class="link-arrow" href="/nanopinnoitus-kuopio/">Lue kylpyhuoneen nanopinnoituksesta ${icon.arrow}</a>
    </div>
    <ol class="tip-list">
      <li class="reveal" style="--d:60ms"><strong>Kuivaa suihkulasi lastalla</strong><span>Muutama veto suihkun jälkeen estää pisaroita kuivumasta kalkkitahroiksi.</span></li>
      <li class="reveal" style="--d:120ms"><strong>Huolehdi ilmanvaihdosta</strong><span>Mitä nopeammin pinnat kuivuvat, sitä vähemmän kalkkia ja hometta.</span></li>
      <li class="reveal" style="--d:180ms"><strong>Vältä hankaavia välineitä</strong><span>Naarmuihin tarttuu kalkki entistä helpommin.</span></li>
      <li class="reveal" style="--d:240ms"><strong>Suojaa puhdas pinta</strong><span>Nanopinnoite saa veden helmeilemään pois ennen kuin kalkki ehtii kiinnittyä.</span></li>
    </ol>
  </div>
</section>`,
  processTitle: 'Näin kalkinpoisto etenee',
  faqTitle: 'Kysymyksiä kalkinpoistosta',
  faq: [
    { q: 'Lähteekö paksukin kalkkikerros?', a: 'Lähes aina. Vuosien aikana kertynyt kalkki vaatii enemmän aikaa ja useamman käsittelykerran, mutta se saadaan yleensä poistettua kokonaan. Jos lasi on jo syöpynyt tai naarmuuntunut, kerromme siitä etukäteen.' },
    { q: 'Vahingoittaako kalkinpoisto pintoja?', a: 'Ei, kun menetelmä valitaan oikein. Tunnistamme pintamateriaalit ennen työtä ja käytämme niille sopivia aineita ja välineitä. Esimerkiksi luonnonkivi ja eräät metallipinnat vaativat erityiskäsittelyn.' },
    { q: 'Kuinka nopeasti kalkki palaa takaisin?', a: 'Se riippuu vedestä, käytöstä ja siivoustottumuksista. Ilman suojausta näkyvää kalkkia alkaa tyypillisesti kertyä uudelleen jo muutamassa viikossa. Nanopinnoitus kalkinpoiston jälkeen hidastaa tätä merkittävästi.' },
    { q: 'Teettekö kalkinpoistoa myös mökeille?', a: 'Kyllä. Porakaivovettä käyttävien mökkien ja omakotitalojen kylpyhuoneet ja saunat ovat meille tuttuja kohteita Kuopion ympäristössä.' },
    { q: 'Voiko kalkinpoiston tilata ilman muuta puhdistusta?', a: 'Voi. "Kalkki pois" -kokonaisuus keskittyy juuri kalkkiongelmiin. Moni yhdistää siihen kuitenkin saumojen puhdistuksen tai nanopinnoituksen, jolloin lopputulos on näyttävämpi ja pitkäikäisempi.' },
  ],
  contactTitle: 'Pyydä tarjous kalkinpoistosta',
  contactText: 'Kerro, missä kalkkia on eniten – ja liitä mukaan kuva, jos voit. Saat kiinteän hinta-arvion kalkinpoistosta Kuopiossa nopeasti ja maksutta.',
  formSelect: 'kalkinpoisto',
})

// ══════════════════════════════════════════════════════════════
//  NANOPINNOITUS
// ══════════════════════════════════════════════════════════════
const nano = () => servicePage({
  path: '/nanopinnoitus-kuopio/',
  crumb: 'Kylpyhuoneen nanopinnoitus',
  title: 'Kylpyhuoneen nanopinnoitus Kuopio – helpompi siivous | NanoSavo',
  description: 'Kylpyhuoneen nanopinnoitus Kuopiossa: vettä hylkivä suoja suihkulaseille, laatoille ja hanoille. Kalkki ja lika tarttuvat heikommin ja siivous helpottuu. Pyydä tarjous!',
  schemaName: 'Kylpyhuoneen nanopinnoitus Kuopio',
  serviceType: 'Nanopinnoitus kylpyhuoneen pinnoille',
  eyebrow: 'Nanopinnoitus Kuopio',
  h1: 'Kylpyhuoneen nanopinnoitus Kuopiossa – <em>puhtaus, joka pysyy</em>',
  lead: 'Ohut, näkymätön pinnoite saa veden helmeilemään pois suihkulaseilta, laatoilta ja hanoilta. Kalkki ja saippuakalvo tarttuvat heikommin – ja siivoukseen kuluu selvästi vähemmän aikaa.',
  image: 'nanopinnoitus-vesipisarat',
  imageAlt: 'Vesi helmeilee nanopinnoitetulla suihkulasilla',
  chips: ['Vettä hylkivä suoja', 'Näkymätön ja hajuton kuivuttuaan', 'Puhdistus aina ensin'],
  introEyebrow: 'Miten se toimii',
  introTitle: 'Sileä pinta, johon kalkki ei pääse kiinni',
  intro: `<p class="lead">Lasi, laatta ja kromi näyttävät sileiltä, mutta mikroskoopilla katsottuna niiden pinnassa on lukemattomia pieniä koloja. Niihin vesi, kalkki ja lika tarttuvat.</p>
<p>Nanopinnoite täyttää nämä kolot ja muodostaa pinnalle erittäin ohuen, vettä hylkivän kerroksen. Vesi ei enää leviä kalvoksi, vaan muodostaa pisaroita, jotka valuvat pois. Kun vettä jää pinnalle vähemmän, myös kalkkia ja saippuajäämiä kertyy vähemmän.</p>
<p>Pinnoite on kuivuttuaan näkymätön eikä muuta pinnan ulkonäköä – lasi pysyy kirkkaana ja kromi kiiltävänä. Pinnoitus tehdään aina vasta huolellisen puhdistuksen ja kalkinpoiston jälkeen, sillä pinnoite sitoo alleen kaiken, mitä pinnalla on.</p>`,
  introImage: 'suihkulasi-jalkeen',
  introImageAlt: 'Kirkas, nanopinnoitettu suihkulasi modernissa kylpyhuoneessa',
  includesTitle: 'Mitä pintoja nanopinnoitetaan?',
  includesIntro: 'Arvioimme jokaisen pinnan erikseen. Soveltuvuus riippuu materiaalista, kunnosta ja käyttökohteesta.',
  includes: [
    ['Suihkulasit', 'Suosituin kohde. Lasi pysyy pidempään kirkkaana ja kuivuu nopeasti suihkun jälkeen.'],
    ['Seinälaatat', 'Suihkuseinän laatoille kertyy vähemmän saippuakalvoa ja vesitahroja.'],
    ['Hanat ja suihkut', 'Kromipinnat pysyvät kiiltävinä, ja kalkki pyyhkiytyy pois helposti.'],
    ['Pesuallas ja WC', 'Keraamisiin pintoihin tarttuu vähemmän likaa ja kalkkirenkaita.'],
    ['Peilit', 'Peilit pysyvät pidempään tahrattomina.'],
    ['Lattiat erikseen arvioiden', 'Lattioille käytetään vain liukkautta lisäämättömiä tuotteita – turvallisuus ensin.'],
  ],
  ba: 'glass',
  baTitle: 'Suihkulasi, joka pysyy kirkkaana',
  baText: 'Ensin poistamme kalkin ja saippuakalvon kokonaan, sitten suojaamme lasin. Lopputulos on kirkas pinta, jolle vesi ei jää kuivumaan.',
  extra: `
<section class="section compare" aria-labelledby="compare-title">
  <div class="wrap">
    <div class="section-head center reveal"><p class="eyebrow">Hyödyt arjessa</p><h2 id="compare-title">Ilman pinnoitusta vs. nanopinnoitettu</h2></div>
    <div class="compare-grid reveal">
      <div class="compare-col">
        <p class="compare-h">Ilman pinnoitusta</p>
        <ul>
          <li>Vesi leviää kalvoksi ja kuivuu tahroiksi</li>
          <li>Kalkki kiinnittyy lujasti ja vaatii hankausta</li>
          <li>Suihkulasi sumenee nopeasti</li>
          <li>Voimakkaita pesuaineita tarvitaan usein</li>
        </ul>
      </div>
      <div class="compare-col good">
        <p class="compare-h">${icon.sparkle}Nanopinnoitettu</p>
        <ul>
          <li>${icon.check}Vesi helmeilee ja valuu pois</li>
          <li>${icon.check}Kalkki ja lika irtoavat kevyellä pyyhkäisyllä</li>
          <li>${icon.check}Lasi pysyy pidempään kirkkaana</li>
          <li>${icon.check}Miedot pesuaineet riittävät</li>
        </ul>
      </div>
    </div>
    <p class="fine reveal">Nanopinnoitus ei korvaa säännöllistä siivousta, mutta tekee siitä nopeampaa ja kevyempää. Pinnoitteen käyttöikä riippuu tuotteesta, pintamateriaalista, kulutuksesta ja hoidosta – kerromme arvion valitulle tuotteelle tarjouksessa.</p>
  </div>
</section>`,
  processTitle: 'Näin nanopinnoitus tehdään',
  faqTitle: 'Kysymyksiä kylpyhuoneen nanopinnoituksesta',
  faq: [
    { q: 'Kuinka kauan nanopinnoitus kestää?', a: 'Käyttöikä riippuu pinnoitetuotteesta, pintamateriaalista, kulutuksesta ja siivoustavoista. Kerromme valitun tuotteen arvioidun käyttöiän tarjouksessa ja annamme hoito-ohjeet, joilla pinnoite kestää mahdollisimman pitkään. Pinnoitteen voi myös uusia helposti.' },
    { q: 'Poistaako nanopinnoitus kalkin?', a: 'Ei. Pinnoite ei poista olemassa olevaa kalkkia, vaan estää uutta kiinnittymästä yhtä helposti. Siksi teemme aina ensin perusteellisen puhdistuksen ja kalkinpoiston.' },
    { q: 'Voiko lattian nanopinnoittaa?', a: 'Lattiat arvioidaan aina erikseen. Kylpyhuoneen lattialla turvallisuus on tärkeintä, joten käytämme vain tuotteita, jotka eivät lisää liukkautta – tai jätämme lattian pinnoittamatta, jos sopivaa tuotetta ei ole.' },
    { q: 'Milloin suihkua voi käyttää pinnoituksen jälkeen?', a: 'Pinnoitteen on annettava kuivua ja kovettua ennen kuin pinta kastuu. Odotusaika riippuu tuotteesta ja on tyypillisesti muutamasta tunnista vuorokauteen. Kerromme tarkan ajan käynnin päätteeksi.' },
    { q: 'Miten nanopinnoitettua pintaa hoidetaan?', a: 'Kevyesti. Miedot, pH-neutraalit pesuaineet ja pehmeä liina riittävät. Vältä hankaavia sieniä ja voimakkaita happamia tai emäksisiä aineita. Saat meiltä kirjalliset hoito-ohjeet.' },
    { q: 'Onko nanopinnoite turvallinen?', a: 'Kuivuttuaan pinnoite on hajuton ja pysyy tiukasti pinnassa. Tuuletamme tilan levityksen aikana ja noudatamme aina valmistajan käyttö- ja turvallisuusohjeita.' },
  ],
  contactTitle: 'Pyydä tarjous kylpyhuoneen nanopinnoituksesta',
  contactText: 'Kerro, mitä pintoja haluat suojata. Lähetämme kiinteän hinta-arvion nanopinnoituksesta Kuopiossa – tarvittaessa yhdessä puhdistuksen ja kalkinpoiston kanssa.',
  formSelect: 'nanopinnoitus',
})

// ══════════════════════════════════════════════════════════════
//  TARJOUSPYYNTÖ, KIITOS, TIETOSUOJA, 404
// ══════════════════════════════════════════════════════════════
function quote() {
  const crumbs = [HOME, { name: 'Tarjouspyyntö', path: '/tarjouspyynto/' }]
  return {
    path: '/tarjouspyynto/',
    title: 'Pyydä maksuton tarjous – kylpyhuoneen puhdistus Kuopio | NanoSavo',
    description: 'Pyydä maksuton tarjous kylpyhuoneen puhdistuksesta, kalkinpoistosta tai nanopinnoituksesta Kuopiossa. Lomakkeen täyttäminen vie noin minuutin.',
    sitemap: { priority: '0.8', changefreq: 'yearly' },
    schema: [localBusinessSchema(), breadcrumbSchema(crumbs)],
    body: `
<section class="page-hero" aria-labelledby="page-title">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="wrap quote-page">
    <div class="quote-copy">
      <nav class="crumbs" aria-label="Murupolku"><ol><li><a href="/">Etusivu</a></li><li aria-current="page">Tarjouspyyntö</li></ol></nav>
      <p class="eyebrow eyebrow-light hero-in" style="--d:60ms">Maksuton &amp; sitoumukseton</p>
      <h1 id="page-title" class="hero-in" style="--d:140ms">Pyydä tarjous – <em>vie noin minuutin</em></h1>
      <p class="hero-lead hero-in" style="--d:240ms">Kerro lyhyesti kylpyhuoneestasi. Lähetämme selkeän, kiinteän hinta-arvion kylpyhuoneen puhdistuksesta, kalkinpoistosta tai nanopinnoituksesta.</p>
      <ol class="mini-steps hero-in" style="--d:340ms">
        <li><span>1</span>Täytä lomake ja liitä kuva</li>
        <li><span>2</span>Saat kiinteän hinta-arvion</li>
        <li><span>3</span>Sovitaan sinulle sopiva aika</li>
      </ol>
      ${hasPhone() ? `<p class="quote-call">Kiire? Soita <a href="tel:${site.phone}">${esc(site.phoneDisplay)}</a></p>` : ''}
    </div>
    <div class="form-card hero-in" id="tarjous" style="--d:200ms">${quoteForm()}</div>
  </div>
</section>`,
  }
}

const thanks = () => ({
  path: '/kiitos/',
  title: 'Kiitos tarjouspyynnöstä | NanoSavo',
  description: 'Tarjouspyyntösi on vastaanotettu. Otamme sinuun yhteyttä pian.',
  noindex: true,
  form: false,
  schema: [],
  body: `
<section class="page-hero thanks" aria-labelledby="page-title">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="wrap thanks-inner">
    <div class="thanks-mark hero-in">${icon.check}</div>
    <h1 id="page-title" class="hero-in" style="--d:120ms">Kiitos! <em>Tarjouspyyntösi on perillä.</em></h1>
    <p class="hero-lead hero-in" style="--d:220ms">Käymme pyyntösi läpi ja palaamme asiaan yleensä saman arkipäivän aikana. Jos liitit kuvan, saat arvion todennäköisesti jo ensimmäisessä viestissä.</p>
    <div class="hero-cta hero-in" style="--d:320ms"><a class="btn btn-primary btn-lg" href="/">Takaisin etusivulle ${icon.arrow}</a><a class="btn btn-glass btn-lg" href="/nanopinnoitus-kuopio/">Lue nanopinnoituksesta</a></div>
  </div>
</section>`,
})

const privacy = () => ({
  path: '/tietosuoja/',
  title: 'Tietosuojaseloste | NanoSavo',
  description: 'NanoSavon tietosuojaseloste: miten käsittelemme tarjouspyyntöjen ja yhteydenottojen henkilötietoja.',
  form: false,
  sitemap: { priority: '0.2', changefreq: 'yearly' },
  schema: [breadcrumbSchema([HOME, { name: 'Tietosuojaseloste', path: '/tietosuoja/' }])],
  body: `
<section class="page-hero page-hero-sm" aria-labelledby="page-title">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="wrap">
    <nav class="crumbs" aria-label="Murupolku"><ol><li><a href="/">Etusivu</a></li><li aria-current="page">Tietosuojaseloste</li></ol></nav>
    <h1 id="page-title" class="hero-in">Tietosuojaseloste</h1>
    <p class="hero-lead hero-in" style="--d:120ms">EU:n yleisen tietosuoja-asetuksen (2016/679) mukainen informointi asiakkaille ja yhteydenottajille.</p>
  </div>
</section>
<section class="section prose-section">
  <div class="wrap prose">
    <h2>1. Rekisterinpitäjä</h2>
    <p>${esc(site.legalName)}${site.businessId ? `, Y-tunnus ${esc(site.businessId)}` : ''}<br>${site.address.street ? esc(site.address.street) + ', ' : ''}${site.address.postalCode ? esc(site.address.postalCode) + ' ' : ''}${esc(site.address.city)}${site.email ? `<br>Sähköposti: <a href="mailto:${site.email}">${esc(site.email)}</a>` : ''}${hasPhone() ? `<br>Puhelin: ${esc(site.phoneDisplay)}` : ''}</p>
    <h2>2. Mitä tietoja käsittelemme</h2>
    <p>Käsittelemme tietoja, jotka annat itse tarjouspyyntölomakkeella tai muuten ollessasi yhteydessä meihin: nimi, puhelinnumero, sähköpostiosoite, paikkakunta, kuvaus kohteesta sekä mahdollisesti lähettämäsi valokuvat.</p>
    <h2>3. Käsittelyn tarkoitus ja peruste</h2>
    <p>Tietoja käytetään tarjouspyyntöjen käsittelyyn, tarjousten laatimiseen, palvelun toteuttamiseen ja asiakassuhteen hoitamiseen. Käsittelyn perusteena on sopimuksen valmistelu ja täytäntöönpano sekä rekisterinpitäjän oikeutettu etu asiakassuhteen hoitamisessa. Kirjanpitoon liittyviä tietoja säilytetään lakisääteisen velvoitteen perusteella.</p>
    <h2>4. Tietojen säilytysaika</h2>
    <p>Tarjouspyyntöjen tiedot poistetaan viimeistään 12 kuukauden kuluttua, jos tarjouspyyntö ei johda asiakassuhteeseen. Asiakassuhteeseen liittyviä tietoja säilytetään asiakassuhteen ajan ja kirjanpitolain edellyttämän ajan.</p>
    <h2>5. Tietojen luovutus ja käsittelijät</h2>
    <p>Tietoja ei myydä eikä luovuteta kolmansille osapuolille markkinointitarkoituksiin. Verkkosivuston ja lomakkeiden teknisestä toteutuksesta vastaa palveluntarjoaja Netlify, Inc., jonka palvelimet voivat sijaita myös EU:n ja ETA:n ulkopuolella. Siirroissa noudatetaan EU:n komission vakiosopimuslausekkeita tai muuta tietosuoja-asetuksen mukaista siirtoperustetta.</p>
    <h2>6. Evästeet</h2>
    <p>Sivusto ei käytä seuranta- tai markkinointievästeitä. Fontit ja kuvat ladataan omalta palvelimeltamme, eikä sivulta lähetetä tietoja ulkopuolisille analytiikkapalveluille.</p>
    <h2>7. Rekisteröidyn oikeudet</h2>
    <p>Sinulla on oikeus tarkastaa itseäsi koskevat tiedot, pyytää niiden oikaisemista tai poistamista sekä vastustaa tai rajoittaa niiden käsittelyä. Voit esittää pyynnön yllä mainittuihin yhteystietoihin. Sinulla on myös oikeus tehdä valitus valvontaviranomaiselle, joka Suomessa on tietosuojavaltuutetun toimisto (<a href="https://tietosuoja.fi" rel="noopener">tietosuoja.fi</a>).</p>
    <p class="muted">Päivitetty ${new Date().toLocaleDateString('fi-FI')}.</p>
  </div>
</section>`,
})

const notFound = () => ({
  path: '/404.html',
  out: '404.html',
  title: 'Sivua ei löytynyt | NanoSavo',
  description: 'Etsimääsi sivua ei löytynyt.',
  noindex: true,
  form: false,
  schema: [],
  body: `
<section class="page-hero thanks" aria-labelledby="page-title">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="wrap thanks-inner">
    <p class="big404 hero-in" aria-hidden="true">404</p>
    <h1 id="page-title" class="hero-in" style="--d:120ms">Tämä sivu on <em>kadonnut kuin kalkki</em></h1>
    <p class="hero-lead hero-in" style="--d:220ms">Etsimääsi sivua ei löytynyt. Ehkä jokin näistä auttaa?</p>
    <div class="hero-cta hero-in" style="--d:320ms"><a class="btn btn-primary btn-lg" href="/">Etusivulle ${icon.arrow}</a><a class="btn btn-glass btn-lg" href="/tarjouspyynto/">Pyydä tarjous</a></div>
  </div>
</section>`,
})

export const pages = () => [home(), cleaning(), descaling(), nano(), quote(), privacy(), thanks(), notFound()]
