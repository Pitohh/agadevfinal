# 🚀 AGADEV - Traduction FR/EN - Guide Express

## Installation en 5 commandes

```bash
# 1. Copier les fichiers
mkdir -p src/hooks src/components src/locales
cp useTranslation.tsx src/hooks/
cp LanguageSwitcher.tsx src/components/

# 2. Extraire les textes
node extract-texts.js

# 3. Traduire (option A: auto avec DeepL)
export DEEPL_API_KEY="votre_cle"
node translate-deepl.js

# Ou option B: manuel
# Ouvrir src/locales/en.json et traduire

# 4. Intégrer le provider
# Modifier src/App.tsx (voir ci-dessous)

# 5. Ajouter le switcher
# Modifier src/components/Navbar.tsx (voir ci-dessous)
```

## Modification App.tsx

```tsx
import { TranslationProvider } from './hooks/useTranslation';

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TranslationProvider>
  );
}
```

## Modification Navbar.tsx

```tsx
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  return (
    <nav>
      {/* ... menu existant ... */}
      <LanguageSwitcher />  {/* ← Ajouter ici */}
    </nav>
  );
}
```

## Utilisation dans les pages

```tsx
import { useT } from '../hooks/useTranslation';

export default function HomePage() {
  const t = useT();
  
  return (
    <div>
      <h1>{t('home_hero_title')}</h1>
      <p>{t('home_hero_subtitle')}</p>
      <button title={t('contact_button')}>
        {t('contact_us')}
      </button>
    </div>
  );
}
```

## Fichiers fournis

- ✅ `extract-texts.js` - Extrait tous les textes
- ✅ `translate-deepl.js` - Traduit via DeepL
- ✅ `useTranslation.tsx` - Hook React i18n
- ✅ `LanguageSwitcher.tsx` - Bouton FR/EN
- ✅ `HomePage-example.tsx` - Exemple complet
- ✅ `fr-example.json` - Traductions FR préremplies
- ✅ `en-example.json` - Traductions EN préremplies
- ✅ `migrate-to-i18n.js` - Migration automatique (BETA)

## Résultat

- ✅ Site bilingue FR/EN
- ✅ Switcher dans navbar
- ✅ Détection langue navigateur
- ✅ Préférence sauvegardée (localStorage)
- ✅ SEO optimisé (`<html lang="fr/en">`)

## Temps estimé

- Installation: 15 min
- Migration manuelle: 2-3h pour toutes les pages
- Ou migration auto: `node migrate-to-i18n.js` (à vérifier après)

## Support

Voir `INSTALLATION-TRADUCTION.md` pour le guide complet.
