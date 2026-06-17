'use client';

import { useState } from 'react';
import TurnstileWidget from './TurnstileWidget';

export default function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken }),
      });

      if (res.ok) {
        alert('Merci pour votre inscription ! 🎓');
        form.reset();
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.error || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      alert('Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder="Votre adresse email"
        disabled={submitting}
        className="flex-1 px-5 py-3.5 rounded-xl border-2 border-black/10 bg-[#fafaf9] focus:border-primary focus:ring-0 focus:bg-white transition-colors text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex justify-center">
        <TurnstileWidget onVerify={setTurnstileToken} />
      </div>
      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        className="bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/15 active:scale-[0.98] text-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
      >
        {submitting && (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {submitting ? 'Envoi...' : 'S\'abonner'}
      </button>
    </form>
  );
}
