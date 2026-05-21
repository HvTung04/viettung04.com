'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Heading = { id: string; text: string };

type SystemMapProps = {
  headings: Heading[];
  views: number;
  readMinutes: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function SystemMap({ headings, views, readMinutes }: SystemMapProps) {
  const t = useTranslations('BlogDetail');
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const viewProgress = clamp(Math.round(Math.log10(views + 10) * 24), 8, 100);
  const depthProgress = clamp(readMinutes * 6, 8, 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, [headings]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-px bg-ink z-50 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      
      <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
        <nav className="space-y-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">{t('systemMap')}</p>
          <ul className="space-y-3 text-sm">
            {headings.map((h) => (
              <li key={h.id}>
                <a 
                  className={`flex items-center gap-2 transition-colors font-mono text-xs ${
                    activeId === h.id ? 'text-ink font-medium' : 'text-mute hover:text-ink'
                  }`} 
                  href={`#${h.id}`}
                >
                  {activeId === h.id && <span className="text-accent">[x]</span>}
                  {activeId !== h.id && <span className="text-stone">[ ]</span>}
                  <span className="line-clamp-1">{h.text}</span>
                </a>
              </li>
            ))}
            {headings.length === 0 && (
              <li className="text-mute font-mono text-xs">NO_WAYPOINTS_DETECTED</li>
            )}
          </ul>
          
          <div className="pt-6 mt-6 border-t border-hairline">
            <div className="bg-surface-soft px-4 py-4 rounded border border-hairline">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-3">{t('modelStats')}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-body">{t('views')}</span>
                    <span className="text-[10px] font-mono text-accent font-bold">{views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-surface-card h-1 rounded overflow-hidden">
                    <div className="bg-accent h-full transition-all duration-500" style={{ width: `${viewProgress}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-body">{t('readingDepth')}</span>
                    <span className="text-[10px] font-mono text-success font-bold">{readMinutes}m</span>
                  </div>
                  <div className="w-full bg-surface-card h-1 rounded overflow-hidden">
                    <div className="bg-success h-full transition-all duration-500" style={{ width: `${depthProgress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
