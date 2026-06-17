'use client';

import { useState } from 'react';
import TurnstileWidget from './TurnstileWidget';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (res.ok) {
        alert('Merci pour votre message ! Nous vous recontacterons dans les 24h. 📧');
        form.reset();
      } else {
        const errData = await res.json().catch(() => null);
        setError(errData?.error || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">Nom complet</label>
        <input id="name" name="name" type="text" required placeholder="Votre nom" disabled={submitting} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
        <input id="email" name="email" type="email" required placeholder="votre@email.com" disabled={submitting} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">Téléphone</label>
        <input id="phone" name="phone" type="tel" placeholder="+225 ..." disabled={submitting} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">Votre projet</label>
        <select id="subject" name="subject" required disabled={submitting} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed">
          <option value="">Sélectionnez...</option>
          <option>Orientation académique</option>
          <option>Dossier Campus France</option>
          <option>Demande de visa</option>
          <option>Recherche de logement</option>
          <option>Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="Décrivez votre projet..." disabled={submitting} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors resize-y disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>
      <div className="flex justify-center">
        <TurnstileWidget onVerify={setTurnstileToken} />
      </div>
      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
      >
        {submitting && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}
