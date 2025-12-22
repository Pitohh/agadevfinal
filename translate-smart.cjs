const https = require('https');
const fs = require('fs');

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';

// Textes à ignorer (déjà corrects ou noms propres)
const SKIP_KEYS = [
  'admin_agadev', 'change_language', 'linkedin', 'facebook', 'contact',
  'infosagadevgaboncom', 'scyrielle_sende_etali', 'menu', 'email',
  'message', 'sabliere', 'marcel_nzamba', 'return', 'href',
  'actif', 'cover', 'statut', 'actions', 'date', 'publication',
  'description', 'contenu', 'titre', 'titre_1', 'titre_2',
  'admin_admin2025', 'administration_agadev'
];

// Traductions manuelles simples
const MANUAL_TRANSLATIONS = {
  'nous_contacter': 'Contact us',
  'votre_nom': 'Your name',
  'postuler': 'Apply',
  'financement': 'Funding',
  'date_limite': 'Deadline',
  'offres_demploi': 'Job offers',
  'lire_suite_1': 'Read more →',
  'chargement': 'Loading...',
  'notre_ambition': 'Our ambition',
  'nos_actions': 'Our actions:',
  'suivez': 'Follow',
  'comment_soumettre_projet': 'How to submit a project?',
  'ils_nous_ont_rejoints': 'They joined us',
  'candidater_pour_stage': 'Apply for an internship',
  'plateformes_internationales': 'International platforms',
  'nos_initiatives_pour': 'Our initiatives for',
  'retour_aux_projets': 'Back to projects',
  'aucun_projet_pour_moment': 'No projects at the moment',
  'projets_programmes_1': 'Projects and Programs',
  'stagiaires': 'Interns',
  'programme_stages': 'Internship program',
  'offres': 'Offers',
  'total_projets': 'Total Projects',
  'aucun_projet': 'No project',
  'statut_projet': 'Project Status',
  'image_couverture': 'Cover image'
};

async function translateText(text) {
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

async function smartTranslate() {
  console.log('🌐 Traduction intelligente FR → EN\n');

  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY non définie\n');
    process.exit(1);
  }

  const frPath = 'src/locales/fr.json';
  const enPath = 'src/locales/en.json';

  const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  let updated = 0;
  let skipped = 0;
  let manual = 0;
  let deepl = 0;

  console.log('📝 Analyse et traduction...\n');

  for (const key in frTexts) {
    const frText = frTexts[key];
    const enText = enTexts[key];

    // Déjà correct (pas d'accents français)
    if (!/[àâäéèêëïîôùûüÿæœç]/i.test(enText) && enText !== frText) {
      skipped++;
      continue;
    }

    // Dans la liste à ignorer
    if (SKIP_KEYS.includes(key)) {
      skipped++;
      continue;
    }

    // Traduction manuelle disponible
    if (MANUAL_TRANSLATIONS[key]) {
      enTexts[key] = MANUAL_TRANSLATIONS[key];
      console.log(`✅ ${key}: "${frText}" → "${MANUAL_TRANSLATIONS[key]}" (manuel)`);
      updated++;
      manual++;
      continue;
    }

    // Nécessite DeepL
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause 500ms
      const translation = await translateText(frText);
      enTexts[key] = translation;
      console.log(`🌐 ${key}: "${frText}" → "${translation}" (DeepL)`);
      updated++;
      deepl++;
    } catch (err) {
      console.error(`❌ ${key}: ${err.message}`);
    }
  }

  // Sauvegarder
  fs.writeFileSync(enPath, JSON.stringify(enTexts, null, 2), 'utf-8');

  console.log('\n✅ Traduction terminée!\n');
  console.log('📊 Résultats:');
  console.log(`   - Textes mis à jour: ${updated}`);
  console.log(`   - Traductions manuelles: ${manual}`);
  console.log(`   - Traductions DeepL: ${deepl}`);
  console.log(`   - Textes ignorés (corrects): ${skipped}`);
  console.log(`\n📁 Fichier: src/locales/en.json\n`);
}

smartTranslate().catch(err => {
  console.error('\n❌ Erreur:', err);
  process.exit(1);
});
