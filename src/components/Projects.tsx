/* eslint-disable @next/next/no-img-element */
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {MdOpenInNew, MdArrowForward} from 'react-icons/md';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
            <p className="text-slate-500 max-w-md">{t('subtitle')}</p>
          </div>
          <Link href="/projects" className="text-primary font-bold hover:underline flex items-center gap-1 transition-all hover:gap-2">
            {t('viewAll')} <MdOpenInNew className="text-sm" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map(p => {
            const tech = p.techStack.slice(0, 3);
            return (
              <Link key={p.id} href={`/projects/${p.slug}`} className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 bg-white/50 dark:bg-slate-900/50 block">
                <div className="h-48 bg-slate-800 overflow-hidden relative group-hover:bg-slate-700 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-0 duration-500"></div>
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  )}
                  <div className="p-6 h-full flex items-end relative z-20">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{p.category}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4 relative z-20 bg-white/5 dark:bg-black/20">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed min-h-[60px] line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tech.map(t => (
                      <span key={t.name} className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{t.name}</span>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <span className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <MdArrowForward className="text-base" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
