'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const LANGUES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

function lireLangueActuelle(): string {
  const m = document.cookie.match(/googtrans=\/(?:auto|fr)\/(\w+)/);
  return m ? m[1] : 'fr';
}

function changerLangue(code: string) {
  if (code === 'fr') {
    // Retour au français : supprimer le cookie
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  } else {
    document.cookie = `googtrans=/fr/${code}; path=/`;
  }
  // Recharger pour que le widget Google applique la langue
  window.location.reload();
}

export default function GoogleTranslateWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [langue, setLangue] = useState('fr');

  useEffect(() => {
    setMounted(true);
    setLangue(lireLangueActuelle());

    // Protège les icônes Material Symbols de la traduction Google :
    // sans ça, Google traduit le nom de l'icône (ex: "public" → "audience")
    // et la ligature casse → gros texte rouge au lieu de l'icône.
    const marquerIcones = () => {
      document.querySelectorAll('.material-symbols-outlined, .material-symbols-rounded, .material-symbols-sharp').forEach((el) => {
        if (!el.classList.contains('notranslate')) {
          el.classList.add('notranslate');
          el.setAttribute('translate', 'no');
        }
      });
    };

    // Marquer AVANT le chargement du script Google (le script traduit dès qu'il charge)
    marquerIcones();

    // Marquer les icônes ajoutées plus tard (navigation client)
    const iconObserver = new MutationObserver(marquerIcones);
    iconObserver.observe(document.body, { childList: true, subtree: true });

    // Initialiser le moteur Google (invisible) pour la traduction au chargement
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'fr',
            includedLanguages: 'fr,en,es,pt',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_engine'
        );
      }
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
    // Note : le décalage body que Google applique pour sa bande est neutralisé
    // par le CSS (body { top: 0 !important }) — pas de JS ici pour éviter toute
    // boucle avec le moteur Google qui figeait la page.

    return () => iconObserver.disconnect();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Moteur Google invisible (nécessaire à la traduction) */}
      <div
        id="google_translate_engine"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />

      {/* Bouton flottant — style WhatsApp */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Traduire le site"
        title="Traduire le site"
        className="fixed bottom-8 right-24 z-[60] w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform border border-black/10"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {/* Panneau de langue */}
      <div
        className={`fixed bottom-24 right-24 z-[60] bg-white rounded-2xl shadow-2xl border border-black/10 p-4 w-56 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary text-lg">translate</span>
          <p className="font-semibold text-slate-900 text-sm">Traduire le site</p>
        </div>
        <div className="flex flex-col gap-1">
          {LANGUES.map((l) => (
            <button
              key={l.code}
              onClick={() => changerLangue(l.code)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                langue === l.code
                  ? 'bg-primary text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{l.flag}</span>
              {l.label}
              {langue === l.code && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-3 leading-snug">
          Traduction automatique — la version française fait foi.
        </p>
      </div>
    </>,
    document.body
  );
}
