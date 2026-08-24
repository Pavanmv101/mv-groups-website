import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Join the MV Groups Team',
  description: 'Looking for event staffing jobs in Karnataka? Join MV Groups as an event host, brand ambassador, usher, or logistics crew member. Apply now!',
  alternates: {
    canonical: 'https://mvgroups.online/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
