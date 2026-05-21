'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email address' };
  }

  try {
    await prisma.newsletterSubscription.upsert({
      where: { email },
      create: { email },
      update: {},
    });
    revalidatePath('/admin/newsletter');
    return { success: true };
  } catch (error) {
    if ((error as any).code === 'P2002') {
      return { success: true, message: 'Already subscribed' };
    }
    console.error('Failed to subscribe to newsletter', error);
    return { success: false, error: 'Failed to subscribe' };
  }
}
