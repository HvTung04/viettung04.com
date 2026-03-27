import {useTranslations} from 'next-intl';
import {MdRocketLaunch, MdVisibility, MdChatBubble} from 'react-icons/md';

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section className="py-24 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16">{t('subtitle')}</p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          
          <div className="p-10 glass-card bg-white/40 dark:bg-slate-900/40 rounded-3xl border-t-4 border-t-primary space-y-4 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <MdRocketLaunch className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold">{t('service1.title')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">{t('service1.description')}</p>
          </div>
          
          <div className="p-10 glass-card bg-white/40 dark:bg-slate-900/40 rounded-3xl border-t-4 border-t-primary space-y-4 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <MdVisibility className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold">{t('service2.title')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">{t('service2.description')}</p>
          </div>
          
          <div className="p-10 glass-card bg-white/40 dark:bg-slate-900/40 rounded-3xl border-t-4 border-t-primary space-y-4 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <MdChatBubble className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold">{t('service3.title')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">{t('service3.description')}</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
