import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import prisma from '@/lib/db';
import ServiceGrid from '@/components/services/ServiceGrid';

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

  const rawProjects = await prisma.project.findMany({
    where: { status: 'ACTIVE', visibility: 'PUBLIC' },
    include: { translations: true }
  });

  const serializedProjects = rawProjects.map(p => {
    const translation = p.translations.find(tr => tr.locale === locale) || p.translations[0];
    return {
      id: p.id,
      slug: p.slug,
      title: translation?.title || p.title,
      description: translation?.description || p.description,
      category: p.category,
      imageUrl: p.imageUrl
    };
  });

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-on-surface min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="pt-8 md:pt-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center overflow-hidden grid-bg px-4 sm:px-8 mb-12">
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

        {/* Service Grid Component handles interaction & modal */}
        <ServiceGrid projects={serializedProjects} />

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
              <div className="hidden md:block absolute top-[2rem] left-8 w-[calc(100%-4rem)] h-px bg-slate-300 dark:bg-slate-800 z-0"></div>
              
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
