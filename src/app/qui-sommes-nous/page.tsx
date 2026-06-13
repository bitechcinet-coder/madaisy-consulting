import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qui sommes-nous ?',
  description:
    'Découvrez Madaisy Consulting Agency, fondée par Marie-Désirée TANOH. Une agence à taille humaine dédiée à votre réussite académique en France.',
};

export default function QuiSommesNous() {
  const atouts = [
    {
      icon: 'public',
      title: 'Réseau Global',
      desc: 'Une expertise connectée aux enjeux mondiaux actuels.',
    },
    {
      icon: 'diversity_3',
      title: 'Approche Humaine',
      desc: 'Nous plaçons l\'individu au centre de chaque décision.',
    },
    {
      icon: 'verified_user',
      title: 'Conformité',
      desc: 'Respect strict des cadres légaux internationaux.',
    },
    {
      icon: 'speed',
      title: 'Réactivité',
      desc: 'Des réponses rapides à vos besoins urgents.',
    },
  ];

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden">
        <div
          className="bg-cover bg-center min-h-[360px] flex items-center relative"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(35, 15, 16, 0.85) 0%, rgba(35, 15, 16, 0.2) 100%), url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              À propos de nous
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
              Une agence à taille humaine, dédiée à votre réussite
            </h1>
          </div>
        </div>
      </section>

      {/* ========== LA FONDATRICE ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-primary" />
                <span className="text-primary font-bold uppercase tracking-wider text-sm">
                  La Fondatrice
                </span>
              </div>
              <h2 className="text-slate-900 text-3xl font-bold leading-tight mb-6">
                L&apos;expertise au service de votre mobilité
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Fondée par{' '}
                  <span className="font-bold text-slate-900">Marie-Désirée TANOH</span>,
                  Madaisy Consulting Agency est née d&apos;une volonté d&apos;offrir un
                  accompagnement de haute qualité aux étudiants souhaitant poursuivre leurs études
                  en France.
                </p>
                <p>
                  Spécialisée dans la{' '}
                  <span className="text-primary font-semibold">mobilité internationale</span> et
                  l&apos;accompagnement stratégique, Marie-Désirée apporte une vision humaine et
                  rigoureuse à chaque projet d&apos;études.
                </p>
              </div>

              {/* Carte fondatrice */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-bg-light rounded-xl border-l-4 border-primary">
                <Image
                  src="/marie-desiree-tanoh.png"
                  alt="Marie-Désirée TANOH"
                  width={80}
                  height={80}
                  className="rounded-full w-20 h-20 object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="text-slate-900 text-xl font-bold">Marie-Désirée TANOH</p>
                  <p className="text-slate-500 text-sm italic">
                    Fondatrice & Experte en mobilité internationale
                  </p>
                </div>
              </div>
            </div>

            {/* Grande photo */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full -z-10" />
              <Image
                src="/marie-desiree-tanoh.png"
                alt="Marie-Désirée TANOH — Fondatrice de Madaisy Consulting Agency"
                width={600}
                height={450}
                className="rounded-xl shadow-2xl w-full object-cover h-[450px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHIE ========== */}
      <section className="bg-bg-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Notre philosophie</h2>
            <p className="text-slate-500 text-lg italic">
              &ldquo;Parce que chaque parcours est unique, notre approche l&apos;est aussi.&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">
                  workspace_premium
                </span>
              </div>
              <div>
                <h3 className="text-slate-900 text-xl font-bold mb-3">Qualité vs Quantité</h3>
                <p className="text-slate-600 leading-relaxed">
                  Chez Madaisy, nous privilégions l&apos;excellence et l&apos;accompagnement
                  personnalisé plutôt que le volume. Chaque projet bénéficie d&apos;une attention
                  exclusive et d&apos;une analyse profonde pour garantir un succès durable.
                </p>
              </div>
            </div>
            <div className="card flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
              </div>
              <div>
                <h3 className="text-slate-900 text-xl font-bold mb-3">Notre Engagement</h3>
                <p className="text-slate-600 leading-relaxed">
                  Nous nous engageons à être votre partenaire de confiance. Notre promesse : une
                  transparence totale, une réactivité exemplaire et une rigueur méthodologique sans
                  faille pour sécuriser vos démarches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI NOUS CHOISIR ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="section-title">Pourquoi nous choisir ?</h2>
              <p className="text-slate-600">
                Nous combinons expertise technique et intelligence émotionnelle pour naviguer les
                complexités de la mobilité internationale.
              </p>
            </div>
            <Link
              href="/services"
              className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all"
            >
              Découvrir nos services
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atouts.map((a) => (
              <div
                key={a.title}
                className="p-6 border border-slate-100 rounded-xl hover:border-primary/30 transition-colors group"
              >
                <span className="material-symbols-outlined text-primary mb-4 text-3xl group-hover:scale-110 transition-transform inline-block">
                  {a.icon}
                </span>
                <h4 className="font-bold text-slate-900 mb-2">{a.title}</h4>
                <p className="text-slate-500 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à lancer votre projet avec nous ?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Discutons ensemble de vos besoins en mobilité ou en stratégie de développement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Prendre rendez-vous
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
