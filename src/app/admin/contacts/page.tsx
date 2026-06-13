'use client';
import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const load = () => {
    fetch('/api/contacts')
      .then((r) => r.json())
      .then((data) => { setContacts(data); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await fetch('/api/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read: true } : null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    await fetch('/api/contacts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (selected?.id === id) setSelected(null);
    load();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span></div>;

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 text-sm">{contacts.length} message{contacts.length !== 1 ? 's' : ''} • {unread} non lu{unread !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">inbox</span>
          <p className="text-slate-500">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden max-h-[70vh] overflow-y-auto">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelected(c); if (!c.read) markRead(c.id); }}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selected?.id === c.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-slate-900 text-sm">{c.name}</span>
                  {!c.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{c.subject}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(c.createdAt).toLocaleDateString('fr')}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-primary text-sm hover:underline">{selected.email}</a>
                    {selected.phone && <p className="text-slate-500 text-sm">{selected.phone}</p>}
                  </div>
                  <span className="text-xs text-slate-400">{new Date(selected.createdAt).toLocaleString('fr')}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-xs font-semibold text-primary uppercase mb-1">{selected.subject}</p>
                  <p className="text-slate-700 whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="flex gap-3">
                  <a href={`mailto:${selected.email}?subject=Re:%20${encodeURIComponent(selected.subject)}&body=Bonjour%20${encodeURIComponent(selected.name)},%0D%0A%0D%0A`}
                    className="btn-primary inline-flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">reply</span> Répondre
                  </a>
                  <button onClick={() => handleDelete(selected.id)}
                    className="px-4 py-2.5 border-2 border-red-200 text-red-500 rounded-lg font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">delete</span> Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-16">
                <span className="material-symbols-outlined text-5xl mb-4">mail</span>
                <p>Sélectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
