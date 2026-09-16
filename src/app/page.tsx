import Hero from '@/components/Hero';
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
    </>
  );
}
