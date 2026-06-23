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
    { icon: 'public', title: 'Réseau Global', desc: 'Une expertise connectée aux enjeux mondiaux actuels.' },
    { icon: 'diversity_3', title: 'Approche Humaine', desc: 'Nous plaçons l\'individu au centre de chaque décision.' },
    { icon: 'verified_user', title: 'Conformité', desc: 'Respect strict des cadres légaux internationaux.' },
    { icon: 'bolt', title: 'Réactivité', desc: 'Des réponses rapides à vos besoins urgents.' },
  ];

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden">
        <div
          className="bg-cover bg-center min-h-[380px] flex items-center relative"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(35, 15, 16, 0.6) 0%, rgba(35, 15, 16, 0.15) 100%), url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">
              À propos de nous
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight max-w-2xl tracking-tight">
              Une agence à taille humaine, dédiée à votre réussite
            </h1>
          </div>
        </div>
      </section>

      {/* ========== LA FONDATRICE ========== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-primary/40" />
                <span className="text-primary font-semibold uppercase tracking-wider text-xs">
                  La Fondatrice
                </span>
              </div>
              <h2 className="text-slate-900 text-3xl font-bold leading-tight mb-6 tracking-tight">
                L&apos;expertise au service de votre mobilité
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed text-base font-light">
                <p>
                  Fondée par{' '}
                  <span className="font-semibold text-slate-900">Marie-Désirée TANOH</span>,
                  Madaisy Consulting Agency est née d&apos;une volonté d&apos;offrir un
                  accompagnement de haute qualité aux étudiants souhaitant poursuivre leurs études
                  en France.
                </p>
                <p>
                  Spécialisée dans la{' '}
                  <span className="text-primary font-medium">mobilité internationale</span> et
                  l&apos;accompagnement stratégique, Marie-Désirée apporte une vision humaine et
                  rigoureuse à chaque projet d&apos;études.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-5 p-5 bg-[#fafaf9] rounded-2xl">
                <Image
                  src="/marie-desiree-tanoh.jpeg"
                  alt="Marie-Désirée TANOH"
                  width={72}
                  height={72}
                  className="rounded-full w-[72px] h-[72px] object-cover object-[center_20%] ring-2 ring-white shadow-md"
                />
                <div>
                  <p className="text-slate-900 text-lg font-semibold">Marie-Désirée TANOH</p>
                  <p className="text-slate-500 text-sm">
                    Fondatrice & Experte en mobilité internationale
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-primary/5 rounded-full -z-10" />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-primary/5 rounded-full -z-10" />
              <Image
                src="/marie-desiree-tanoh.jpeg"
                alt="Marie-Désirée TANOH"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl w-full object-cover h-[450px] object-[center_25%]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHIE ========== */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Nos valeurs
            </p>
            <h2 className="section-title">Notre philosophie</h2>
            <p className="text-slate-500 text-base italic font-light">
              &ldquo;Parce que chaque parcours est unique, notre approche l&apos;est aussi.&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 flex flex-col md:flex-row gap-5 items-start">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <div>
                <h3 className="text-slate-900 text-xl font-semibold mb-3">Qualité avant quantité</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-light">
                  Chez Madaisy, nous privilégions l&apos;excellence et l&apos;accompagnement
                  personnalisé. Chaque projet bénéficie d&apos;une attention exclusive et d&apos;une
                  analyse profonde pour garantir un succès durable.
                </p>
              </div>
            </div>
            <div className="card p-8 flex flex-col md:flex-row gap-5 items-start">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">handshake</span>
              </div>
              <div>
                <h3 className="text-slate-900 text-xl font-semibold mb-3">Notre engagement</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-light">
                  Nous nous engageons à être votre partenaire de confiance. Transparence totale,
                  réactivité exemplaire et rigueur méthodologique pour sécuriser vos démarches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI NOUS CHOISIR ========== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-lg">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Nos atouts
              </p>
              <h2 className="section-title !mb-0">Pourquoi nous choisir ?</h2>
            </div>
            <Link
              href="/services"
              className="text-primary font-semibold flex items-center gap-2 group hover:gap-3 transition-all text-sm"
            >
              Découvrir nos services
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atouts.map((a) => (
              <div
                key={a.title}
                className="p-6 rounded-2xl border border-black/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <span className="material-symbols-outlined text-primary/70 mb-4 text-2xl block group-hover:text-primary transition-colors">
                  {a.icon}
                </span>
                <h4 className="font-semibold text-slate-900 mb-2">{a.title}</h4>
                <p className="text-slate-500 text-sm font-light">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bg-dark rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
                Prêt à lancer votre projet avec nous ?
              </h2>
              <p className="text-white/60 text-base mb-10 max-w-xl mx-auto font-light">
                Discutons ensemble de vos besoins en mobilité internationale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors text-sm"
                >
                  Prendre rendez-vous
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-colors text-sm"
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
