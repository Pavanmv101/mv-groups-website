import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Corporate Staffing & Event Manpower',
  description:
    'Explore MV Groups\' comprehensive staffing solutions, including exhibition staffing, brand promoters, corporate manpower, and VIP hosting across Bangalore and Karnataka.',
  alternates: {
    canonical: 'https://mvgroups.online/services',
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
