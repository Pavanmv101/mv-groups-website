import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore MV Groups\' comprehensive staffing and event management services — manpower staffing, tech staffing, event management, and software/tech event solutions across Karnataka.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
