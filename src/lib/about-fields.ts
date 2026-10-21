/**
 * Canonical list of editable About page fields.
 *
 * Used by:
 *  - the admin editor (/admin/about) to build the form
 *  - the public About page to resolve DB overrides
 *  - the seed script to populate defaults from the i18n JSON
 *
 * `key` is the path inside the AboutPage namespace of messages/*.json.
 * `type` "lines" means the value is a newline-separated list.
 */

export type AboutFieldType = 'text' | 'longtext' | 'lines';

export type AboutGroupId = 'hero' | 'philosophy' | 'timeline' | 'skills' | 'resume';

export type AboutFieldDef = {
  key: string;
  group: AboutGroupId;
  label: string;
  type: AboutFieldType;
};

export type AboutGroupDef = {
  id: AboutGroupId;
  title: string;
  description: string;
};

export const ABOUT_GROUPS: AboutGroupDef[] = [
  {
    id: 'hero',
    title: 'Hero',
    description: 'Headline, badge and intro paragraph',
  },
  {
    id: 'philosophy',
    title: 'Core Philosophy',
    description: 'Section title and the three principle cards',
  },
  {
    id: 'timeline',
    title: 'Career Journey',
    description: 'Section title and each role entry',
  },
  {
    id: 'skills',
    title: 'Technical Arsenal',
    description: 'Section title, group headings and skill lists',
  },
  {
    id: 'resume',
    title: 'Resume',
    description: 'Download card label and description',
  },
];

export const ABOUT_FIELDS: AboutFieldDef[] = [
  // hero
  { key: 'availableBadge', group: 'hero', label: 'Availability badge', type: 'text' },
  { key: 'titlePart1', group: 'hero', label: 'Headline line 1', type: 'text' },
  { key: 'titleHighlight', group: 'hero', label: 'Headline accent', type: 'text' },
  { key: 'titlePart2', group: 'hero', label: 'Headline line 2', type: 'text' },
  { key: 'description', group: 'hero', label: 'Intro paragraph', type: 'longtext' },
  { key: 'viewProjects', group: 'hero', label: 'Primary button label', type: 'text' },
  { key: 'contactBtn', group: 'hero', label: 'Secondary button label', type: 'text' },

  // philosophy
  { key: 'philosophy.title', group: 'philosophy', label: 'Section title', type: 'text' },
  { key: 'philosophy.data.title', group: 'philosophy', label: 'Principle 1 title', type: 'text' },
  { key: 'philosophy.data.desc', group: 'philosophy', label: 'Principle 1 body', type: 'longtext' },
  { key: 'philosophy.scale.title', group: 'philosophy', label: 'Principle 2 title', type: 'text' },
  { key: 'philosophy.scale.desc', group: 'philosophy', label: 'Principle 2 body', type: 'longtext' },
  { key: 'philosophy.ethics.title', group: 'philosophy', label: 'Principle 3 title', type: 'text' },
  { key: 'philosophy.ethics.desc', group: 'philosophy', label: 'Principle 3 body', type: 'longtext' },

  // timeline
  { key: 'timeline.title', group: 'timeline', label: 'Section title', type: 'text' },
  { key: 'timeline.senior.role', group: 'timeline', label: 'Role 1 title', type: 'text' },
  { key: 'timeline.senior.period', group: 'timeline', label: 'Role 1 period', type: 'text' },
  { key: 'timeline.senior.company', group: 'timeline', label: 'Role 1 company', type: 'text' },
  { key: 'timeline.senior.point1', group: 'timeline', label: 'Role 1 bullet 1', type: 'longtext' },
  { key: 'timeline.senior.point2', group: 'timeline', label: 'Role 1 bullet 2', type: 'longtext' },
  { key: 'timeline.research.role', group: 'timeline', label: 'Role 2 title', type: 'text' },
  { key: 'timeline.research.period', group: 'timeline', label: 'Role 2 period', type: 'text' },
  { key: 'timeline.research.company', group: 'timeline', label: 'Role 2 company', type: 'text' },
  { key: 'timeline.research.point1', group: 'timeline', label: 'Role 2 bullet 1', type: 'longtext' },
  { key: 'timeline.research.point2', group: 'timeline', label: 'Role 2 bullet 2', type: 'longtext' },
  { key: 'timeline.data.role', group: 'timeline', label: 'Role 3 title', type: 'text' },
  { key: 'timeline.data.period', group: 'timeline', label: 'Role 3 period', type: 'text' },
  { key: 'timeline.data.company', group: 'timeline', label: 'Role 3 company', type: 'text' },
  { key: 'timeline.data.point1', group: 'timeline', label: 'Role 3 bullet 1', type: 'longtext' },

  // skills
  { key: 'skills.title', group: 'skills', label: 'Section title', type: 'text' },
  { key: 'skills.coreTitle', group: 'skills', label: 'Group 1 heading', type: 'text' },
  { key: 'skills.coreItems', group: 'skills', label: 'Group 1 skills', type: 'lines' },
  { key: 'skills.opsTitle', group: 'skills', label: 'Group 2 heading', type: 'text' },
  { key: 'skills.opsItems', group: 'skills', label: 'Group 2 skills', type: 'lines' },
  { key: 'skills.languagesTitle', group: 'skills', label: 'Group 3 heading', type: 'text' },
  { key: 'skills.languagesItems', group: 'skills', label: 'Group 3 skills', type: 'lines' },

  // resume
  { key: 'resume.label', group: 'resume', label: 'Card heading', type: 'text' },
  { key: 'resume.blurb', group: 'resume', label: 'Card description', type: 'longtext' },
  { key: 'resume.cta', group: 'resume', label: 'Button label', type: 'text' },
  { key: 'resume.requestCta', group: 'resume', label: 'Button label (no PDF)', type: 'text' },
];

export const ABOUT_LOCALES = ['en', 'vi'] as const;

export type AboutLocale = (typeof ABOUT_LOCALES)[number];

export function fieldsForGroup(group: AboutGroupId): AboutFieldDef[] {
  return ABOUT_FIELDS.filter((field) => field.group === group);
}

/** Form field name for a given key + locale, e.g. "philosophy.data.title" -> "en__philosophy.data.title" */
export function formFieldName(key: string, locale: AboutLocale): string {
  return `${locale}__${key}`;
}

export function parseFormFieldName(name: string): { locale: AboutLocale; key: string } | null {
  const separator = name.indexOf('__');
  if (separator === -1) return null;
  const locale = name.slice(0, separator);
  const key = name.slice(separator + 2);
  if (!ABOUT_LOCALES.includes(locale as AboutLocale)) return null;
  return { locale: locale as AboutLocale, key };
}
