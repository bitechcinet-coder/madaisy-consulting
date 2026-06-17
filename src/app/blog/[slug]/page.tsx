import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, published: true } });
}

async function getRelated(category: string, excludeSlug: string) {
  return prisma.blogPost.findMany({
    where: { published: true, category, slug: { not: excludeSlug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article introuvable' };
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: 'article' } };
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelated(post.category, params.slug);
  let content: any = {};
  try { content = JSON.parse(post.content || '{}'); } catch {}

  return (
    <>
      <section className="relative bg-bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm">
            <span className="material-symbols-outlined text-lg">arrow_back</span> Retour au blog
          </Link>
          <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">{post.category}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6 tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-2"><div className="size-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold">MC</div><span>Par {post.author}</span></div>
            <span>•</span><span>{post.readTime} min de lecture</span>
            <span>•</span><span>{new Date(post.createdAt).toLocaleDateString('fr', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#fafaf9] rounded-2xl p-8 border-l-[3px] border-primary mb-12">
          <p className="text-xl text-slate-700 leading-relaxed italic font-light">{post.excerpt}</p>
        </div>

        {content.introduction && <div className="mb-10"><p className="text-slate-700 leading-relaxed text-lg">{content.introduction}</p></div>}

        {content.sections && content.sections.map((section: any, i: number) => (
          <div key={i} className="mb-10">
            {section.heading && <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>}
            {section.image && <div className="rounded-xl overflow-hidden mb-6 shadow-lg"><img src={section.image} alt="" className="w-full object-cover max-h-96" /></div>}
            {section.body && <div className="space-y-4">{Array.isArray(section.body) ? section.body.map((p: string, j: number) => <p key={j} className="text-slate-700 leading-relaxed text-lg">{p}</p>) : <p className="text-slate-700 leading-relaxed text-lg">{section.body}</p>}</div>}
            {section.list && <ul className="space-y-2 mt-4">{section.list.map((item: string, j: number) => <li key={j} className="flex items-start gap-3 text-slate-700"><span className="material-symbols-outlined text-primary mt-1 text-lg">check_circle</span><span>{item}</span></li>)}</ul>}
          </div>
        ))}

        {content.conclusion && <div className="bg-primary/5 rounded-2xl p-8 mt-12"><h3 className="text-xl font-bold text-slate-900 mb-3">En résumé</h3><p className="text-slate-700 leading-relaxed">{content.conclusion}</p></div>}

        <div className="mt-16 pt-8 border-t border-black/5 flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-500">Partager :</span>
          <a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener" className="size-10 rounded-full bg-whatsapp/10 text-whatsapp flex items-center justify-center hover:bg-whatsapp hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://madaisy-consulting.com/blog/' + post.slug)}`} target="_blank" rel="noopener" className="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">share</span></a>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-[#fafaf9] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Dans la même catégorie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-white rounded-xl p-5 border border-black/5 hover:shadow-lg transition-all">
                  <span className="text-xs font-bold text-primary bg-primary/8 px-2 py-1 rounded-full">{r.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{r.excerpt}</p>
                  <p className="text-xs text-slate-400 mt-3">{r.readTime} min • {r.author}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
