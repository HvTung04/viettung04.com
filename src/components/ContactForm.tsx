'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/app/actions/contact';
import { MdCheckCircle, MdArrowForward, MdAutorenew } from 'react-icons/md';

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
      <div className="flex flex-col items-center justify-center text-center p-10 h-full min-h-[400px] animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <MdCheckCircle className="text-primary text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-mono uppercase tracking-widest">{t('success.title')}</h3>
        <p className="text-slate-500 mb-8 max-w-sm">{t('success.description')}</p>
        <button 
          onClick={resetForm}
          className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-primary transition-colors border-b border-dashed border-slate-700 hover:border-primary pb-1"
        >
          {t('success.resetButton')}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6 animate-in fade-in duration-500" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('nameLabel')}</label>
          <div className="glow-border rounded-lg outline-none transition-shadow">
            <input 
              name="name"
              required
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg py-4 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white outline-none transition-all" 
              placeholder={t('namePlaceholder')} 
              type="text"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('emailLabel')}</label>
          <div className="glow-border rounded-lg outline-none transition-shadow">
            <input 
              name="email"
              required
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg py-4 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white outline-none transition-all" 
              placeholder={t('emailPlaceholder')} 
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('budgetLabel')}</label>
        <div className="glow-border rounded-lg outline-none transition-shadow">
          <select 
            name="budget"
            required
            className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg py-4 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white outline-none transition-all appearance-none"
            defaultValue=""
          >
            <option disabled value="">{t('budgetOptionDisabled')}</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('descLabel')}</label>
        <div className="glow-border rounded-lg outline-none transition-shadow">
          <textarea 
            name="description"
            required
            className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg py-4 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white outline-none transition-all resize-none" 
            placeholder={t('descPlaceholder')} 
            rows={5}
          ></textarea>
        </div>
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-lg flex items-center justify-center gap-2 transition-all group shadow-xl shadow-primary/20 disabled:opacity-50" 
        type="submit"
      >
        <span>{isSubmitting ? t('submitButtonSubmitting') : t('submitButton')}</span>
        {!isSubmitting && <MdArrowForward className="transition-transform group-hover:translate-x-1 text-xl" />}
        {isSubmitting && <MdAutorenew className="animate-spin text-xl" />}
      </button>
      <p className="text-center text-xs text-slate-500 font-mono">
        {t('responseTimePrefix')}<span className="text-accent-teal">{t('responseTimeValue')}</span>
      </p>
    </form>
  );
}
