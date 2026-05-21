'use client';

import { useState, useSyncExternalStore } from 'react';

function setCookie(theme: string) {
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
}

function getIsDark() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const hydrated = useHydrated();
  const [tick, rerender] = useState(0);

  const toggleTheme = () => {
    const isDark = getIsDark();
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setCookie('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setCookie('dark');
    }
    rerender((n) => n + 1);
  };

  if (!hydrated) {
    return <div className="p-2 w-9 h-9" />;
  }

  // read tick to force re-render after toggle
  void tick;
  const isDark = getIsDark();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded text-mute hover:text-ink hover:bg-surface-soft transition-colors font-mono text-xs"
      aria-label="Toggle dark mode"
    >
      {isDark ? '[+]' : '[-]'}
    </button>
  );
}
