import prisma from '@/lib/db';
import { ABOUT_FIELDS, type AboutLocale } from '@/lib/about-fields';
import en from '../../messages/en.json';
import vi from '../../messages/vi.json';

export type { AboutLocale };

type Messages = Record<string, unknown>;

const MESSAGES: Record<AboutLocale, Messages> = {
  en: en.AboutPage as Messages,
  vi: vi.AboutPage as Messages,
};

/** Reads a dotted path out of the AboutPage message bundle. */
function readPath(source: Messages, path: string): string | undefined {
  const segments = path.split('.');
  let current: unknown = source;

  for (const segment of segments) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : undefined;
}

/** Default (i18n JSON) value for a field key in a locale. */
export function getAboutDefault(key: string, locale: AboutLocale): string {
  return readPath(MESSAGES[locale] ?? MESSAGES.en, key) ?? '';
}

export type AboutContent = {
  /** Resolved value for a key — DB override first, i18n JSON second. */
  get: (key: string) => string;
  /** Resolved value as a list of lines (for `lines` type fields). */
  getLines: (key: string) => string[];
  /** True when the key has a DB override in this locale. */
  isOverridden: (key: string) => boolean;
};

export async function getAboutContent(locale: AboutLocale): Promise<AboutContent> {
  let rows: { key: string; value: string }[] = [];

  try {
    rows = await prisma.aboutField.findMany({
      where: { locale },
      select: { key: true, value: true },
    });
  } catch {
    // Table missing (fresh install before migration) — fall back to i18n JSON.
    rows = [];
  }

  const overrides = new Map(rows.map((row) => [row.key, row.value]));

  const get = (key: string) => {
    const override = overrides.get(key);
    if (override !== undefined && override.trim() !== '') return override;
    return getAboutDefault(key, locale);
  };

  return {
    get,
    getLines: (key) =>
      get(key)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    isOverridden: (key) => overrides.has(key),
  };
}

/** Every field key with its default value per locale — used by the admin editor. */
export function getAboutDefaults(): Record<AboutLocale, Record<string, string>> {
  const build = (locale: AboutLocale) =>
    Object.fromEntries(
      ABOUT_FIELDS.map((field) => [field.key, getAboutDefault(field.key, locale)])
    );

  return { en: build('en'), vi: build('vi') };
}
