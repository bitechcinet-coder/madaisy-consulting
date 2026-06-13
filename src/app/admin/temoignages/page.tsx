'use client';
import { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  published: boolean;
}

export default function TemoignagesAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; item: Partial<Testimonial> | null }>({ open: false, item: null });

  const load = () => {
    fetch('/api/temoignages')
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => setModal({ open: true, item: { name: '', role: '', content: '', rating: 5, published: true } });
  const openEdit = (t: Testimonial) => setModal({ open: true, item: t });
  const closeModal = () => setModal({ open: false, item: null });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLInputElement).value,
      content: (form.elements.namedItem('content') as HTMLTextAreaElement).value,
      rating: parseInt((form.elements.namedItem('rating') as HTMLSelectElement).value),
      published: (form.elements.namedItem('published') as HTMLInputElement).checked,
    };
    if (modal.item?.id) {
      await fetch('/api/temoignages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: modal.item.id, ...data }) });
    } else {
      await fetch('/api/temoignages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    }
    closeModal();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await fetch('/api/temoignages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Témoignages</h1>
          <p className="text-slate-500 text-sm">{items.length} témoignage{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span> Nouveau témoignage
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">reviews</span>
          <p className="text-slate-500 mb-4">Aucun témoignage.</p>
          <button onClick={openCreate} className="btn-primary">Créer le premier</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-primary font-semibold">{t.role}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.published ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                  {t.published ? 'Publié' : 'Masqué'}
                </span>
              </div>
              <div className="flex text-amber-400 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm text-slate-200 fill-1">star</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm italic">&ldquo;{t.content}&rdquo;</p>
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-50">
                <button onClick={() => openEdit(t)} className="text-xs text-slate-500 hover:text-primary font-medium">Modifier</button>
                <button onClick={() => handleDelete(t.id)} className="text-xs text-slate-500 hover:text-red-600 font-medium">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{modal.item?.id ? 'Modifier' : 'Nouveau témoignage'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Nom *</label>
                <input name="name" required defaultValue={modal.item?.name} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Formation / Pays *</label>
                <input name="role" required defaultValue={modal.item?.role} placeholder="Master en IA — France" className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Note</label>
                <select name="rating" defaultValue={modal.item?.rating || 5} className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 bg-white">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Témoignage *</label>
                <textarea name="content" required defaultValue={modal.item?.content} rows={4} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 resize-y" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="published" id="test-pub" defaultChecked={modal.item?.published !== false} className="rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="test-pub" className="text-sm font-medium text-slate-700">Visible sur le site</label>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" className="btn-primary flex-1 justify-center">{modal.item?.id ? 'Enregistrer' : 'Créer'}</button>
                <button type="button" onClick={closeModal} className="px-6 py-3 border-2 border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
