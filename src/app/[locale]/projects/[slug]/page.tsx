/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import prisma from '@/lib/db';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { translations: true },
  });

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const tr = project.translations[0];
  const title = tr?.title ?? project.title;
  const description = tr?.description ?? project.description;

  return {
    title: `${title} | Case Study`,
    description: description,
    keywords: ['Case Study', project.category, 'AI Project', 'Machine Learning'],
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('ProjectDetailPage');

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      techStack: true,
      metrics: true,
      translations: { where: { locale } },
    },
  });

  if (!project) notFound();

  const tr = project.translations[0];
  const title = tr?.title ?? project.title;
  const description = tr?.description ?? project.description;
  const content = tr?.content ?? project.content;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-canvas text-ink antialiased font-mono">

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-hairline bg-canvas px-6 md:px-12 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold tracking-tight text-ink">[+] CASE STUDY</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#overview" className="text-xs font-mono text-body hover:text-ink transition-colors">Overview</a>
          <a href="#challenge" className="text-xs font-mono text-body hover:text-ink transition-colors">Challenge</a>
          <a href="#solution" className="text-xs font-mono text-body hover:text-ink transition-colors">Solution</a>
          <a href="#impact" className="text-xs font-mono text-body hover:text-ink transition-colors">Impact</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-xs text-mute hover:text-ink transition-colors font-mono">
            ← All Projects
          </Link>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-ink hover:bg-ink-deep text-canvas px-4 py-1.5 rounded text-xs font-mono font-medium transition-colors">
              Live Demo
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[960px] mx-auto w-full px-6 md:px-12 py-12">

        {/* Hero / Overview */}
        <section id="overview" className="mb-20 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-accent/10 text-accent text-[10px] font-mono px-2 py-0.5 rounded border border-accent/20 uppercase tracking-wider">
                  {project.category}
                </span>
                {project.timeline && (
                  <span className="inline-block bg-surface-card text-body text-[10px] font-mono px-2 py-0.5 rounded border border-hairline uppercase tracking-wider">
                    {project.timeline}
                  </span>
                )}
              </div>
              <h2 className="text-[38px] md:text-[44px] font-bold leading-[1.1] mb-4 tracking-tight">{title}</h2>
              <p className="text-base text-body mb-6 max-w-xl leading-relaxed">{description}</p>
              
              {project.clientName && (
                <div className="mb-6 pb-6 border-b border-hairline">
                  <p className="text-xs font-mono text-mute uppercase tracking-widest mb-1">Client</p>
                  <p className="text-sm font-bold text-ink">{project.clientName}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface-card hover:bg-surface-soft text-ink px-4 py-2 rounded text-xs font-mono font-medium transition-colors border border-hairline">
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-ink hover:bg-ink-deep text-canvas px-4 py-2 rounded text-xs font-mono font-medium transition-colors">
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Image Frame */}
            <div className="relative h-[250px] md:h-[320px] overflow-hidden border border-hairline bg-surface-soft">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-soft">
                  <span className="text-mute text-6xl font-black tracking-tighter opacity-30 select-none">PROJECT</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-canvas/90 border border-hairline">
                <div className="flex justify-between items-center font-mono text-[10px] text-accent mb-1">
                  <span>● SYSTEM ACTIVE</span>
                  <span>{project.status}</span>
                </div>
                <div className="h-0.5 bg-surface-card rounded overflow-hidden">
                  <div className="w-3/4 h-full bg-accent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        {(project.challenge || content?.includes('## Challenge') || content?.includes('## The Challenge')) && (
          <section id="challenge" className="mb-20 scroll-mt-24">
            <div className="border-l-2 border-accent pl-6">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
                [01] The Challenge
              </span>
              <h3 className="text-xl font-bold text-ink mb-4">
                What problem did we solve?
              </h3>
              {project.challenge ? (
                <p className="text-body text-sm leading-relaxed max-w-3xl">{project.challenge}</p>
              ) : (
                <div className="text-body text-sm leading-relaxed max-w-3xl">
                  {content?.split('\n').filter(line => {
                    const inChallenge = false;
                    return inChallenge;
                  }).join('\n')}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Solution Section */}
        {(project.solution || content?.includes('## Solution') || content?.includes('## Architecture')) && (
          <section id="solution" className="mb-20 scroll-mt-24">
            <div className="border-l-2 border-hairline pl-6">
              <span className="font-mono text-xs font-bold text-body uppercase tracking-widest mb-3 block">
                [02] The Solution
              </span>
              <h3 className="text-xl font-bold text-ink mb-4">
                How we approached it
              </h3>
              {project.solution ? (
                <div className="text-body text-sm leading-relaxed max-w-3xl space-y-4">
                  {project.solution.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ) : (
                <div className="text-body text-sm leading-relaxed max-w-3xl">
                  {content?.split('\n').filter(line => line.includes('Architecture') || line.startsWith('- ')).join('\n')}
                </div>
              )}

              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xs font-mono text-mute uppercase tracking-widest mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <div key={tech.id} className="px-3 py-2 bg-surface-card border border-hairline rounded font-mono text-xs text-body">
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Impact Section */}
        <section id="impact" className="mb-20 scroll-mt-24">
          <div className="border-l-2 border-hairline pl-6">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
              [03] The Impact
            </span>
            <h3 className="text-xl font-bold text-ink mb-4">
              Measurable Results
            </h3>
            {project.impact && (
              <p className="text-body text-sm leading-relaxed max-w-3xl mb-8">{project.impact}</p>
            )}
            
            {/* Metrics Grid */}
            {project.metrics.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline mb-8">
                {project.metrics.map(metric => (
                  <div key={metric.id} className="p-6 bg-canvas">
                    <p className="font-mono text-accent text-2xl font-bold mb-1">{metric.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-mute font-mono">{metric.key}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Budget Range (if available) */}
            {project.budgetRange && (
              <div className="mt-6 p-4 bg-surface-soft border border-hairline rounded-sm">
                <p className="text-xs font-mono text-mute uppercase tracking-widest mb-1">Project Investment</p>
                <p className="text-sm font-bold text-ink">{project.budgetRange}</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-surface-dark text-on-dark p-8 rounded-sm border border-hairline">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-base font-bold text-on-dark mb-2">
                  Ready to achieve similar results?
                </h4>
                <p className="text-on-dark-muted text-sm">
                  Let&apos;s discuss how we can apply these strategies to your challenges.
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-accent text-canvas font-bold py-3 px-6 rounded-sm hover:bg-accent/80 transition-colors text-xs uppercase tracking-widest whitespace-nowrap"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline py-12 px-6 md:px-12 bg-surface-soft">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold text-ink mb-1">Want to work together?</h4>
            <p className="text-body text-xs">Let&apos;s discuss how AI can accelerate your business.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="px-4 py-2 bg-surface-card border border-hairline rounded text-xs font-mono text-body hover:text-ink hover:border-hairline-strong transition-colors">
              Get in Touch
            </Link>
            <Link href="/projects" className="bg-ink px-6 py-2 rounded text-xs font-mono font-medium text-canvas hover:bg-ink-deep transition-colors">
              View All Projects
            </Link>
          </div>
        </div>
        <div className="max-w-[960px] mx-auto mt-8 pt-6 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-mute font-mono">© 2026 AI Engineer Portfolio. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] text-mute font-mono uppercase tracking-tighter">
            <a href="#" className="hover:text-ink transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-ink transition-colors">GitHub</a>
            <a href="#" className="hover:text-ink transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
