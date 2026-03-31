import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SystemMap from '@/components/blog/SystemMap';
import { MdArrowBack, MdTerminal } from 'react-icons/md';

export const dynamic = 'force-dynamic';

type Translation = {
  locale: string;
  title: string;
  description: string;
  content: string | null;
};

type BlogWithTranslations = {
  id: string;
  slug: string;
  category: string;
  status: string;
  visibility: string;
  views: number;
  imageUrl: string | null;
  createdAt: Date;
  translations: Translation[];
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ');
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function processContent(content: string) {
  const headings: { id: string; text: string }[] = [];
  let counter = 0;

  const source = content.trim();
  if (!source) {
    return { html: '', headings };
  }

  const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(source);
  if (hasHtmlTags) {
    const html = source.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, innerHtml) => {
      const text = stripHtml(innerHtml).trim();
      const id = slugify(text) || `idx-${counter++}`;
      headings.push({ id, text });
      return `<h2 id="${id}" class="scroll-mt-24 group">${innerHtml}</h2>`;
    });

    return { html, headings };
  }

  const codeBlocks: string[] = [];
  const withCodePlaceholders = source.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, _lang: string, code: string) => {
    const encoded = escapeHtml(code.trim());
    const block = `<pre class="bg-slate-100 dark:bg-surface-container-lowest border border-outline rounded-xl p-5 overflow-x-auto"><code class="font-mono text-sm text-slate-800 dark:text-slate-200">${encoded}</code></pre>`;
    const marker = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(block);
    return marker;
  });

  const blocks = withCodePlaceholders
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const rendered = blocks.map((block) => {
    if (/^##\s+/.test(block)) {
      const text = block.replace(/^##\s+/, '').trim();
      const id = slugify(text) || `idx-${counter++}`;
      headings.push({ id, text });
      return `<h2 id="${id}" class="scroll-mt-24 text-3xl font-black tracking-tight mt-10 mb-4 text-slate-900 dark:text-slate-100">${escapeHtml(text)}</h2>`;
    }

    if (/^###\s+/.test(block)) {
      const text = block.replace(/^###\s+/, '').trim();
      return `<h3 class="text-2xl font-bold tracking-tight mt-8 mb-3 text-slate-800 dark:text-slate-200">${escapeHtml(text)}</h3>`;
    }

    if (/^__CODE_BLOCK_\d+__$/.test(block)) {
      return block;
    }

    const paragraph = escapeHtml(block).replace(/\n/g, '<br />');
    return `<p class="text-slate-700 dark:text-slate-400 leading-relaxed">${paragraph}</p>`;
  });

  let html = rendered.join('\n');
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block);
  });

  if (headings.length === 0) {
    const defaultId = 'overview';
    headings.push({ id: defaultId, text: 'Overview' });
    html = `<h2 id="${defaultId}" class="scroll-mt-24 text-3xl font-black tracking-tight mt-10 mb-4 text-slate-900 dark:text-slate-100">Overview</h2>${html}`;
  }

  return { html, headings };
}

function getTextForReadTime(content: string, description: string) {
  return `${stripHtml(content)} ${description}`.trim();
}

function getReadTime(content: string, description: string) {
  const wordCount = getTextForReadTime(content, description).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function getTranslationByLocale(item: BlogWithTranslations, locale: string) {
  return item.translations.find((tr) => tr.locale === locale) ?? item.translations[0];
}

function getHeadingIntro(title: string) {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return { prefix: title, accent: '' };
  }

  const accentStart = Math.floor(words.length / 2);
  return {
    prefix: words.slice(0, accentStart).join(' '),
    accent: words.slice(accentStart).join(' '),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations('BlogDetail');

  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
    include: { translations: true },
  });

  if (!blog || blog.status !== 'PUBLISHED' || blog.visibility !== 'PUBLIC') {
    notFound();
  }

  const typedBlog = blog as BlogWithTranslations;

  const related = (await prisma.blog.findMany({
    where: {
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      id: { not: typedBlog.id },
    },
    orderBy: { createdAt: 'desc' },
    take: 2,
    include: { translations: true },
  })) as BlogWithTranslations[];

  const primaryTranslation = getTranslationByLocale(typedBlog, resolvedParams.locale);
  const title = primaryTranslation?.title || typedBlog.slug;
  const description = primaryTranslation?.description || '';
  const contentRaw = primaryTranslation?.content || '';
  const readMinutes = getReadTime(contentRaw, description);
  const { html, headings } = processContent(contentRaw);
  const headingParts = getHeadingIntro(title);

  const getTitle = (item: BlogWithTranslations) => {
    const translation = getTranslationByLocale(item, resolvedParams.locale);
    return translation?.title || item.slug;
  };

  const getDescription = (item: BlogWithTranslations) => {
    const translation = getTranslationByLocale(item, resolvedParams.locale);
    return translation?.description || '';
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-slate-900 dark:text-slate-100">
        <header className="mb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <MdArrowBack className="text-sm" />
            {t('returnArchive')}
          </Link>

          <div className="flex items-center space-x-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-3 py-1 text-primary rounded-sm border border-slate-300 dark:border-slate-800">
              {t('logPrefix')} {typedBlog.id.substring(0, 4)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {typedBlog.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-5xl text-slate-900 dark:text-on-surface">
            {headingParts.prefix}{' '}
            {headingParts.accent && <span className="text-primary">{headingParts.accent}</span>}
          </h1>

          <div className="flex flex-wrap items-start gap-4 md:gap-10 border-l-2 border-primary/30 pl-6 py-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('author')}</p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <MdTerminal className="text-[12px] text-primary" />
                </div>
                <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Neural Cobalt</p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('duration')}</p>
              <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{t('minRead', { minutes: readMinutes })}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('architecture')}</p>
              <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{t('hwSpec')}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">Category</p>
              <p className="text-sm font-bold tracking-tight text-primary uppercase">{typedBlog.category}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          <SystemMap headings={headings} views={typedBlog.views} readMinutes={readMinutes} />

          <article className="col-span-1 lg:col-span-9 space-y-10">
            {description && (
              <p className="text-xl text-on-surface-variant leading-relaxed border-l-2 border-primary/20 pl-5">
                {description}
              </p>
            )}

            {typedBlog.imageUrl && (
              <figure className="bg-surface-container rounded-xl overflow-hidden border border-outline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typedBlog.imageUrl} alt={title} className="w-full h-auto max-h-120 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                <figcaption className="px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-t border-outline">
                  {title}
                </figcaption>
              </figure>
            )}

            <section
              className="prose dark:prose-invert prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-400 prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-transparent"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-900/50 p-10 rounded-2xl border border-slate-300 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 mt-20 shadow-lg shadow-slate-900/10 dark:shadow-black/20">
              <div className="max-w-md">
                <h3 className="text-2xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">{t('subscribeTitle')}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('subscribeDesc')}</p>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <input
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-6 py-3 rounded-lg text-sm w-full sm:w-64 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-slate-500 dark:placeholder-slate-600 text-slate-900 dark:text-slate-200 font-mono"
                  placeholder={t('subscribePlaceholder')}
                  type="email"
                />
                <button className="bg-primary hover:bg-blue-500 active:scale-95 transition-all text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                  {t('subscribeBtn')}
                </button>
              </div>
            </div>
          </article>
        </div>

        {related.length > 0 && (
          <section className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-mono text-[12px] uppercase tracking-[0.3em] text-primary mb-12 text-center font-bold">
              {t('continuousLearning')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="group block">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6 border border-slate-300 dark:border-slate-800">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all z-10 duration-500"></div>
                    {item.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.imageUrl} alt={getTitle(item)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-900 flex items-center justify-center opacity-60 group-hover:scale-105 transition-transform duration-500">
                        <span className="font-black text-6xl text-slate-400 dark:text-slate-800 tracking-tighter mix-blend-overlay">DATA_LOG</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-slate-100 dark:bg-slate-900 text-primary font-mono text-[10px] font-bold px-3 py-1 rounded border border-slate-300 dark:border-slate-800 tracking-widest uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <h5 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                    {getTitle(item)}
                  </h5>
                  <p className="text-slate-600 dark:text-slate-500 text-sm line-clamp-2 leading-relaxed">{getDescription(item)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
