import { Metadata } from 'next';
import prisma from '@/lib/db';
import EditTestimonialForm from './EditTestimonialForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Testimonial | Admin',
};

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <main className="p-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold uppercase tracking-widest mb-2">
              Edit Testimonial
            </h1>
            <p className="text-on-dark-muted text-sm">
              Update client success story
            </p>
          </div>

          <EditTestimonialForm testimonial={testimonial} />
        </main>
  );
}
