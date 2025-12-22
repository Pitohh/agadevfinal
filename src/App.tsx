import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Missions from './pages/Missions';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resources from './pages/Resources';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Opportunities from './pages/Opportunities';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import NewsManager from './pages/admin/NewsManager';
import ProjectsManager from './pages/admin/ProjectsManager';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/a-propos" element={<Layout><About /></Layout>} />
          <Route path="/nos-missions" element={<Layout><Missions /></Layout>} />
          <Route path="/projets-programmes" element={<Layout><Projects /></Layout>} />
          <Route path="/projets-programmes/:slug" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/ressources" element={<Layout><Resources /></Layout>} />
          <Route path="/actualites" element={<Layout><News /></Layout>} />
          <Route path="/actualites/:slug" element={<Layout><NewsDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/opportunites" element={<Layout><Opportunities /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;