import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug } from '../services/api';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [slug, i18n.language]);

  const loadProject = async () => {
    try {
      const response = await getProjectBySlug(slug, i18n.language);
      setProject(response.data.project);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Projet non trouvé</div>;
  }

  return (
    <div className="pt-20">
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => navigate('/projets-programmes')}
            className="flex items-center text-green-medium hover:text-green-forest mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux projets
          </button>

          {project.cover_image_url && (
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium capitalize">
              {project.status}
            </span>
            {project.location && (
              <span className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                {project.location}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-blue-black mb-6">{project.title}</h1>

          {project.description && (
            <p className="text-xl text-gray-700 mb-8 font-medium">{project.description}</p>
          )}

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;
