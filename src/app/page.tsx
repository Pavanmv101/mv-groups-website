import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import InstagramSection from '@/components/InstagramSection';
import LiveInquiryCounter from '@/components/LiveInquiryCounter';
import EventsShowcase from '@/components/EventsShowcase';
import StatsSection from '@/components/StatsSection';
import BentoServices from '@/components/BentoServices';
import EventsTimeline from '@/components/EventsTimeline';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MV Groups | End-to-End Event Management & Staffing',
  description: 'MV Groups provides premium event staffing, manpower, and end-to-end event execution across Karnataka.',
  alternates: {
    canonical: 'https://mvgroups.online',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <BentoServices />
      <Suspense fallback={null}>
        <LiveInquiryCounter />
      </Suspense>
      <EventsTimeline />
      <EventsShowcase />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
