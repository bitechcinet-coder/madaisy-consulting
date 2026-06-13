import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

export default function Home() {
  const values = [
    {
      icon: 'shield_with_heart',
      title: 'Éthique',
      description:
        'Nous plaçons la transparence au cœur de nos échanges. Chaque dossier est traité avec une intégrité absolue pour garantir la confiance de nos clients.',
    },
    {
      icon: 'stars',
      title: 'Excellence',
      description:
        'La rigueur académique est notre boussole. Nous optimisons chaque candidature pour répondre aux standards les plus élevés des universités françaises.',
    },
    {
      icon: 'handshake',
      title: 'Engagement',
      description:
        'Nous ne sommes pas de simples consultants, nous sommes vos partenaires. Un suivi constant et personnalisé jusqu\'à votre installation.',
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
      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/85 to-bg-dark/40 z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80)',
            }}
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-black leading-[1.1] mb-6">
              Étudiez en France avec sérénité.
            </h1>
            <p className="text-slate-200 text-lg md:text-xl mb-8 font-light leading-relaxed">
              Vous êtes en classe de terminale ou titulaire du baccalauréat et souhaitez poursuivre
              vos études supérieures dans le privé en France ? Ne cherchez plus loin, nous vous
              offrons un service sur mesure pour votre mobilité internationale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="btn-primary-lg">
                Évaluer mon projet
              </Link>
              <Link href="/qui-sommes-nous" className="btn-outline px-8 py-4 text-lg rounded-xl">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BANDEAU RÉASSURANCE ========== */}
      <section className="bg-white border-b border-primary/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-bg-light p-8 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-6">
              <div className="text-primary text-6xl font-black">100%</div>
              <div>
                <p className="text-xl font-bold text-slate-900">Taux de réussite</p>
                <p className="text-slate-500">Accompagnement rigoureux et personnalisé</p>
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-primary/20" />
            <p className="text-slate-600 max-w-md italic text-center md:text-left">
              &ldquo;Depuis juin 2024, nous avons permis à des dizaines d&apos;étudiants de
              concrétiser leur rêve académique en France sans aucune embûche
              administrative.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ========== VALEURS ========== */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Une agence à taille humaine</h2>
            <div className="underline-red mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="card group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{v.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES TIMELINE ========== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Un accompagnement de A à Z</h2>
            <p className="section-subtitle mx-auto">Le parcours type pour votre succès</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 hidden lg:block -translate-y-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white">
                    {s.num}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez informé de l&apos;actualité étudiante
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Inscrivez-vous à notre newsletter pour recevoir nos conseils exclusifs sur les études en
            France.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
