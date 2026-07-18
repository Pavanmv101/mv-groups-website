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
  metadataBase: new URL('https://mvgroups.online'),
  title: {
    default: 'MV Groups | Premier Event Staffing & Manpower Solutions in Bangalore',
    template: '%s | MV Groups',
  },
  description:
    'MV Groups is a leading manpower supply and corporate event staffing agency in Karnataka. We provide reliable staffing solutions, brand promoters, and world-class event management.',
  keywords: [
    'event staffing agency bangalore',
    'manpower staffing',
    'corporate manpower supply',
    'tech events',
    'event management',
    'brand promoters karnataka',
    'staffing solutions',
    'Tumakuru',
    'Karnataka',
    'India',
    'software events',
    'hackathon management',
    'workforce solutions',
  ],
  authors: [{ name: 'Pavan MV' }],
  openGraph: {
    title: 'MV Groups | Premier Event Staffing & Manpower Solutions',
    description:
      'MV Groups is a leading manpower supply and corporate event staffing agency in Karnataka, providing reliable staffing solutions and event management.',
    url: 'https://mvgroups.online',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MV Groups',
    images: [
      {
        url: 'https://mvgroups.online/logo.jpg',
        width: 800,
        height: 600,
        alt: 'MV Groups Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MV Groups | Event Staffing & Manpower Solutions',
    description: 'Premier manpower supply and corporate event staffing agency in Karnataka.',
    images: ['https://mvgroups.online/logo.jpg'],
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
    image: 'https://mvgroups.online/logo.jpg',
    url: 'https://mvgroups.online',
    description: 'Premier manpower supply and software/tech events company delivering reliable staffing solutions and world-class event management across Karnataka.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    telephone: '+91 98765 43210',
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
