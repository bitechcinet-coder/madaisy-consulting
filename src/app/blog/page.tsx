'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsletterInline from '@/components/NewsletterInline';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
  image: string;
  slug?: string;
}

const fallback: Article[] = [
  { title: 'Préparer son dossier Campus France : Le guide ultime', excerpt: 'Tout ce qu\'il faut savoir pour soumettre un dossier irréprochable et maximiser vos chances d\'admission.', category: 'Guide', readTime: 5, date: '12 oct. 2024', author: 'Sarah M.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', slug: 'dossier-campus-france' },
  { title: 'La vie étudiante à Paris : Budget et bons plans', excerpt: 'Découvrez comment profiter de la capitale sans vous ruiner : transports, sorties et culture.', category: 'Lifestyle', readTime: 8, date: '10 oct. 2024', author: 'Jean-Luc R.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', slug: 'vie-etudiante-paris' },
  { title: 'Trouver un logement : Les aides de la CAF expliquées', excerpt: 'Comprendre l\'APL et les différentes solutions d\'hébergement pour les étudiants étrangers.', category: 'Pratique', readTime: 6, date: '5 oct. 2024', author: 'Madaisy Team', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', slug: 'aides-caf-logement' },
  { title: 'Budget mensuel type pour étudier en France', excerpt: 'Estimation réaliste des dépenses mensuelles en province vs à Paris.', category: 'Argent', readTime: 4, date: '1 oct. 2024', author: 'Sarah M.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', slug: 'budget-mensuel' },
  { title: 'Obtenir son visa étudiant : Les erreurs à éviter', excerpt: 'Liste des pièces justificatives et conseils pour réussir votre entretien consulaire.', category: 'Administratif', readTime: 10, date: '28 sept. 2024', author: 'Jean-Luc R.', image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80', slug: 'visa-erreurs' },
  { title: 'Rédiger une lettre de motivation percutante', excerpt: 'Comment structurer votre lettre pour convaincre les commissions pédagogiques.', category: 'Rédaction', readTime: 7, date: '25 sept. 2024', author: 'Madaisy Team', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80', slug: 'lettre-motivation' },
];

const CATEGORIES = ['Tous les articles', 'Guide', 'Lifestyle', 'Pratique', 'Argent', 'Administratif', 'Rédaction'];
const PER_PAGE = 6;

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [activeCat, setActiveCat] = useState('Tous les articles');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((p: any) => p.published);
          if (published.length > 0) {
            setAllArticles(published.map((p: any) => ({
              title: p.title,
              excerpt: p.excerpt,
              category: p.category,
              readTime: p.readTime,
              date: new Date(p.createdAt).toLocaleDateString('fr', { day: 'numeric', month: 'short', year: 'numeric' }),
              author: p.author,
              image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
              slug: p.slug,
            })));
            return;
          }
        }
        setAllArticles(fallback);
      })
      .catch(() => setAllArticles(fallback));
  }, []);

  const filtered = activeCat === 'Tous les articles'
    ? allArticles
    : allArticles.filter((a) => a.category === activeCat);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const changeCategory = (cat: string) => {
    setActiveCat(cat);
    setPage(1);
  };

  return (
    <>
      <section className="bg-bg-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-wider">Le Blog Officiel</span>
            </div>
            <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tight max-w-3xl">
              Actualités et conseils pour vos études en France
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Toutes les clés pour réussir votre projet de mobilité académique, de l&apos;inscription au logement.
            </p>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`flex h-10 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors ${
                activeCat === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRILLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">article</span>
            <p className="text-slate-500 text-lg">Aucun article dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((a, i) => (
              <article
                key={a.slug || i}
                className="group flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer"
                onClick={() => {
                  if (a.slug) window.location.href = `/blog/${a.slug}`;
                }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-video">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase pointer-events-none z-10">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-400 text-xs font-semibold">
                    {a.readTime} min de lecture • {a.date}
                  </p>
                  <h3 className="text-slate-900 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{a.excerpt}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      MC
                    </div>
                    <span className="text-xs font-medium text-slate-500">Par {a.author}</span>
                  </div>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center pb-10">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="size-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`size-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                  p === currentPage
                    ? 'bg-primary text-white'
                    : 'border border-slate-200 text-slate-600 hover:text-primary hover:border-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="size-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      )}

      {/* NEWSLETTER */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 bg-primary/5 rounded-3xl border border-primary/10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Prêt à lancer votre projet ?</h2>
              <p className="text-slate-600">Recevez nos conseils exclusifs directement dans votre boîte mail chaque semaine.</p>
              <NewsletterInline />
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-primary/10 to-primary/30 rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-8xl text-primary/40">mail</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
