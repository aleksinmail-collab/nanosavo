// ─────────────────────────────────────────────────────────────
//  NanoSavo – sivuston perustiedot
//  Kaikki yritys- ja yhteystiedot muokataan TÄSTÄ tiedostosta.
//  Tyhjäksi jätetty kenttä ('') piilotetaan sivustolta ja
//  rakenteisesta datasta automaattisesti.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'NanoSavo',
  legalName: 'NanoSavo', // virallinen toiminimi, esim. 'NanoSavo Oy'
  url: 'https://nanosavo.fi',
  tagline: 'Kylpyhuoneiden puhdistus & nanopinnoitus',

  // TÄYDENNÄ: puhelinnumero kansainvälisessä muodossa, esim. '+358401234567'
  phone: '',
  // TÄYDENNÄ: puhelinnumero sellaisena kuin se näytetään, esim. '040 123 4567'
  phoneDisplay: '',
  // TÄYDENNÄ: sähköpostiosoite, esim. 'info@nanosavo.fi'
  email: '',
  // TÄYDENNÄ: Y-tunnus, esim. '1234567-8'
  businessId: '',

  // Osoite. Katuosoitteen voi jättää tyhjäksi, jos yritys toimii asiakkaan luona.
  address: {
    street: '',
    postalCode: '',
    city: 'Kuopio',
    region: 'Pohjois-Savo',
    country: 'FI',
  },
  geo: { lat: 62.8924, lng: 27.677 }, // Kuopion keskusta

  // Aukioloajat rakenteista dataa ja alatunnistetta varten
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00', label: 'Ma–pe 8–18' },
    { days: ['Saturday'], opens: '10:00', closes: '15:00', label: 'La sopimuksen mukaan' },
  ],

  // Palvelualue (näkyy sivuilla ja rakenteisessa datassa)
  areaServed: ['Kuopio', 'Siilinjärvi', 'Leppävirta', 'Suonenjoki', 'Tuusniemi', 'Rautalampi'],
  // Kuopion asuinalueita, joita mainitaan paikallisesti sivuilla
  districts: ['Keskusta', 'Saaristokaupunki', 'Petonen', 'Neulamäki', 'Puijonlaakso', 'Männistö', 'Särkiniemi', 'Jynkkä', 'Vehmasmäki', 'Kelloniemi', 'Rypysuo', 'Nilsiä', 'Karttula', 'Maaninka', 'Juankoski', 'Vehmersalmi'],

  // Sosiaalinen media (täydennä täydelliset osoitteet tai jätä tyhjäksi)
  social: {
    facebook: '',
    instagram: '',
  },
}

export const hasPhone = () => Boolean(site.phone && site.phoneDisplay)
export const hasEmail = () => Boolean(site.email)
