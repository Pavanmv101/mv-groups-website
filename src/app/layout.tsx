import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MV Groups (Bangalore Best) — Manpower Staffing & Tech Event Solutions',
    template: '%s | MV Groups',
  },
  description:
    'MV Groups is a premier manpower supply and software/tech events company based in Bengaluru, Karnataka. We provide reliable staffing solutions and world-class event management across Karnataka.',
  keywords: [
    'manpower staffing',
    'tech events',
    'event management',
    'staffing solutions',
    'Tumakuru',
    'Karnataka',
    'India',
    'software events',
    'hackathon management',
    'workforce solutions',
  ],
  authors: [{ name: 'MV Groups' }],
  openGraph: {
    title: 'MV Groups (Bangalore Best) — Manpower Staffing & Tech Event Solutions',
    description:
      'Premier manpower supply and software/tech events company delivering reliable staffing solutions and world-class event management across Karnataka.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MV Groups',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MV Groups',
    image: 'https://mvgroups.vercel.app/logo.png', // Replace with real URL
    description: 'Premier manpower supply and software/tech events company delivering reliable staffing solutions and world-class event management across Karnataka.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    telephone: '+91 98765 43210',
    url: 'https://mvgroups.vercel.app'
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
