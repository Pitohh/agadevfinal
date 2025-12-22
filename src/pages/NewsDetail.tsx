import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNewsBySlug } from '../services/api';
import { ArrowLeft, Calendar } from 'lucide-react';

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [slug, i18n.language]);

  const loadNews = async () => {
    try {
      const response = await getNewsBySlug(slug, i18n.language);
      setNews(response.data.news);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!news) {
    return <div className="min-h-screen flex items-center justify-center">Actualité non trouvée</div>;
  }

  return (
    <div className="pt-20">
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate('/actualites')}
            className="flex items-center text-green-medium hover:text-green-forest mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux actualités
          </button>

          {news.cover_image_url && (
            <img
              src={news.cover_image_url}
              alt={news.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex items-center text-gray-600 mb-4">
            <Calendar size={18} className="mr-2" />
            <span>
              {new Date(news.publish_date || news.created_at).toLocaleDateString(
                i18n.language === 'fr' ? 'fr-FR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-blue-black mb-6">{news.title}</h1>

          {news.excerpt && (
            <p className="text-xl text-gray-700 mb-8 font-medium">{news.excerpt}</p>
          )}

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
