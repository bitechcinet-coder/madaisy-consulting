'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ contacts: 0, blog: 0, temoignages: 0 });

  useEffect(() => {
    async function load() {
      const [cRes, bRes, tRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/blog'),
        fetch('/api/temoignages'),
      ]);
      const [contacts, blog, temoignages] = await Promise.all([
        cRes.json(),
        bRes.json(),
        tRes.json(),
      ]);
      setStats({
        contacts: contacts.length || 0,
        blog: blog.length || 0,
        temoignages: temoignages.length || 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: 'Messages reçus', value: stats.contacts, icon: 'mail', href: '/admin/contacts', color: 'bg-blue-50 text-blue-600' },
    { label: 'Articles blog', value: stats.blog, icon: 'article', href: '/admin/blog', color: 'bg-green-50 text-green-600' },
    { label: 'Témoignages', value: stats.temoignages, icon: 'reviews', href: '/admin/temoignages', color: 'bg-amber-50 text-amber-600' },
    { label: 'Pages', value: '—', icon: 'description', href: '/admin/pages', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
      <p className="text-slate-500 mb-8">Bienvenue dans l&apos;administration Madaisy Consulting.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-white rounded-xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${c.color}`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{c.value}</p>
            <p className="text-slate-500 text-sm mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/blog" className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-primary">post_add</span>
            <div>
              <p className="font-medium text-slate-900">Nouvel article</p>
              <p className="text-slate-500 text-sm">Publier un article de blog</p>
            </div>
          </Link>
          <Link href="/admin/temoignages" className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-primary">add_comment</span>
            <div>
              <p className="font-medium text-slate-900">Nouveau témoignage</p>
              <p className="text-slate-500 text-sm">Ajouter un retour étudiant</p>
            </div>
          </Link>
          <Link href="/admin/contacts" className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-primary">inbox</span>
            <div>
              <p className="font-medium text-slate-900">Boîte de réception</p>
              <p className="text-slate-500 text-sm">Consulter les messages</p>
            </div>
          </Link>
          <Link href="/" target="_blank" className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-primary">open_in_new</span>
            <div>
              <p className="font-medium text-slate-900">Voir le site</p>
              <p className="text-slate-500 text-sm">Ouvrir le site public</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
