'use client';

import { useTranslations } from 'next-intl';

export default function SearchWidget() {
  const t = useTranslations('BlogList');

  return (
    <div className="bg-canvas border border-hairline p-6 flex flex-col gap-4 sticky top-20">
      <div>
        <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-4 font-bold">{t('searchTitle')}</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className="w-full bg-surface-soft border border-hairline rounded py-2.5 px-3 text-xs font-mono focus:border-ink focus:bg-canvas outline-none transition-colors placeholder:text-mute text-ink" 
          />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-mono text-body mb-3 uppercase tracking-tighter">{t('subscribeTitle')}</p>
        <button className="w-full bg-surface-card border border-hairline py-2.5 rounded text-xs font-bold tracking-tight hover:bg-surface-soft transition-colors active:scale-[0.98] text-ink font-mono">
          {t('subscribeBtn')}
        </button>
      </div>
    </div>
  );
}
