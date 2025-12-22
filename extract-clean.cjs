const fs = require('fs');
const path = require('path');

const EXCLUDED_PATTERNS = [
  /^\s*\{/,  // Commence par {
  /\}\s*$/,  // Finit par }
  /^\s*\/\*/,  // Commentaire /*
  /\*\/\s*$/,  // Fin commentaire */
  /<\//,  // Balise fermante
  /className=/,
  /import /,
  /export /,
  /const /,
  /function /,
  /interface /,
  /type /,
  /^\s*$/,
  /^[\d\s\-\+\*\/\(\)]+$/,
  /^(true|false|null|undefined)$/,
  /^[\{\}\[\]]+$/,
  /https?:\/\//,
  /\.(jpg|png|svg|webp|gif)$/,
  /^[A-Z_]+$/,  // Constantes
  /\?\./,  // Optional chaining
  /=>/,  // Arrow function
  /===|!==|&&|\|\|/,  // Opérateurs
];

const extractedTexts = new Map();
let textCounter = 0;

function isValidFrenchText(text) {
  if (!text || typeof text !== 'string') return false;
  
  // Nettoyer
  text = text.trim();
  
  // Longueur
  if (text.length < 3 || text.length > 500) return false;
  
  // Exclure patterns
  if (EXCLUDED_PATTERNS.some(pattern => pattern.test(text))) return false;
  
  // Doit contenir au moins 2 lettres françaises
  const frenchLetters = text.match(/[a-zàâäéèêëïîôùûüÿæœç]/gi);
  if (!frenchLetters || frenchLetters.length < 2) return false;
  
  // Doit contenir au moins un mot de 3+ lettres
  const words = text.split(/\s+/).filter(w => /[a-zàâäéèêëïîôùûüÿæœç]{3,}/i.test(w));
  if (words.length === 0) return false;
  
  return true;
}

function generateKey(text) {
  const words = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 4);
  
  if (words.length === 0) {
    return `text_${textCounter}`;
  }
  
  let baseKey = words.join('_');
  let finalKey = baseKey;
  let suffix = 1;
  
  while (Array.from(extractedTexts.values()).some(v => v.key === finalKey)) {
    finalKey = `${baseKey}_${suffix}`;
    suffix++;
  }
  
  return finalKey;
}

function extractFromJSX(content) {
  const texts = new Set();
  
  // Nettoyer le contenu des commentaires
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  content = content.replace(/\/\/.*/g, '');
  
  // Textes entre > et < (en évitant les variables)
  const tagContent = content.match(/>([^<>{}]+)</g);
  if (tagContent) {
    tagContent.forEach(match => {
      let text = match.slice(1, -1).trim();
      
      // Ignorer si contient des accolades
      if (text.includes('{') || text.includes('}')) return;
      
      if (isValidFrenchText(text)) {
        texts.add(text);
      }
    });
  }
  
  // Attributs avec guillemets simples ou doubles
  const attributes = content.match(/(title|alt|placeholder|aria-label|label)=["']([^"'{}<>]+)["']/g);
  if (attributes) {
    attributes.forEach(match => {
      const text = match.match(/=["']([^"']+)["']/)[1].trim();
      
      if (isValidFrenchText(text)) {
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
    const relativePath = path.relative(process.cwd(), filePath);
    texts.forEach(text => {
      if (!extractedTexts.has(text)) {
        textCounter++;
        const key = generateKey(text);
        extractedTexts.set(text, {
          key: key,
          fr: text,
          en: '',
          files: [relativePath]
        });
      } else {
        const existing = extractedTexts.get(text);
        if (!existing.files.includes(relativePath)) {
          existing.files.push(relativePath);
        }
      }
    });
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Dossier ${dir} non trouvé`);
    return;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      try {
        scanFile(fullPath);
      } catch (err) {
        console.error(`⚠️  Erreur lecture ${fullPath}:`, err.message);
      }
    }
  }
}

// Exécution
const srcDir = path.join(process.cwd(), 'src');

console.log('🔍 Extraction PROPRE des textes français...\n');
scanDirectory(srcDir);

// Sauvegarder
const localesDir = path.join(srcDir, 'locales');
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

const texts = Array.from(extractedTexts.values());
const frJson = {};
const enJson = {};

texts.forEach(item => {
  frJson[item.key] = item.fr;
  enJson[item.key] = '';
});

// Backup des anciens fichiers
if (fs.existsSync(path.join(localesDir, 'fr.json'))) {
  fs.renameSync(
    path.join(localesDir, 'fr.json'),
    path.join(localesDir, 'fr.json.backup')
  );
}
if (fs.existsSync(path.join(localesDir, 'en.json'))) {
  fs.renameSync(
    path.join(localesDir, 'en.json'),
    path.join(localesDir, 'en.json.backup')
  );
}

fs.writeFileSync(
  path.join(localesDir, 'fr.json'),
  JSON.stringify(frJson, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(localesDir, 'en.json'),
  JSON.stringify(enJson, null, 2),
  'utf-8'
);

// Rapport
const report = {
  totalTexts: texts.length,
  timestamp: new Date().toISOString(),
  files: [...new Set(texts.flatMap(t => t.files))].length,
  texts: texts
};

fs.writeFileSync(
  'translation-report-clean.json',
  JSON.stringify(report, null, 2),
  'utf-8'
);

console.log('✅ Extraction propre terminée!\n');
console.log(`📊 Statistiques:`);
console.log(`   - Textes français valides: ${texts.length}`);
console.log(`   - Fichiers scannés: ${report.files}`);
console.log(`\n📁 Fichiers générés:`);
console.log(`   - src/locales/fr.json (propre)`);
console.log(`   - src/locales/en.json (vide)`);
console.log(`   - Backups créés: fr.json.backup, en.json.backup`);
console.log(`\n📝 Prochaine étape:`);
console.log(`   node translate-deepl.cjs\n`);

// Aperçu
console.log('📄 Aperçu des premiers textes:');
texts.slice(0, 10).forEach((item, i) => {
  console.log(`   ${i + 1}. "${item.key}": "${item.fr}"`);
});
if (texts.length > 10) {
  console.log(`   ... et ${texts.length - 10} autres\n`);
}
