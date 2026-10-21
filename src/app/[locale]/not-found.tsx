'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const COPY = {
  vi: {
    code: '404',
    title: 'Không tìm thấy trang',
    body: 'Đường dẫn này không tồn tại hoặc đã được di chuyển.',
    cta: 'Về trang chủ',
    back: 'Quay lại',
  },
  en: {
    code: '404',
    title: 'Page not found',
    body: 'This route does not exist or has been moved.',
    cta: 'Go to homepage',
    back: 'Go back',
  },
};

export default function NotFound() {
  const locale = (useLocale() as 'vi' | 'en') || 'vi';
  const t = COPY[locale] || COPY.en;

  return (
    <div className="min-h-screen bg-canvas text-ink font-mono flex items-center justify-center px-4">
      <div className="w-full max-w-lg border border-hairline p-8">
        <div className="text-[11px] text-mute mb-2">[!] ERROR {t.code}</div>
        <h1 className="text-2xl font-bold mb-3">{t.title}</h1>
        <p className="text-sm text-body mb-8">{t.body}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}`}
            className="bg-ink text-canvas hover:bg-ink-deep px-4 py-1.5 rounded text-sm font-mono font-medium transition-colors"
          >
            {t.cta}
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-canvas text-ink border border-hairline-strong hover:border-ink px-4 py-1.5 rounded text-sm font-mono font-medium transition-colors"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}
