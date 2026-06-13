import Link from 'next/link';
import type { Metadata } from 'next';
import VideoPlayer from '@/components/VideoPlayer';

export const metadata: Metadata = {
  title: 'Témoignages',
  description:
    'Découvrez les parcours inspirants de nos étudiants qui ont réalisé leur rêve d\'études à l\'étranger avec Madaisy Consulting Agency.',
};

export default function Temoignages() {
  const stats = [
    { icon: 'school', value: '200+', label: 'Étudiants accompagnés' },
    { icon: 'verified', value: '100%', label: 'Taux de réussite' },
    { icon: 'public', value: '5', label: 'Pays couverts' },
  ];

  const temoignages = [
    {
      name: 'Sarah M.',
      role: 'Master en IA — France',
      rating: 5,
      quote:
        'Grâce à Madaisy, j\'ai pu obtenir mon admission et mon visa en un temps record. Leur aide pour l\'installation à Lyon a été cruciale pour mon intégration.',
      initial: 'S',
    },
    {
      name: 'Kévin L.',
      role: 'Bachelor Business — Canada',
      rating: 5,
      quote:
        'Une équipe professionnelle et à l\'écoute. Ils ne m\'ont pas seulement aidé pour les papiers, ils m\'ont vraiment conseillé sur le choix de mon université.',
      initial: 'K',
    },
    {
      name: 'Amélie R.',
      role: 'Médecine — Belgique',
      rating: 5,
      quote:
        'Le suivi post-admission est incroyable. Madaisy m\'a aidé à trouver mon logement et à ouvrir mon compte bancaire avant même mon arrivée !',
      initial: 'A',
    },
  ];

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative">
        <div
          className="bg-cover bg-center min-h-[320px] flex items-end rounded-b-2xl overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(35, 15, 16, 0.85) 0%, rgba(35, 15, 16, 0.2) 60%), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Ils nous ont fait confiance
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mt-2">
              Découvrez les parcours inspirants de nos étudiants qui ont réalisé leur rêve
              d&apos;études à l&apos;étranger avec l&apos;accompagnement de Madaisy Consulting
              Agency.
            </p>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-12">
        <div className="flex flex-wrap gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-primary/20 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">{s.icon}</span>
                <p className="text-slate-600 text-sm font-medium uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
              <p className="text-slate-900 tracking-tight text-3xl font-black leading-tight">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TÉMOIGNAGES ========== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="section-title">Leurs succès, notre fierté</h2>
            <p className="text-slate-600 max-w-3xl">
              L&apos;excellence au service de votre avenir. Voici quelques retours d&apos;expérience
              de nos candidats admis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {temoignages.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-primary font-semibold">{t.role}</p>
                  </div>
                </div>
                <div className="flex text-primary gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg fill-1">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>

          {/* ========== HISTOIRE JEAN-PAUL ========== */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <VideoPlayer
                  src="/uploads/promo-video.mp4"
                  poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  title="L'histoire de Jean-Paul"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-black text-slate-900">
                  L&apos;histoire de Jean-Paul
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  &ldquo;Après deux refus de visa, j&apos;étais prêt à abandonner. Madaisy
                  Consulting a repris mon dossier de A à Z. Ils ont su identifier les failles et
                  m&apos;ont préparé aux entretiens. Aujourd&apos;hui, je suis en Master 2 à
                  Paris.&rdquo;
                </p>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 w-fit"
                >
                  Voir son parcours complet
                  <span className="material-symbols-outlined">trending_flat</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 px-6 rounded-2xl bg-bg-dark text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="grid grid-cols-6 gap-4 p-4">
                <span className="material-symbols-outlined text-6xl">school</span>
                <span className="material-symbols-outlined text-6xl">flight_takeoff</span>
                <span className="material-symbols-outlined text-6xl">language</span>
                <span className="material-symbols-outlined text-6xl">public</span>
                <span className="material-symbols-outlined text-6xl">verified</span>
                <span className="material-symbols-outlined text-6xl">apartment</span>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-4xl font-black max-w-2xl">
                Prêt à devenir notre prochaine réussite ?
              </h2>
              <p className="text-slate-300 text-lg max-w-xl">
                Rejoignez les étudiants qui ont déjà franchi le pas. Consultation gratuite pour
                évaluer votre profil.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary-lg">
                  Prendre Rendez-vous
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
