'use client';

import { useTranslations } from 'next-intl';
import { MdTerminal } from 'react-icons/md';

export default function SearchWidget() {
  const t = useTranslations('BlogList');

  return (
    <div className="bg-surface-container p-8 rounded-xl border border-outline flex flex-col justify-between h-full shadow-lg shadow-black/20">
      <div>
        <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary mb-6 font-bold">{t('searchTitle')}</h3>
        <div className="relative group">
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-700 text-slate-300" 
          />
          <MdTerminal className="absolute right-4 top-3.5 text-slate-600 text-lg" />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-[11px] font-mono text-on-surface-variant mb-4 uppercase tracking-tighter">{t('subscribeTitle')}</p>
        <button className="w-full bg-surface-container-high border border-outline py-3 rounded-lg text-sm font-bold tracking-tight hover:bg-outline transition-colors active:scale-95 text-white">
          {t('subscribeBtn')}
        </button>
      </div>
    </div>
  );
}
