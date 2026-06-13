'use client';

export default function PagesAdmin() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Pages</h1>
      <p className="text-slate-500 mb-8">Gérez le contenu des pages de votre site.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { slug: 'accueil', title: 'Accueil' },
          { slug: 'qui-sommes-nous', title: 'Qui sommes-nous ?' },
          { slug: 'services', title: 'Nos services' },
          { slug: 'temoignages', title: 'Témoignages' },
          { slug: 'blog', title: 'Blog' },
          { slug: 'contact', title: 'Contact' },
        ].map((p) => (
          <div key={p.slug} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-2xl mb-3 block">description</span>
            <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
            <p className="text-xs text-slate-400 font-mono">{p.slug}</p>
            <button className="mt-4 text-sm text-primary font-medium hover:underline">
              Modifier le contenu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
