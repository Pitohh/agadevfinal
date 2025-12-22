const fs = require('fs');

const frTexts = JSON.parse(fs.readFileSync('src/locales/fr.json', 'utf-8'));

// Chercher les textes qui existent dans Home.tsx
const homeContent = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

console.log('🔍 Textes français trouvés dans Home.tsx:\n');

let found = 0;
for (const [key, text] of Object.entries(frTexts)) {
  if (homeContent.includes(text) && text.length > 10) {
    console.log(`✅ "${text}" → clé: "${key}"`);
    found++;
    if (found > 10) break; // Limiter à 10 pour lisibilité
  }
}

console.log(`\nTotal trouvés: ${found}`);
