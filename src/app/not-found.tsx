import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-mono flex items-center justify-center px-4">
      <div className="w-full max-w-lg border border-hairline p-8">
        <div className="text-[11px] text-mute mb-2">[!] ERROR 404</div>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-sm text-body mb-8">
          This route does not exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vi"
            className="bg-ink text-canvas hover:bg-ink-deep px-4 py-1.5 rounded text-sm font-mono font-medium transition-colors"
          >
            Về trang chủ
          </Link>
          <Link
            href="/en"
            className="bg-canvas text-ink border border-hairline-strong hover:border-ink px-4 py-1.5 rounded text-sm font-mono font-medium transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
