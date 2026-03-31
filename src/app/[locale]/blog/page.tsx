import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import prisma from '@/lib/db';
import SearchWidget from '@/components/blog/SearchWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MdSchedule, MdArrowForward, MdNorthEast, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const dynamic = 'force-dynamic';

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations('BlogList');

  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    include: { translations: true },
    orderBy: { createdAt: 'desc' },
  });

  const getReadTime = (blog: any) => {
    const text = blog.translations[0]?.content || '';
    return Math.max(1, Math.ceil(text.length / 1000));
  };

  const getTitle = (blog: any) => blog.translations.find((tr: any) => tr.locale === resolvedParams.locale)?.title || blog.translations[0]?.title || blog.slug;
  const getDesc = (blog: any) => blog.translations.find((tr: any) => tr.locale === resolvedParams.locale)?.description || blog.translations[0]?.description || '';

  const featured = blogs[0];
  const rest = blogs.slice(1);
  const totalPages = Math.ceil(blogs.length / 7);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16 min-h-screen">
      {/* Hero Section */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] text-white leading-none mb-6">{t('title')}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pb-2">
            <span className="bg-surface-container-high text-primary px-3 py-1 rounded text-[11px] font-mono font-bold tracking-wider border border-primary/20">{t('categories.all')}</span>
            <span className="bg-surface-container text-slate-400 px-3 py-1 rounded text-[11px] font-mono font-bold tracking-wider border border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">{t('categories.llm')}</span>
            <span className="bg-surface-container text-slate-400 px-3 py-1 rounded text-[11px] font-mono font-bold tracking-wider border border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">{t('categories.cv')}</span>
            <span className="bg-surface-container text-slate-400 px-3 py-1 rounded text-[11px] font-mono font-bold tracking-wider border border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">{t('categories.scale')}</span>
          </div>
        </div>
      </header>

      {/* Featured Post - Bento Layout Start */}
      {featured && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <article className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low border border-slate-800 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(60,131,246,0.1)]">
            <div className="h-96 w-full relative">
              {/* Fallback pattern if no image */}
              {featured.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={featured.imageUrl} alt={getTitle(featured)} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 opacity-60 group-hover:opacity-80 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-9xl text-slate-900 opacity-20 font-black tracking-tighter mix-blend-overlay">NEURAL</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary text-white text-[10px] font-mono font-bold px-2 py-0.5 tracking-tighter">{t('featured')}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{featured.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-3 tracking-tight">{getTitle(featured)}</h2>
                <p className="text-slate-400 max-w-xl text-sm leading-relaxed mb-6">
                  {getDesc(featured)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
                    <MdSchedule className="text-sm" />
                    {t('minRead', { minutes: getReadTime(featured) })}
                  </div>
                  <Link href={`/blog/${featured.slug}`} className="text-primary font-bold text-sm flex items-center gap-2 group/btn relative z-10">
                    {t('readArchive')} <MdArrowForward className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Make entire card clickable implicitly by rendering an absolute link overlay */}
            <Link href={`/blog/${featured.slug}`} className="absolute inset-0 z-0"><span className="sr-only">View Featured {getTitle(featured)}</span></Link>
          </article>

          <div className="md:col-span-4 flex flex-col gap-6">
            <SearchWidget />
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((blog) => (
          <article key={blog.id} className="flex flex-col h-full bg-surface-container-low rounded-xl border border-slate-800 overflow-hidden group hover:border-primary/50 transition-all relative">
            <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10"><span className="sr-only">View {getTitle(blog)}</span></Link>
            <div className="aspect-video w-full overflow-hidden bg-surface-container-highest relative">
              {blog.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={blog.imageUrl} alt={getTitle(blog)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
              ) : (
                <div className="w-full h-full bg-slate-900 group-hover:bg-slate-800 transition-colors flex items-center justify-center">
                   <div className="font-black text-slate-800 text-6xl tracking-tighter opacity-50 select-none">DATA_LOG</div>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow bg-slate-900/40 relative z-20 pointer-events-none">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">{blog.category}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{blog.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{getTitle(blog)}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {getDesc(blog)}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{t('minRead', { minutes: getReadTime(blog) })}</span>
                <MdNorthEast className="text-primary text-xl" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {blogs.length === 0 && (
        <div className="text-center py-24 border border-slate-800 rounded-xl my-12 bg-surface-container-low">
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">{t('emptyState')}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-800 text-slate-500 cursor-not-allowed">
            <MdChevronLeft className="text-xl" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary bg-primary/10 text-primary font-mono text-sm font-bold">01</button>
          {totalPages >= 2 && <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:border-primary transition-colors font-mono text-sm font-bold">02</button>}
          {totalPages > 2 && <div className="px-2 text-slate-600">...</div>}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:border-primary transition-colors">
            <MdChevronRight className="text-xl" />
          </button>
        </div>
      )}
    </main>
    <Footer />
    </>
  );
}
