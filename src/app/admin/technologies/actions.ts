'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';

export async function getTechnologies() {
  await requireAuth();
  return prisma.technology.findMany({
    orderBy: { order: 'asc' },
    include: { translations: true },
  });
}

export async function getTechnology(id: string) {
  await requireAuth();
  return prisma.technology.findUnique({
    where: { id },
    include: { translations: true },
  });
}

export async function createTechnology(formData: FormData) {
  await requireAuth();

  const technology = await prisma.technology.create({
    data: {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string || null,
      iconUrl: formData.get('iconUrl') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });

  const viName = formData.get('viName') as string;
  const viDescription = formData.get('viDescription') as string;
  if (viName || viDescription) {
    await prisma.technologyTranslation.create({
      data: {
        technologyId: technology.id,
        locale: 'vi',
        name: viName || technology.name,
        description: viDescription || technology.description,
      },
    });
  }

  revalidatePath('/admin/technologies');
  revalidatePath('/[locale]');
  redirect('/admin/technologies');
}

export async function updateTechnology(id: string, formData: FormData) {
  await requireAuth();

  await prisma.technology.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string || null,
      iconUrl: formData.get('iconUrl') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });

  const viName = formData.get('viName') as string;
  const viDescription = formData.get('viDescription') as string;
  if (viName || viDescription) {
    await prisma.technologyTranslation.upsert({
      where: { technologyId_locale: { technologyId: id, locale: 'vi' } },
      update: {
        name: viName || '',
        description: viDescription || null,
      },
      create: {
        technologyId: id,
        locale: 'vi',
        name: viName || '',
        description: viDescription || null,
      },
    });
  }

  revalidatePath('/admin/technologies');
  revalidatePath('/[locale]');
  redirect('/admin/technologies');
}

export async function deleteTechnology(id: string) {
  await requireAuth();
  await prisma.technology.delete({ where: { id } });
  revalidatePath('/admin/technologies');
  revalidatePath('/[locale]');
}
