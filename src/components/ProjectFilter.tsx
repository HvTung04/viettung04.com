'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';

export default function ProjectFilter() {
  const t = useTranslations('ProjectListPage.filters');
  const [active, setActive] = useState('all');

  const filters = [
    { id: 'all', label: t('all') },
    { id: 'cv', label: t('cv') },
    { id: 'nlp', label: t('nlp') },
    { id: 'data', label: t('data') },
    { id: 'rl', label: t('rl') },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide animate-in fade-in duration-700 delay-150 fill-mode-both">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActive(filter.id)}
          className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm transition-colors ${
            active === filter.id 
              ? 'bg-primary text-white font-semibold' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-300 font-medium'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
