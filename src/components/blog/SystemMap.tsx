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
    // Scroll Spy
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

    // Reading Progress calculations
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
        className="fixed top-0 left-0 h-0.5 bg-primary z-100 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
      
      <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
        <nav className="space-y-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary font-bold">{t('systemMap')}</p>
          <ul className="space-y-4 text-sm">
            {headings.map((h) => (
              <li key={h.id}>
                <a 
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    activeId === h.id ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`} 
                  href={`#${h.id}`}
                >
                  {activeId === h.id && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>}
                  <span className="line-clamp-1">{h.text}</span>
                </a>
              </li>
            ))}
            {headings.length === 0 && (
              <li className="text-slate-500 dark:text-slate-600 font-mono text-xs">NO_WAYPOINTS_DETECTED</li>
            )}
          </ul>
          
          <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-900 px-4 py-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-3">{t('modelStats')}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">{t('views')}</span>
                    <span className="text-[10px] font-mono text-primary font-bold">{views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-500" style={{ width: `${viewProgress}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">{t('readingDepth')}</span>
                    <span className="text-[10px] font-mono text-tertiary font-bold">{readMinutes}m</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full transition-all duration-500" style={{ width: `${depthProgress}%` }}></div>
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
