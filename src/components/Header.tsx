'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/qui-sommes-nous', label: 'Qui sommes-nous ?' },
  { href: '/services', label: 'Nos services' },
  { href: '/blog', label: 'Blog' },
  { href: '/temoignages', label: 'Témoignages' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo-icon.png"
            alt="Madaisy Consulting"
            className="w-10 h-10 rounded-lg object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-lg font-extrabold tracking-tight text-slate-900">
              Madaisy<span className="text-primary"> Consulting</span>
            </span>
            <span className="text-[10px] md:text-xs text-slate-400 tracking-widest uppercase hidden sm:block">
              Agence de mobilité internationale
            </span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/contact" className="btn-primary">
              Contactez-nous
            </Link>
          )}
          <button
            className="md:hidden text-2xl text-slate-900"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-primary py-2"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary text-center mt-2"
          >
            Contactez-nous
          </Link>
        </div>
      )}
    </header>
  );
}
