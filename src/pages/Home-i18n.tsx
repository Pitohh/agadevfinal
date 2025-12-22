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
    { icon: <TreePine size={24} />, title: t('capital_naturel'), description: t('valorisation_des_forets_biodiversite') },
    { icon: <Leaf size={24} />, title: t('credits_carbone'), description: t('monetisation_des_credits_carbone') },
    { icon: <BarChart3 size={24} />, title: t('investissements_verts'), description: t('promotion_facilitation_investissements') },
    { icon: <Users size={24} />, title: t('sensibilisation'), description: t('information_des_acteurs_publics') }
  ];

  return (
    <div className="pt-16">
      <Banner
        title={t('bienvenue_lagadev')}
        subtitle={t('notre_mission_est_positionner')}
        imageSrc={forestImage}
        imageAlt={t('foret_gabonaise')}
      />

      {/* Mission Section */}
      <section className="py-16 bg-beige-light">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('notre_mission')}
            subtitle={t('lagence_gabonaise_pour_developpement')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {missionIcons.map((mission, index) => (
              <Card key={index}>
                <div className="text-green-medium mb-4">{mission.icon}</div>
                <h3 className="text-xl font-bold text-blue-black mb-2">{mission.title}</h3>
                <p className="text-gray-600">{mission.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/nos-missions" variant="primary">
              {t('decouvrir_toutes_nos_missions')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
