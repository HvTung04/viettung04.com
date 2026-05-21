import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

type ProjectData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  techStack: { name: string }[];
};

export default function Projects({ projects }: { projects: ProjectData[] }) {
  const t = useTranslations('Projects');

  return (
    <section className="py-24" id="projects">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-base font-bold mb-2">{t('title')}</h2>
            <p className="text-body text-sm max-w-md">{t('subtitle')}</p>
          </div>
          <Link href="/projects" className="text-ink font-mono text-sm hover:underline inline-flex items-center gap-1">
            {t('viewAll')} <span>→</span>
          </Link>
        </div>
        <div className="space-y-px">
          {projects.map((p) => {
            const tech = p.techStack.slice(0, 3);
            return (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="group block bg-canvas border border-hairline p-6 hover:bg-surface-soft transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-ink font-mono text-sm">[+]</span>
                      <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors">{p.title}</h3>
                      <span className="text-[10px] font-mono text-mute uppercase tracking-wider border border-hairline px-1.5 py-0.5 rounded">{p.category}</span>
                    </div>
                    <p className="text-body text-sm leading-relaxed pl-7">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3 pl-7">
                      {tech.map(techItem => (
                        <span key={techItem.name} className="font-mono text-[11px] text-body bg-surface-card px-2 py-0.5 rounded">
                          {techItem.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-mute group-hover:text-ink transition-colors text-sm font-mono self-start sm:self-center">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
