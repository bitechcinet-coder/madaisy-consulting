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
      if (res.ok) { alert('Merci pour votre inscription ! 🎓'); form.reset(); }
      else { const errData = await res.json().catch(() => null); alert(errData?.error || 'Une erreur est survenue.'); }
    } catch { alert('Erreur serveur.'); }
    finally { setSubmitting(false); }
  }

  return (
    <form className="max-w-md mx-auto space-y-3" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="email" type="email" required placeholder="Votre adresse email"
          disabled={submitting}
          className="flex-1 px-5 py-3.5 rounded-xl border-2 border-black/10 bg-[#fafaf9] focus:border-primary focus:ring-0 focus:bg-white transition-colors text-sm placeholder:text-slate-400"
        />
        <button type="submit" disabled={submitting || !turnstileToken}
          className="bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/15 active:scale-[0.98] text-sm shrink-0 disabled:opacity-60"
        >
          {submitting ? 'Envoi...' : "S'abonner"}
        </button>
      </div>
      <div className="flex justify-center">
        <TurnstileWidget onVerify={setTurnstileToken} />
      </div>
    </form>
  );
}
