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
import { setRequestLocale } from 'next-intl/server';


export const dynamic = 'force-dynamic';

const SITE_URL = 'https://viettung04.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Hoang Viet Tung — AI Engineer | Machine Learning, LLM & Computer Vision',
    description:
      'Hoang Viet Tung is a senior AI engineer specializing in production-ready machine learning, LLM systems, computer vision, and scalable data pipelines. Available for complex AI implementation projects.',
    keywords: [
      'Hoang Viet Tung',
      'Viet Tung Hoang',
      'AI Engineer',
      'Machine Learning Engineer',
      'Computer Vision',
      'NLP',
      'LLM',
      'Data Engineering',
      'Vietnam AI Engineer',
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        vi: `${SITE_URL}/vi`,
      },
    },
    openGraph: {
      title: 'Hoang Viet Tung — AI Engineer | Machine Learning, LLM & Computer Vision',
      description:
        'Senior AI engineer building production-ready machine learning systems, LLM applications, and computer vision solutions.',
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Hoang Viet Tung',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hoang Viet Tung — AI Engineer',
      description:
        'Senior AI engineer building production-ready machine learning systems, LLM applications, and computer vision solutions.',
    },
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hoang Viet Tung',
    alternateName: 'Viet Tung Hoang',
    url: `${SITE_URL}/${locale}`,
    jobTitle: 'AI Engineer',
    description:
      'Senior AI engineer specializing in production-ready machine learning, LLM systems, computer vision, and scalable data pipelines.',
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'LLM',
      'Computer Vision',
      'Natural Language Processing',
      'Data Engineering',
      'Python',
      'PyTorch',
      'TensorFlow',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Metrics />
      <Projects projects={projects} />
      <Testimonials />
      <ClientLogos />
      <TechStack locale={locale} />
      <Services locale={locale} />
      <Cta />
      <Footer />
    </>
  );
}
