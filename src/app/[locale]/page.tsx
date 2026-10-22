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
import NeuralGraphSection from '@/components/neural-graph/NeuralGraphSection';
import prisma from '@/lib/db';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, siteJsonLd, type SiteLocale } from '@/lib/seo';


export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    title: 'Hoang Viet Tung — AI Engineer | Machine Learning & LLM',
    description:
      'Hoang Viet Tung is a senior AI engineer specializing in production-ready machine learning, LLM systems, computer vision, and scalable data pipelines. Available for complex AI implementation projects.',
  });
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE', visibility: 'PUBLIC' },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { techStack: true, metrics: true }
  });

  const siteLocale = (locale === 'en' ? 'en' : 'vi') as SiteLocale;

  const jsonLd = siteJsonLd(siteLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <NeuralGraphSection locale={locale} />
        <Metrics locale={locale} />
        <Projects projects={projects} />
        <Testimonials />
        <ClientLogos />
        <TechStack locale={locale} />
        <Services locale={locale} />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
