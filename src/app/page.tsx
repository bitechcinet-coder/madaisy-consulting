import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

export default function Home() {
  const values = [
    {
      icon: 'shield',
      title: 'Éthique',
      description:
        'Nous plaçons la transparence au cœur de nos échanges. Chaque dossier est traité avec une intégrité absolue pour garantir la confiance de nos clients.',
    },
    {
      icon: 'trophy',
      title: 'Excellence',
      description:
        'La rigueur académique est notre boussole. Nous optimisons chaque candidature pour qu\'elle réponde aux standards les plus élevés.',
    },
    {
      icon: 'diversity_3',
      title: 'Engagement',
      description:
        'Nous ne sommes pas de simples consultants, nous sommes vos partenaires. Un suivi constant jusqu\'à votre installation.',
    },
  ];

  const steps = [
    {
      num: 1,
      title: 'Orientation',
      desc: 'Choix stratégique des filières et des établissements selon votre profil et vos ambitions.',
    },
    {
      num: 2,
      title: 'Admission',
      desc: 'Constitution du dossier Campus France, préparation aux entretiens et suivi des candidatures.',
    },
    {
      num: 3,
      title: 'Installation',
      desc: 'Recherche de logement, démarches de visa et accueil chaleureux sur le sol français.',
    },
  ];

  return (
    <>
      {/* ========== HERO — overlay réduit, typo raffinée ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/50 via-bg-dark/30 to-transparent z-10" />
          <div
            className="w-full h-full bg-cover bg-center scale-105"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=85)',
            }}
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-28">
          <div className="max-w-xl">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-6">
              Madaisy Consulting Agency
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] mb-8 tracking-tight">
              Étudiez en France
              <br />
              <span className="text-primary font-bold">avec sérénité.</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-lg">
              Service sur mesure pour votre mobilité internationale. De l&apos;orientation à
              l&apos;installation, nous vous accompagnons à chaque étape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary-lg">
                Évaluer mon projet
              </Link>
              <Link href="/qui-sommes-nous" className="btn-outline px-8 py-4 text-base rounded-xl">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BANDEAU RÉASSURANCE ========== */}
      <section className="py-14 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#fafaf9] px-10 py-10 rounded-3xl">
            <div className="flex items-center gap-6">
              <div className="text-primary text-7xl font-light tracking-tighter">100%</div>
              <div>
                <p className="text-xl font-semibold text-slate-900">Taux de réussite</p>
                <p className="text-slate-500 text-sm">Accompagnement rigoureux depuis 2024</p>
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-black/10" />
            <p className="text-slate-500 max-w-md italic text-center md:text-left text-base font-light leading-relaxed">
              &ldquo;Depuis juin 2024, 5 étudiants accompagnés avec succès vers Paris, Toulouse et Montpellier.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ========== VALEURS — cartes raffinées ========== */}
      <section className="py-28 section-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Nos fondamentaux
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Une agence à taille humaine
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">
              Trois valeurs qui guident chacune de nos actions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="card p-8 group">
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES TIMELINE ========== */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Notre méthode
            </p>
            <h2 className="section-title">Un accompagnement de A à Z</h2>
            <p className="section-subtitle mx-auto">Le parcours type pour votre succès</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 hidden lg:block -translate-y-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-semibold mb-6 ring-[6px] ring-white shadow-lg shadow-primary/15">
                    {s.num}
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER — fond sombre + carte blanche ========== */}
      <section className="py-28 section-dark">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl text-center">
            <span className="inline-block bg-primary/8 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Newsletter
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Restez informé de l&apos;actualité étudiante
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto font-light">
              Recevez nos conseils exclusifs sur les études en France, directement dans votre boîte
              mail.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
