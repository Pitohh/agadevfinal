import { useTranslation } from '../hooks/useTranslation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
      <Globe className="w-4 h-4 text-white" />
      <button
        onClick={() => setLanguage('fr')}
        className={`text-sm font-medium transition-colors ${
          language === 'fr'
            ? 'text-white'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        FR
      </button>
      <span className="text-white/40">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm font-medium transition-colors ${
          language === 'en'
            ? 'text-white'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        EN
      </button>
    </div>
  );
}
