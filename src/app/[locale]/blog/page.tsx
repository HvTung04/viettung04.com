import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import prisma from '@/lib/db';
import SearchWidget from '@/components/blog/SearchWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: '/blog',
    title: 'Technical Blog — AI Engineering Notes | Hoang Viet Tung',
    description:
      'Deep dives into high-performance computing, neural architectures, LLM orchestration, and the infrastructure behind modern AI systems.',
  });
}

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
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Hero Section */}
      <header className="mb-16 pt-6 lg:pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-[38px] md:text-[44px] font-bold tracking-tight text-ink leading-tight mb-4">{t('title')}</h1>
            <p className="text-body text-base leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pb-2">
            <span className="bg-surface-dark text-canvas px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider">{t('categories.all')}</span>
            <span className="bg-surface-card text-body px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border border-hairline hover:border-hairline-strong transition-colors cursor-pointer">{t('categories.llm')}</span>
            <span className="bg-surface-card text-body px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border border-hairline hover:border-hairline-strong transition-colors cursor-pointer">{t('categories.cv')}</span>
            <span className="bg-surface-card text-body px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border border-hairline hover:border-hairline-strong transition-colors cursor-pointer">{t('categories.scale')}</span>
          </div>
        </div>
      </header>

      {/* Featured Post */}
      {featured && (
        <section className="mb-16">
          <article className="group border border-hairline">
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-surface-dark text-canvas text-[10px] font-mono font-bold px-2 py-0.5 tracking-wider rounded">{t('featured')}</span>
                <span className="text-[10px] font-mono text-mute uppercase tracking-widest">{featured.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="block">
                <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight group-hover:text-accent transition-colors">{getTitle(featured)}</h2>
              </Link>
              <p className="text-body text-sm leading-relaxed mb-4">
                {getDesc(featured)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-mute">
                  {t('minRead', { minutes: getReadTime(featured) })}
                </span>
                <Link href={`/blog/${featured.slug}`} className="text-accent font-mono text-sm flex items-center gap-1 group/btn">
                  {t('readArchive')} <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {/* Article List */}
          <section className="space-y-px">
            {rest.map((blog) => (
              <article key={blog.id} className="bg-canvas border border-hairline p-6 group hover:bg-surface-soft transition-colors">
                <Link href={`/blog/${blog.slug}`} className="block">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-accent tracking-widest uppercase">{blog.category}</span>
                    <span className="text-[10px] font-mono text-mute uppercase">{blog.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2 tracking-tight group-hover:text-accent transition-colors">{getTitle(blog)}</h3>
                  <p className="text-body text-sm leading-relaxed mb-4 line-clamp-2">
                    {getDesc(blog)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-mute uppercase">{t('minRead', { minutes: getReadTime(blog) })}</span>
                    <span className="text-accent font-mono text-sm">→</span>
                  </div>
                </Link>
              </article>
            ))}
          </section>

          {blogs.length === 0 && (
            <div className="text-center py-24 border border-hairline my-12">
              <p className="text-mute font-mono text-xs uppercase tracking-widest">{t('emptyState')}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded border border-hairline text-mute cursor-not-allowed font-mono text-sm">
                ←
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-ink bg-ink/10 text-ink font-mono text-sm font-bold">01</button>
              {totalPages >= 2 && <button className="w-10 h-10 flex items-center justify-center rounded border border-hairline text-body hover:border-ink transition-colors font-mono text-sm font-bold">02</button>}
              {totalPages > 2 && <div className="px-2 text-mute font-mono">...</div>}
              <button className="w-10 h-10 flex items-center justify-center rounded border border-hairline text-body hover:border-ink transition-colors font-mono">
                →
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <SearchWidget />
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
