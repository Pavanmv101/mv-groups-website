import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import InstagramSection from '@/components/InstagramSection';
import LiveInquiryCounter from '@/components/LiveInquiryCounter';
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
      <Suspense fallback={null}>
        <LiveInquiryCounter />
      </Suspense>
      <Testimonials />
      <InstagramSection />
    </>
  );
}
