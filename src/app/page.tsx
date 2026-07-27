import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ClientLogos from '@/components/ClientLogos';
import ServicesOverview from '@/components/ServicesOverview';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://mvgroups.online',
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ClientLogos />
      <ServicesOverview />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
