'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const content = formData.get('content') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const demoUrl = formData.get('demoUrl') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const techStackJson = formData.get('techStack') as string; // Will receive a JSON string
  const metricsJson = formData.get('metrics') as string; // Will receive a JSON string

  const techStack = techStackJson ? JSON.parse(techStackJson) : [];
  const metrics = metricsJson ? JSON.parse(metricsJson) : [];

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      category,
      visibility,
      status: 'ACTIVE',
      content,
      githubUrl,
      demoUrl,
      imageUrl,
      techStack: {
        create: techStack.map((name: string) => ({ name })),
      },
      metrics: {
        create: metrics.map((m: any) => ({ key: m.key, value: m.value })),
      },
    },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/admin/projects');
}
