import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Cta() {
  const t = useTranslations('Cta');

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white">{t('title')}</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 duration-300 inline-block">
                {t('button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
