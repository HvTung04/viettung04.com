'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { requireAuth } from '../auth';

export async function getFaqs() {
  await requireAuth();
  return prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getFaq(id: string) {
  await requireAuth();
  return prisma.faq.findUnique({
    where: { id },
  });
}

export async function createFaq(formData: FormData) {
  await requireAuth();
  await prisma.faq.create({
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: formData.get('category') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
      locale: formData.get('locale') as string || 'en',
    },
  });
  revalidatePath('/admin/faqs');
  revalidatePath('/[locale]/services');
  redirect('/admin/faqs');
}

export async function updateFaq(id: string, formData: FormData) {
  await requireAuth();
  await prisma.faq.update({
    where: { id },
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: formData.get('category') as string || null,
      order: parseInt(formData.get('order') as string) || 0,
      status: formData.get('status') as string || 'ACTIVE',
      locale: formData.get('locale') as string || 'en',
    },
  });
  revalidatePath('/admin/faqs');
  revalidatePath('/[locale]/services');
  redirect('/admin/faqs');
}

export async function deleteFaq(id: string) {
  await requireAuth();
  await prisma.faq.delete({ where: { id } });
  revalidatePath('/admin/faqs');
  revalidatePath('/[locale]/services');
}
