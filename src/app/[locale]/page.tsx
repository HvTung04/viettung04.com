import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import ClientLogos from '@/components/ClientLogos';
import TechStack from '@/components/TechStack';
import Services from '@/components/Services';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import prisma from '@/lib/db';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Index');
  return {
    title: t('title'),
    description: 'Senior AI Engineer specializing in production-ready machine learning, neural architectures, and scalable data pipelines. Available for complex AI implementation projects.',
    keywords: ['AI Engineer', 'Machine Learning', 'Computer Vision', 'NLP', 'LLM', 'Data Engineering', 'Portfolio'],
    openGraph: {
      title: t('title'),
      description: 'Senior AI Engineer specializing in production-ready machine learning, neural architectures, and scalable data pipelines.',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE', visibility: 'PUBLIC' },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { techStack: true, metrics: true }
  });

  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <Projects projects={projects} />
      <Testimonials />
      <ClientLogos />
      <TechStack />
      <Services />
      <Cta />
      <Footer />
    </>
  );
}
