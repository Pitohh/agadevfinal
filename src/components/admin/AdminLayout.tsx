import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Newspaper, FolderKanban, LogOut, Globe } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

const AdminLayout = () => {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: t('admin.dashboard'), path: '/admin' },
    { icon: Newspaper, label: t('admin.news_management'), path: '/admin/news' },
    { icon: FolderKanban, label: t('admin.projects_management'), path: '/admin/projects' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/agadev-logo.png" alt="AGADEV" className="h-10" />
            <div>
              <h1 className="text-lg font-bold text-blue-black">Admin AGADEV</h1>
              <p className="text-sm text-gray-600">{user?.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="w-64 bg-white min-h-screen p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/admin'} className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded ${isActive ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
