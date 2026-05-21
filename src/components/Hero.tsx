import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const ASCII_WORDMARK_HERO = `██╗   ██╗██╗███████╗████████╗    ████████╗██╗   ██╗███╗   ██╗ ██████╗      █████╗ ██╗
██║   ██║██║██╔════╝╚══██╔══╝    ██╔════╝██║   ██║████╗  ██║██╔════╝     ██╔══██╗██║
██║   ██║██║██████╗     ██║       ██║     ██║   ██║██╔██╗ ██║██║  ███╗    ███████║██║
╚██╗ ██╔╝██║██╔══╝     ██║       ██║     ██║   ██║██║╚██╗██║██║   ██║    ██╔══██║██║
 ╚████╔╝ ██║███████╗   ██║       ╚██████╗ ╚██████╔╝██║ ╚████║╚██████╔╝    ██║  ██║██║
  ╚═══╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝     ╚═╝  ╚═╝╚═╝`;

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="min-h-[calc(100dvh-5rem)] flex items-center pt-8 lg:pt-10 pb-14 lg:pb-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <span className="inline-block bg-surface-dark text-canvas text-[11px] font-mono px-2 py-0.5 rounded">
            News
          </span>
        </div>
        <h1 className="text-[38px] lg:text-[44px] font-bold leading-tight mb-4 max-w-3xl">
          {t('titlePart1')}
          <span className="text-accent">{t('titleHighlight')}</span>
          {t('titlePart2')}
        </h1>
        <p className="text-base text-body max-w-2xl leading-relaxed mb-8">
          {t('description')}
        </p>
        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href="#projects"
            className="bg-ink text-canvas hover:bg-ink-deep px-5 py-1.5 rounded text-sm font-mono font-medium transition-colors inline-flex items-center gap-2"
          >
            {t('viewProjects')} <span className="text-canvas/60">→</span>
          </Link>
          <Link
            href="/contact"
            className="bg-canvas text-ink border border-hairline-strong hover:border-ink px-5 py-1.5 rounded text-sm font-mono font-medium transition-colors"
          >
            {t('contactMe')}
          </Link>
        </div>

        {/* Hero TUI Mockup */}
        <div className="bg-surface-dark rounded-none overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-surface-dark-elevated">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-surface-dark-elevated"></div>
              <div className="w-3 h-3 rounded-full bg-surface-dark-elevated"></div>
              <div className="w-3 h-3 rounded-full bg-surface-dark-elevated"></div>
            </div>
            <span className="text-ash text-xs font-mono ml-2">opencode — tui</span>
          </div>
          <div className="p-8 lg:p-16 text-center">
            <pre className="text-on-dark text-[8px] lg:text-[10px] leading-[1.1] font-mono whitespace-pre mb-8 select-none" aria-hidden="true">
              {ASCII_WORDMARK_HERO}
            </pre>
            <div className="bg-surface-dark-elevated rounded px-3 py-2 text-left inline-block max-w-full">
              <span className="text-accent">│</span>{' '}
              <span className="text-on-dark">Build</span>{' '}
              <span className="text-ash">[</span>
              <span className="text-success">Claude Opus 4.5</span>
              <span className="text-ash">]</span>{' '}
              <span className="text-accent">OpenCode Zen</span>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-ash text-xs font-mono">
              <span><span className="text-on-dark/40">tab</span> switch agent</span>
              <span><span className="text-on-dark/40">ctrl-p</span> commands</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
