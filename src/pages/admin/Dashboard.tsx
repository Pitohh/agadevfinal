import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Newspaper, FolderKanban, Eye, Edit } from 'lucide-react';
import { getNews, getProjects } from '../../services/api';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalNews: 0,
    publishedNews: 0,
    totalProjects: 0,
    publishedProjects: 0,
  });
  const [recentNews, setRecentNews] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [newsRes, projectsRes] = await Promise.all([
        getNews({ limit: 5 }),
        getProjects({ limit: 5 }),
      ]);

      setRecentNews(newsRes.data.news || []);
      setRecentProjects(projectsRes.data.projects || []);

      setStats({
        totalNews: newsRes.data.total || 0,
        publishedNews: newsRes.data.news?.filter(n => n.published)?.length || 0,
        totalProjects: projectsRes.data.total || 0,
        publishedProjects: projectsRes.data.projects?.filter(p => p.published)?.length || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon size={32} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-black mb-8">{t('admin.dashboard')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Newspaper} label="Total Actualités" value={stats.totalNews} color="text-green-medium" />
        <StatCard icon={Eye} label="Actualités Publiées" value={stats.publishedNews} color="text-blue-black" />
        <StatCard icon={FolderKanban} label="Total Projets" value={stats.totalProjects} color="text-copper" />
        <StatCard icon={Eye} label="Projets Publiés" value={stats.publishedProjects} color="text-green-forest" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-black">Actualités Récentes</h2>
            <Link to="/admin/news" className="text-green-medium hover:text-green-forest transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.length > 0 ? (
              recentNews.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-beige-light/20 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-blue-black line-clamp-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <Link to={`/admin/news?edit=${item.id}`} className="ml-4 p-2 text-green-medium hover:bg-green-medium/10 rounded-lg transition-colors">
                    <Edit size={18} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune actualité</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-black">Projets Récents</h2>
            <Link to="/admin/projects" className="text-green-medium hover:text-green-forest transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-beige-light/20 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-blue-black line-clamp-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <Link to={`/admin/projects?edit=${item.id}`} className="ml-4 p-2 text-green-medium hover:bg-green-medium/10 rounded-lg transition-colors">
                    <Edit size={18} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun projet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
