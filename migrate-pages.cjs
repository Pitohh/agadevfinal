const fs = require('fs');
const path = require('path');

// Charger les traductions
const frPath = 'src/locales/fr.json';
const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));

// Créer un map inversé : texte français → clé
const textToKey = new Map();
for (const [key, text] of Object.entries(frTexts)) {
  textToKey.set(text, key);
}

// Liste des fichiers à migrer
const filesToMigrate = [
  'src/pages/Home.tsx',
  'src/pages/About.tsx',
  'src/pages/Missions.tsx',
  'src/pages/Projects.tsx',
  'src/pages/News.tsx',
  'src/pages/Contact.tsx',
  'src/pages/Resources.tsx',
  'src/pages/Opportunities.tsx'
];

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function migrateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`);
    return { success: false, reason: 'not_found' };
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let replacements = 0;

  // 1. Ajouter l'import si nécessaire
  if (!content.includes("from 'react-i18next'")) {
    // Trouver la dernière ligne d'import React
    const importMatch = content.match(/^import.*from ['"]react['"];?$/m);
    if (importMatch) {
      const importLine = importMatch[0];
      const newImport = `${importLine}\nimport { useTranslation } from 'react-i18next';`;
      content = content.replace(importLine, newImport);
    }
  }

  // 2. Ajouter const { t } = useTranslation() dans le composant
  if (!content.includes('useTranslation()')) {
    // Trouver le début du composant
    const componentMatch = content.match(/export default function \w+\([^)]*\)\s*{/);
    if (componentMatch) {
      const componentStart = componentMatch[0];
      content = content.replace(
        componentStart,
        `${componentStart}\n  const { t } = useTranslation();`
      );
    }
  }

  // 3. Remplacer les textes par t('key')
  // Trier par longueur décroissante pour éviter les remplacements partiels
  const sortedTexts = Array.from(textToKey.entries())
    .sort((a, b) => b[0].length - a[0].length);

  for (const [frenchText, key] of sortedTexts) {
    // Ignorer les textes trop courts ou trop génériques
    if (frenchText.length < 5) continue;
    if (['Contact', 'Email', 'Message', 'Titre', 'Date'].includes(frenchText)) continue;

    const escaped = escapeRegex(frenchText);

    // Pattern 1: Texte entre > et < (éviter les variables {})
    const pattern1 = new RegExp(`>\\s*${escaped}\\s*<`, 'g');
    const replacement1 = `>{t('${key}')}<`;
    
    if (pattern1.test(content)) {
      content = content.replace(pattern1, replacement1);
      replacements++;
    }

    // Pattern 2: Attributs title, alt, placeholder (entre guillemets)
    const pattern2 = new RegExp(`(title|alt|placeholder|aria-label)=["']${escaped}["']`, 'g');
    const replacement2 = `$1={t('${key}')}`;
    
    if (pattern2.test(content)) {
      content = content.replace(pattern2, replacement2);
      replacements++;
    }
  }

  // Sauvegarder si modifié
  if (content !== originalContent) {
    // Créer un backup
    fs.writeFileSync(filePath + '.backup', originalContent, 'utf-8');
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true, replacements };
  }

  return { success: false, reason: 'no_changes' };
}

// Exécution
console.log('🔄 Migration automatique vers i18n\n');

const results = {
  migrated: 0,
  notFound: 0,
  noChanges: 0,
  totalReplacements: 0
};

for (const filePath of filesToMigrate) {
  const fileName = path.basename(filePath);
  const result = migrateFile(filePath);

  if (result.success) {
    console.log(`✅ ${fileName} - ${result.replacements} remplacements`);
    results.migrated++;
    results.totalReplacements += result.replacements;
  } else if (result.reason === 'not_found') {
    console.log(`⚠️  ${fileName} - Non trouvé`);
    results.notFound++;
  } else {
    console.log(`⏭️  ${fileName} - Aucun changement nécessaire`);
    results.noChanges++;
  }
}

console.log('\n📊 Résumé:');
console.log(`   - Fichiers migrés: ${results.migrated}`);
console.log(`   - Remplacements totaux: ${results.totalReplacements}`);
console.log(`   - Fichiers non trouvés: ${results.notFound}`);
console.log(`   - Fichiers inchangés: ${results.noChanges}`);

console.log('\n💾 Backups créés: *.backup');
console.log('\n📝 Prochaine étape:');
console.log('   1. Vérifier les fichiers modifiés');
console.log('   2. Tester le site: npm run dev');
console.log('   3. Si problème: restaurer depuis .backup\n');
