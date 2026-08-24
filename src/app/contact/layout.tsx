import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with MV Groups',
  description: 'Reach out to MV Groups for event staffing inquiries, partnerships, or questions. Based in Bengaluru, Karnataka — we respond within 24 hours.',
  alternates: {
    canonical: 'https://mvgroups.online/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
