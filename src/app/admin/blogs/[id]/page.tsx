import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import BlogForm from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { id: resolvedParams.id },
    include: { translations: true },
  });

  if (!blog) {
    notFound();
  }

  return <BlogForm initialData={blog} />;
}
