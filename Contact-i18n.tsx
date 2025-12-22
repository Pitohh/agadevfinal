import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/ui/Banner';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const bannerImage = "/foret-gabonaise-8.jpg.jpg";

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    alert(t('nous_vous_repondrons'));
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <Banner
        title={t('contacteznous')}
        subtitle={t('notre_equipe_a_disposition')}
        backgroundImage={bannerImage}
        height="medium"
      />

      {/* Contact Form and Info */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionTitle
                title={t('envoyeznous_un_message')}
                subtitle={t('nous_vous_repondrons')}
              />

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-blue-black/80 mb-1">{t('nom_complet')}</label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.name ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder={t('votre_nom')}
                    {...register("name", { required: t('ce_champ_obligatoire') })}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-black/80 mb-1">{t('email')}</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.email ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder={t('email')}
                    {...register("email", {
                      required: t('ce_champ_obligatoire'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('adresse_email_invalide')
                      }
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-blue-black/80 mb-1">{t('sujet')}</label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.subject ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder={t('sujet_de_votre_message')}
                    {...register("subject", { required: t('ce_champ_obligatoire') })}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-blue-black/80 mb-1">{t('message')}</label>
                  <textarea
                    id="message"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-medium/50 ${errors.message ? 'border-red-500' : 'border-beige-light'}`}
                    placeholder={t('votre_message')}
                    rows={5}
                    {...register("message", { required: t('ce_champ_obligatoire') })}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" variant="primary" className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  {t('envoyer')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <SectionTitle
                title={t('nos_coordonnees')}
                subtitle={t('plusieurs_facons_contacter')}
              />

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{t('adresse')}</h3>
                    <p className="text-blue-black/80">
                      {t('la_sabliere')}<br />
                      {t('residence_les_paletuviers')}<br />
                      {t('immeuble_b_b402')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{t('email')}</h3>
                    <p className="text-blue-black/80">
                      <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        {t('infosagadevgaboncom')}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{t('telephone')}</h3>
                    <p className="text-blue-black/80">
                      <a href="tel:+24106565898" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        065 65 89 88 / 074 65 89 88
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-green-medium mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{t('horaires_ouverture')}</h3>
                    <p className="text-blue-black/80">
                      {t('lundi_vendredi')}<br />
                      {t('ferme_weekends')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                <div className="bg-beige-light/40 h-[300px] flex items-center justify-center">
                  <p className="text-blue-black/60">{t('carte_interactive')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-beige-light/30 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-green-medium mb-6">{t('questions_specifiques')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            {t('equipe_experts_disponible')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">{t('questions_sur_projets')}</h3>
              <p className="mb-4 text-blue-black/80">{t('pour_toute_question_projets')}</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                {t('infosagadevgaboncom')}
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">{t('partenariats')}</h3>
              <p className="mb-4 text-blue-black/80">{t('pour_discuter_opportunites')}</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                {t('infosagadevgaboncom')}
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <h3 className="font-semibold text-lg mb-3 text-green-medium">{t('recrutement')}</h3>
              <p className="mb-4 text-blue-black/80">{t('pour_postuler_renseigner')}</p>
              <a href="mailto:infos@agadev-gabon.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                {t('infosagadevgaboncom')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
