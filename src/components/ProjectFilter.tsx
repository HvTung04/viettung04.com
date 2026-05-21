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
    <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActive(filter.id)}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded px-4 text-xs font-mono transition-colors ${
            active === filter.id 
              ? 'bg-ink text-canvas font-medium' 
              : 'bg-surface-card hover:bg-surface-soft text-body font-medium border border-hairline'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
