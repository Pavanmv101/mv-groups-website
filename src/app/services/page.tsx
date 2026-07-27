'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Calendar,
  Megaphone,
  Store,
  Briefcase,
  HeartHandshake,
  Truck,
  Users,
  GraduationCap,
  ShoppingBag,
  Hotel,
  Rocket,
  Landmark,
  Heart,
  Trophy,
} from 'lucide-react';
import { SERVICES, STATS } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Animated entrance hook                                             */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Industries We Serve — data                                         */
/* ------------------------------------------------------------------ */
const INDUSTRIES = [
  { icon: Building2, label: 'Corporate Companies' },
  { icon: Calendar, label: 'Event Management' },
  { icon: Megaphone, label: 'Marketing Agencies' },
  { icon: Store, label: 'Exhibition Organizers' },
  { icon: HeartHandshake, label: 'Wedding Planners' },
  { icon: GraduationCap, label: 'Colleges & Universities' },
  { icon: ShoppingBag, label: 'Shopping Malls' },
  { icon: Hotel, label: 'Hotels & Convention Centers' },
  { icon: Rocket, label: 'Startups' },
  { icon: Landmark, label: 'Government Events' },
  { icon: Heart, label: 'NGOs' },
  { icon: Trophy, label: 'Sports Events' },
];

/* ------------------------------------------------------------------ */
/*  Service icon map (for the icon prop which is a component)          */
/* ------------------------------------------------------------------ */
const SERVICE_ICON_MAP: Record<string, typeof Users> = {
  event_manpower: Users,
  promotional_staffing: Megaphone,
  exhibition_staffing: Store,
  corporate_staffing: Briefcase,
  wedding_social: HeartHandshake,
  event_logistics: Truck,
};

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default function ServicesPage() {
  return (
    <div style={{ background: '#0c0b0a', minHeight: '100vh' }}>
      {/* ───── Hero Banner ───── */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b" style={{ borderBottomColor: '#1a1918' }}>
        {/* decorative subtle gold blurs */}
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }} />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.03)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-8 animate-fade-in"
            style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
          >
            Our Services
          </span>
          <h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-8 animate-fade-in-up delay-100"
            style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            Comprehensive Staffing &<br />
            <span style={{ color: '#f3c892' }}>Event Solutions</span>
          </h1>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200"
            style={{ color: '#a39e98' }}
          >
            Whether you need a single specialist or a 500‑strong workforce, MV
            Groups delivers tailored manpower supply and end‑to‑end event
            management across Karnataka.
          </p>
        </div>
      </section>

      {/* ───── Service Detail Sections ───── */}
      {SERVICES.map((service, idx) => {
        const isReversed = idx % 2 === 1;
        const Icon = SERVICE_ICON_MAP[service.id] ?? Users;

        return (
          <ServiceDetailSection
            key={service.id}
            service={service}
            Icon={Icon}
            reversed={isReversed}
            index={idx}
          />
        );
      })}

      {/* ───── Industries We Serve ───── */}
      <IndustriesSection />

      {/* ───── Stats Band ───── */}
      <StatsBand />

      {/* ───── CTA ───── */}
      <CTABanner />
    </div>
  );
}

/* ================================================================== */
/*  Service Detail Section                                             */
/* ================================================================== */
interface ServiceDetailProps {
  service: (typeof SERVICES)[number];
  Icon: typeof Users;
  reversed: boolean;
  index: number;
}

function ServiceDetailSection({
  service,
  Icon,
  reversed,
  index,
}: ServiceDetailProps) {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      id={service.id}
      className={`py-20 lg:py-28`}
      style={{ background: index % 2 === 0 ? '#141312' : '#0c0b0a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* ── Visual card ── */}
          <div
            className={`${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <div
              className={`relative rounded-3xl p-10 lg:p-14 overflow-hidden border`}
              style={{ background: '#1a1918', borderColor: '#282624' }}
            >
              {/* Subtle accent glow inside card */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none"
                style={{ background: 'rgba(243,200,146,0.1)' }}
              />

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                style={{ background: 'rgba(243,200,146,0.1)', border: '1px solid rgba(243,200,146,0.2)' }}
              >
                <Icon className="w-10 h-10" style={{ color: '#f3c892' }} />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
                {service.title}
              </h2>

              <p className="text-lg leading-relaxed" style={{ color: '#a39e98' }}>
                {service.description}
              </p>

              {/* Decorative dots */}
              <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-1.5 opacity-30">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#f3c892' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Features list ── */}
          <div
            className={`space-y-8 ${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: '#1a1918', color: '#66625d', border: '1px solid #282624' }}
            >
              Key Capabilities
            </span>

            <ul className="space-y-5">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-4 group">
                  <CheckCircle2
                    className="w-6 h-6 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    style={{ color: '#f3c892' }}
                  />
                  <span className="text-lg leading-snug" style={{ color: '#ffffff' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href={`/services/${service.id}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-colors hover:bg-white/5"
                style={{ border: '1px solid #282624', color: '#ffffff', background: 'transparent' }}
              >
                Learn More
              </Link>
              <Link
                href={`/booking?service=${service.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-lg"
                style={{ background: '#f3c892', color: '#0c0b0a' }}
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Industries Section                                                 */
/* ================================================================== */
function IndustriesSection() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#0c0b0a', borderTop: '1px solid #1a1918' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.15em] uppercase mb-4 block" style={{ color: '#f3c892' }}>Industries</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>Serving Diverse Sectors</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#a39e98' }}>
            Our staffing and event solutions span across major industry verticals. No matter your domain, we have the talent and expertise to deliver.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.label}
                className={`rounded-2xl p-6 text-center group transition-all duration-300 ${
                  visible ? `animate-fade-in-up delay-${Math.min(500, (i + 1) * 50)}` : 'opacity-0'
                }`}
                style={{ background: '#141312', border: '1px solid #282624' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(243,200,146,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#282624'; }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors"
                  style={{ background: 'rgba(243,200,146,0.05)' }}
                >
                  <Icon className="w-6 h-6 transition-colors" style={{ color: '#f3c892' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#ffffff' }}>{ind.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Stats Band                                                         */
/* ================================================================== */
function StatsBand() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-20" style={{ background: '#141312', borderTop: '1px solid #1a1918', borderBottom: '1px solid #1a1918' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              <div className="text-4xl md:text-6xl font-black mb-2" style={{ color: '#f3c892' }}>
                {stat.value.toLocaleString('en-IN')}
                {stat.suffix}
              </div>
              <div className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#66625d' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA Banner                                                         */
/* ================================================================== */
function CTABanner() {
  return (
    <section className="py-24 lg:py-32" style={{ background: '#0c0b0a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight" style={{ color: '#ffffff' }}>
          Ready to Scale Your Team?
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: '#a39e98' }}>
          Tell us what you need and we&apos;ll put together a custom proposal
          within 24 hours. No obligation, no hidden fees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-colors hover:bg-white/5"
            style={{ border: '1px solid #282624', color: '#ffffff', background: 'transparent' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
