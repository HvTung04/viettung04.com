'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.error || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-danger/10 border border-danger/50 text-danger px-4 py-3 rounded-sm text-sm">
          [ERROR] {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
          placeholder="viettung.hoang"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-accent text-canvas font-bold py-3 px-4 rounded-sm hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-sm"
      >
        {isSubmitting ? 'Authenticating...' : 'Login'}
      </button>

      <p className="text-center text-xs text-on-dark-muted">
        viettung.hoang / admin@viettung04
      </p>
    </form>
  );
}
