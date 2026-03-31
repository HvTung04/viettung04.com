import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { 
  MdMemory, 
  MdHub, 
  MdCenterFocusStrong, 
  MdVisibility, 
  MdQueryStats, 
  MdArchitecture, 
  MdStorage, 
  MdTerminal, 
  MdArrowForward 
} from 'react-icons/md';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  return {
    title: `${t('services')} | AI Engineer Portfolio`
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ServicesPage');

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-on-surface min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="pt-8 md:pt-0">
        {/* Hero Section */}
        <section className="relative min-h-153.5 flex items-center justify-center overflow-hidden grid-bg px-4 sm:px-8">
          <div className="absolute inset-0 bg-linear-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
          <div className="max-w-4xl text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
              {t('hero.subtitle')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-slate-900 dark:text-white">
              {t('hero.titlePart1')}
              <span className="text-primary">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-slate-600 dark:text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Service Grid */}
        <section className="px-4 sm:px-8 pb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-900 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-900 shadow-xl dark:shadow-none">
            
            {/* Card 1: AI System Development */}
            <div className="group bg-white dark:bg-surface-container p-8 sm:p-10 hover:bg-slate-50 dark:hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <MdMemory className="text-8xl text-slate-900 dark:text-white" />
              </div>
              <div className="relative z-10 grow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <MdHub className="text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t('grid.service1.title')}
                </h3>
                <p className="text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed grow">
                  {t('grid.service1.description')}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.raw('grid.service1.tags').map((tag: string, i: number) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-1 bg-slate-100 dark:bg-surface-container-highest text-slate-500 dark:text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 dark:hover:text-white transition-colors group/btn active:scale-95 duration-200 w-fit">
                  {t('grid.service1.cta')}
                  <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Computer Vision Solutions */}
            <div className="group bg-white dark:bg-surface-container p-8 sm:p-10 hover:bg-slate-50 dark:hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <MdVisibility className="text-8xl text-slate-900 dark:text-white" />
              </div>
              <div className="relative z-10 grow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <MdCenterFocusStrong className="text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t('grid.service2.title')}
                </h3>
                <p className="text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed grow">
                  {t('grid.service2.description')}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.raw('grid.service2.tags').map((tag: string, i: number) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-1 bg-slate-100 dark:bg-surface-container-highest text-slate-500 dark:text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 dark:hover:text-white transition-colors group/btn active:scale-95 duration-200 w-fit">
                  {t('grid.service2.cta')}
                  <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: AI Consulting */}
            <div className="group bg-white dark:bg-surface-container p-8 sm:p-10 hover:bg-slate-50 dark:hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <MdArchitecture className="text-8xl text-slate-900 dark:text-white" />
              </div>
              <div className="relative z-10 grow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <MdQueryStats className="text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t('grid.service3.title')}
                </h3>
                <p className="text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed grow">
                  {t('grid.service3.description')}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.raw('grid.service3.tags').map((tag: string, i: number) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-1 bg-slate-100 dark:bg-surface-container-highest text-slate-500 dark:text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 dark:hover:text-white transition-colors group/btn active:scale-95 duration-200 w-fit">
                  {t('grid.service3.cta')}
                  <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 4: Data Automation */}
            <div className="group bg-white dark:bg-surface-container p-8 sm:p-10 hover:bg-slate-50 dark:hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <MdTerminal className="text-8xl text-slate-900 dark:text-white" />
              </div>
              <div className="relative z-10 grow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <MdStorage className="text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t('grid.service4.title')}
                </h3>
                <p className="text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed grow">
                  {t('grid.service4.description')}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.raw('grid.service4.tags').map((tag: string, i: number) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-1 bg-slate-100 dark:bg-surface-container-highest text-slate-500 dark:text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 dark:hover:text-white transition-colors group/btn active:scale-95 duration-200 w-fit">
                  {t('grid.service4.cta')}
                  <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-slate-50 dark:bg-surface-container-low py-20 md:py-32 border-y border-slate-200 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="mb-16 md:mb-20 text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-2 block">
                {t('process.methodology')}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {t('process.titlePart1')}
                <span className="text-primary">{t('process.titleHighlight')}</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-8 left-8 w-[calc(100%-4rem)] h-px bg-slate-300 dark:bg-slate-800 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-mono font-bold text-xl mb-6 md:mb-8 rounded-lg shadow-sm">
                  {t('process.step1.number')}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('process.step1.title')}
                </h4>
                <p className="text-slate-600 dark:text-on-surface-variant leading-relaxed">
                  {t('process.step1.description')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-mono font-bold text-xl mb-6 md:mb-8 rounded-lg shadow-sm">
                  {t('process.step2.number')}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('process.step2.title')}
                </h4>
                <p className="text-slate-600 dark:text-on-surface-variant leading-relaxed">
                  {t('process.step2.description')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary font-mono font-bold text-xl mb-6 md:mb-8 rounded-lg shadow-sm">
                  {t('process.step3.number')}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t('process.step3.title')}
                </h4>
                <p className="text-slate-600 dark:text-on-surface-variant leading-relaxed">
                  {t('process.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
