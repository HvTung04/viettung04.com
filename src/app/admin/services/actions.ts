'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';

export async function getServices() {
  await requireAuth();
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: { translations: true },
  });
}

export async function getService(id: string) {
  await requireAuth();
  return prisma.service.findUnique({
    where: { id },
    include: { translations: true },
  });
}

export async function createService(formData: FormData) {
  await requireAuth();

  const service = await prisma.service.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      tags: formData.get('tags') as string || null,
      icon: formData.get('icon') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });

  const viTitle = formData.get('viTitle') as string;
  const viDescription = formData.get('viDescription') as string;
  if (viTitle || viDescription) {
    await prisma.serviceTranslation.create({
      data: {
        serviceId: service.id,
        locale: 'vi',
        title: viTitle || service.title,
        description: viDescription || service.description,
      },
    });
  }

  revalidatePath('/admin/services');
  revalidatePath('/[locale]/services');
  redirect('/admin/services');
}

export async function updateService(id: string, formData: FormData) {
  await requireAuth();

  await prisma.service.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      tags: formData.get('tags') as string || null,
      icon: formData.get('icon') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });

  const viTitle = formData.get('viTitle') as string;
  const viDescription = formData.get('viDescription') as string;
  if (viTitle || viDescription) {
    await prisma.serviceTranslation.upsert({
      where: { serviceId_locale: { serviceId: id, locale: 'vi' } },
      update: {
        title: viTitle || '',
        description: viDescription || '',
      },
      create: {
        serviceId: id,
        locale: 'vi',
        title: viTitle || '',
        description: viDescription || '',
      },
    });
  }

  revalidatePath('/admin/services');
  revalidatePath('/[locale]/services');
  redirect('/admin/services');
}

export async function deleteService(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath('/admin/services');
  revalidatePath('/[locale]/services');
}
