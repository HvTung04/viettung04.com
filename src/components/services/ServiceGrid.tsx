'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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

type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string | null;
};

export default function ServiceGrid({ projects, services }: { projects: Project[]; services: Service[] }) {
  const t = useTranslations('ServicesPage');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append('service', selectedService.title);

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

  const getRelatedProjects = (category: string) => {
    return projects.filter(p => p.category === category);
  };

  return (
    <>
      <section className="px-4 sm:px-8 pb-24 max-w-[960px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline">
          {services.map((s) => (
            <div 
              key={s.id} 
              onClick={() => { setSelectedService(s); setSubmitStatus('idle'); }}
              className="group cursor-pointer bg-canvas p-8 sm:p-10 hover:bg-surface-soft transition-colors flex flex-col"
            >
              <div className="grow flex flex-col">
                <h3 className="text-base font-bold text-ink mb-4">
                  [+] {s.title}
                </h3>
                <p className="text-body text-sm mb-8 leading-relaxed grow">
                  {s.description}
                </p>
                {s.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.split(',').map((tag, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 bg-surface-card text-body rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-accent-hover transition-colors w-fit">
                  {t('grid.cta')}
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-ink/60" onClick={() => setSelectedService(null)}></div>
          
          <div className="relative bg-canvas w-full max-w-3xl rounded overflow-hidden my-auto border border-hairline">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-hairline">
              <h3 className="text-base font-bold text-ink">
                {selectedService.title}
              </h3>
              <button onClick={() => setSelectedService(null)} className="cursor-pointer text-mute hover:text-ink bg-surface-soft p-2 rounded transition-colors font-mono text-xs">
                [x]
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-body text-sm bg-surface-soft p-4 rounded mb-8">
                {selectedService.description}
              </p>

              {/* Related Projects */}
              {getRelatedProjects(selectedService.category).length > 0 && (
                <div className="mb-10">
                  <h4 className="text-sm font-bold text-ink mb-4">
                    {t('modal.relatedProjects')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getRelatedProjects(selectedService.category).map(p => (
                      <Link key={p.id} href={`/projects/${p.slug}`} className="block p-4 rounded border border-hairline hover:border-hairline-strong transition-colors bg-surface-soft">
                        <h5 className="font-bold text-ink mb-1 text-sm">{p.title}</h5>
                        <p className="text-xs text-body line-clamp-2">{p.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <div>
                <h4 className="text-sm font-bold text-ink mb-4">
                  {t('modal.bookFormTitle')}
                </h4>
                {submitStatus === 'success' ? (
                  <div className="bg-success/10 border border-success/20 text-success p-6 rounded text-center text-sm font-mono">
                    {t('modal.success')}
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-mute mb-1">{t('modal.nameLabel')}</label>
                        <input type="text" name="name" required className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-mute mb-1">{t('modal.emailLabel')}</label>
                        <input type="email" name="email" required className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-mute mb-1">{t('modal.projectNameLabel')}</label>
                        <input type="text" name="projectName" required className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-mute mb-1">{t('modal.budgetLabel')}</label>
                        <input type="text" name="budget" placeholder="$5k - $10k" className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-mute mb-1">{t('modal.timeframeLabel')}</label>
                        <input type="text" name="timeframe" placeholder="e.g. 2 months" className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-mute mb-1">{t('modal.descriptionLabel')}</label>
                      <textarea name="description" rows={4} required className="w-full bg-surface-soft border border-hairline rounded px-3 py-2 outline-none focus:border-ink focus:bg-canvas transition-colors text-sm font-mono text-ink resize-none"></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-danger text-sm font-mono">{t('modal.error')}</p>
                    )}

                    <div className="pt-4 flex justify-end gap-3 border-t border-hairline">
                      <button type="button" onClick={() => setSelectedService(null)} className="cursor-pointer px-5 py-2 rounded font-mono text-sm text-body hover:bg-surface-soft transition-colors">
                        {t('modal.cancel')}
                      </button>
                      <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-ink hover:bg-ink-deep text-canvas px-5 py-2 rounded font-mono text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none">
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
