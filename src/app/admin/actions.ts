'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAuth } from './auth';

export async function createProject(formData: FormData) {
  await requireAuth();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const content = formData.get('content') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const demoUrl = formData.get('demoUrl') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const techStackJson = formData.get('techStack') as string;
  const metricsJson = formData.get('metrics') as string;
  
  // Case study fields
  const challenge = formData.get('challenge') as string;
  const solution = formData.get('solution') as string;
  const impact = formData.get('impact') as string;
  const clientName = formData.get('clientName') as string;
  const timeline = formData.get('timeline') as string;
  const budgetRange = formData.get('budgetRange') as string;

  const viTitle = (formData.get('viTitle') as string) || '';
  const viDescription = (formData.get('viDescription') as string) || '';
  const viContent = (formData.get('viContent') as string) || '';

  const techStack = techStackJson ? JSON.parse(techStackJson) : [];
  const metrics = metricsJson ? JSON.parse(metricsJson) : [];

  const createData: any = {
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
    challenge: challenge || null,
    solution: solution || null,
    impact: impact || null,
    clientName: clientName || null,
    timeline: timeline || null,
    budgetRange: budgetRange || null,
    techStack: {
      create: techStack.map((name: string) => ({ name })),
    },
    metrics: {
      create: metrics.map((m: any) => ({ key: m.key, value: m.value })),
    },
  };

  if (viTitle || viDescription || viContent) {
    createData.translations = {
      create: [{ locale: 'vi', title: viTitle, description: viDescription, content: viContent }],
    };
  }

  await prisma.project.create({
    data: createData,
  });

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const content = formData.get('content') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const demoUrl = formData.get('demoUrl') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const techStackJson = formData.get('techStack') as string;
  const metricsJson = formData.get('metrics') as string;
  
  // Case study fields
  const challenge = formData.get('challenge') as string;
  const solution = formData.get('solution') as string;
  const impact = formData.get('impact') as string;
  const clientName = formData.get('clientName') as string;
  const timeline = formData.get('timeline') as string;
  const budgetRange = formData.get('budgetRange') as string;

  const viTitle = (formData.get('viTitle') as string) || '';
  const viDescription = (formData.get('viDescription') as string) || '';
  const viContent = (formData.get('viContent') as string) || '';

  const techStack = techStackJson ? JSON.parse(techStackJson) : [];
  const metrics = metricsJson ? JSON.parse(metricsJson) : [];

  // Update base properties
  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      category,
      visibility,
      content,
      githubUrl,
      demoUrl,
      imageUrl,
      challenge: challenge || null,
      solution: solution || null,
      impact: impact || null,
      clientName: clientName || null,
      timeline: timeline || null,
      budgetRange: budgetRange || null,
    },
  });

  // Handle Translations (Upsert)
  if (viTitle || viDescription || viContent) {
    await prisma.projectTranslation.upsert({
      where: {
        projectId_locale: {
          projectId: id,
          locale: 'vi',
        },
      },
      update: { title: viTitle, description: viDescription, content: viContent },
      create: { projectId: id, locale: 'vi', title: viTitle, description: viDescription, content: viContent },
    });
  } else {
    // Attempt deletion if empty
    await prisma.projectTranslation.deleteMany({
      where: { projectId: id, locale: 'vi' },
    });
  }

  // Rewrite tech stack and metrics entirely for simplicity
  await prisma.techStack.deleteMany({ where: { projectId: id } });
  if (techStack.length > 0) {
    await prisma.techStack.createMany({
      data: techStack.map((name: string) => ({ projectId: id, name })),
    });
  }

  await prisma.metric.deleteMany({ where: { projectId: id } });
  if (metrics.length > 0) {
    await prisma.metric.createMany({
      data: metrics.map((m: any) => ({ projectId: id, key: m.key, value: m.value })),
    });
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  // Don't redirect from Server Action for updates; handled by the client component redirect so UX doesn't break
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
}

export async function createBlog(formData: FormData) {
  await requireAuth();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const status = formData.get('status') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  const createData: any = {
    slug,
    category,
    visibility,
    status: status || 'DRAFT',
    imageUrl,
    translations: {
      create: [{ locale: 'en', title, description, content }],
    },
  };

  await prisma.blog.create({
    data: createData,
  });

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  redirect('/admin/blogs');
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAuth();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const visibility = formData.get('visibility') as string;
  const status = formData.get('status') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.blog.update({
    where: { id },
    data: {
      slug,
      category,
      visibility,
      status: status || 'DRAFT',
      imageUrl,
    },
  });

  await prisma.blogTranslation.upsert({
    where: {
      blogId_locale: {
        blogId: id,
        locale: 'en',
      },
    },
    update: { title, description, content },
    create: { blogId: id, locale: 'en', title, description, content },
  });

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
}

export async function deleteBlog(id: string) {
  await requireAuth();
  await prisma.blog.delete({
    where: { id },
  });
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}
