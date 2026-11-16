/* NanoSavo – käyttöliittymä (ei riippuvuuksia) */
(() => {
  const $ = (s, el = document) => el.querySelector(s)
  const $$ = (s, el = document) => [...el.querySelectorAll(s)]
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── ylätunniste: tausta ja piilotus vierittäessä ─────────
  const header = $('[data-header]')
  let lastY = scrollY
  const onScroll = () => {
    const y = scrollY
    header.classList.toggle('is-scrolled', y > 24)
    const hide = y > 500 && y > lastY + 4 && !document.body.classList.contains('menu-open')
    if (hide) header.classList.add('is-hidden')
    else if (y < lastY - 4 || y < 500) header.classList.remove('is-hidden')
    lastY = y
  }
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // ── mobiilivalikko ───────────────────────────────────────
  const menu = $('[data-menu]')
  const menuBtn = $('[data-menu-btn]')
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open))
    $('.visually-hidden', menuBtn).textContent = open ? 'Sulje valikko' : 'Avaa valikko'
    document.body.classList.toggle('menu-open', open)
    if (open) {
      menu.hidden = false
      requestAnimationFrame(() => menu.classList.add('is-open'))
      header.classList.remove('is-hidden')
    } else {
      menu.classList.remove('is-open')
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true }, 350)
    }
  }
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'))
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)))
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus() } })

  // ── esiinliukuminen ──────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  $$('.reveal').forEach((el) => io.observe(el))

  // ── ennen–jälkeen-liukusäätimet ──────────────────────────
  $$('[data-ba]').forEach((fig) => {
    const range = $('.ba-range', fig)
    const set = (v) => fig.style.setProperty('--pos', v + '%')
    range.addEventListener('input', () => set(range.value))
    range.addEventListener('pointerdown', () => fig.classList.add('is-active'))
    addEventListener('pointerup', () => fig.classList.remove('is-active'))
    // Esittelyliike, kun kuva tulee näkyviin ensimmäisen kerran
    if (reduce) return
    const start = Number(range.value)
    const demo = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      demo.disconnect()
      const keys = [[0, start], [700, 78], [1500, 24], [2300, start]]
      const t0 = performance.now()
      let stopped = false
      const stop = () => { stopped = true }
      range.addEventListener('pointerdown', stop, { once: true })
      range.addEventListener('keydown', stop, { once: true })
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
      const tick = (now) => {
        if (stopped) return
        const t = now - t0 - 400
        if (t < 0) return requestAnimationFrame(tick)
        let i = keys.findIndex((k) => k[0] > t)
        if (i === -1) { set(start); range.value = start; return }
        const [ta, va] = keys[i - 1], [tb, vb] = keys[i]
        const v = va + (vb - va) * ease((t - ta) / (tb - ta))
        set(v.toFixed(2)); range.value = v
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    demo.observe(fig)
  })

  // ── tarjouslomake ────────────────────────────────────────
  $$('[data-quote-form]').forEach((form) => {
    const src = $('[data-source]', form)
    if (src) src.value = location.pathname + (document.referrer ? ` (tuli: ${document.referrer})` : '')
    const file = $('[data-file]', form)
    const label = $('[data-file-name]', form)
    const drop = $('.file-drop', form)
    const MAX = 8 * 1024 * 1024
    file?.addEventListener('change', () => {
      const f = file.files[0]
      if (!f) { label.textContent = 'Kuva nopeuttaa tarjousta · enintään 8 Mt'; drop.classList.remove('has-file'); return }
      if (f.size > MAX) {
        file.value = ''
        label.textContent = 'Kuva on liian suuri (yli 8 Mt). Valitse pienempi kuva.'
        drop.classList.remove('has-file')
        return
      }
      label.textContent = `${f.name} · ${(f.size / 1024 / 1024).toFixed(1)} Mt`
      drop.classList.add('has-file')
    })
    $$('input[required]', form).forEach((inp) => {
      inp.addEventListener('invalid', () => inp.classList.add('is-invalid'))
      inp.addEventListener('input', () => inp.validity.valid && inp.classList.remove('is-invalid'))
    })
    form.addEventListener('submit', () => {
      const btn = $('[data-submit]', form)
      btn.disabled = true
      btn.firstChild.textContent = 'Lähetetään… '
    })
  })

  // ── mobiilin pikapalkki ──────────────────────────────────
  const bar = $('[data-mobile-bar]')
  if (bar) {
    const hero = $('.hero, .page-hero')
    const contact = $('#tarjous')
    let pastHero = false, atForm = false
    const update = () => bar.classList.toggle('is-visible', pastHero && !atForm)
    if (hero) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update() }, { threshold: 0.15 }).observe(hero)
    else { pastHero = true; update() }
    if (contact) new IntersectionObserver(([e]) => { atForm = e.isIntersecting; update() }, { threshold: 0.05 }).observe(contact)
  }
})()
