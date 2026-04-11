import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { getTranslations } from 'next-intl/server';
import { MdMail, MdCode, MdLink, MdLocationOn } from 'react-icons/md';

export default async function ContactPage() {
  const t = await getTranslations('ContactPage');

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col grid-bg">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <span className="font-mono text-accent-teal text-sm font-medium tracking-widest uppercase mb-4 block">
                {t('available')}
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                {t('titlePart1')}<span className="text-primary">{t('titleHighlight')}</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {t('description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4 transition-transform hover:-translate-y-1">
                <MdMail className="text-primary text-2xl mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-slate-500 mb-1">{t('emailLabel')}</p>
                  <a className="font-medium hover:text-primary transition-colors" href="mailto:vtung121004@gmail.com">
                    vtung121004@gmail.com
                  </a>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4 transition-transform hover:-translate-y-1">
                <MdCode className="text-primary text-2xl mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-slate-500 mb-1">{t('githubLabel')}</p>
                  <a className="font-medium hover:text-primary transition-colors" href="https://github.com/aiexpert" target="_blank" rel="noopener noreferrer">
                    github.com/HvTung04
                  </a>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4 transition-transform hover:-translate-y-1">
                <MdLink className="text-primary text-2xl mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-slate-500 mb-1">{t('linkedinLabel')}</p>
                  <a className="font-medium hover:text-primary transition-colors" href="https://linkedin.com/in/aiprofessional" target="_blank" rel="noopener noreferrer">
                    in/aiprofessional
                  </a>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4 transition-transform hover:-translate-y-1">
                <MdLocationOn className="text-primary text-2xl mt-0.5" />
                <div>
                  <p className="font-mono text-xs uppercase text-slate-500 mb-1">{t('locationLabel')}</p>
                  <span className="font-medium">{t('locationValue')}</span>
                </div>
              </div>
              </div>
          </div>
          
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-700 delay-150 fill-mode-both">
            <div className="bg-white dark:bg-slate-900/40 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              {/* Subtle top reflection / glass effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
