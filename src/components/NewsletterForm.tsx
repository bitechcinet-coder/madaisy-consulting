'use client';

export default function NewsletterForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    alert('Merci pour votre inscription ! 🎓');
    form.reset();
  }

  return (
    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder="Votre adresse email"
        className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-white/50 text-slate-900 placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="bg-bg-dark text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors"
      >
        S&apos;abonner
      </button>
    </form>
  );
}
