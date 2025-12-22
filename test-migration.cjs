const fs = require('fs');

const frTexts = JSON.parse(fs.readFileSync('src/locales/fr.json', 'utf-8'));
const textToKey = new Map();
for (const [key, text] of Object.entries(frTexts)) {
  textToKey.set(text, key);
}

let content = fs.readFileSync('src/pages/Home-test.tsx', 'utf-8');

// Ajouter import
if (!content.includes("from 'react-i18next'")) {
  const importMatch = content.match(/^import.*from ['"]react['"];?$/m);
  if (importMatch) {
    const importLine = importMatch[0];
    const newImport = `${importLine}\nimport { useTranslation } from 'react-i18next';`;
    content = content.replace(importLine, newImport);
    console.log('✅ Import ajouté');
  }
}

// Ajouter hook
if (!content.includes('useTranslation()')) {
  const componentMatch = content.match(/const Home = \(\) => {/);
  if (componentMatch) {
    const componentStart = componentMatch[0];
    content = content.replace(
      componentStart,
      `${componentStart}\n  const { t } = useTranslation();`
    );
    console.log('✅ Hook ajouté');
  }
}

// Sauvegarder
fs.writeFileSync('src/pages/Home-migrated.tsx', content, 'utf-8');
console.log('\n📁 Fichier généré: src/pages/Home-migrated.tsx');
console.log('Vérifie le fichier et montre les 30 premières lignes');
