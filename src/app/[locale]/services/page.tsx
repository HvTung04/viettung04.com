import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/db';
import ServiceGrid from '@/components/services/ServiceGrid';
import FAQ from '@/components/FAQ';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  return {
    title: `${t('services')} | AI Engineer Portfolio`,
    description: 'End-to-end AI expertise from research to production-ready deployments. AI System Development, Computer Vision, NLP, and Data Automation services.',
    keywords: ['AI Services', 'Machine Learning Consulting', 'Computer Vision', 'NLP', 'Data Automation'],
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

  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
    include: { translations: true },
  });

  const resolvedServices = services.map((service) => {
    const translation = service.translations.find((tr) => tr.locale === locale);
    return {
      id: service.id,
      title: translation?.title || service.title,
      description: translation?.description || service.description,
      category: service.category,
      tags: service.tags,
    };
  });

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col font-mono">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-16 md:pt-20 md:pb-24 px-4 sm:px-8">
          <div className="max-w-[960px] mx-auto text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4 block">
              {t('hero.subtitle')}
            </span>
            <h1 className="text-[38px] md:text-[44px] font-bold tracking-tight mb-6 leading-tight text-ink">
              {t('hero.titlePart1')}
              <span className="text-accent">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-body text-base max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>
        </section>

        {/* Service Grid Component handles interaction & modal */}
        <ServiceGrid projects={serializedProjects} services={resolvedServices} />

        {/* Process Section */}
        <section className="border-t border-hairline py-20 md:py-32">
          <div className="max-w-[960px] mx-auto px-4 sm:px-8">
            <div className="mb-16 md:mb-20 text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
                {t('process.methodology')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
                {t('process.titlePart1')}
                <span className="text-accent">{t('process.titleHighlight')}</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-canvas border border-hairline flex items-center justify-center text-accent font-mono font-bold text-xl mb-6 rounded">
                  {t('process.step1.number')}
                </div>
                <h4 className="text-base font-bold text-ink mb-3">
                  {t('process.step1.title')}
                </h4>
                <p className="text-body text-sm leading-relaxed">
                  {t('process.step1.description')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-canvas border border-hairline flex items-center justify-center text-accent font-mono font-bold text-xl mb-6 rounded">
                  {t('process.step2.number')}
                </div>
                <h4 className="text-base font-bold text-ink mb-3">
                  {t('process.step2.title')}
                </h4>
                <p className="text-body text-sm leading-relaxed">
                  {t('process.step2.description')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-canvas border border-hairline flex items-center justify-center text-accent font-mono font-bold text-xl mb-6 rounded">
                  {t('process.step3.number')}
                </div>
                <h4 className="text-base font-bold text-ink mb-3">
                  {t('process.step3.title')}
                </h4>
                <p className="text-body text-sm leading-relaxed">
                  {t('process.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
