'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '../../auth';

export async function createTestimonial(formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const company = formData.get('company') as string | null;
  const content = formData.get('content') as string;
  const avatarUrl = formData.get('avatarUrl') as string | null;
  const logoUrl = formData.get('logoUrl') as string | null;
  const featured = formData.get('featured') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;

  try {
    await prisma.testimonial.create({
      data: {
        name,
        role,
        company: company || null,
        content,
        avatarUrl: avatarUrl || null,
        logoUrl: logoUrl || null,
        featured,
        order,
      },
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to create testimonial', error);
    return { success: false, error: 'Failed to create testimonial' };
  }
}

export async function updateTestimonial(formData: FormData) {
  await requireAuth();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const company = formData.get('company') as string | null;
  const content = formData.get('content') as string;
  const avatarUrl = formData.get('avatarUrl') as string | null;
  const logoUrl = formData.get('logoUrl') as string | null;
  const featured = formData.get('featured') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;

  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        role,
        company: company || null,
        content,
        avatarUrl: avatarUrl || null,
        logoUrl: logoUrl || null,
        featured,
        order,
      },
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to update testimonial', error);
    return { success: false, error: 'Failed to update testimonial' };
  }
}
