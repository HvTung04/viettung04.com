'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';
import {
  ABOUT_FIELDS,
  fieldsForGroup,
  formFieldName,
  type AboutGroupId,
  type AboutLocale,
} from '@/lib/about-fields';
import { getAboutDefault } from '@/lib/about-content';

const REVALIDATE_PATHS = ['/admin/about', '/[locale]/about', '/en/about', '/vi/about'];

function revalidateAbout() {
  for (const path of REVALIDATE_PATHS) revalidatePath(path);
}

export async function getAboutFields() {
  await requireAuth();

  const rows = await prisma.aboutField.findMany({
    orderBy: [{ group: 'asc' }, { order: 'asc' }, { locale: 'asc' }],
  });

  const map = new Map<string, string>();
  for (const row of rows) {
    map.set(`${row.locale}__${row.key}`, row.value);
  }

  return map;
}

export async function saveAboutGroup(group: AboutGroupId, formData: FormData) {
  await requireAuth();

  const fields = fieldsForGroup(group);

  const writes: Promise<unknown>[] = [];

  fields.forEach((field, index) => {
    for (const locale of ['en', 'vi'] as AboutLocale[]) {
      const raw = formData.get(formFieldName(field.key, locale));
      if (raw === null) continue;

      const value = String(raw);
      if (!value.trim()) continue;

      writes.push(
        prisma.aboutField.upsert({
          where: { key_locale: { key: field.key, locale } },
          update: { value, group, order: index },
          create: { key: field.key, locale, value, group, order: index },
        })
      );
    }
  });

  await Promise.all(writes);

  revalidateAbout();
}

export async function restoreAboutGroup(group: AboutGroupId) {
  await requireAuth();

  const fields = fieldsForGroup(group);
  const writes: Promise<unknown>[] = [];

  fields.forEach((field, index) => {
    for (const locale of ['en', 'vi'] as AboutLocale[]) {
      const value = getAboutDefault(field.key, locale);
      if (!value) continue;

      writes.push(
        prisma.aboutField.upsert({
          where: { key_locale: { key: field.key, locale } },
          update: { value, group, order: index },
          create: { key: field.key, locale, value, group, order: index },
        })
      );
    }
  });

  await Promise.all(writes);

  revalidateAbout();
}

export async function clearAboutGroup(group: AboutGroupId) {
  await requireAuth();

  await prisma.aboutField.deleteMany({ where: { group } });

  revalidateAbout();
}

/** Seeds every field from the i18n JSON defaults. */
export async function seedAboutDefaults() {
  await requireAuth();

  for (const field of ABOUT_FIELDS) {
    for (const locale of ['en', 'vi'] as AboutLocale[]) {
      const value = getAboutDefault(field.key, locale);
      if (!value) continue;

      await prisma.aboutField.upsert({
        where: { key_locale: { key: field.key, locale } },
        update: {},
        create: { key: field.key, locale, value, group: field.group, order: 0 },
      });
    }
  }

  revalidateAbout();
}
