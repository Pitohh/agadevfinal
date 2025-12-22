const fs = require('fs');

const frPath = 'src/locales/fr.json';
const enPath = 'src/locales/en.json';

const frTexts = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
const enTexts = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

const newKeys = {
  // ===== ABOUT PAGE =====
  'a_propos_agadev': { fr: "À propos de l'AGADEV", en: "About AGADEV" },
  'qui_sommes_nous': { fr: "Qui sommes-nous ?", en: "Who are we?" },
  'lagadev_a_ete_creee': { fr: "L'AGADEV a été créée pour valoriser le capital naturel du Gabon", en: "AGADEV was created to valorize Gabon's natural capital" },
  'notre_mission_principale_valoriser': { fr: "Notre mission principale est de valoriser le capital naturel du Gabon et de promouvoir l'investissement vert, positionnant ainsi le pays comme un acteur majeur de la transition écologique en Afrique centrale.", en: "Our main mission is to valorize Gabon's natural capital and promote green investment, thus positioning the country as a major player in the ecological transition in Central Africa." },
  'lagadev_joue_role_crucial': { fr: "L'AGADEV joue un rôle crucial dans la stratégie nationale du Gabon pour concilier développement économique et préservation de l'environnement, notamment à travers la gestion des crédits carbone et la promotion de projets innovants.", en: "AGADEV plays a crucial role in Gabon's national strategy to reconcile economic development and environmental preservation, particularly through carbon credit management and the promotion of innovative projects." },
  '85_territoire_couvert_forets': { fr: "85% du territoire", en: "85% of territory" },
  'couvert_de_forets': { fr: "couvert de forêts", en: "covered by forests" },
  
  'notre_vision': { fr: "Notre vision", en: "Our vision" },
  'faire_gabon_modele': { fr: "Faire du Gabon un modèle de développement économique durable en Afrique, où la croissance économique va de pair avec la préservation de l'environnement et l'amélioration du bien-être des populations.", en: "Making Gabon a model of sustainable economic development in Africa, where economic growth goes hand in hand with environmental preservation and improving people's well-being." },
  'nous_aspirons_gabon': { fr: "Nous aspirons à un Gabon où le capital naturel est pleinement valorisé et contribue significativement à la prospérité nationale.", en: "We aspire to a Gabon where natural capital is fully valorized and contributes significantly to national prosperity." },
  
  'mettre_en_oeuvre_strategie': { fr: "Mettre en oeuvre la stratégie nationale pour l'économie verte en mobilisant tous les acteurs concernés : pouvoirs publics, secteur privé, société civile et partenaires internationaux.", en: "Implementing the national strategy for the green economy by mobilizing all stakeholders: public authorities, private sector, civil society and international partners." },
  'promouvoir_adoption_pratiques': { fr: "Promouvoir l'adoption de pratiques durables dans tous les secteurs économiques et faciliter l'accès aux financements verts.", en: "Promoting the adoption of sustainable practices in all economic sectors and facilitating access to green financing." },
  
  'nos_valeurs': { fr: "Nos valeurs", en: "Our values" },
  'principes_qui_guident': { fr: "Les principes qui guident notre action au quotidien", en: "The principles that guide our daily action" },
  'durabilite': { fr: "Durabilité", en: "Sustainability" },
  'nous_promouvons_developpement': { fr: "Nous promouvons un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à satisfaire leurs propres besoins.", en: "We promote development that meets the needs of the present without compromising the ability of future generations to meet their own needs." },
  'excellence': { fr: "Excellence", en: "Excellence" },
  'nous_visons_excellence': { fr: "Nous visons l'excellence dans toutes nos actions et projets, en nous appuyant sur des données scientifiques et les meilleures pratiques internationales.", en: "We aim for excellence in all our actions and projects, relying on scientific data and international best practices." },
  'transparence': { fr: "Transparence", en: "Transparency" },
  'nous_agissons_avec_integrite': { fr: "Nous agissons avec intégrité et transparence dans la gestion de nos projets et dans nos relations avec toutes nos parties prenantes.", en: "We act with integrity and transparency in the management of our projects and in our relationships with all our stakeholders." },
  'innovation': { fr: "Innovation", en: "Innovation" },
  'nous_encourageons_innovation': { fr: "Nous encourageons l'innovation et la créativité dans la recherche de solutions durables aux défis environnementaux et économiques.", en: "We encourage innovation and creativity in finding sustainable solutions to environmental and economic challenges." },
  
  'notre_direction': { fr: "Notre direction", en: "Our leadership" },
  'directrice_generale': { fr: "Directrice Générale", en: "General Director" },
  'titulaire_doctorat': { fr: "Titulaire d'un doctorat en économie environnementale de l'Université de Cambridge et forte d'une expérience de 15 ans dans la gestion de projets environnementaux internationaux, Scyrielle Sende Etali dirige l'AGADEV depuis sa création en janvier 2025.", en: "Holder of a PhD in environmental economics from Cambridge University and with 15 years of experience in managing international environmental projects, Scyrielle Sende Etali has been leading AGADEV since its creation in January 2025." },
  'sous_sa_direction': { fr: "Sous sa direction, l'AGADEV s'est engagée à transformer le capital naturel du Gabon en un véritable moteur de croissance économique durable.", en: "Under her leadership, AGADEV is committed to transforming Gabon's natural capital into a real driver of sustainable economic growth." },
  
  'cadre_juridique': { fr: "Cadre juridique", en: "Legal framework" },
  'lagadev_inscrit_cadre': { fr: "L'AGADEV s'inscrit dans un cadre légal solide", en: "AGADEV operates within a solid legal framework" },
  'textes_fondateurs': { fr: "Textes fondateurs", en: "Founding texts" },
  'decret_001_pr': { fr: "Décret n°001/PR/MEDD du 10 janvier 2025", en: "Decree n°001/PR/MEDD of January 10, 2025" },
  'portant_creation_organisation_fonctionnement': { fr: "Portant création, organisation et fonctionnement de l'Agence Gabonaise pour le Développement de l'Économie Verte", en: "On the creation, organization and operation of the Gabonese Agency for Green Economy Development" },
  'loi_024_2024': { fr: "Loi n°024/2024 du 5 décembre 2024", en: "Law n°024/2024 of December 5, 2024" },
  'relative_economie_verte': { fr: "Relative à l'économie verte et au développement durable au Gabon", en: "Relating to the green economy and sustainable development in Gabon" },
  'arrete_0035': { fr: "Arrêté n°0035/MEDD/CAB du 15 janvier 2025", en: "Order n°0035/MEDD/CAB of January 15, 2025" },
  'portant_nomination_membres': { fr: "Portant nomination des membres du Conseil d'Administration de l'AGADEV", en: "Appointing members of the AGADEV Board of Directors" },
  
  // ===== MISSIONS PAGE =====
  'lagadev_oeuvre_pour_gabon': { fr: "L'AGADEV œuvre pour un Gabon prospère et durable à travers quatre missions principales", en: "AGADEV works for a prosperous and sustainable Gabon through four main missions" },
  'lagadev_ambition_faire_gabon': { fr: "L'AGADEV a pour ambition de faire du Gabon un leader de l'économie verte en Afrique, en transformant ses atouts naturels en opportunités de développement durable et en créant un modèle économique innovant qui préserve l'environnement tout en améliorant le bien-être des populations.", en: "AGADEV aims to make Gabon a leader in the green economy in Africa, by transforming its natural assets into sustainable development opportunities and creating an innovative economic model that preserves the environment while improving people's well-being." },
  'pour_y_parvenir': { fr: "Pour y parvenir, nous articulons notre action autour de quatre piliers stratégiques qui se renforcent mutuellement et contribuent à la réalisation de notre vision commune.", en: "To achieve this, we organize our action around four strategic pillars that reinforce each other and contribute to the realization of our common vision." },
  
  'valorisation_capital_naturel': { fr: "Valorisation du capital naturel", en: "Valuation of natural capital" },
  'gabon_possede_forets': { fr: "Le Gabon possède l'une des forêts tropicales les mieux préservées au monde, avec plus de 85% de son territoire couvert de forêts. L'AGADEV travaille à la valorisation de cette richesse naturelle à travers des inventaires forestiers, des études de biodiversité et des projets de conservation.", en: "Gabon has one of the best-preserved tropical forests in the world, with more than 85% of its territory covered by forests. AGADEV works to valorize this natural wealth through forest inventories, biodiversity studies and conservation projects." },
  'cartographie_evaluation_ressources': { fr: "Cartographie et évaluation des ressources forestières et de la biodiversité", en: "Mapping and assessment of forest resources and biodiversity" },
  'developpement_mecanismes_valorisation': { fr: "Développement de mécanismes de valorisation des services écosystémiques", en: "Development of mechanisms for valuing ecosystem services" },
  'elaboration_projets_conservation': { fr: "Élaboration de projets de conservation et de gestion durable des ressources naturelles", en: "Development of conservation projects and sustainable management of natural resources" },
  'coordination_efforts_recherche': { fr: "Coordination des efforts de recherche sur la biodiversité gabonaise", en: "Coordination of research efforts on Gabonese biodiversity" },
  
  'monetisation_credits_carbone': { fr: "Monétisation des crédits carbone", en: "Monetization of carbon credits" },
  'forets_gabonaises_stockent': { fr: "Les forêts gabonaises stockent d'importantes quantités de carbone, offrant une opportunité unique de générer des revenus à travers les marchés carbone. L'AGADEV développe et met en œuvre des projets de réduction des émissions et supervise la vente de crédits carbone sur les marchés internationaux.", en: "Gabonese forests store significant amounts of carbon, offering a unique opportunity to generate revenue through carbon markets. AGADEV develops and implements emissions reduction projects and supervises the sale of carbon credits on international markets." },
  'developpement_certification_projets': { fr: "Développement et certification de projets carbone conformes aux standards internationaux", en: "Development and certification of carbon projects in compliance with international standards" },
  'facilitation_acces_marches': { fr: "Facilitation de l'accès aux marchés carbone volontaires et réglementés", en: "Facilitation of access to voluntary and regulated carbon markets" },
  'suivi_verification_reductions': { fr: "Suivi et vérification des réductions d'émissions", en: "Monitoring and verification of emissions reductions" },
  'repartition_equitable_benefices': { fr: "Répartition équitable des bénéfices générés par les crédits carbone", en: "Equitable distribution of benefits generated by carbon credits" },
  
  'promotion_investissements_verts': { fr: "Promotion des investissements verts", en: "Promotion of green investments" },
  'lagadev_encourage_investissements': { fr: "L'AGADEV encourage les investissements dans des projets et entreprises qui contribuent à la transition écologique, en facilitant l'accès au financement et en créant un environnement favorable aux initiatives vertes.", en: "AGADEV encourages investments in projects and companies that contribute to the ecological transition, by facilitating access to financing and creating a favorable environment for green initiatives." },
  'identification_promotion_opportunites': { fr: "Identification et promotion d'opportunités d'investissement vert", en: "Identification and promotion of green investment opportunities" },
  'mise_en_relation_porteurs': { fr: "Mise en relation entre porteurs de projets et investisseurs", en: "Connecting project leaders with investors" },
  'developpement_mecanismes_financement': { fr: "Développement de mécanismes de financement innovants (obligations vertes, prêts concessionnels)", en: "Development of innovative financing mechanisms (green bonds, concessional loans)" },
  'accompagnement_technique_administratif': { fr: "Accompagnement technique et administratif des projets verts", en: "Technical and administrative support for green projects" },
  
  'sensibilisation_formation': { fr: "Sensibilisation et formation", en: "Awareness and training" },
  'pour_assurer_reussite': { fr: "Pour assurer la réussite de la transition vers une économie verte, l'AGADEV mène des activités de sensibilisation et de formation auprès des différents acteurs de la société gabonaise.", en: "To ensure the success of the transition to a green economy, AGADEV conducts awareness and training activities for various actors in Gabonese society." },
  'organisation_campagnes_sensibilisation': { fr: "Organisation de campagnes de sensibilisation sur les enjeux environnementaux", en: "Organization of awareness campaigns on environmental issues" },
  'formation_fonctionnaires_entrepreneurs': { fr: "Formation des fonctionnaires, entrepreneurs et étudiants aux métiers verts", en: "Training civil servants, entrepreneurs and students in green jobs" },
  'publication_guides_ressources': { fr: "Publication de guides et de ressources sur l'économie verte", en: "Publication of guides and resources on the green economy" },
  'collaboration_etablissements_enseignement': { fr: "Collaboration avec les établissements d'enseignement pour intégrer l'économie verte dans les cursus", en: "Collaboration with educational institutions to integrate the green economy into curricula" },
  'voir_projets_associes': { fr: "Voir les projets associés", en: "See related projects" },
  
  'participez_a_nos_missions': { fr: "Participez à nos missions", en: "Participate in our missions" },
  'vous_souhaitez_contribuer': { fr: "Vous souhaitez contribuer à la transition écologique du Gabon ? Découvrez nos opportunités de collaboration et nos appels à projets.", en: "Do you want to contribute to Gabon's ecological transition? Discover our collaboration opportunities and calls for projects." },
  
  // ===== CONTACT PAGE =====
  'contacteznous': { fr: "Contactez-nous", en: "Contact us" },
  'notre_equipe_a_disposition': { fr: "Notre équipe est à votre disposition pour répondre à vos questions", en: "Our team is at your disposal to answer your questions" },
  'envoyeznous_un_message': { fr: "Envoyez-nous un message", en: "Send us a message" },
  'nous_vous_repondrons': { fr: "Nous vous répondrons dans les meilleurs délais", en: "We will respond to you as soon as possible" },
  'nom_complet': { fr: "Nom complet", en: "Full name" },
  'sujet': { fr: "Sujet", en: "Subject" },
  'ce_champ_obligatoire': { fr: "Ce champ est obligatoire", en: "This field is required" },
  'adresse_email_invalide': { fr: "Adresse email invalide", en: "Invalid email address" },
  'sujet_de_votre_message': { fr: "Sujet de votre message", en: "Subject of your message" },
  'votre_message': { fr: "Votre message", en: "Your message" },
  'envoyer': { fr: "Envoyer", en: "Send" },
  
  'nos_coordonnees': { fr: "Nos coordonnées", en: "Our contact information" },
  'plusieurs_facons_contacter': { fr: "Plusieurs façons de nous contacter", en: "Several ways to contact us" },
  'adresse': { fr: "Adresse", en: "Address" },
  'la_sabliere': { fr: "La Sablière", en: "La Sablière" },
  'residence_les_paletuviers': { fr: "Résidence Les Paletuviers", en: "Résidence Les Paletuviers" },
  'immeuble_b_b402': { fr: "Immeuble B, B402", en: "Building B, B402" },
  'telephone': { fr: "Téléphone", en: "Phone" },
  'horaires_ouverture': { fr: "Horaires d'ouverture", en: "Opening hours" },
  'lundi_vendredi': { fr: "Lundi - Vendredi: 8h00 - 16h30", en: "Monday - Friday: 8:00 AM - 4:30 PM" },
  'ferme_weekends': { fr: "Fermé les week-ends et jours fériés", en: "Closed on weekends and public holidays" },
  'carte_interactive': { fr: "Carte interactive (à venir)", en: "Interactive map (coming soon)" },
  
  'questions_specifiques': { fr: "Des questions spécifiques ?", en: "Specific questions?" },
  'equipe_experts_disponible': { fr: "Notre équipe d'experts est disponible pour répondre à vos questions sur nos programmes, les opportunités de financement ou les partenariats potentiels.", en: "Our team of experts is available to answer your questions about our programs, funding opportunities or potential partnerships." },
  'questions_sur_projets': { fr: "Questions sur les projets", en: "Questions about projects" },
  'pour_toute_question_projets': { fr: "Pour toute question concernant nos projets en cours ou futurs.", en: "For any questions about our current or future projects." },
  'partenariats': { fr: "Partenariats", en: "Partnerships" },
  'pour_discuter_opportunites': { fr: "Pour discuter d'opportunités de collaboration avec l'AGADEV.", en: "To discuss collaboration opportunities with AGADEV." },
  'recrutement': { fr: "Recrutement", en: "Recruitment" },
  'pour_postuler_renseigner': { fr: "Pour postuler ou se renseigner sur nos offres d'emploi.", en: "To apply or inquire about our job offers." }
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

console.log(`\n✅ ${added} nouvelles clés ajoutées pour About, Missions et Contact !`);
