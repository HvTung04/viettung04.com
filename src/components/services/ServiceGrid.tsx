'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  MdMemory, 
  MdHub, 
  MdCenterFocusStrong, 
  MdVisibility, 
  MdQueryStats, 
  MdArchitecture, 
  MdStorage, 
  MdTerminal, 
  MdArrowForward,
  MdClose
} from 'react-icons/md';
import { submitBookingForm } from '@/app/actions/bookService';
import { Link } from '@/i18n/routing';

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
};

type ServiceDef = {
  id: string;
  titleKey: string;
  descKey: string;
  tagsKey: string;
  ctaKey: string;
  iconBg: React.ReactNode;
  iconSm: React.ReactNode;
  categoryMatch: string[];
};

const SERVICES: ServiceDef[] = [
  {
    id: 'service1',
    titleKey: 'grid.service1.title',
    descKey: 'grid.service1.description',
    tagsKey: 'grid.service1.tags',
    ctaKey: 'grid.service1.cta',
    iconBg: <MdMemory className="text-8xl text-slate-900 dark:text-white" />,
    iconSm: <MdHub className="text-2xl" />,
    categoryMatch: ['Machine Learning', 'Generative AI', 'NLP']
  },
  {
    id: 'service2',
    titleKey: 'grid.service2.title',
    descKey: 'grid.service2.description',
    tagsKey: 'grid.service2.tags',
    ctaKey: 'grid.service2.cta',
    iconBg: <MdVisibility className="text-8xl text-slate-900 dark:text-white" />,
    iconSm: <MdCenterFocusStrong className="text-2xl" />,
    categoryMatch: ['Computer Vision']
  },
  {
    id: 'service3',
    titleKey: 'grid.service3.title',
    descKey: 'grid.service3.description',
    tagsKey: 'grid.service3.tags',
    ctaKey: 'grid.service3.cta',
    iconBg: <MdArchitecture className="text-8xl text-slate-900 dark:text-white" />,
    iconSm: <MdQueryStats className="text-2xl" />,
    categoryMatch: ['AI Consulting', 'Architecture']
  },
  {
    id: 'service4',
    titleKey: 'grid.service4.title',
    descKey: 'grid.service4.description',
    tagsKey: 'grid.service4.tags',
    ctaKey: 'grid.service4.cta',
    iconBg: <MdTerminal className="text-8xl text-slate-900 dark:text-white" />,
    iconSm: <MdStorage className="text-2xl" />,
    categoryMatch: ['Data Engineering', 'Data Automation']
  }
];

export default function ServiceGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations('ServicesPage');
  const [selectedService, setSelectedService] = useState<ServiceDef | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append('service', t(selectedService.titleKey as any));

    try {
      const res = await submitBookingForm(formData);
      if (res && res.success) {
        setSubmitStatus('success');
        formElement.reset();
      } else {
        console.error('Server action returned non-success:', res);
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Action threw error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRelatedProjects = (categoryMatch: string[]) => {
    return projects.filter(p => categoryMatch.includes(p.category));
  };

  return (
    <>
      <section className="px-4 sm:px-8 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-900 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-900 shadow-xl dark:shadow-none">
          {SERVICES.map((s) => (
            <div 
              key={s.id} 
              onClick={() => { setSelectedService(s); setSubmitStatus('idle'); }}
              className="group cursor-pointer bg-white dark:bg-surface-container p-8 sm:p-10 hover:bg-slate-50 dark:hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                {s.iconBg}
              </div>
              <div className="relative z-10 grow flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  {s.iconSm}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {t(s.titleKey as "grid.service1.title" | "grid.service2.title" | "grid.service3.title" | "grid.service4.title")}
                </h3>
                <p className="text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed grow">
                  {t(s.descKey as "grid.service1.description" | "grid.service2.description" | "grid.service3.description" | "grid.service4.description")}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.raw(s.tagsKey as "grid.service1.tags" | "grid.service2.tags" | "grid.service3.tags" | "grid.service4.tags").map((tag: string, i: number) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-1 bg-slate-100 dark:bg-surface-container-highest text-slate-500 dark:text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div 
                  className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 dark:hover:text-white transition-colors group/btn active:scale-95 duration-200 w-fit"
                >
                  {t(s.ctaKey as "grid.service1.cta" | "grid.service2.cta" | "grid.service3.cta" | "grid.service4.cta")}
                  <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedService(null)}></div>
          
          <div className="relative bg-white dark:bg-surface-container w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t(selectedService.titleKey as "grid.service1.title" | "grid.service2.title" | "grid.service3.title" | "grid.service4.title")}
              </h3>
              <button onClick={() => setSelectedService(null)} className="cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-lg transition-colors">
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-slate-600 dark:text-on-surface-variant text-lg bg-slate-50 dark:bg-surface-container-high p-4 rounded-lg mb-8">
                {t(selectedService.descKey as "grid.service1.description" | "grid.service2.description" | "grid.service3.description" | "grid.service4.description")}
              </p>

              {/* Related Projects */}
              {getRelatedProjects(selectedService.categoryMatch).length > 0 && (
                <div className="mb-10">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {t('modal.relatedProjects')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getRelatedProjects(selectedService.categoryMatch).map(p => (
                      <Link key={p.id} href={`/projects/${p.slug}`} className="block p-4 rounded border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors bg-slate-50 dark:bg-surface-container-lowest">
                        {p.imageUrl && (
                          <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded mb-3 overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{p.title}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {t('modal.bookFormTitle')}
                </h4>
                {submitStatus === 'success' ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-6 rounded-lg text-center font-medium">
                    {t('modal.success')}
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.nameLabel')}</label>
                        <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.emailLabel')}</label>
                        <input type="email" name="email" required className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.projectNameLabel')}</label>
                        <input type="text" name="projectName" required className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.budgetLabel')}</label>
                        <input type="text" name="budget" placeholder="$5k - $10k" className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.timeframeLabel')}</label>
                        <input type="text" name="timeframe" placeholder="e.g. 2 months" className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('modal.descriptionLabel')}</label>
                      <textarea name="description" rows={4} required className="w-full bg-slate-50 dark:bg-surface-container-high border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white resize-none"></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm font-medium">{t('modal.error')}</p>
                    )}

                    <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                      <button type="button" onClick={() => setSelectedService(null)} className="cursor-pointer px-5 py-2.5 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        {t('modal.cancel')}
                      </button>
                      <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center gap-2">
                        {isSubmitting ? t('modal.submitting') : t('modal.submit')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}