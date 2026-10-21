import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: 'Contact — Hire AI Engineer Hoang Viet Tung',
    description: t('description'),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <div className="bg-canvas font-mono text-ink min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="flex flex-col lg:flex-row gap-16 pt-6 lg:pt-8">
          <div className="flex-1 space-y-8">
            <div>
              <span className="font-mono text-accent text-xs font-medium tracking-widest uppercase mb-4 block">
                {t('available')}
              </span>
              <h1 className="text-[38px] md:text-[44px] font-bold text-ink leading-tight">
                {t('titlePart1')}<span className="text-accent">{t('titleHighlight')}</span>
              </h1>
              <p className="mt-6 text-base text-body max-w-xl leading-relaxed">
                {t('description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <div className="p-6 bg-surface-soft border border-hairline">
                <p className="font-mono text-[10px] uppercase text-mute mb-2">[+] {t('emailLabel')}</p>
                <a className="text-sm text-ink hover:underline" href="mailto:vtung121004@gmail.com">
                  vtung121004@gmail.com
                </a>
              </div>
              <div className="p-6 bg-surface-soft border border-hairline">
                <p className="font-mono text-[10px] uppercase text-mute mb-2">[+] {t('githubLabel')}</p>
                <a className="text-sm text-ink hover:underline" href={process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/HvTung04'} target="_blank" rel="noopener noreferrer me">
                  {process.env.NEXT_PUBLIC_GITHUB_URL || 'github.com/HvTung04'}
                </a>
              </div>
              <div className="p-6 bg-surface-soft border border-hairline">
                <p className="font-mono text-[10px] uppercase text-mute mb-2">[+] {t('linkedinLabel')}</p>
                <a className="text-sm text-ink hover:underline" href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'} target="_blank" rel="noopener noreferrer me">
                  {process.env.NEXT_PUBLIC_LINKEDIN_URL || 'linkedin.com/in/your-profile'}
                </a>
              </div>
              <div className="p-6 bg-surface-soft border border-hairline">
                <p className="font-mono text-[10px] uppercase text-mute mb-2">[+] {t('locationLabel')}</p>
                <span className="text-sm text-ink">{t('locationValue')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-canvas border border-hairline p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
