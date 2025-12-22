import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { Download, Calendar, MapPin, Clock, Briefcase } from 'lucide-react';

const Opportunities = () => {
  const { t } = useTranslation();
  const bannerImage = "/foret-gabonaise-8.jpg.jpg";

  // Tab state
  const [activeTab, setActiveTab] = useState<'projects' | 'jobs'>('projects');

  // Project calls data
  const projectCalls = [
    {
      title: t('appel_solutions_dechets'),
      description: t('description_appel_dechets'),
      deadline: t('30_juin_2025'),
      eligibility: t('entreprises_associations_collectivites'),
      funding: t('jusqua_50m_fcfa'),
      applicationUrl: "#"
    },
    {
      title: t('programme_startups_vertes'),
      description: t('description_startups'),
      deadline: t('15_juillet_2025'),
      eligibility: t('startups_gabonaises_3ans'),
      funding: t('accompagnement_25m'),
      applicationUrl: "#"
    },
    {
      title: t('appel_energie_rurale'),
      description: t('description_energie_rurale'),
      deadline: t('31_aout_2025'),
      eligibility: t('entreprises_nationales_internationales'),
      funding: t('cofinancement_200m'),
      applicationUrl: "#"
    }
  ];

  // Job offers data
  const jobOffers = [
    {
      title: t('specialiste_certification_carbone'),
      description: t('description_specialiste_carbone'),
      location: t('libreville'),
      type: t('cdi'),
      requirements: t('exigences_specialiste'),
      applicationDeadline: t('15_juin_2025')
    },
    {
      title: t('charge_projets_developpement'),
      description: t('description_charge_projets'),
      location: t('libreville'),
      type: t('cdi'),
      requirements: t('exigences_charge_projets'),
      applicationDeadline: t('30_juin_2025')
    },
    {
      title: t('juriste_environnement'),
      description: t('description_juriste'),
      location: t('libreville'),
      type: t('cdi'),
      requirements: t('exigences_juriste'),
      applicationDeadline: t('10_juillet_2025')
    },
    {
      title: t('charge_communication'),
      description: t('description_communication'),
      location: t('libreville'),
      type: t('cdi'),
      requirements: t('exigences_communication'),
      applicationDeadline: t('5_juillet_2025')
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner
        title={t('opportunites')}
        subtitle={t('decouvrez_appels_offres')}
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Tabs */}
      <section className="bg-white pt-8">
        <div className="container-custom">
          <div className="flex border-b border-beige-light">
            <button
              className={`pb-4 px-6 font-medium text-lg transition-colors ${
                activeTab === 'projects'
                  ? 'text-green-medium border-b-2 border-green-medium'
                  : 'text-blue-black/70 hover:text-green-medium'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              {t('appels_a_projets')}
            </button>
            <button
              className={`pb-4 px-6 font-medium text-lg transition-colors ${
                activeTab === 'jobs'
                  ? 'text-green-medium border-b-2 border-green-medium'
                  : 'text-blue-black/70 hover:text-green-medium'
              }`}
              onClick={() => setActiveTab('jobs')}
            >
              {t('offres_demploi')}
            </button>
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <section className="section bg-white pb-16">
        <div className="container-custom">
          {activeTab === 'projects' && (
            <div>
              <SectionTitle
                title={t('appels_projets_en_cours')}
                subtitle={t('proposez_projets_innovants')}
              />

              <div className="space-y-8">
                {projectCalls.map((call, index) => (
                  <div key={index} className="bg-white border border-beige-light rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-green-medium">{call.title}</h3>
                      <p className="text-blue-black/80 mb-4">{call.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">{t('date_limite')}</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>{call.deadline}</span>
                          </div>
                        </div>

                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">{t('eligibilite')}</p>
                          <p className="mt-1">{call.eligibility}</p>
                        </div>

                        <div className="bg-beige-light/20 p-3 rounded">
                          <p className="font-semibold text-green-medium">{t('financement')}</p>
                          <p className="mt-1">{call.funding}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Button href={call.applicationUrl} variant="primary">
                          {t('postuler')}
                        </Button>
                        <Button href="#" variant="outline" className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          {t('telecharger_dossier')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to apply */}
              <div className="mt-12 bg-beige-light/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-medium">{t('comment_soumettre_projet_complet')}</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>{t('etape1_telecharger')}</li>
                  <li>{t('etape2_remplir')}</li>
                  <li>{t('etape3_joindre')}</li>
                  <li>{t('etape4_soumettre')}</li>
                </ol>
                <p className="mt-4 text-blue-black/80">
                  {t('pour_questions_appels')}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <SectionTitle
                title={t('offres_demploi')}
                subtitle={t('rejoignez_equipe')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobOffers.map((job, index) => (
                  <div key={index} className="bg-white border border-beige-light rounded-lg shadow-md overflow-hidden h-full">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-green-medium">{job.title}</h3>
                        <span className="bg-green-medium/10 text-green-medium text-xs px-2 py-1 rounded">
                          {job.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-blue-black/70">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{t('limite')}: {job.applicationDeadline}</span>
                        </div>
                      </div>

                      <p className="text-blue-black/80 mb-4">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-green-medium flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" /> {t('profil_recherche')}
                        </h4>
                        <p className="text-blue-black/80 text-sm">{job.requirements}</p>
                      </div>

                      <Button href="#" variant="primary">
                        {t('postuler')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* General application */}
              <div className="mt-12 bg-beige-light/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-medium">{t('candidature_spontanee')}</h3>
                <p className="mb-6">
                  {t('candidature_spontanee_text')}
                </p>
                <Button href="mailto:infos@agadev-gabon.com" variant="primary">
                  {t('envoyer_candidature_spontanee')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Internships */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title={t('programme_stages')}
                subtitle={t('agadev_offre_stages')}
              />

              <p className="mb-4">
                {t('stages_description')}
              </p>

              <p className="mb-6">
                {t('stages_duree')}
              </p>

              <Button href="mailto:infos@agadev-gabon.com" variant="primary">
                {t('candidater_pour_stage')}
              </Button>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/foret-gabonaise-9.jpg.jpg"
                alt={t('stagiaires_de_lagadev')}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-green-medium">{t('ils_nous_ont_rejoints')}</h2>
            <blockquote className="text-xl italic mb-6 text-blue-black/80">
              "{t('temoignage_marcel')}"
            </blockquote>
            <div className="font-semibold">
              <p>{t('marcel_nzamba')}</p>
              <p className="text-blue-black/60 text-sm">{t('charge_projets_agadev')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
