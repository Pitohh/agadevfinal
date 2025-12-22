import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
   const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: t('nav.home'), path: '/' },
    { title: t('nav.about'), path: '/a-propos' },
    { title: t('nav.missions'), path: '/nos-missions' },
    { title: t('nav.projects'), path: '/projets-programmes' },
    { title: t('nav.resources'), path: '/ressources' },
    { title: t('nav.news'), path: '/actualites' },
    { title: t('nav.contact'), path: '/contact' },
    { title: t('nav.opportunities'), path: '/opportunites' },
  ];

  return (
    <header
      className={clsx(
        'fixed w-full top-0 z-[100] transition-all duration-600',
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-85'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <NavLink to="/" className="flex items-start space-x-2">
            <img src="/agadev-logo.png" alt="AGADEV" className="h-16 w-auto" />
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      'text-blue-black hover:text-green-medium transition-colors font-medium',
                      isActive && 'text-green-medium font-bold'
                    )
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
             {/* Language Switcher */}
          <LanguageSwitcher className="hidden lg:block" />
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-blue-black hover:text-green-medium"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={clsx(
            'lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-20',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <ul className="flex flex-col items-center space-y-6 pt-8">
            {navLinks.map((link) => (
              <li key={link.path} className="w-full text-center">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 text-lg font-medium',
                      isActive ? 'text-green-medium font-semibold' : 'text-blue-black'
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
              <li className="w-full text-center">    
              <LanguageSwitcher />
            </li>
          </ul>
        
        </div>
      </div>
    </header>
  );
};

export default Navbar;