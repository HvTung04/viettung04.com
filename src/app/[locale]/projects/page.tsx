import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectListHero from '@/components/ProjectListHero';
import ProjectFilter from '@/components/ProjectFilter';
import ProjectGrid from '@/components/ProjectGrid';
import ProjectImpactMetrics from '@/components/ProjectImpactMetrics';
import ProjectCta from '@/components/ProjectCta';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE', visibility: 'PUBLIC' },
    orderBy: { createdAt: 'desc' },
    include: { techStack: true, metrics: true }
  });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12 w-full flex-1">
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
