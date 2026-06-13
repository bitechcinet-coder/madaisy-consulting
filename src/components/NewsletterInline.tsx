'use client';

export default function NewsletterInline() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    alert('Merci ! Vous êtes inscrit à la newsletter.');
    form.reset();
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 pt-4" onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder="Votre adresse email"
        className="flex-1 px-5 py-3 rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
      />
      <button type="submit" className="btn-primary">
        S&apos;abonner
      </button>
    </form>
  );
}
