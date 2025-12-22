import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { CheckCircle2, Clock, FileText, Award } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const bannerImage = "/foret-gabonaise-6.jpg.jpg";

  const values = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-forest" />,
      title: t('durabilite'),
      description: t('nous_promouvons_developpement')
    },
    {
      icon: <Award className="w-8 h-8 text-green-forest" />,
      title: t('excellence'),
      description: t('nous_visons_excellence')
    },
    {
      icon: <FileText className="w-8 h-8 text-green-forest" />,
      title: t('transparence'),
      description: t('nous_agissons_avec_integrite')
    },
    {
      icon: <Clock className="w-8 h-8 text-green-forest" />,
      title: t('innovation'),
      description: t('nous_encourageons_innovation')
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner
        title={t('a_propos_agadev')}
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle
                title={t('qui_sommes_nous')}
                subtitle={t('lagadev_a_ete_creee')}
              />
              <p className="mb-4">
                {t('lagence_gabonaise_pour_developpement')}
              </p>
              <p className="mb-4">
                {t('notre_mission_principale_valoriser')}
              </p>
              <p className="mb-4">
                {t('lagadev_joue_role_crucial')}
              </p>
            </div>

            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/foret-gabonaise-7.jpg.jpg"
                  alt={t('foret_gabonaise')}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-y-1/4 -translate-x-1/4 bg-white p-4 rounded-lg shadow-lg w-40 md:w-60 z-10">
                <div className="text-center">
                  <p className="font-semibold text-green-medium">{t('85_territoire_couvert_forets')}</p>
                  <p className="text-sm text-blue-black/70">{t('couvert_de_forets')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-medium mb-4">{t('notre_vision')}</h3>
              <p className="mb-2">
                {t('faire_gabon_modele')}
              </p>
              <p>
                {t('nous_aspirons_gabon')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-medium mb-4">{t('notre_mission')}</h3>
              <p className="mb-2">
                {t('mettre_en_oeuvre_strategie')}
              </p>
              <p>
                {t('promouvoir_adoption_pratiques')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle
            title={t('nos_valeurs')}
            subtitle={t('principes_qui_guident')}
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-4 p-6 bg-beige-light/20 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="text-green-medium">{value.icon}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-green-medium">{value.title}</h3>
                  <p className="text-blue-black/80">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <SectionTitle
            title={t('notre_direction')}
            center={true}
          />

          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img
                  src="/directrice-generale.webp"
                  alt={t('scyrielle_sende_etali')}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <p className="text-sm font-semibold text-yellow-400 mb-1">{t('directrice_generale')}</p>
                <h3 className="text-2xl font-bold mb-3">{t('scyrielle_sende_etali')}</h3>
                <p className="text-blue-black/80 mb-4">
                  {t('titulaire_doctorat')}
                </p>
                <p className="text-blue-black/80">
                  {t('sous_sa_direction')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle
            title={t('cadre_juridique')}
            subtitle={t('lagadev_inscrit_cadre')}
          />

          <div className="bg-beige-light/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-medium">{t('textes_fondateurs')}</h3>
            <ul className="list-disc pl-6 space-y-3 text-blue-black/90">
              <li>
                <strong>{t('decret_001_pr')}</strong> - {t('portant_creation_organisation_fonctionnement')}
              </li>
              <li>
                <strong>{t('loi_024_2024')}</strong> - {t('relative_economie_verte')}
              </li>
              <li>
                <strong>{t('arrete_0035')}</strong> - {t('portant_nomination_membres')}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
