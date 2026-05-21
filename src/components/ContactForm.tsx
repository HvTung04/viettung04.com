'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setIsSuccess(true);
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
        <div className="mb-6">
          <span className="text-3xl text-success font-mono">[x]</span>
        </div>
        <h3 className="text-base font-bold text-ink mb-2 font-mono uppercase tracking-widest">{t('success.title')}</h3>
        <p className="text-body mb-8 max-w-sm text-sm">{t('success.description')}</p>
        <button 
          onClick={resetForm}
          className="text-xs font-mono uppercase tracking-widest text-stone hover:text-ink transition-colors border-b border-dashed border-hairline-strong hover:border-ink pb-1"
        >
          {t('success.resetButton')}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-mute">{t('nameLabel')}</label>
          <input 
            name="name"
            required
            className="w-full bg-surface-soft border border-hairline rounded py-3 px-3 focus:border-ink focus:bg-canvas text-ink text-sm font-mono outline-none transition-colors" 
            placeholder={t('namePlaceholder')} 
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-mute">{t('emailLabel')}</label>
          <input 
            name="email"
            required
            className="w-full bg-surface-soft border border-hairline rounded py-3 px-3 focus:border-ink focus:bg-canvas text-ink text-sm font-mono outline-none transition-colors" 
            placeholder={t('emailPlaceholder')} 
            type="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-mute">{t('budgetLabel')}</label>
        <select 
          name="budget"
          required
          className="w-full bg-surface-soft border border-hairline rounded py-3 px-3 focus:border-ink focus:bg-canvas text-ink text-sm font-mono outline-none transition-colors appearance-none"
          defaultValue=""
        >
          <option disabled value="">{t('budgetOptionDisabled')}</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-25k">$10,000 - $25,000</option>
          <option value="25k-50k">$25,000 - $50,000</option>
          <option value="50k+">$50,000+</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-mute">{t('descLabel')}</label>
        <textarea 
          name="description"
          required
          className="w-full bg-surface-soft border border-hairline rounded py-3 px-3 focus:border-ink focus:bg-canvas text-ink text-sm font-mono outline-none transition-colors resize-none" 
          placeholder={t('descPlaceholder')} 
          rows={5}
        ></textarea>
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full bg-ink hover:bg-ink-deep text-canvas font-mono font-medium py-3 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none" 
        type="submit"
      >
        <span>{isSubmitting ? t('submitButtonSubmitting') : t('submitButton')}</span>
        {!isSubmitting && <span>→</span>}
        {isSubmitting && <span className="animate-pulse">⋯</span>}
      </button>
      <p className="text-center text-xs text-stone font-mono">
        {t('responseTimePrefix')}<span className="text-accent">{t('responseTimeValue')}</span>
      </p>
    </form>
  );
}
