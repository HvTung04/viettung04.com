/**
 * Seeds the AboutField table with the defaults from messages/en.json and
 * messages/vi.json. Existing rows are left untouched unless --force is passed.
 *
 * Usage:
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/seed-about.ts
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/seed-about.ts --force
 */
import { PrismaClient } from '@prisma/client';
import en from '../messages/en.json';
import vi from '../messages/vi.json';

const prisma = new PrismaClient();

type Messages = Record<string, unknown>;

function readPath(source: Messages, path: string): string | undefined {
  let current: unknown = source;

  for (const segment of path.split('.')) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : undefined;
}

const FIELDS: { key: string; group: string }[] = [
  { key: 'availableBadge', group: 'hero' },
  { key: 'titlePart1', group: 'hero' },
  { key: 'titleHighlight', group: 'hero' },
  { key: 'titlePart2', group: 'hero' },
  { key: 'description', group: 'hero' },
  { key: 'viewProjects', group: 'hero' },
  { key: 'contactBtn', group: 'hero' },

  { key: 'philosophy.title', group: 'philosophy' },
  { key: 'philosophy.data.title', group: 'philosophy' },
  { key: 'philosophy.data.desc', group: 'philosophy' },
  { key: 'philosophy.scale.title', group: 'philosophy' },
  { key: 'philosophy.scale.desc', group: 'philosophy' },
  { key: 'philosophy.ethics.title', group: 'philosophy' },
  { key: 'philosophy.ethics.desc', group: 'philosophy' },

  { key: 'timeline.title', group: 'timeline' },
  { key: 'timeline.senior.role', group: 'timeline' },
  { key: 'timeline.senior.period', group: 'timeline' },
  { key: 'timeline.senior.company', group: 'timeline' },
  { key: 'timeline.senior.point1', group: 'timeline' },
  { key: 'timeline.senior.point2', group: 'timeline' },
  { key: 'timeline.research.role', group: 'timeline' },
  { key: 'timeline.research.period', group: 'timeline' },
  { key: 'timeline.research.company', group: 'timeline' },
  { key: 'timeline.research.point1', group: 'timeline' },
  { key: 'timeline.research.point2', group: 'timeline' },
  { key: 'timeline.data.role', group: 'timeline' },
  { key: 'timeline.data.period', group: 'timeline' },
  { key: 'timeline.data.company', group: 'timeline' },
  { key: 'timeline.data.point1', group: 'timeline' },

  { key: 'skills.title', group: 'skills' },
  { key: 'skills.coreTitle', group: 'skills' },
  { key: 'skills.coreItems', group: 'skills' },
  { key: 'skills.opsTitle', group: 'skills' },
  { key: 'skills.opsItems', group: 'skills' },
  { key: 'skills.languagesTitle', group: 'skills' },
  { key: 'skills.languagesItems', group: 'skills' },

  { key: 'resume.label', group: 'resume' },
  { key: 'resume.blurb', group: 'resume' },
  { key: 'resume.cta', group: 'resume' },
];

const force = process.argv.includes('--force');

async function main() {
  const bundles: Record<string, Messages> = {
    en: (en as { AboutPage: Messages }).AboutPage,
    vi: (vi as { AboutPage: Messages }).AboutPage,
  };

  let created = 0;
  let updated = 0;

  for (const field of FIELDS) {
    for (const [locale, bundle] of Object.entries(bundles)) {
      const value = readPath(bundle, field.key);
      if (value === undefined) {
        console.warn(`  ! missing key ${field.key} in ${locale}.json`);
        continue;
      }

      const existing = await prisma.aboutField.findUnique({
        where: { key_locale: { key: field.key, locale } },
      });

      if (existing) {
        if (force) {
          await prisma.aboutField.update({
            where: { key_locale: { key: field.key, locale } },
            data: { value, group: field.group },
          });
          updated++;
        }
        continue;
      }

      await prisma.aboutField.create({
        data: { key: field.key, locale, value, group: field.group },
      });
      created++;
    }
  }

  console.log(`Seeded About content: ${created} created, ${updated} updated.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
