const https = require('https');
const fs = require('fs');
const path = require('path');

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';

async function translateText(text) {
  if (!text || text.trim() === '') {
    return text;
  }
  
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      target_lang: 'EN-US',
      source_lang: 'FR',
      formality: 'default'
    });

    const options = {
      hostname: 'api-free.deepl.com',
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
            reject(new Error('Réponse invalide de DeepL'));
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

function hasFrenchChars(text) {
  return /[àâäéèêëïîôùûüÿæœç]/i.test(text);
}

async function translateMissing() {
  console.log('🌐 Traduction des textes manquants (lignes 94-199)\n');

  if (!DEEPL_API_KEY) {
    console.error('❌ Variable DEEPL_API_KEY non définie\n');
    console.log('   export DEEPL_API_KEY="ta_clé"\n');
    process.exit(1);
  }

  const frPath = path.join(process.cwd(), 'src/locales/fr.json');
  const enPath = path.join(process.cwd(), 'src/locales/en.json');

  if (!fs.existsSync(frPath) || !fs.existsSync(enPath)) {
    console.error('❌ Fichiers fr.json ou en.json non trouvés\n');
    process.exit(1);
  }

  const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  // Trouver les clés avec textes français (non traduits)
  const keysToTranslate = [];
  
  for (const key in frTexts) {
    const enText = enTexts[key] || '';
    
    // Si vide ou contient des accents français
    if (enText === '' || hasFrenchChars(enText)) {
      keysToTranslate.push(key);
    }
  }

  const total = keysToTranslate.length;
  
  if (total === 0) {
    console.log('✅ Aucune traduction manquante ! Tout est OK.\n');
    return;
  }

  console.log(`📊 ${total} textes à retraduire\n`);

  let completed = 0;
  let errors = 0;

  // Traduire par lots de 5 (plus prudent)
  const batchSize = 5;
  const delayMs = 2000; // 2 secondes entre chaque batch

  for (let i = 0; i < keysToTranslate.length; i += batchSize) {
    const batch = keysToTranslate.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (key) => {
        try {
          const translation = await translateText(frTexts[key]);
          enTexts[key] = translation;
          completed++;
          console.log(`✅ ${key}: "${frTexts[key]}" → "${translation}"`);
        } catch (err) {
          console.error(`❌ ${key}: ${err.message}`);
          enTexts[key] = frTexts[key]; // Fallback
          errors++;
          completed++;
        }
      })
    );

    // Pause entre les batchs
    if (i + batchSize < keysToTranslate.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      console.log(`\n⏸️  Pause 2s... (${completed}/${total})\n`);
    }
  }

  // Sauvegarder
  fs.writeFileSync(enPath, JSON.stringify(enTexts, null, 2), 'utf-8');

  console.log('\n✅ Traduction complétée!\n');
  console.log(`📊 Résultats:`);
  console.log(`   - Textes traduits: ${completed - errors}/${total}`);
  console.log(`   - Erreurs: ${errors}`);
  console.log(`\n📁 Fichier mis à jour: src/locales/en.json\n`);
}

translateMissing().catch(err => {
  console.error('\n❌ Erreur:', err);
  process.exit(1);
});
