import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    'Un accompagnement de A à Z : orientation stratégique, recherche et admission, accompagnement à l\'installation. Madaisy Consulting Agency.',
};

export default function Services() {
  const steps = [
    {
      num: '01',
      icon: 'explore',
      title: 'Orientation stratégique',
      description:
        'Nous débutons par une analyse approfondie de votre profil et de vos objectifs. Cette phase de diagnostic nous permet de définir votre projet personnalisé en adéquation avec les réalités du marché et vos aspirations.',
      checklist: ['Audit de profil personnalisé', 'Plan d\'action détaillé'],
    },
    {
      num: '02',
      icon: 'description',
      title: 'Recherche et Admission',
      description:
        'Notre équipe prend en charge la gestion complète de vos dossiers. De l\'identification des meilleures opportunités à la validation finale de votre admission, nous optimisons chaque détail pour maximiser vos chances de succès.',
      checklist: ['Gestion documentaire administrative', 'Suivi rigoureux des candidatures'],
    },
    {
      num: '03',
      icon: 'cottage',
      title: 'Accompagnement à l\'installation',
      description:
        'Parce que votre réussite ne s\'arrête pas à une admission, nous vous accompagnons jusqu\'à votre installation. Aide au logement, formalités de départ et conseils logistiques pour une transition sereine.',
      checklist: ['Recherche de logement et garanties', 'Formalités d\'accueil et intégration'],
    },
  ];

  const avantages = [
    {
      icon: 'verified_user',
      title: 'Transparence',
      desc: 'Processus clairs et communication régulière.',
    },
    {
      icon: 'speed',
      title: 'Rapidité',
      desc: 'Traitement efficace de vos demandes.',
    },
    {
      icon: 'groups',
      title: 'Proximité',
      desc: 'Un conseiller dédié pour votre projet.',
    },
  ];

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative">
        <div
          className="bg-cover bg-center min-h-[320px] flex items-end relative rounded-b-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(35, 15, 16, 0.9) 0%, rgba(35, 15, 16, 0.2) 60%), url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest mb-4 inline-block">
              Expertise
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Nos Services
            </h1>
            <p className="text-slate-200 text-lg max-w-2xl font-medium mt-2">
              Une expertise pointue pour transformer vos ambitions en réalité concrète.
            </p>
          </div>
        </div>
      </section>

      {/* ========== INTRO ========== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-4">
            Un accompagnement <span className="text-primary italic">de A à Z</span>
          </h2>
          <div className="underline-red mb-6" />
          <p className="text-slate-600 text-xl font-medium leading-relaxed">
            Madaisy Consulting Agency vous guide à chaque étape cruciale de votre projet. Nous
            transformons la complexité administrative en un parcours fluide et sécurisé.
          </p>
        </div>
      </section>

      {/* ========== STEPS ========== */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {steps.map((step, i) => (
            <div key={step.num} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 group">
              {/* Icône + ligne */}
              <div className="flex flex-col items-center">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-px bg-slate-200 h-full mt-4 border-dashed border-l-2" />
                )}
              </div>

              {/* Contenu */}
              <div className="card">
                <span className="text-primary font-black text-xs tracking-[0.2em] uppercase mb-2 block">
                  Étape {step.num}
                </span>
                <h3 className="text-slate-900 text-2xl font-extrabold mb-3">{step.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-slate-700 font-medium"
                    >
                      <span className="material-symbols-outlined text-primary text-sm">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== POURQUOI NOUS CHOISIR ========== */}
      <section className="bg-bg-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-black mb-10">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((a) => (
              <div
                key={a.title}
                className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-4xl">{a.icon}</span>
                <h4 className="text-white font-bold">{a.title}</h4>
                <p className="text-slate-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary-lg mt-10 inline-block">
            Démarrer mon projet maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
