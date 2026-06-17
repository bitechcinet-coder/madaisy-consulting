import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col bg-[#fafaf9]">
      {/* Red header bar — matching site design */}
      <div className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 tracking-tight">
            404
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Page introuvable
          </p>
          <div className="h-1 w-16 bg-white/40 rounded-full mx-auto mt-6" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <span
            className="material-symbols-outlined text-5xl text-slate-300 mb-6 block"
            aria-hidden="true"
          >
            search_off
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Oups&nbsp;! Cette page n&rsquo;existe pas
          </h2>

          <p className="text-slate-500 text-base md:text-lg mb-8 leading-relaxed">
            La page que vous recherchez a peut-être été déplacée, supprimée ou
            l&rsquo;adresse que vous avez saisie est incorrecte.
          </p>

          {/* Search suggestion */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <p className="text-sm text-slate-600 mb-3">
              Essayez l&rsquo;une de ces pages&nbsp;:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/services"
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Nos services
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/qui-sommes-nous"
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Qui sommes-nous&nbsp;?
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Back to homepage CTA */}
          <Link href="/" className="btn-primary-lg inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">home</span>
            Retour à l&rsquo;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
