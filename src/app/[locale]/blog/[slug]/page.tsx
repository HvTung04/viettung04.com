import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SystemMap from '@/components/blog/SystemMap';
import NewsletterForm from '@/components/NewsletterForm';

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
      return `<h2 id="${id}" class="scroll-mt-24 text-lg font-bold text-ink mt-8 mb-4">${innerHtml}</h2>`;
    });

    return { html, headings };
  }

  const codeBlocks: string[] = [];
  const withCodePlaceholders = source.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, _lang: string, code: string) => {
    const encoded = escapeHtml(code.trim());
    const block = `<pre class="bg-surface-soft border border-hairline rounded p-5 overflow-x-auto"><code class="font-mono text-xs text-ink">${encoded}</code></pre>`;
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
      return `<h2 id="${id}" class="scroll-mt-24 text-lg font-bold text-ink mt-8 mb-4">${escapeHtml(text)}</h2>`;
    }

    if (/^###\s+/.test(block)) {
      const text = block.replace(/^###\s+/, '').trim();
      return `<h3 class="text-base font-bold text-ink mt-6 mb-3">${escapeHtml(text)}</h3>`;
    }

    if (/^__CODE_BLOCK_\d+__$/.test(block)) {
      return block;
    }

    const paragraph = escapeHtml(block).replace(/\n/g, '<br />');
    return `<p class="text-body text-sm leading-relaxed">${paragraph}</p>`;
  });

  let html = rendered.join('\n');
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block);
  });

  if (headings.length === 0) {
    const defaultId = 'overview';
    headings.push({ id: defaultId, text: 'Overview' });
    html = `<h2 id="${defaultId}" class="scroll-mt-24 text-lg font-bold text-ink mt-8 mb-4">Overview</h2>${html}`;
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
      <main className="px-4 sm:px-6 lg:px-8 max-w-[960px] mx-auto min-h-screen pt-10 pb-24">
        <header className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mute hover:text-ink transition-colors mb-8"
          >
            ← {t('returnArchive')}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-surface-card px-2 py-0.5 rounded border border-hairline text-accent">
              {t('logPrefix')} {typedBlog.id.substring(0, 4)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              {typedBlog.createdAt.toLocaleDateString(resolvedParams.locale, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-[38px] md:text-[44px] font-bold tracking-tight mb-6 max-w-4xl text-ink">
            {title}
          </h1>

          <div className="flex flex-wrap items-start gap-6 md:gap-10 border-l border-hairline pl-4 py-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-1">{t('author')}</p>
              <p className="text-sm font-bold tracking-tight text-ink">Neural Cobalt</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-1">{t('duration')}</p>
              <p className="text-sm font-bold tracking-tight text-ink">{t('minRead', { minutes: readMinutes })}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-1">Category</p>
              <p className="text-sm font-bold tracking-tight text-accent uppercase">{typedBlog.category}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <SystemMap headings={headings} views={typedBlog.views} readMinutes={readMinutes} />

          <article className="col-span-1 lg:col-span-9 space-y-8">
            {description && (
              <p className="text-base text-body leading-relaxed border-l border-hairline pl-4">
                {description}
              </p>
            )}

            {typedBlog.imageUrl && (
              <figure className="bg-surface-soft rounded overflow-hidden border border-hairline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typedBlog.imageUrl} alt={title} className="w-full h-auto max-h-96 object-cover" />
                <figcaption className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-mute border-t border-hairline">
                  {title}
                </figcaption>
              </figure>
            )}

            <section
              className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-body prose-p:text-sm prose-p:leading-relaxed prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-transparent prose-pre:border prose-pre:border-hairline"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <NewsletterForm />
          </article>
        </div>

        {related.length > 0 && (
          <section className="mt-24 pt-12 border-t border-hairline">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8 text-center font-bold">
              {t('continuousLearning')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="group block">
                  <div className="border border-hairline p-6 hover:bg-surface-soft transition-colors">
                    <span className="font-mono text-[10px] font-bold text-accent tracking-widest uppercase">
                      {item.category}
                    </span>
                    <h5 className="text-base font-bold tracking-tight mt-2 mb-2 group-hover:text-accent transition-colors text-ink">
                      {getTitle(item)}
                    </h5>
                    <p className="text-body text-xs line-clamp-2 leading-relaxed">{getDescription(item)}</p>
                  </div>
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
