import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Leaf, TreePine, BarChart3, Users } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const forestImage = "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg";

  const missionIcons = [
    { 
      icon: <TreePine size={24} />, 
      title: t('capital_naturel'), 
      description: t('valorisation_des_forets_biodiversite')
    },
    { 
      icon: <Leaf size={24} />, 
      title: t('credits_carbone'), 
      description: t('monetisation_des_credits_carbone')
    },
    { 
      icon: <BarChart3 size={24} />, 
      title: t('investissements_verts'), 
      description: t('promotion_facilitation_investissements')
    },
    { 
      icon: <Users size={24} />, 
      title: t('sensibilisation'), 
      description: t('information_des_acteurs_publics')
    }
  ];

  const newsArticles = [
    {
      title: t('lancement_officiel_agadev'),
      description: t('lagence_gabonaise_officiellement_lancee'),
      imageSrc: "/foret-gabonaise-2.jpg.jpg",
      date: t('15_janvier_2025')
    },
    {
      title: t('signature_partenariat_cenarest'),
      description: t('lagadev_cenarest_unissent_forces'),
      imageSrc: "/foret-gabonaise-3.jpg.jpg",
      date: t('3_fevrier_2025')
    },
    {
      title: t('participation_cop30_belem'),
      description: t('lagadev_representera_gabon_cop30'),
      imageSrc: "/foret-gabonaise-4.jpg.jpg",
      date: t('7_mars_2025')
    }
  ];

  const partners = [
    { name: t('ministere_economie') },
    { name: t('cenarest') },
    { name: t('pnud') },
    { name: t('banque_africaine_developpement') },
    { name: t('union_europeenne') }
  ];

  return (
    <div className="pt-16">
      <Banner
        title={t('transformer_notre_capital_naturel')}
        subtitle={t('lagadev_oeuvre_transition')}
        backgroundImage={forestImage}
        buttonText={t('decouvrir_nos_missions')}
        buttonLink="/nos-missions"
        height="large"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-black mb-6">
                {t('bienvenue_lagadev')}
              </h2>
              <p className="mb-4 text-blue-black">
                {t('lagence_gabonaise_pour_developpement')}
              </p>
              <p className="mb-6 text-blue-black">
                {t('notre_mission_est_positionner')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/a-propos" variant="primary">
                  {t('savoir_plus')}
                </Button>
                <Button to="/contact" variant="outline">
                  {t('nous_contacter')}
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/foret-gabonaise-5.jpg.jpg"
                alt={t('foret_gabonaise')}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-beige-light/40">
        <div className="container-custom">
          <SectionTitle
            title={t('nos_missions')}
            subtitle={t('lagadev_articule_son_action')}
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionIcons.map((mission, index) => (
              <Card
                key={index}
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                to="/nos-missions"
                className="h-full"
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button to="/nos-missions" variant="primary">
              {t('decouvrir_toutes_nos_missions')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle
            title={t('actualites_recentes')}
            subtitle={t('decouvrez_dernieres_nouvelles')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <div key={index} className="card hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-copper mb-2">{article.date}</p>
                  <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                  <p className="text-blue-black/80 mb-4">{article.description}</p>
                  <Button to="/actualites" variant="outline" size="sm">
                    {t('lire_suite')}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button to="/actualites" variant="secondary">
              {t('voir_toutes_les_actualites')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-blue-black text-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('nos_partenaires')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white/10 px-6 py-4 rounded-lg w-full text-center">
                <p className="font-medium text-white">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-forest to-green-medium text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">{t('participez_transition_ecologique')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white">
            {t('decouvrez_appels_projets')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/opportunites" variant="primary" size="lg">
              {t('voir_les_opportunites')}
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              {t('nous_contacter')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
