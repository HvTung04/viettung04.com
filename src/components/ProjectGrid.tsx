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
    <div className="space-y-px">
      {projects.map((p) => {
        const m1 = p.metrics[0];
        const m2 = p.metrics[1];
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
                  {p.techStack.slice(0, 4).map(tech => (
                    <span key={tech.name} className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-card text-body">
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 sm:min-w-[120px] pl-7 sm:pl-0">
                {m1 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-mute font-bold tracking-widest font-mono">{m1.key}</span>
                    <span className="text-accent font-bold font-mono text-sm">{m1.value}</span>
                  </div>
                )}
                {m2 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-mute font-bold tracking-widest font-mono">{m2.key}</span>
                    <span className="text-accent font-bold font-mono text-sm">{m2.value}</span>
                  </div>
                )}
                <span className="text-mute group-hover:text-ink transition-colors text-sm font-mono">
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
