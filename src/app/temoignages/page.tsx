'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function Temoignages() {
  const [temoignages, setTemoignages] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/temoignages')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTemoignages(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { icon: 'school', value: '5', label: 'Étudiants accompagnés' },
    { icon: 'verified', value: '100%', label: 'Taux de réussite' },
    { icon: 'public', value: 'France', label: 'Pays couvert' },
  ];

  return (
    <>
      <section className="relative">
        <div
          className="bg-cover bg-center min-h-[320px] flex items-end rounded-b-2xl overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Ils nous ont fait confiance
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mt-2">
              Découvrez les parcours inspirants de nos étudiants.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-12">
        <div className="flex flex-wrap gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-primary/20 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">{s.icon}</span>
                <p className="text-slate-600 text-sm font-medium uppercase tracking-wider">{s.label}</p>
              </div>
              <p className="text-slate-900 tracking-tight text-3xl font-black leading-tight">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Leurs succès, notre fierté
            </h2>
            <p className="text-slate-600 max-w-3xl">
              L&apos;excellence au service de votre avenir.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
          ) : temoignages.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">reviews</span>
              <p className="text-slate-500 text-lg">Aucun témoignage pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {temoignages.map((t) => (
                <div key={t.id} className="card p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-full bg-primary/8 border border-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <p className="text-xs text-primary font-semibold">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex text-primary gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg fill-1">star</span>
                    ))}
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <VideoPlayer
                  src="/uploads/promo-video.mp4"
                  poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  title="Témoignage vidéo"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-black text-slate-900">Votre histoire commence ici</h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Chaque année, des dizaines d&apos;étudiants nous font confiance pour concrétiser
                  leur projet d&apos;études en France. Et vous ?
                </p>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 w-fit">
                  Démarrer mon projet
                  <span className="material-symbols-outlined">trending_flat</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 px-6 rounded-2xl bg-bg-dark text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="grid grid-cols-6 gap-4 p-4">
                <span className="material-symbols-outlined text-6xl">school</span>
                <span className="material-symbols-outlined text-6xl">flight_takeoff</span>
                <span className="material-symbols-outlined text-6xl">language</span>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-4xl font-black max-w-2xl">
                Prêt à devenir notre prochaine réussite ?
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary-lg">Prendre Rendez-vous</Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
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
