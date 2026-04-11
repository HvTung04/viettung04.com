/* eslint-disable @next/next/no-img-element */
import {MdArrowForward} from 'react-icons/md';
import {Link} from '@/i18n/routing';

export type ProjectCardData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  techStack: { name: string }[];
  metrics: { key: string; value: string }[];
};

export default function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
      {projects.map((p) => {
        const m1 = p.metrics[0];
        const m2 = p.metrics[1];
        return (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="group relative flex flex-col bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              {p.imageUrl ? (
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.title} src={p.imageUrl}/>
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-4xl">image</span>
                </div>
              )}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">{p.category}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {p.techStack.slice(0, 4).map(tech => (
                  <span key={tech.name} className="font-mono text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{tech.name}</span>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center mt-auto">
                {m1 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{m1.key}</span>
                    <span className="text-primary font-bold">{m1.value}</span>
                  </div>
                )}
                {m2 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{m2.key}</span>
                    <span className="text-primary font-bold">{m2.value}</span>
                  </div>
                )}
                <span className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all ml-auto">
                  <MdArrowForward className="text-base" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
