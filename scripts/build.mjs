// NanoSavo – staattisen sivuston generaattori (ei riippuvuuksia).
// Ajetaan Netlifyssä: node scripts/build.mjs → dist/
import { mkdir, rm, cp, writeFile, readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { site, hasPhone, hasEmail } from '../src/site.config.mjs'
import { header, footer, mobileBar, esc, abs, imgSrc, IMAGES } from '../src/lib/components.mjs'
import { pages } from '../src/lib/pages.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'src')
const dist = path.join(root, 'dist')

await rm(dist, { recursive: true, force: true })
await mkdir(path.join(dist, 'assets'), { recursive: true })
await cp(path.join(src, 'assets', 'img'), path.join(dist, 'assets', 'img'), { recursive: true })
await cp(path.join(src, 'assets', 'fonts'), path.join(dist, 'assets', 'fonts'), { recursive: true })
for (const f of await readdir(path.join(src, 'static'))) await cp(path.join(src, 'static', f), path.join(dist, f), { recursive: true })

// CSS ja JS sisältötiivisteellä → voidaan välimuistittaa pysyvästi
const minifyCss = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim()
async function hashed(file, transform = (x) => x) {
  const body = transform(await readFile(path.join(src, 'assets', file), 'utf8'))
  const h = createHash('sha256').update(body).digest('hex').slice(0, 10)
  const [name, ext] = file.split('.')
  const out = `${name}.${h}.${ext}`
  await writeFile(path.join(dist, 'assets', out), body)
  return `/assets/${out}`
}
const cssHref = await hashed('styles.css', minifyCss)
const jsHref = await hashed('main.js')

function head(page) {
  const url = abs(page.path === '/404.html' ? '/' : page.path)
  const og = page.ogImage ? abs(imgSrc(page.ogImage, 1376)) : abs('/assets/img/og-nanosavo.jpg')
  const preload = page.preload
    ? `<link rel="preload" as="image" type="image/webp" imagesrcset="${[480, 800, 1376].filter((w) => w <= IMAGES[page.preload][0]).map((w) => `/assets/img/${page.preload}-${w}.webp ${w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">`
    : ''
  const graph = page.schema?.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': page.schema })}</script>` : ''
  return `<!doctype html>
<html lang="fi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">\n<meta name="robots" content="index, follow, max-image-preview:large">`}
<meta name="theme-color" content="#06243a">
<meta name="format-detection" content="telephone=no">
<meta name="geo.region" content="FI-15">
<meta name="geo.placename" content="Kuopio">
<meta property="og:type" content="website">
<meta property="og:locale" content="fi_FI">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="${cssHref}">
<script src="${jsHref}" defer></script>
${graph}
</head>`
}

const render = (page) =>
  `${head(page)}
<body class="${page.form === false ? 'no-form' : ''}">
${header(page)}
<main id="sisalto">
${page.body}
</main>
${footer()}
${mobileBar(page)}
</body>
</html>`

const tidy = (html) => html.replace(/\n\s*\n+/g, '\n').replace(/^\s+/gm, '')

const all = pages()
for (const page of all) {
  const out = page.out ?? path.join(page.path.replace(/^\//, ''), 'index.html')
  await mkdir(path.dirname(path.join(dist, out)), { recursive: true })
  await writeFile(path.join(dist, out), tidy(render(page)))
}

// Sivustokartta ja robots.txt
const today = new Date().toISOString().slice(0, 10)
const indexable = all.filter((p) => !p.noindex && p.sitemap)
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${today}</lastmod><changefreq>${p.sitemap.changefreq}</changefreq><priority>${p.sitemap.priority}</priority></url>`).join('\n')}
</urlset>
`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /kiitos/\n\nSitemap: ${site.url}/sitemap.xml\n`)

const missing = [!hasPhone() && 'puhelinnumero', !hasEmail() && 'sähköposti', !site.businessId && 'Y-tunnus'].filter(Boolean)
console.log(`✓ ${all.length} sivua → dist/`)
if (missing.length) console.log(`ℹ Täydennä src/site.config.mjs: ${missing.join(', ')}`)
