'use client';
import { useEffect, useState, useRef } from 'react';

interface ContentSection {
  heading?: string;
  image?: string;
  body?: string | string[];
  list?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  content: string;
  coverImage?: string;
  readTime: number;
  published: boolean;
  createdAt: string;
}

const CATEGORIES = ['Guide', 'Lifestyle', 'Pratique', 'Argent', 'Administratif', 'Rédaction'];

function newSection(): ContentSection {
  return { heading: '', body: '' };
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; post: Partial<BlogPost> | null }>({ open: false, post: null });
  const [contentSections, setContentSections] = useState<ContentSection[]>([newSection()]);
  const [introduction, setIntroduction] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[àâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openCreate = () => {
    setContentSections([newSection()]);
    setIntroduction('');
    setConclusion('');
    setModal({ open: true, post: { title: '', slug: '', excerpt: '', category: 'Guide', author: 'Madaisy Team', content: '{}', readTime: 5, published: true } });
  };

  const openEdit = (post: BlogPost) => {
    let parsed: any = {};
    try { parsed = JSON.parse(post.content || '{}'); } catch {}
    setIntroduction(parsed.introduction || '');
    setConclusion(parsed.conclusion || '');
    setContentSections(parsed.sections?.length ? parsed.sections : [newSection()]);
    setModal({ open: true, post });
  };

  const closeModal = () => setModal({ open: false, post: null });

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUploading(false);
    return data.url || '';
  };

  const handleImageUpload = async (sectionIndex?: number) => {
    const input = fileRef.current;
    if (!input) return;
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = await uploadImage(file);
      if (!url) return alert('Upload échoué');
      if (sectionIndex !== undefined) {
        setContentSections((prev) => prev.map((s, i) => i === sectionIndex ? { ...s, image: url } : s));
      } else {
        setModal((prev) => ({ ...prev, post: { ...prev.post!, coverImage: url } }));
      }
    };
  };

  const addSection = () => setContentSections((prev) => [...prev, newSection()]);
  const removeSection = (i: number) => setContentSections((prev) => prev.filter((_, j) => j !== i));

  const updateSection = (i: number, field: keyof ContentSection, value: any) => {
    setContentSections((prev) => prev.map((s, j) => j === i ? { ...s, [field]: value } : s));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const content = JSON.stringify({
      introduction,
      sections: contentSections.filter((s) => s.heading || s.body || s.image),
      conclusion,
    });

    const data: any = {
      title,
      slug: (form.elements.namedItem('slug') as HTMLInputElement).value || slugify(title),
      excerpt: (form.elements.namedItem('excerpt') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      author: (form.elements.namedItem('author') as HTMLInputElement).value,
      readTime: parseInt((form.elements.namedItem('readTime') as HTMLInputElement).value) || 5,
      published: (form.elements.namedItem('published') as HTMLInputElement).checked,
      content,
    };
    if (modal.post?.coverImage) data.coverImage = modal.post.coverImage;

    if (modal.post?.id) {
      await fetch('/api/blog', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: modal.post.id, ...data }) });
    } else {
      await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    }
    closeModal();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await fetch('/api/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await fetch('/api/blog', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, published: !current }) });
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, published: !current } : p)));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="text-slate-500 text-sm">{posts.length} article{posts.length !== 1 ? 's' : ''} • <a href="/blog" target="_blank" className="text-primary hover:underline">Voir le blog public</a></p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span> Nouvel article
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">article</span>
          <p className="text-slate-500 mb-4">Aucun article.</p>
          <button onClick={openCreate} className="btn-primary">Créer le premier article</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Article</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Catégorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase w-24">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase w-28">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.coverImage && <img src={post.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                      <div>
                        <p className="font-medium text-slate-900">{post.title}</p>
                        <p className="text-slate-400 text-xs truncate max-w-xs">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">{post.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublish(post.id, post.published)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${post.published ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                      {post.published ? 'Publié' : 'Brouillon'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString('fr')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-primary" title="Voir"><span className="material-symbols-outlined text-lg">visibility</span></a>
                      <button onClick={() => openEdit(post)} className="p-2 text-slate-400 hover:text-primary" title="Modifier"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600" title="Supprimer"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-xl font-bold text-slate-900">{modal.post?.id ? "Modifier l'article" : 'Nouvel article'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Titre *</label>
                  <input name="title" required defaultValue={modal.post?.title} onChange={(e) => {
                    const slugInput = document.querySelector<HTMLInputElement>('input[name="slug"]');
                    if (slugInput && !modal.post?.id) slugInput.value = slugify(e.target.value);
                  }} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Slug *</label>
                  <input name="slug" required defaultValue={modal.post?.slug} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Temps de lecture (min)</label>
                  <input name="readTime" type="number" defaultValue={modal.post?.readTime || 5} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Catégorie</label>
                  <select name="category" defaultValue={modal.post?.category || 'Guide'} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 bg-white">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Auteur</label>
                  <input name="author" defaultValue={modal.post?.author || 'Madaisy Team'} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Extrait (affiché sur la page blog)</label>
                <textarea name="excerpt" rows={2} defaultValue={modal.post?.excerpt} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 resize-y" />
              </div>

              {/* Image de couverture */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Image de couverture</label>
                <div className="flex items-center gap-4">
                  {modal.post?.coverImage ? (
                    <div className="relative">
                      <img src={modal.post.coverImage} alt="Cover" className="w-32 h-20 rounded-lg object-cover" />
                      <button type="button" onClick={() => setModal((prev) => ({ ...prev, post: { ...prev.post!, coverImage: undefined } }))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                    </div>
                  ) : (
                    <div className="w-32 h-20 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Aucune</div>
                  )}
                  <button type="button" onClick={() => handleImageUpload()} disabled={uploading} className="px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:border-primary hover:text-primary transition-colors">
                    {uploading ? 'Upload...' : 'Uploader une image'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name="published" id="modal-pub" defaultChecked={modal.post?.published !== false} className="rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="modal-pub" className="text-sm font-medium text-slate-700">Publier</label>
              </div>

              <hr className="border-slate-100" />

              {/* CONTENU RICHE */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">edit_note</span> Contenu de l&apos;article
                </h3>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Introduction</label>
                  <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} rows={3} placeholder="Introduction de l'article..." className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 resize-y text-sm" />
                </div>

                {contentSections.map((section, i) => (
                  <div key={i} className="bg-bg-light rounded-xl p-4 mb-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-primary uppercase">Section {i + 1}</span>
                      {contentSections.length > 1 && (
                        <button type="button" onClick={() => removeSection(i)} className="text-xs text-red-500 hover:text-red-700">Supprimer</button>
                      )}
                    </div>

                    <input
                      value={section.heading || ''}
                      onChange={(e) => updateSection(i, 'heading', e.target.value)}
                      placeholder="Titre de la section"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-0 text-sm font-semibold mb-3"
                    />

                    {section.image && (
                      <div className="relative mb-3">
                        <img src={section.image} alt="" className="w-full h-48 rounded-lg object-cover" />
                        <button type="button" onClick={() => updateSection(i, 'image', undefined)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                      </div>
                    )}

                    <textarea
                      value={typeof section.body === 'string' ? section.body : (Array.isArray(section.body) ? section.body.join('\n') : '')}
                      onChange={(e) => updateSection(i, 'body', e.target.value)}
                      placeholder="Contenu (un paragraphe par ligne)"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-0 resize-y text-sm mb-3"
                    />

                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleImageUpload(i)} disabled={uploading} className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500 hover:border-primary hover:text-primary">
                        {section.image ? "Changer l'image" : '+ Ajouter une image'}
                      </button>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addSection} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-primary hover:text-primary transition-colors">
                  + Ajouter une section
                </button>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Conclusion</label>
                  <textarea value={conclusion} onChange={(e) => setConclusion(e.target.value)} rows={3} placeholder="Résumé ou conclusion..." className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 resize-y text-sm" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 sticky bottom-0 bg-white pb-2">
                <button type="submit" className="btn-primary flex-1 justify-center text-base">{modal.post?.id ? 'Enregistrer' : "Créer l'article"}</button>
                <button type="button" onClick={closeModal} className="px-6 py-3 border-2 border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
