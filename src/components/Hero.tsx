import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {MdArrowForward, MdHub} from 'react-icons/md';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-sm shadow-primary/10">
                {t('availableBadge')}
              </span>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                {t('titlePart1')}
                <span className="text-primary">{t('titleHighlight')}</span>
                {t('titlePart2')}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="#projects" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1">
                {t('viewProjects')} <MdArrowForward className="text-xl" />
              </Link>
              <Link href="#contact" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-black/5 hover:-translate-y-1">
                {t('contactMe')}
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute -z-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="w-full aspect-square glass-card rounded-3xl flex items-center justify-center p-8 overflow-hidden" aria-label={t('alt')}>
              <div className="relative w-full h-full border border-primary/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
                <div className="grid grid-cols-4 gap-4 p-4 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-primary/30 border border-primary animate-ping" style={{animationDuration: '3s'}}></div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40"></div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20"></div>
                  <div className="w-12 h-12 rounded-full bg-primary/40 border border-primary animate-pulse"></div>
                </div>
                <MdHub className="absolute text-primary text-[128px] opacity-50 z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
