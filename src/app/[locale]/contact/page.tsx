import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ContactPage');
  return {
    title: 'Contact | AI Engineer Portfolio',
    description: t('description'),
    keywords: ['Contact', 'Hire AI Engineer', 'AI Consulting', 'Project Inquiry'],
  };
}

export default async function ContactPage() {
  const t = await getTranslations('ContactPage');

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
              <h2 className="text-[38px] md:text-[44px] font-bold text-ink leading-tight">
                {t('titlePart1')}<span className="text-accent">{t('titleHighlight')}</span>
              </h2>
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
                <a className="text-sm text-ink hover:underline" href="https://github.com/aiexpert" target="_blank" rel="noopener noreferrer">
                  github.com/HvTung04
                </a>
              </div>
              <div className="p-6 bg-surface-soft border border-hairline">
                <p className="font-mono text-[10px] uppercase text-mute mb-2">[+] {t('linkedinLabel')}</p>
                <a className="text-sm text-ink hover:underline" href="https://linkedin.com/in/aiprofessional" target="_blank" rel="noopener noreferrer">
                  in/aiprofessional
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
