import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Event Staff | Request a Quote',
  description: 'Book professional event staff from MV Groups. Get a custom quote for event manpower, brand promoters, ushers, and logistics crew in Karnataka.',
  alternates: {
    canonical: 'https://mvgroups.online/booking',
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
