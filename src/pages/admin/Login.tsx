import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-forest to-green-medium flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/agadev-logo.png" alt="AGADEV" className="h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">{t('admin.login')}</h1>
          <p className="text-white/80">Administration AGADEV</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">
                {t('admin.username')}
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-medium focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-black mb-2">
                {t('admin.password')}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-medium focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-medium hover:bg-green-forest text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Connexion...' : t('admin.login_button')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Identifiants par défaut:</p>
            <p className="font-mono text-xs mt-1">admin / Admin@2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
