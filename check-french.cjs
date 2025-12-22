const fs = require('fs');

const enPath = 'src/locales/en.json';
const frPath = 'src/locales/fr.json';

const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));

function hasFrenchChars(text) {
  return /[àâäéèêëïîôùûüÿæœç]/i.test(text);
}

const frenchKeys = [];
const keys = Object.keys(enTexts);

keys.forEach((key, index) => {
  const enText = enTexts[key];
  const frText = frTexts[key] || '';
  
  if (enText === '' || hasFrenchChars(enText) || enText === frText) {
    frenchKeys.push({
      lineNumber: index + 2,
      key: key,
      fr: frText,
      en: enText
    });
  }
});

console.log(`📊 Total de clés: ${keys.length}`);
console.log(`❌ Textes encore en français: ${frenchKeys.length}\n`);

frenchKeys.forEach((item, i) => {
  console.log(`${i + 1}. Ligne ${item.lineNumber} - "${item.key}"`);
  console.log(`   FR: "${item.fr}"`);
  console.log(`   EN: "${item.en}"\n`);
});

fs.writeFileSync('textes-a-traduire.json', JSON.stringify(frenchKeys, null, 2));
console.log(`💾 Liste sauvegardée: textes-a-traduire.json`);
