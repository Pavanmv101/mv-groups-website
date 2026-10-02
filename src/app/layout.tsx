import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieConsent from '@/components/CookieConsent';
import GoldCursor from '@/components/GoldCursor';
import { Analytics } from '@vercel/analytics/react';
import PageTransition from '@/components/animations/PageTransition';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mvgroups.online'),
  title: {
    default: 'MV Groups | End-to-End Event Management & Premium Staffing',
    template: '%s | MV Groups',
  },
  description:
    'MV Groups provides complete end-to-end event management, premium staffing, and production services across Karnataka. From corporate conferences to luxury weddings, we bring your vision to life.',
  keywords: [
    'event management bangalore',
    'end to end event management',
    'corporate event planners karnataka',
    'wedding planners',
    'event staffing agency bangalore',
    'event production',
    'manpower staffing',
    'brand promoters karnataka',
    'Karnataka',
    'India',
  ],
  authors: [{ name: 'Pavan MV' }],
  openGraph: {
    title: 'MV Groups | End-to-End Event Management & Premium Staffing',
    description:
      'MV Groups provides complete end-to-end event management, premium staffing, and production services across Karnataka. We bring your vision to life.',
    url: 'https://mvgroups.online',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MV Groups',
    images: [
      {
        url: 'https://mvgroups.online/logo.png',
        width: 800,
        height: 600,
        alt: 'MV Groups Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MV Groups | Event Management & Staffing',
    description: 'Complete end-to-end event management and premium staffing across Karnataka.',
    images: ['https://mvgroups.online/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
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
    image: 'https://mvgroups.online/logo.png',
    url: 'https://mvgroups.online',
    description: 'Premier manpower supply and software/tech events company delivering reliable staffing solutions and world-class event management across Karnataka.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    telephone: '+919380558344',
    email: 'mvgroups2026@gmail.com',
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
        <SmoothScrollProvider>
          <GoldCursor />
          <Navbar />
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
