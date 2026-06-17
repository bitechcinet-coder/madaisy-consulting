'use client';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/Toast';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGE_META: Record<string, { label: string; href: string; description: string; icon: string }> = {
  'accueil': { label: 'Accueil', href: '/', description: 'Page d\'accueil du site', icon: 'home' },
  'qui-sommes-nous': { label: 'Qui sommes-nous ?', href: '/qui-sommes-nous', description: 'Présentation de Madaisy Consulting', icon: 'groups' },
  'services': { label: 'Nos services', href: '/services', description: 'Liste des services proposés', icon: 'design_services' },
  'temoignages': { label: 'Témoignages', href: '/temoignages', description: 'Retours d\'étudiants', icon: 'reviews' },
  'blog': { label: 'Blog', href: '/blog', description: 'Articles et actualités', icon: 'article' },
  'contact': { label: 'Contact', href: '/contact', description: 'Formulaire de contact', icon: 'mail' },
  'confidentialite': { label: 'Confidentialité', href: '/confidentialite', description: 'Politique de confidentialité', icon: 'shield' },
  'mentions-legales': { label: 'Mentions légales', href: '/mentions-legales', description: 'Mentions légales du site', icon: 'gavel' },
};

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; page: Partial<Page> | null }>({ open: false, page: null });
  const { toast } = useToast();

  const load = () => {
    fetch('/api/pages?admin=true')
      .then((r) => r.json())
      .then((data) => { setPages(data); setLoading(false); })
      .catch(() => { setLoading(false); toast('Erreur de chargement des pages', 'error'); });
  };
  useEffect(() => { load(); }, []);

  const openEdit = (page: Page) => setModal({ open: true, page });
  const openCreate = () => setModal({ open: true, page: { slug: '', title: '', content: '{}', published: false } });
  const closeModal = () => setModal({ open: false, page: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      slug: (form.elements.namedItem('slug') as HTMLInputElement).value,
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      content: (form.elements.namedItem('content') as HTMLTextAreaElement).value,
      published: (form.elements.namedItem('published') as HTMLInputElement).checked,
    };
    try {
      if (modal.page?.id) {
        await fetch('/api/pages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: modal.page.id, ...data }) });
        toast('Page mise à jour avec succès', 'success');
      } else {
        await fetch('/api/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        toast('Page créée avec succès', 'success');
      }
      closeModal();
      load();
    } catch {
      toast("Erreur lors de l'enregistrement", 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette page ?')) return;
    try {
      await fetch('/api/pages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      toast('Page supprimée', 'success');
      load();
    } catch {
      toast('Erreur lors de la suppression', 'error');
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    try {
      await fetch('/api/pages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, published: !current }) });
      setPages((prev) => prev.map((p) => (p.id === id ? { ...p, published: !current } : p)));
      toast(current ? 'Page masquée' : 'Page publiée', 'success');
    } catch {
      toast('Erreur lors de la mise à jour', 'error');
    }
  };

  // Merge DB pages with known page metadata
  const allPages = [...pages];
  // Add any known pages that don't exist in DB yet
  for (const [slug, meta] of Object.entries(PAGE_META)) {
    if (!allPages.find((p) => p.slug === slug)) {
      allPages.push({
        id: '',
        slug,
        title: meta.label,
        content: '{}',
        published: false,
        createdAt: '',
        updatedAt: '',
      });
    }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="text-slate-500 text-sm">Gérez le contenu des pages de votre site.</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-lg">add</span> Nouvelle page
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        {pages.length} page{pages.length !== 1 ? 's' : ''} en base •{' '}
        {pages.filter((p) => p.published).length} publiée{pages.filter((p) => p.published).length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPages.map((page) => {
          const meta = PAGE_META[page.slug] || {
            label: page.title || page.slug,
            href: `/${page.slug}`,
            description: '',
            icon: 'description',
          };
          const existsInDb = !!page.id;
          return (
            <div key={page.slug} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className={`material-symbols-outlined text-2xl ${existsInDb && page.published ? 'text-primary' : 'text-slate-300'}`}>
                  {meta.icon}
                </span>
                {existsInDb && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${page.published ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                    {page.published ? 'Publié' : 'Brouillon'}
                  </span>
                )}
                {!existsInDb && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-600">
                    À créer
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{meta.label}</h3>
              <p className="text-xs text-slate-400 font-mono mb-1">{page.slug}</p>
              {meta.description && <p className="text-xs text-slate-500 mb-4">{meta.description}</p>}

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
                <a
                  href={meta.href}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium"
                  title="Voir sur le site"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span> Voir
                </a>
                {existsInDb ? (
                  <>
                    <button
                      onClick={() => openEdit(page)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span> Modifier
                    </button>
                    <button
                      onClick={() => togglePublish(page.id, page.published)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-600 font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {page.published ? 'visibility_off' : 'publish'}
                      </span>
                      {page.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setModal({
                        open: true,
                        page: { slug: page.slug, title: meta.label, content: '{}', published: false },
                      });
                    }}
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span> Créer en base
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{modal.page?.id ? 'Modifier la page' : 'Nouvelle page'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Slug *</label>
                <input name="slug" required defaultValue={modal.page?.slug} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Titre *</label>
                <input name="title" required defaultValue={modal.page?.title} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                  Contenu (JSON)
                  <span className="text-slate-400 font-normal ml-1">— pour pages dynamiques</span>
                </label>
                <textarea
                  name="content"
                  defaultValue={modal.page?.content || '{}'}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 resize-y font-mono text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="published" id="page-pub" defaultChecked={modal.page?.published === true} className="rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="page-pub" className="text-sm font-medium text-slate-700">Publiée</label>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" className="btn-primary flex-1 justify-center">{modal.page?.id ? 'Enregistrer' : 'Créer'}</button>
                <button type="button" onClick={closeModal} className="px-6 py-3 border-2 border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
