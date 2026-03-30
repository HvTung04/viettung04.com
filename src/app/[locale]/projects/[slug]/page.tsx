/* eslint-disable @next/next/no-img-element */
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {MdPsychology, MdCode, MdPlayCircle, MdHub, MdTerminal, MdQueryStats, MdMail, MdPerson, MdArrowBack} from 'react-icons/md';
import {Link} from '@/i18n/routing';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{locale: string, slug: string}>
}) {
  const {locale, slug} = await params;
  const t = await getTranslations('ProjectDetailPage');

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      techStack: true,
      metrics: true,
      translations: { where: { locale } }
    }
  });

  if (!project) notFound();

  // Use locale-specific translation if available, fall back to base (English)
  const tr = project.translations[0];
  const title = tr?.title ?? project.title;
  const description = tr?.description ?? project.description;
  const content = tr?.content ?? project.content;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0B0F19] text-slate-100 antialiased font-display"
         style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(60, 131, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(60, 131, 246, 0.1) 0px, transparent 50%)' }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-[#0B0F19]/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <MdPsychology className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">{title}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#overview" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.overview')}</a>
          <a href="#tech-stack" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.techStack')}</a>
          <a href="#results" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.results')}</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
            <MdArrowBack /> {t('allProjects')}
          </Link>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40">
              {t('liveDemo')}
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-12">

        {/* Hero */}
        <section id="overview" className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {project.category}
              </span>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">{title}</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm">
                    <MdCode className="text-xl" />
                    {t('github')}
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40">
                    <MdPlayCircle className="text-xl" />
                    {t('liveDemo')}
                  </a>
                )}
              </div>
            </div>

            {/* Image Frame */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-primary/20 bg-slate-900 group shadow-2xl shadow-primary/5">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                  <MdHub className="text-slate-700 text-8xl" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0B0F19]/60 backdrop-blur-md border border-white/5">
                <div className="flex justify-between items-center font-mono text-xs text-primary mb-2">
                  <span>● {t('systemActive')}</span>
                  <span>{project.status}</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        {content && (
          <section className="mb-24">
            <div className="max-w-3xl">
              {content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-slate-100 mt-8 mb-4 flex items-center gap-3"><MdHub className="text-primary text-3xl"/>{line.replace('## ', '')}</h2>;
                if (line.startsWith('- ')) return <p key={i} className="text-slate-400 pl-4 border-l border-primary/30 my-2">→ {line.replace('- ', '')}</p>;
                if (line.trim()) return <p key={i} className="text-slate-400 leading-relaxed my-3">{line}</p>;
                return null;
              })}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <section id="tech-stack" className="mb-24 scroll-mt-24">
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <MdTerminal className="text-primary text-3xl" />
              {t('sections.techStack')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <div key={tech.id} className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-3 hover:border-primary/50 transition-colors shadow-sm cursor-default">
                  <span className="font-mono text-sm font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <section id="results" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <MdQueryStats className="text-primary text-3xl" />
              {t('sections.results')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {project.metrics.map(metric => (
                <div key={metric.id} className="p-6 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-colors shadow-sm">
                  <p className="font-mono text-primary text-4xl font-black mb-2">{metric.value}</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">{metric.key}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 px-6 md:px-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-2">{t('footer.title')}</h4>
            <p className="text-slate-400">{t('footer.subtitle')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:contact@example.com" className="p-3 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white" aria-label="Email">
              <MdMail className="text-xl" />
            </a>
            <a href="/#about" className="p-3 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white" aria-label="About">
              <MdPerson className="text-xl" />
            </a>
            <Link href="/projects" className="bg-primary px-8 py-3 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(60,131,246,0.4)] transition-all">
              {t('allProjects')}
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">{t('footer.copyright')}</p>
          <div className="flex gap-6 text-xs text-slate-500 font-mono uppercase tracking-tighter">
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
