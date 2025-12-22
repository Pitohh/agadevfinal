const fs = require('fs');

const frPath = 'src/locales/fr.json';
const enPath = 'src/locales/en.json';

const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

// Nouvelles clés nécessaires pour Home.tsx
const newKeys = {
  // Banner
  'transformer_notre_capital_naturel': {
    fr: "Transformer notre capital naturel en opportunité pour demain",
    en: "Transforming our natural capital into opportunities for tomorrow"
  },
  'lagadev_oeuvre_transition': {
    fr: "L'Agence Gabonaise pour le Développement de l'Économie Verte œuvre pour une transition écologique durable au Gabon",
    en: "The Gabonese Agency for Green Economy Development works for a sustainable ecological transition in Gabon"
  },
  'decouvrir_nos_missions': {
    fr: "Découvrir nos missions",
    en: "Discover our missions"
  },
  
  // Mission icons
  'capital_naturel': {
    fr: "Capital naturel",
    en: "Natural capital"
  },
  'valorisation_des_forets_biodiversite': {
    fr: "Valorisation des forêts et de la biodiversité du Gabon",
    en: "Valuation of Gabon's forests and biodiversity"
  },
  'credits_carbone': {
    fr: "Crédits carbone",
    en: "Carbon credits"
  },
  'monetisation_des_credits_carbone': {
    fr: "Monétisation des crédits carbone et de biodiversité",
    en: "Monetization of carbon and biodiversity credits"
  },
  'investissements_verts': {
    fr: "Investissements verts",
    en: "Green investments"
  },
  'promotion_facilitation_investissements': {
    fr: "Promotion et facilitation des investissements écologiques",
    en: "Promotion and facilitation of green investments"
  },
  'sensibilisation': {
    fr: "Sensibilisation",
    en: "Awareness"
  },
  'information_des_acteurs_publics': {
    fr: "Information des acteurs publics, privés et des citoyens",
    en: "Information for public, private actors and citizens"
  },
  
  // Section welcome
  'bienvenue_lagadev': {
    fr: "Bienvenue à l'AGADEV",
    en: "Welcome to AGADEV"
  },
  'savoir_plus': {
    fr: "En savoir plus",
    en: "Learn more"
  },
  
  // Section missions
  'lagadev_articule_son_action': {
    fr: "L'AGADEV articule son action autour de quatre piliers stratégiques",
    en: "AGADEV organizes its action around four strategic pillars"
  },
  'decouvrir_toutes_nos_missions': {
    fr: "Découvrir toutes nos missions",
    en: "Discover all our missions"
  },
  
  // Section news
  'actualites_recentes': {
    fr: "Actualités récentes",
    en: "Recent news"
  },
  'decouvrez_dernieres_nouvelles': {
    fr: "Découvrez les dernières nouvelles de l'AGADEV",
    en: "Discover the latest news from AGADEV"
  },
  'lancement_officiel_agadev': {
    fr: "Lancement officiel de l'AGADEV",
    en: "Official launch of AGADEV"
  },
  'lagence_gabonaise_officiellement_lancee': {
    fr: "L'Agence Gabonaise pour le Développement de l'Économie Verte a été officiellement lancée par le Président de la République.",
    en: "The Gabonese Agency for Green Economy Development was officially launched by the President of the Republic."
  },
  'signature_partenariat_cenarest': {
    fr: "Signature d'un partenariat stratégique avec le CENAREST",
    en: "Signing of a strategic partnership with CENAREST"
  },
  'lagadev_cenarest_unissent_forces': {
    fr: "L'AGADEV et le Centre National de la Recherche Scientifique et Technologique unissent leurs forces.",
    en: "AGADEV and the National Center for Scientific and Technological Research join forces."
  },
  'participation_cop30_belem': {
    fr: "Participation à la COP30 à Belém",
    en: "Participation in COP30 in Belém"
  },
  'lagadev_representera_gabon_cop30': {
    fr: "L'AGADEV représentera le Gabon lors de la 30ème Conférence des Parties sur les changements climatiques au Brésil.",
    en: "AGADEV will represent Gabon at the 30th Conference of the Parties on climate change in Brazil."
  },
  'lire_suite': {
    fr: "Lire la suite",
    en: "Read more"
  },
  'voir_toutes_les_actualites': {
    fr: "Voir toutes les actualités",
    en: "See all news"
  },
  
  // Partners
  'nos_partenaires': {
    fr: "Nos partenaires",
    en: "Our partners"
  },
  'ministere_economie': {
    fr: "Ministère de l'Économie",
    en: "Ministry of Economy"
  },
  'cenarest': {
    fr: "CENAREST",
    en: "CENAREST"
  },
  'pnud': {
    fr: "PNUD",
    en: "UNDP"
  },
  'banque_africaine_developpement': {
    fr: "Banque Africaine de Développement",
    en: "African Development Bank"
  },
  'union_europeenne': {
    fr: "Union Européenne",
    en: "European Union"
  },
  
  // CTA section
  'participez_transition_ecologique': {
    fr: "Participez à la transition écologique",
    en: "Participate in the ecological transition"
  },
  'decouvrez_appels_projets': {
    fr: "Découvrez nos appels à projets et opportunités pour contribuer au développement de l'économie verte au Gabon.",
    en: "Discover our calls for projects and opportunities to contribute to the development of the green economy in Gabon."
  },
  'voir_les_opportunites': {
    fr: "Voir les opportunités",
    en: "See opportunities"
  },
  
  // Dates
  '15_janvier_2025': {
    fr: "15 janvier 2025",
    en: "January 15, 2025"
  },
  '3_fevrier_2025': {
    fr: "3 février 2025",
    en: "February 3, 2025"
  },
  '7_mars_2025': {
    fr: "7 mars 2025",
    en: "March 7, 2025"
  }
};

let added = 0;

for (const key in newKeys) {
  if (!frTexts[key]) {
    frTexts[key] = newKeys[key].fr;
    enTexts[key] = newKeys[key].en;
    console.log(`✅ ${key}`);
    added++;
  }
}

fs.writeFileSync(frPath, JSON.stringify(frTexts, null, 2), 'utf-8');
fs.writeFileSync(enPath, JSON.stringify(enTexts, null, 2), 'utf-8');

console.log(`\n✅ ${added} nouvelles clés ajoutées !`);
