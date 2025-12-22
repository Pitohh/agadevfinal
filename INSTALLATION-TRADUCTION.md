# 🌐 AGADEV - Système de Traduction FR/EN Complet

## 📋 Vue d'ensemble

Ce système permet de traduire TOUT le site AGADEV en français et anglais avec :
- ✅ Extraction automatique de ~500+ textes statiques
- ✅ Traduction auto via DeepL API
- ✅ Hook React i18n avec détection langue navigateur
- ✅ Switcher FR/EN dans navbar
- ✅ Sauvegarde préférence utilisateur (localStorage)

---

## 🚀 Installation (15 minutes)

### Étape 1 : Copier les fichiers

```bash
# Depuis le dossier racine de AGADEV
cd /home/kayto/agadevfinal  # ou votre dossier

# Créer la structure
mkdir -p src/hooks src/components src/locales

# Copier les fichiers fournis
cp extract-texts.js .
cp useTranslation.tsx src/hooks/
cp LanguageSwitcher.tsx src/components/
cp translate-deepl.js .
```

### Étape 2 : Extraire les textes

```bash
# Installer les dépendances si nécessaire
npm install

# Extraire tous les textes du site
node extract-texts.js
```

**Résultat :**
- ✅ `src/locales/fr.json` (tous les textes français)
- ✅ `src/locales/en.json` (à traduire)
- ✅ `translation-report.json` (rapport détaillé)

### Étape 3 : Traduire automatiquement

**Option A - Avec DeepL API (recommandé)**

```bash
# 1. Obtenir une clé gratuite (500k chars/mois)
# https://www.deepl.com/pro-api

# 2. Configurer la clé
export DEEPL_API_KEY="votre_cle_ici"

# 3. Traduire automatiquement
node translate-deepl.js
```

**Option B - Manuellement**

```bash
# Ouvrir src/locales/en.json
# Traduire chaque valeur du JSON
# Sauvegarder
```

### Étape 4 : Intégrer le TranslationProvider

**Modifier `src/App.tsx` :**

```tsx
import { BrowserRouter } from 'react-router-dom';
import { TranslationProvider } from './hooks/useTranslation';  // ← NOUVEAU
import AppRoutes from './routes';

function App() {
  return (
    <TranslationProvider>  {/* ← NOUVEAU */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
```

### Étape 5 : Ajouter le switcher dans Navbar

**Modifier `src/components/Navbar.tsx` :**

```tsx
import LanguageSwitcher from './LanguageSwitcher';  // ← NOUVEAU

export default function Navbar() {
  return (
    <nav className="...">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo et menu existants */}
        
        {/* Ajouter le switcher */}
        <LanguageSwitcher />  {/* ← NOUVEAU */}
        
      </div>
    </nav>
  );
}
```

### Étape 6 : Traduire les pages

**Exemple avec HomePage :**

```tsx
// AVANT
export default function HomePage() {
  return (
    <div>
      <h1>Agence Gabonaise de Développement pour une Économie Verte</h1>
      <p>Vers une transition écologique durable au Gabon</p>
    </div>
  );
}

// APRÈS
import { useT } from '../hooks/useTranslation';  // ← NOUVEAU

export default function HomePage() {
  const t = useT();  // ← NOUVEAU
  
  return (
    <div>
      <h1>{t('home_hero_title')}</h1>  {/* ← NOUVEAU */}
      <p>{t('home_hero_subtitle')}</p>  {/* ← NOUVEAU */}
    </div>
  );
}
```

**Répéter pour toutes les pages :**
- `HomePage.tsx`
- `AboutPage.tsx`
- `MissionsPage.tsx`
- `ProjectsPage.tsx`
- `NewsPage.tsx`
- `ContactPage.tsx`
- etc.

---

## 📝 Utilisation du hook useTranslation

### Syntaxe de base

```tsx
import { useT } from '../hooks/useTranslation';

function MonComposant() {
  const t = useT();
  
  return (
    <div>
      {/* Traduction simple */}
      <h1>{t('cle_de_traduction')}</h1>
      
      {/* Avec fallback */}
      <p>{t('cle_manquante', 'Texte par défaut')}</p>
      
      {/* Dans les attributs */}
      <button title={t('bouton_aide')}>
        {t('cliquez_ici')}
      </button>
    </div>
  );
}
```

### Accéder à la langue active

```tsx
import { useTranslation } from '../hooks/useTranslation';

function MonComposant() {
  const { language, setLanguage } = useTranslation();
  
  console.log(language); // 'fr' ou 'en'
  
  return (
    <button onClick={() => setLanguage('en')}>
      Switch to English
    </button>
  );
}
```

---

## 🎨 Personnalisation du LanguageSwitcher

Le composant fourni utilise Tailwind + Lucide. Vous pouvez le personnaliser :

```tsx
// Version minimaliste
export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  
  return (
    <div className="flex gap-2">
      <button onClick={() => setLanguage('fr')}>🇫🇷 FR</button>
      <button onClick={() => setLanguage('en')}>🇬🇧 EN</button>
    </div>
  );
}
```

---

## 📊 Structure des fichiers de traduction

**`src/locales/fr.json` :**
```json
{
  "text_1": "Agence Gabonaise de Développement",
  "text_2": "Vers une transition écologique durable",
  "home_hero_title": "Agence Gabonaise de Développement pour une Économie Verte",
  "home_cta_button": "Nous contacter"
}
```

**`src/locales/en.json` :**
```json
{
  "text_1": "Gabonese Development Agency",
  "text_2": "Towards a sustainable ecological transition",
  "home_hero_title": "Gabonese Development Agency for a Green Economy",
  "home_cta_button": "Contact us"
}
```

---

## 🔧 Scripts NPM à ajouter

**Dans `package.json` :**

```json
{
  "scripts": {
    "extract": "node extract-texts.js",
    "translate": "node translate-deepl.js",
    "i18n:full": "npm run extract && npm run translate"
  }
}
```

**Utilisation :**
```bash
npm run extract    # Extraire les textes
npm run translate  # Traduire via DeepL
npm run i18n:full  # Extraction + traduction automatique
```

---

## ✅ Checklist de migration

- [ ] Copier les 4 fichiers fournis
- [ ] Exécuter `node extract-texts.js`
- [ ] Traduire `src/locales/en.json` (DeepL ou manuel)
- [ ] Ajouter `TranslationProvider` dans `App.tsx`
- [ ] Ajouter `LanguageSwitcher` dans `Navbar.tsx`
- [ ] Migrer `HomePage.tsx` (utiliser `useT()`)
- [ ] Migrer `AboutPage.tsx`
- [ ] Migrer `MissionsPage.tsx`
- [ ] Migrer `ProjectsPage.tsx`
- [ ] Migrer `NewsPage.tsx`
- [ ] Migrer `ContactPage.tsx`
- [ ] Migrer `Footer.tsx`
- [ ] Tester le changement de langue
- [ ] Vérifier localStorage (préférence sauvegardée)
- [ ] Vérifier détection langue navigateur

---

## 🐛 Débogage

### Les traductions n'apparaissent pas

```bash
# Vérifier que les fichiers JSON existent
ls -la src/locales/

# Vérifier la console navigateur
# Devrait afficher: "🌐 Traduction manquante: XXX (fr/en)"
```

### Le switcher ne change rien

```tsx
// Vérifier que TranslationProvider enveloppe bien tout
// Dans App.tsx, l'ordre doit être:
<TranslationProvider>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</TranslationProvider>
```

### Erreur "useTranslation must be used within a TranslationProvider"

→ Vérifier que le composant est bien enfant de `<TranslationProvider>`

---

## 📈 Évolution future

### Ajouter une nouvelle langue (ES, PT, etc.)

1. Créer `src/locales/es.json`
2. Modifier le type `Language` dans `useTranslation.tsx`
3. Ajouter l'import dans `translations`
4. Ajouter le bouton dans `LanguageSwitcher`

### Traduction des contenus dynamiques (DB)

Les News et Projects utilisent déjà DeepL automatique via le backend.
Pas besoin de les inclure dans les fichiers JSON statiques.

---

## 🎯 Résultat attendu

- ✅ Site 100% bilingue FR/EN
- ✅ Switcher visible dans navbar
- ✅ Détection automatique langue navigateur
- ✅ Préférence sauvegardée (localStorage)
- ✅ SEO optimisé (`<html lang="fr/en">`)
- ✅ Pas de rechargement page au switch

---

## 📞 Support

En cas de problème :
1. Vérifier la console navigateur (F12)
2. Vérifier que tous les fichiers sont bien copiés
3. Vérifier que `TranslationProvider` est dans `App.tsx`
4. Vérifier que les clés JSON matchent avec le code

**Temps estimé total : 2-3 heures** pour migrer toutes les pages.

---

## 📄 Licence

Système développé pour AGADEV - 2025
