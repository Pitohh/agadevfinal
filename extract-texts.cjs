#!/usr/bin/env node

/**
 * AGADEV - Extracteur automatique de textes pour traduction
 * Scanne tous les fichiers TSX et extrait les textes statiques
 */

const fs = require('fs');
const path = require('path');

const EXCLUDED_PATTERNS = [
  /className=/,
  /import /,
  /export /,
  /const /,
  /function /,
  /interface /,
  /type /,
  /<\/\w+>/,
  /^\s*$/,
  /^[\d\s\-\+\*\/\(\)]+$/,
  /^(true|false|null|undefined)$/,
  /^[\{\}\[\]]+$/,
];

const extractedTexts = new Map();
let currentFile = '';
let textCounter = 0;

function isValidText(text) {
  if (!text || typeof text !== 'string') return false;
  if (text.length < 2 || text.length > 500) return false;
  if (EXCLUDED_PATTERNS.some(pattern => pattern.test(text))) return false;
  if (!/[a-zàâäéèêëïîôùûüÿæœç]/i.test(text)) return false;
  return true;
}

function extractFromJSX(content) {
  const texts = new Set();
  
  // Textes entre > et <
  const tagContent = content.match(/>([^<>]+)</g);
  if (tagContent) {
    tagContent.forEach(match => {
      const text = match.slice(1, -1).trim();
      if (isValidText(text)) {
        texts.add(text);
      }
    });
  }
  
  // Attributs title, alt, placeholder, aria-label
  const attributes = content.match(/(title|alt|placeholder|aria-label)=["']([^"']+)["']/g);
  if (attributes) {
    attributes.forEach(match => {
      const text = match.match(/=["']([^"']+)["']/)[1].trim();
      if (isValidText(text)) {
        texts.add(text);
      }
    });
  }
  
  return texts;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const texts = extractFromJSX(content);
  
  if (texts.size > 0) {
    currentFile = path.relative(process.cwd(), filePath);
    texts.forEach(text => {
      if (!extractedTexts.has(text)) {
        textCounter++;
        extractedTexts.set(text, {
          id: `text_${textCounter}`,
          fr: text,
          en: '', // À traduire
          files: [currentFile]
        });
      } else {
        extractedTexts.get(text).files.push(currentFile);
      }
    });
  }
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

// Exécution
const srcDir = path.join(process.cwd(), 'src');

if (!fs.existsSync(srcDir)) {
  console.error('❌ Dossier src/ non trouvé');
  process.exit(1);
}

console.log('🔍 Extraction des textes à traduire...\n');
scanDirectory(srcDir);

// Générer le rapport
const report = {
  totalTexts: extractedTexts.size,
  timestamp: new Date().toISOString(),
  texts: Array.from(extractedTexts.values())
};

// Sauvegarder JSON
fs.writeFileSync(
  'translation-report.json',
  JSON.stringify(report, null, 2),
  'utf-8'
);

// Générer fichiers de traduction
const frTexts = {};
const enTexts = {};

report.texts.forEach(item => {
  frTexts[item.id] = item.fr;
  enTexts[item.id] = item.en || item.fr; // Copie FR si EN vide
});

fs.writeFileSync(
  'src/locales/fr.json',
  JSON.stringify(frTexts, null, 2),
  'utf-8'
);

fs.writeFileSync(
  'src/locales/en.json',
  JSON.stringify(enTexts, null, 2),
  'utf-8'
);

// Rapport console
console.log('✅ Extraction terminée!\n');
console.log(`📊 Statistiques:`);
console.log(`   - Textes trouvés: ${report.totalTexts}`);
console.log(`   - Fichiers scannés: ${new Set(report.texts.flatMap(t => t.files)).size}`);
console.log('\n📁 Fichiers générés:');
console.log('   - translation-report.json (rapport détaillé)');
console.log('   - src/locales/fr.json (textes français)');
console.log('   - src/locales/en.json (à traduire)');
console.log('\n📝 Prochaine étape:');
console.log('   1. Traduire src/locales/en.json');
console.log('   2. Lancer npm run translate:apply\n');
