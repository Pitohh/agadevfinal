import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');

// News
export const getNews = (params) => api.get('/news', { params });
export const getNewsBySlug = (slug, lang = 'fr') => api.get(`/news/${slug}`, { params: { lang } });
export const getAllNewsAdmin = () => api.get('/news/admin/all');
export const createNews = (data) => api.post('/news', data);
export const updateNews = (id, data) => api.put(`/news/${id}`, data);
export const deleteNews = (id) => api.delete(`/news/${id}`);
export const toggleNewsPublish = (id, published) => api.patch(`/news/${id}/publish`, { published });

// Projects
export const getProjects = (params) => api.get('/projects', { params });
export const getProjectBySlug = (slug, lang = 'fr') => api.get(`/projects/${slug}`, { params: { lang } });
export const getAllProjectsAdmin = () => api.get('/projects/admin/all');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const toggleProjectPublish = (id, published) => api.patch(`/projects/${id}/publish`, { published });

// Upload - NOUVELLE ROUTE
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Upload multiple files
export const uploadMultipleFiles = (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  
  return api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default api;
