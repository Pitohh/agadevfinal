import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and brief description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/agadev-logo.png" alt="AGADEV" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-white/80">
              Agence Gabonaise pour le Développement de l'Économie Verte. Transformer notre capital naturel en opportunité pour demain.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://www.linkedin.com/company/agence-gabonaise-pour-le-d%C3%A9veloppement-de-l-economie-verte-agadev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-copper transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/17u8Sfw7uy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-copper transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/a-propos" className="text-white/80 hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/nos-missions" className="text-white/80 hover:text-white transition-colors">Nos missions</Link></li>
              <li><Link to="/projets-programmes" className="text-white/80 hover:text-white transition-colors">Projets & Programmes</Link></li>
              <li><Link to="/ressources" className="text-white/80 hover:text-white transition-colors">Ressources</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-white/80">La Sablière, Résidence Les Paletuviers, Immeuble B, B402</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-white/80">065 65 89 88 / 074 65 89 88</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:infos@agadev-gabon.com" className="text-white/80 hover:text-white transition-colors">
                  infos@agadev-gabon.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">Restez informé</h4>
            <p className="text-sm text-white/80">
              Inscrivez-vous à notre newsletter pour recevoir nos actualités et informations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 text-blue-black rounded-md focus:outline-none focus:ring-2 focus:ring-copper"
              />
              <button className="bg-copper hover:bg-copper/90 text-blue-black px-4 py-2 rounded-md transition-colors font-medium">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-white/70">
            &copy; {currentYear} AGADEV. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-sm text-white/70">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;