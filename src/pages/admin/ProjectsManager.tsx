import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllProjectsAdmin, createProject, updateProject, deleteProject, toggleProjectPublish, uploadFile } from '../../services/api';

const ProjectsManager = () => {
  const { t } = useTranslation();
  const [projectsList, setProjectsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title_fr: '', description_fr: '', content_fr: '',
    title_en: '', description_en: '', content_en: '',
    cover_image_url: '', status: 'active', published: false, auto_translate: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const res = await getAllProjectsAdmin();
      setProjectsList(res.data.projects || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur de chargement');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('entity_type', 'project');
      const res = await uploadFile(fd);
      setFormData({ ...formData, cover_image_url: res.data.media.file_url });
    } catch (error) {
      alert('Erreur upload: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, formData);
        alert('Projet modifié!');
      } else {
        await createProject(formData);
        alert('Projet créé!');
      }
      resetForm();
      loadProjects();
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title_fr: item.title_fr || '', description_fr: item.description_fr || '',
      content_fr: item.content_fr || '', title_en: item.title_en || '',
      description_en: item.description_en || '', content_en: item.content_en || '',
      cover_image_url: item.cover_image_url || '', status: item.status || 'active',
      published: item.published || false, auto_translate: false
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet?')) return;
    try {
      await deleteProject(id);
      alert('Supprimé!');
      loadProjects();
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  const handleTogglePublish = async (id, published) => {
    try {
      await toggleProjectPublish(id, !published);
      loadProjects();
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title_fr: '', description_fr: '', content_fr: '',
      title_en: '', description_en: '', content_en: '',
      cover_image_url: '', status: 'active', published: false, auto_translate: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-black">{t('admin.projects_management')}</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-green-medium hover:bg-green-forest text-white px-6 py-3 rounded-lg transition-colors">
          <Plus size={20} />
          <span>{t('admin.create_new')}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-black mb-4">{editingId ? 'Modifier' : 'Nouveau'} Projet</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-black mb-2">Titre (FR) *</label>
                <input type="text" value={formData.title_fr}
                  onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-medium" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-black mb-2">Titre (EN)</label>
                <input type="text" value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">Description (FR) *</label>
              <textarea value={formData.description_fr}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg h-20" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">Contenu (FR) *</label>
              <textarea value={formData.content_fr}
                onChange={(e) => setFormData({ ...formData, content_fr: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg h-32" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">Image de couverture</label>
              <input type="file" accept="image/*" onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg" disabled={uploading} />
              {formData.cover_image_url && (
                <img src={formData.cover_image_url} alt="Cover" className="mt-2 h-32 rounded" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">Statut</label>
              <select value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg">
                <option value="active">Actif</option>
                <option value="completed">Complété</option>
                <option value="planned">Planifié</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.auto_translate}
                  onChange={(e) => setFormData({ ...formData, auto_translate: e.target.checked })}
                  className="w-4 h-4" />
                <span className="text-sm">{t('admin.auto_translate')}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4" />
                <span className="text-sm">{t('admin.publish')}</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button type="submit"
                className="bg-green-medium hover:bg-green-forest text-white px-6 py-2 rounded-lg">
                {t('admin.save')}
              </button>
              <button type="button" onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg">
                {t('admin.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-beige-light/40">
            <tr>
              <th className="px-6 py-3 text-left text-blue-black font-semibold">Titre</th>
              <th className="px-6 py-3 text-left text-blue-black font-semibold">Statut Projet</th>
              <th className="px-6 py-3 text-left text-blue-black font-semibold">Publication</th>
              <th className="px-6 py-3 text-right text-blue-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectsList.map((item) => (
              <tr key={item.id} className="border-b hover:bg-beige-light/20">
                <td className="px-6 py-4">{item.title_fr}</td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 capitalize">{item.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleTogglePublish(item.id, item.published)}
                      className="p-2 text-blue-black hover:bg-blue-black/10 rounded-lg">
                      {item.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button onClick={() => handleEdit(item)}
                      className="p-2 text-green-medium hover:bg-green-medium/10 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsManager;
