import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { TreePine, Leaf, BarChart3, Users, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Missions = () => {
  const { t } = useTranslation();
  const bannerImage = "/foret-gabonaise-9.jpg.jpg";

  const missions = [
    {
      id: "capital-naturel",
      icon: <TreePine className="w-12 h-12 text-green-forest" />,
      title: t('valorisation_capital_naturel'),
      description: t('gabon_possede_forets'),
      actions: [
        t('cartographie_evaluation_ressources'),
        t('developpement_mecanismes_valorisation'),
        t('elaboration_projets_conservation'),
        t('coordination_efforts_recherche')
      ],
      image: "/foret-gabonaise-1.jpg.jpg"
    },
    {
      id: "credits-carbone",
      icon: <Leaf className="w-12 h-12 text-green-forest" />,
      title: t('monetisation_credits_carbone'),
      description: t('forets_gabonaises_stockent'),
      actions: [
        t('developpement_certification_projets'),
        t('facilitation_acces_marches'),
        t('suivi_verification_reductions'),
        t('repartition_equitable_benefices')
      ],
      image: "/foret-gabonaise-2.jpg.jpg"
    },
    {
      id: "investissements",
      icon: <BarChart3 className="w-12 h-12 text-green-forest" />,
      title: t('promotion_investissements_verts'),
      description: t('lagadev_encourage_investissements'),
      actions: [
        t('identification_promotion_opportunites'),
        t('mise_en_relation_porteurs'),
        t('developpement_mecanismes_financement'),
        t('accompagnement_technique_administratif')
      ],
      image: "/foret-gabonaise-3.jpg.jpg"
    },
    {
      id: "sensibilisation",
      icon: <Users className="w-12 h-12 text-green-forest" />,
      title: t('sensibilisation_formation'),
      description: t('pour_assurer_reussite'),
      actions: [
        t('organisation_campagnes_sensibilisation'),
        t('formation_fonctionnaires_entrepreneurs'),
        t('publication_guides_ressources'),
        t('collaboration_etablissements_enseignement')
      ],
      image: "/foret-gabonaise-4.jpg.jpg"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner
        title={t('nos_missions')}
        subtitle={t('lagadev_oeuvre_pour_gabon')}
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title={t('notre_ambition')}
              center={true}
            />
            <p className="text-lg mb-6">
              {t('lagadev_ambition_faire_gabon')}
            </p>
            <p className="text-lg mb-6">
              {t('pour_y_parvenir')}
            </p>
          </div>
        </div>
      </section>

      {/* Missions Detail */}
      {missions.map((mission, index) => (
        <section
          key={mission.id}
          id={mission.id}
          className={`section ${index % 2 === 0 ? 'bg-beige-light/20' : 'bg-white'}`}
        >
          <div className="container-custom">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div>
                <div className="flex items-center mb-4">
                  {mission.icon}
                  <h2 className="text-3xl font-bold text-green-medium ml-3">{mission.title}</h2>
                </div>

                <p className="mb-6 text-lg">{mission.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-green-medium">{t('nos_actions')}</h3>
                <ul className="space-y-3 mb-6">
                  {mission.actions.map((action, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="flex-shrink-0 w-5 h-5 text-yellow-400 mt-1" />
                      <span className="ml-2">{action}</span>
                    </li>
                  ))}
                </ul>

                <Button to="/projets-programmes" variant="primary">
                  {t('voir_projets_associes')}
                </Button>
              </div>

              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={mission.image}
                  alt={mission.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-16 bg-green-forest text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">{t('participez_a_nos_missions')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white">
            {t('vous_souhaitez_contribuer')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/opportunites" variant="primary" size="lg">
              {t('voir_les_opportunites')}
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-medium">
              {t('nous_contacter')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Missions;
