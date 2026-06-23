'use client';
import { useState } from 'react';
import TurnstileWidget from './TurnstileWidget';

export default function NewsletterInline() {
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
      if (res.ok) { alert('Merci ! Vous êtes inscrit à la newsletter.'); form.reset(); }
      else { const e = await res.json().catch(() => null); alert(e?.error || 'Erreur.'); }
    } catch { alert('Erreur serveur.'); }
    finally { setSubmitting(false); }
  }

  return (
    <form className="space-y-3 pt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input name="email" type="email" required placeholder="Votre adresse email" disabled={submitting}
          className="flex-1 px-5 py-3 rounded-xl border-2 border-black/10 bg-[#fafaf9] focus:border-primary focus:ring-0 focus:bg-white transition-colors text-sm" />
        <button type="submit" disabled={submitting || !turnstileToken}
          className="btn-primary shrink-0 disabled:opacity-60">
          {submitting ? '...' : "S'abonner"}
        </button>
      </div>
      <div className="flex justify-center">
        <TurnstileWidget onVerify={setTurnstileToken} />
      </div>
    </form>
  );
}
