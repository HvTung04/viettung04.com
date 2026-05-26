'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';

export async function getMetrics() {
  await requireAuth();
  return prisma.siteMetric.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getMetric(id: string) {
  await requireAuth();
  return prisma.siteMetric.findUnique({
    where: { id },
  });
}

export async function createMetric(formData: FormData) {
  await requireAuth();
  await prisma.siteMetric.create({
    data: {
      label: formData.get('label') as string,
      value: formData.get('value') as string,
      suffix: formData.get('suffix') as string || null,
      description: formData.get('description') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });
  revalidatePath('/admin/metrics');
  revalidatePath('/[locale]');
  redirect('/admin/metrics');
}

export async function updateMetric(id: string, formData: FormData) {
  await requireAuth();
  await prisma.siteMetric.update({
    where: { id },
    data: {
      label: formData.get('label') as string,
      value: formData.get('value') as string,
      suffix: formData.get('suffix') as string || null,
      description: formData.get('description') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });
  revalidatePath('/admin/metrics');
  revalidatePath('/[locale]');
  redirect('/admin/metrics');
}

export async function deleteMetric(id: string) {
  await requireAuth();
  await prisma.siteMetric.delete({ where: { id } });
  revalidatePath('/admin/metrics');
  revalidatePath('/[locale]');
}
