import StaffingHero from '@/components/StaffingHero';
import Marquee from '@/components/Marquee';
import ClientLogos from '@/components/ClientLogos';
import HowItWorks from '@/components/HowItWorks';
import ServicesOverview from '@/components/ServicesOverview';
import AnyRoleSection from '@/components/AnyRoleSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import VettingProcess from '@/components/VettingProcess';
import JoinCrewSection from '@/components/JoinCrewSection';
import BrochureDownload from '@/components/BrochureDownload';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import SideNav from '@/components/SideNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Staffing & Manpower | MV Groups',
  description: 'Karnataka\'s most reliable event crew. We supply vetted VIP hospitality, security, brand promoters, and logistics staff for extraordinary events.',
  alternates: {
    canonical: 'https://mvgroups.online/staffing',
  },
};

export default function StaffingPage() {
  return (
    <>
      <SideNav />
      <StaffingHero />
      <Marquee />
      <ClientLogos />
      <HowItWorks />
      <ServicesOverview />
      <AnyRoleSection />
      <WhyChooseUs />
      <VettingProcess />
      <JoinCrewSection />
      <BrochureDownload />
      <FAQSection />
      <CTASection />
    </>
  );
}
