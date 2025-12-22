import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

type Language = 'fr' | 'en';
type Translations = Record<string, string>;

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  fr: frTranslations,
  en: enTranslations,
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const saved = localStorage.getItem('agadev_language') as Language;
    if (saved && (saved === 'fr' || saved === 'en')) return saved;
    
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agadev_language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language][key];
    
    if (translation) return translation;
    if (fallback) return fallback;
    
    // En mode développement, afficher la clé manquante
    if (import.meta.env.DEV) {
      console.warn(`🌐 Traduction manquante: ${key} (${language})`);
    }
    
    return key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation doit être utilisé dans un TranslationProvider');
  }
  return context;
}

// Hook simplifié pour les composants
export function useT() {
  const { t } = useTranslation();
  return t;
}
