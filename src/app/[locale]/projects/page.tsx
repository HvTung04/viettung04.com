import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectListHero from '@/components/ProjectListHero';
import ProjectFilter from '@/components/ProjectFilter';
import ProjectGrid from '@/components/ProjectGrid';
import ProjectImpactMetrics from '@/components/ProjectImpactMetrics';
import ProjectCta from '@/components/ProjectCta';
import prisma from '@/lib/db';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects | AI Engineer Portfolio',
    description: 'A collection of production-grade AI systems spanning Computer Vision, NLP, and Distributed Data Engineering. Focused on high-impact AI solutions.',
    keywords: ['AI Projects', 'Computer Vision', 'NLP', 'Machine Learning', 'Data Engineering', 'Case Studies'],
  };
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE', visibility: 'PUBLIC' },
    orderBy: { createdAt: 'desc' },
    include: { techStack: true, metrics: true }
  });

  return (
    <>
      <Navbar />
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full flex-1">
        <ProjectListHero />
        <ProjectFilter />
        <ProjectGrid projects={projects} />
        <ProjectImpactMetrics />
        <ProjectCta />
      </main>
      <Footer />
    </>
  );
}
