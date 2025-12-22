#!/usr/bin/env node

/**
 * AGADEV - Migration automatique des fichiers TSX vers i18n
 * Remplace les textes en dur par des appels t('key')
 */

const fs = require('fs');
const path = require('path');

// Charger le mapping de traduction
const translationMap = new Map();

function loadTranslationKeys() {
  const reportPath = 'translation-report.json';
  
  if (!fs.existsSync(reportPath)) {
    console.error('❌ Fichier translation-report.json non trouvé');
    console.log('   Exécutez d\'abord: node extract-texts.js');
    process.exit(1);
  }
  
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  
  report.texts.forEach(item => {
    translationMap.set(item.fr, item.id);
  });
  
  console.log(`✅ ${translationMap.size} clés de traduction chargées\n`);
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let modified = false;
  
  // 1. Ajouter l'import du hook si nécessaire
  if (!content.includes('useT') && !content.includes('useTranslation')) {
    const importStatement = "import { useT } from '../hooks/useTranslation';\n";
    
    // Trouver la dernière ligne d'import
    const importLines = content.match(/^import .+;$/gm);
    if (importLines && importLines.length > 0) {
      const lastImport = importLines[importLines.length - 1];
      content = content.replace(lastImport, lastImport + '\n' + importStatement);
      modified = true;
    }
  }
  
  // 2. Ajouter const t = useT() dans le composant
  const componentMatch = content.match(/export default function (\w+)\s*\([^)]*\)\s*{/);
  if (componentMatch && !content.includes('const t = useT()')) {
    const componentStart = componentMatch[0];
    content = content.replace(
      componentStart,
      componentStart + '\n  const t = useT();'
    );
    modified = true;
  }
  
  // 3. Remplacer les textes par t('key')
  translationMap.forEach((key, frenchText) => {
    // Échapper les caractères spéciaux regex
    const escaped = frenchText
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/'/g, "\\'");
    
    // Pattern pour texte entre > et <
    const tagPattern = new RegExp(`>\\s*${escaped}\\s*<`, 'g');
    const tagReplacement = `>{t('${key}')}<`;
    
    if (tagPattern.test(content)) {
      content = content.replace(tagPattern, tagReplacement);
      modified = true;
    }
    
    // Pattern pour attributs (title, alt, placeholder)
    const attrPattern = new RegExp(`(title|alt|placeholder|aria-label)=["']${escaped}["']`, 'g');
    const attrReplacement = `$1={t('${key}')}`;
    
    if (attrPattern.test(content)) {
      content = content.replace(attrPattern, attrReplacement);
      modified = true;
    }
  });
  
  // Sauvegarder si modifié
  if (modified && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  
  return false;
}

function migrateDirectory(dir, stats = { total: 0, migrated: 0 }) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
      migrateDirectory(fullPath, stats);
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      stats.total++;
      
      if (migrateFile(fullPath)) {
        stats.migrated++;
        console.log(`✅ ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
  
  return stats;
}

// Exécution
console.log('🔄 Migration automatique vers i18n\n');

loadTranslationKeys();

const srcDir = path.join(process.cwd(), 'src');
const stats = migrateDirectory(srcDir);

console.log(`\n📊 Migration terminée:`);
console.log(`   - Fichiers scannés: ${stats.total}`);
console.log(`   - Fichiers migrés: ${stats.migrated}`);
console.log(`   - Fichiers inchangés: ${stats.total - stats.migrated}\n`);

console.log('⚠️  IMPORTANT:');
console.log('   Vérifiez manuellement les fichiers migrés');
console.log('   Certains remplacements peuvent nécessiter des ajustements\n');
