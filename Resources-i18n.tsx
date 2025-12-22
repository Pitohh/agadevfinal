import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import { FileText, Download, PlusCircle, MinusCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const Resources = () => {
  const { t } = useTranslation();
  const bannerImage = "/foret-gabonaise-7.jpg.jpg";

  // Documents for download
  const documents = [
    {
      title: t('rapport_annuel_2024_2025'),
      description: t('bilan_activites_agadev'),
      type: "PDF",
      size: "3.2 MB",
      category: t('rapports'),
      url: "#"
    },
    {
      title: t('strategie_nationale_economie_verte'),
      description: t('document_cadre_vision_gabon'),
      type: "PDF",
      size: "5.7 MB",
      category: t('documents_officiels'),
      url: "#"
    },
    {
      title: t('guide_credits_carbone'),
      description: t('guide_methodologique_projets'),
      type: "PDF",
      size: "2.1 MB",
      category: t('guides'),
      url: "#"
    },
    {
      title: t('etude_biodiversite_gabonaise'),
      description: t('inventaire_especes_ecosystemes'),
      type: "PDF",
      size: "8.3 MB",
      category: t('etudes'),
      url: "#"
    },
    {
      title: t('formulaire_soumission_projet'),
      description: t('document_a_remplir_projet'),
      type: "DOCX",
      size: "1.5 MB",
      category: t('formulaires'),
      url: "#"
    },
    {
      title: t('presentation_agadev'),
      description: t('presentation_generale_agence'),
      type: "PDF",
      size: "4.2 MB",
      category: t('documents_officiels'),
      url: "#"
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: t('quest_ce_credit_carbone'),
      answer: t('reponse_credit_carbone')
    },
    {
      question: t('comment_agadev_aide_projet'),
      answer: t('reponse_aide_projet')
    },
    {
      question: t('comment_soumettre_projet'),
      answer: t('reponse_soumettre_projet')
    },
    {
      question: t('quels_types_projets_eligibles'),
      answer: t('reponse_projets_eligibles')
    },
    {
      question: t('comment_agadev_monetise_credits'),
      answer: t('reponse_monetise_credits')
    }
  ];

  // State for expanded FAQ items
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner
        title={t('ressources')}
        subtitle={t('accedez_documents_guides')}
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Downloads Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle
            title={t('documents_a_telecharger')}
            subtitle={t('retrouvez_rapports_guides')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="bg-beige-light/20 rounded-lg overflow-hidden shadow-sm border border-beige-light/50">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <FileText className="text-green-medium w-5 h-5 mr-2" />
                      <span className="text-xs font-medium px-2 py-1 rounded bg-beige-light/40 text-blue-black/70">{doc.category}</span>
                    </div>
                    <span className="text-xs text-blue-black/60">{doc.type} • {doc.size}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-green-medium">{doc.title}</h3>
                  <p className="text-blue-black/80 text-sm mb-4">{doc.description}</p>
                  <a
                    href={doc.url}
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {t('telecharger')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-beige-light/30">
        <div className="container-custom">
          <SectionTitle
            title={t('foire_aux_questions')}
            subtitle={t('reponses_questions_frequentes')}
            center={true}
          />

          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm text-left transition-colors hover:bg-beige-light/10"
                >
                  <span className="font-medium text-lg text-green-medium">{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <MinusCircle className="flex-shrink-0 w-5 h-5 text-yellow-400" />
                  ) : (
                    <PlusCircle className="flex-shrink-0 w-5 h-5 text-green-medium" />
                  )}
                </button>

                {expandedFaqs.includes(index) && (
                  <div className="p-4 bg-white rounded-b-lg shadow-sm border-t border-beige-light/30">
                    <p className="text-blue-black/80">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle
            title={t('ressources_externes')}
            subtitle={t('liens_sites_documents_utiles')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-beige-light rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-medium">{t('plateformes_internationales')}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.unep.org/fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('programme_des_nations_unies')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.unccd.int/fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Convention des Nations Unies sur la lutte contre la désertification
                  </a>
                </li>
                <li>
                  <a
                    href="https://unfccc.int/fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('conventioncadre_des_nations_unies')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greenclimate.fund/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('fonds_vert_pour_climat')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-beige-light rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-medium">{t('textes_legislatifs_rapports')}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('code_forestier_gabon')}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('contribution_determinee_nationale')}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('plan_national_climat_gabon')}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {t('rapport_etat_forets_congo')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-green-forest text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('restez_informe')}</h2>
            <p className="mb-8 text-lg text-white">
              {t('abonnezvous_newsletter')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder={t('votre_adresse_email')}
                className="px-4 py-3 rounded-md text-blue-black focus:outline-none focus:ring-2 focus:ring-beige-light w-full sm:w-auto"
              />
              <Button variant="secondary">
                {t('sabonner')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
