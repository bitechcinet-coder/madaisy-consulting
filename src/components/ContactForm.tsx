'use client';

export default function ContactForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert('Merci pour votre message ! Nous vous recontacterons dans les 24h. 📧');
      form.reset();
    } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">Nom complet</label>
        <input id="name" name="name" type="text" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
        <input id="email" name="email" type="email" required placeholder="votre@email.com" className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">Téléphone</label>
        <input id="phone" name="phone" type="tel" placeholder="+225 ..." className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">Votre projet</label>
        <select id="subject" name="subject" required className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors bg-white">
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
        <textarea id="message" name="message" required rows={5} placeholder="Décrivez votre projet..." className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-0 transition-colors resize-y" />
      </div>
      <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">Envoyer le message</button>
    </form>
  );
}
