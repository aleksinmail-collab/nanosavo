# AGENTS.md

- `scripts/build.mjs` renderöi sivut `dist/`-kansioon, tekee sitemap.xml:n, robots.txt:n ja hash-nimetyt CSS/JS-tiedostot. Build = `node scripts/build.mjs` (netlify.toml).
- `src/site.config.mjs`: kaikki yritystiedot. Tyhjät kentät piilotetaan automaattisesti sivuilta ja JSON-LD:stä.
- `src/lib/components.mjs`: header/footer, kuvat (`img()` srcset), ennen–jälkeen-säädin, lomake, schema-funktiot.
- `src/lib/pages.mjs`: kaikki sivut ja suomenkielinen sisältö. Uusi sivu = lisää `pages()`-listaan.
- `src/assets/`: styles.css, main.js, fontit, kuvat (WebP 480/800/1376). `src/static/` kopioidaan juureen.
- Lomake `tarjouspyynto` on staattisessa HTML:ssä (Netlify Forms, honeypot, kuvaliite). Kenttien nimiä ei saa muuttaa huolimattomasti.
- Sisältö suomeksi; ei ulkoisia skriptejä, fontteja tai seurantaa.
