'use client';

import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    // Listen for theme changes from other components or tabs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setTheme(isDarkNow ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  if (!mounted) {
    return <div className="p-2 md:p-2.5 w-9 h-9 md:w-10 md:h-10 mx-1" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 md:p-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <MdLightMode className="text-xl" />
      ) : (
        <MdDarkMode className="text-xl" />
      )}
    </button>
  );
}
