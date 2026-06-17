import Link from 'next/link';

const services = [
  { href: '/services', label: 'Accompagnement Campus France' },
  { href: '/services', label: 'Préparation aux entretiens' },
  { href: '/services', label: 'Aide au logement' },
  { href: '/services', label: 'Révision de dossiers' },
];

const liens = [
  { href: '/qui-sommes-nous', label: 'À propos' },
  { href: '/blog', label: 'Notre Blog' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
              <img src="/logo-icon.png" alt="Madaisy Consulting" className="w-9 h-9 rounded object-contain" />
              <span className="text-lg font-extrabold tracking-tight">Madaisy<span className="text-primary"> Consulting</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              L&apos;agence de référence pour votre projet d&apos;études en France.
              Accompagnement, expertise et réussite garantis.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-slate-400 text-sm hover:text-primary transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-widest">Liens utiles</h4>
            <ul className="space-y-2.5">
              {liens.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 text-sm hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-widest">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">call</span>
                +225 05 64 48 92 75
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                contact@madaisy-consulting.com
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">location_on</span>
                Abidjan, Côte d&apos;Ivoire
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Madaisy Consulting Agency. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
