const fs = require('fs');

const frPath = 'src/locales/fr.json';
const enPath = 'src/locales/en.json';

const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

// Clés manquantes à ajouter
const newKeys = {
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.missions': { fr: 'Nos missions', en: 'Our missions' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.resources': { fr: 'Ressources', en: 'Resources' },
  'nav.news': { fr: 'Actualités', en: 'News' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.opportunities': { fr: 'Opportunités', en: 'Opportunities' }
};

let added = 0;

for (const key in newKeys) {
  if (!frTexts[key]) {
    frTexts[key] = newKeys[key].fr;
    enTexts[key] = newKeys[key].en;
    console.log(`✅ Ajouté: ${key}`);
    added++;
  }
}

// Sauvegarder
fs.writeFileSync(frPath, JSON.stringify(frTexts, null, 2), 'utf-8');
fs.writeFileSync(enPath, JSON.stringify(enTexts, null, 2), 'utf-8');

console.log(`\n✅ ${added} clés ajoutées !`);
console.log('\n📝 Redémarre le site: npm run dev\n');
