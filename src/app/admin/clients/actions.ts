'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';

export async function getClients() {
  await requireAuth();
  return prisma.client.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getClient(id: string) {
  await requireAuth();
  return prisma.client.findUnique({
    where: { id },
  });
}

export async function createClient(formData: FormData) {
  await requireAuth();
  await prisma.client.create({
    data: {
      name: formData.get('name') as string,
      logoUrl: formData.get('logoUrl') as string || null,
      websiteUrl: formData.get('websiteUrl') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });
  revalidatePath('/admin/clients');
  revalidatePath('/[locale]');
  redirect('/admin/clients');
}

export async function updateClient(id: string, formData: FormData) {
  await requireAuth();
  await prisma.client.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      logoUrl: formData.get('logoUrl') as string || null,
      websiteUrl: formData.get('websiteUrl') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
    },
  });
  revalidatePath('/admin/clients');
  revalidatePath('/[locale]');
  redirect('/admin/clients');
}

export async function deleteClient(id: string) {
  await requireAuth();
  await prisma.client.delete({ where: { id } });
  revalidatePath('/admin/clients');
  revalidatePath('/[locale]');
}
