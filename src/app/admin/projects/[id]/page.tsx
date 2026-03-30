import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function AdminProjectEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      techStack: true,
      metrics: true,
      translations: {
        where: { locale: 'vi' }
      }
    }
  });

  if (!project) notFound();

  const viTranslation = project.translations[0];

  const initialData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    visibility: project.visibility,
    content: project.content || '',
    githubUrl: project.githubUrl || '',
    demoUrl: project.demoUrl || '',
    imageUrl: project.imageUrl || '',
    techStack: project.techStack.map(t => ({ name: t.name })),
    metrics: project.metrics.map(m => ({ key: m.key, value: m.value })),
    viTitle: viTranslation?.title || '',
    viDescription: viTranslation?.description || '',
    viContent: viTranslation?.content || '',
  };

  return <ProjectForm initialData={initialData} />;
}
