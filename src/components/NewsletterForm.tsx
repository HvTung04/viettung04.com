'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export default function NewsletterForm() {
  const t = useTranslations('BlogDetail');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);

    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setIsSuccess(true);
      setEmail('');
    } else {
      setError(result.error || 'Failed to subscribe');
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-surface-soft p-8 rounded border border-hairline mt-16">
        <div className="text-center">
          <div className="text-accent text-2xl mb-2">[x]</div>
          <h3 className="text-base font-bold tracking-tight mb-2 text-ink">Subscribed</h3>
          <p className="text-body text-sm leading-relaxed">You&apos;re now on the list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-soft p-8 rounded border border-hairline flex flex-col md:flex-row items-center justify-between gap-6 mt-16">
      <div className="max-w-md">
        <h3 className="text-base font-bold tracking-tight mb-2 text-ink">{t('subscribeTitle')}</h3>
        <p className="text-body text-sm leading-relaxed">{t('subscribeDesc')}</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-canvas border border-hairline px-4 py-2 rounded text-xs w-full sm:w-56 focus:border-ink outline-none transition-colors placeholder:text-mute text-ink font-mono"
          placeholder={t('subscribePlaceholder')}
          type="email"
          required
        />
        <button
          disabled={isSubmitting}
          className="bg-ink hover:bg-ink-deep transition-colors text-canvas px-6 py-2 rounded text-xs font-bold uppercase tracking-widest font-mono disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? '...' : t('subscribeBtn')}
        </button>
      </form>
      {error && (
        <div className="text-danger text-xs font-mono">{error}</div>
      )}
    </div>
  );
}
