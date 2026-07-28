import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ClientLogos from '@/components/ClientLogos';
import HowItWorks from '@/components/HowItWorks';
import ServicesOverview from '@/components/ServicesOverview';
import AnyRoleSection from '@/components/AnyRoleSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import JoinCrewSection from '@/components/JoinCrewSection';

import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import SideNav from '@/components/SideNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://mvgroups.online',
  },
};

export default function HomePage() {
  return (
    <>
      <SideNav />
      <Hero />
      <Marquee />
      <ClientLogos />
      <HowItWorks />
      <ServicesOverview />
      <AnyRoleSection />
      <WhyChooseUs />
      <JoinCrewSection />
      {/* <Testimonials /> */}
      <FAQSection />
      <CTASection />
    </>
  );
}
