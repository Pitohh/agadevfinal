#!/usr/bin/env node

/**
 * AGADEV - Traducteur automatique FR -> EN via DeepL
 * Utilise l'API DeepL pour traduire src/locales/en.json
 */

const https = require('https');
const fs = require('fs');

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'VOTRE_CLE_DEEPL_ICI';
const DEEPL_FREE_API = 'api-free.deepl.com';

async function translateText(text, targetLang = 'EN-GB') {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      target_lang: targetLang,
      source_lang: 'FR',
      formality: 'default'
    });

    const options = {
      hostname: DEEPL_FREE_API,
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.toString().length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.translations && result.translations[0]) {
            resolve(result.translations[0].text);
          } else {
            reject(new Error('Invalid DeepL response'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(data.toString());
    req.end();
  });
}

async function translateJsonFile() {
  console.log('🌐 Traduction automatique FR -> EN via DeepL\n');

  // Vérifier la clé API
  if (DEEPL_API_KEY === 'VOTRE_CLE_DEEPL_ICI') {
    console.error('❌ DEEPL_API_KEY non configurée');
    console.log('\n📝 Pour obtenir une clé gratuite:');
    console.log('   1. https://www.deepl.com/pro-api');
    console.log('   2. export DEEPL_API_KEY="votre_cle_ici"');
    console.log('   3. Relancer ce script\n');
    process.exit(1);
  }

  // Charger les fichiers
  const frPath = 'src/locales/fr.json';
  const enPath = 'src/locales/en.json';

  if (!fs.existsSync(frPath)) {
    console.error('❌ Fichier fr.json non trouvé');
    process.exit(1);
  }

  const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enTexts = {};

  const keys = Object.keys(frTexts);
  const total = keys.length;
  let completed = 0;

  console.log(`📊 ${total} textes à traduire\n`);

  // Traduire par lots de 20 (limite API gratuite)
  const batchSize = 20;
  const delay = 1000; // 1 seconde entre chaque batch

  for (let i = 0; i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (key) => {
        try {
          const translation = await translateText(frTexts[key]);
          enTexts[key] = translation;
          completed++;
          
          const progress = ((completed / total) * 100).toFixed(1);
          process.stdout.write(`\r⏳ Progression: ${progress}% (${completed}/${total})`);
        } catch (err) {
          console.error(`\n❌ Erreur pour "${key}":`, err.message);
          enTexts[key] = frTexts[key]; // Fallback: copier le français
        }
      })
    );

    // Pause entre les batchs
    if (i + batchSize < keys.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Sauvegarder
  fs.writeFileSync(enPath, JSON.stringify(enTexts, null, 2), 'utf-8');

  console.log('\n\n✅ Traduction terminée!');
  console.log(`📁 Fichier généré: ${enPath}`);
  console.log(`📊 ${completed}/${total} textes traduits\n`);
}

// Exécution
translateJsonFile().catch(err => {
  console.error('\n❌ Erreur fatale:', err);
  process.exit(1);
});
