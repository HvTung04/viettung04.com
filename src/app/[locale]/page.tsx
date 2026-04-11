import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Services from '@/components/Services';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

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
      <TechStack />
      <Services />
      <Cta />
      <Footer />
    </>
  );
}
