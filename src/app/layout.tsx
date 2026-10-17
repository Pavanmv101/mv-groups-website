import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatWidget from '@/components/ChatWidget';
import CookieConsent from '@/components/CookieConsent';
import GoldCursor from '@/components/GoldCursor';
import { Analytics } from '@vercel/analytics/react';
import PageTransition from '@/components/animations/PageTransition';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import SplashScreen from '@/components/SplashScreen';

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
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://mvgroups.online/#organization',
        name: 'MV Groups',
        url: 'https://mvgroups.online',
        logo: 'https://mvgroups.online/logo.png',
        description:
          'MV Groups is a premium end-to-end event management and staffing agency based in Bengaluru, Karnataka. We deliver complete event solutions — from venue planning and stage production to on-ground staffing and execution — for corporate conferences, exhibitions, weddings, and more.',
        foundingDate: '2024',
        telephone: '+919380558344',
        email: 'mvgroups2026@gmail.com',
        sameAs: ['https://www.instagram.com/mvgroups.online/'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        areaServed: ['Karnataka', 'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'India'],
        serviceType: [
          'End-to-End Event Management',
          'Event Staffing',
          'Corporate Event Staffing',
          'Exhibition Manpower',
          'Wedding Event Management',
          'Brand Promoters',
          'Event Manpower Supply',
          'Stage Production',
          'Venue Planning',
          'On-Ground Execution',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mvgroups.online/#website',
        url: 'https://mvgroups.online',
        name: 'MV Groups',
        publisher: { '@id': 'https://mvgroups.online/#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://mvgroups.online/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does MV Groups do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MV Groups is a Bengaluru-based end-to-end event management and staffing agency. We handle everything from venue planning, stage design, decor, vendor management, and on-ground execution to supplying trained event staff like hosts, ushers, brand promoters, and floor managers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which cities does MV Groups operate in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MV Groups operates across Karnataka including Bengaluru, Mysuru, Mangaluru, Hubli-Dharwad, Belagavi, and Tumakuru. We have also delivered events at major venues like BIEC and KTPO in Bengaluru.',
            },
          },
          {
            '@type': 'Question',
            name: 'How quickly can MV Groups arrange event staff in Bangalore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For events in Bengaluru, we can confirm staff deployment within 6 to 12 hours of receiving your requirements. For pan-Karnataka events, deployment is typically confirmed within 24 to 48 hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'What types of events has MV Groups worked on?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MV Groups has provided staffing and event support for Google I/O Connect 2025, JPMorgan Chase Technology Innovation Forum 2026, Proficorn 2025 and 2026, BOSS Summit 2025, SecurEyes 20th Anniversary, Europraktik 2026, AgriTech India at KTPO, and multiple ServiceNow office events, among others.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does MV Groups handle both event management and staffing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. MV Groups has two service pillars: full end-to-end event management covering planning, production, decor, vendors, and execution; and a dedicated staffing division supplying vetted hosts, ushers, brand promoters, coordinators, security, and logistics crew.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can MV Groups staff events at BIEC or KTPO Bangalore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We regularly supply trained event manpower for trade shows, expos, and conferences at BIEC (Bangalore International Exhibition Centre) and KTPO (Karnataka Trade Promotion Organisation, Whitefield). Our staff are familiar with these venues and their operational requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get a quote from MV Groups?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can get a quote by filling the booking form at mvgroups.online/booking, chatting with our AI assistant Mira on the website, or WhatsApp us directly at +91 93805 58344. We typically respond with a custom quote within 4 hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes MV Groups different from other event staffing agencies in Bangalore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MV Groups combines premium event management with a trained staffing force under one roof. We have worked on flagship events like Google I/O and JPMorgan forums, offer rapid deployment within 6-12 hours in Bengaluru, and provide end-to-end accountability from planning to on-ground execution.',
            },
          },
        ],
      },
    ],
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
        <SplashScreen />
        <SmoothScrollProvider>
          <GoldCursor />
          <Navbar />
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
          <CookieConsent />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
