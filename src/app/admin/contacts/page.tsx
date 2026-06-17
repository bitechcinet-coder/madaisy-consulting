'use client';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/Toast';

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

type FilterTab = 'all' | 'unread' | 'read';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [markingAll, setMarkingAll] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch('/api/contacts?take=200')
      .then((r) => r.json())
      .then((data) => { setContacts(data); setLoading(false); })
      .catch(() => { setLoading(false); toast('Erreur de chargement des contacts', 'error'); });
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      await fetch('/api/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) });
      setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read: true } : null);
    } catch {
      toast('Erreur lors du marquage', 'error');
    }
  };

  const markAllRead = async () => {
    if (!confirm('Marquer tous les messages comme lus ?')) return;
    setMarkingAll(true);
    try {
      const unreadIds = contacts.filter((c) => !c.read).map((c) => c.id);
      await Promise.all(unreadIds.map((id) =>
        fetch('/api/contacts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) })
      ));
      setContacts((prev) => prev.map((c) => ({ ...c, read: true })));
      if (selected) setSelected((prev) => prev ? { ...prev, read: true } : null);
      toast(`${unreadIds.length} message(s) marqué(s) comme lu(s)`, 'success');
    } catch {
      toast('Erreur lors du marquage groupé', 'error');
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await fetch('/api/contacts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      if (selected?.id === id) setSelected(null);
      toast('Message supprimé', 'success');
      load();
    } catch {
      toast('Erreur lors de la suppression', 'error');
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === 'unread') return !c.read;
    if (filter === 'read') return c.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;
  const readCount = contacts.filter((c) => c.read).length;

  if (loading) return <div className="flex items-center justify-center py-20"><span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 text-sm">{contacts.length} message{contacts.length !== 1 ? 's' : ''} • {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingAll}
            className="btn-outline-dark flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-lg">{markingAll ? 'progress_activity' : 'done_all'}</span>
            {markingAll ? 'Marquage...' : 'Marquer tout comme lu'}
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 bg-white rounded-xl border border-slate-100 p-1 w-fit">
        {[
          { key: 'all' as FilterTab, label: 'Tous', count: contacts.length },
          { key: 'unread' as FilterTab, label: 'Non lus', count: unreadCount },
          { key: 'read' as FilterTab, label: 'Lus', count: readCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setFilter(tab.key); setSelected(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold ${
              filter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">inbox</span>
          <p className="text-slate-500">{filter === 'unread' ? 'Tous les messages sont lus.' : filter === 'read' ? 'Aucun message lu.' : 'Aucun message pour le moment.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden max-h-[70vh] overflow-y-auto">
            {filteredContacts.map((c) => (
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
