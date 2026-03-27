import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Services from '@/components/Services';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <Projects />
      <TechStack />
      <Services />
      <Cta />
      <Footer />
    </>
  );
}
