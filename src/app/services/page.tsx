'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Megaphone,
  Store,
  Briefcase,
  HeartHandshake,
  Truck,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

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
/*  Service images & icons                                            */
/* ------------------------------------------------------------------ */
const SERVICE_IMAGES: Record<string, string> = {
  event_manpower: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
  promotional_staffing: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1000&auto=format&fit=crop',
  exhibition_staffing: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1000&auto=format&fit=crop',
  corporate_staffing: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop',
  wedding_social: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
  event_logistics: 'https://images.unsplash.com/photo-1586528116311-ad8ed7e50def?q=80&w=1000&auto=format&fit=crop',
};

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

      {/* ───── Service Detail Sections (Sticky Scrolling) ───── */}
      <div className="relative">
        {SERVICES.map((service, idx) => {
          const isReversed = idx % 2 === 1;
          const Icon = SERVICE_ICON_MAP[service.id] ?? Users;
          const bgImage = SERVICE_IMAGES[service.id];

          return (
            <ServiceDetailSection
              key={service.id}
              service={service}
              Icon={Icon}
              reversed={isReversed}
              index={idx}
              bgImage={bgImage}
            />
          );
        })}
      </div>
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
  bgImage?: string;
}

function ServiceDetailSection({
  service,
  Icon,
  reversed,
  index,
  bgImage,
}: ServiceDetailProps) {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      id={service.id}
      className={`relative py-20 lg:py-32`}
      style={{ background: index % 2 === 0 ? '#141312' : '#0c0b0a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-start ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* ── Left Side: Sticky Visual Card ── */}
          <div
            className={`lg:col-span-6 lg:sticky lg:top-32 ${visible ? 'animate-fade-in-up' : 'opacity-0'} ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div
              className={`group relative rounded-[2rem] p-8 lg:p-14 overflow-hidden border transition-all duration-700 hover:border-[#f3c892]/30 hover:shadow-[0_0_40px_rgba(243,200,146,0.1)]`}
              style={{ background: '#1a1918', borderColor: '#282624' }}
            >
              {/* Background Image with Zoom on Hover */}
              {bgImage && (
                <div 
                  className="absolute inset-0 z-0 opacity-40 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              
              {/* Gradient Overlays for Text Readability */}
              <div className="absolute inset-0 z-0 bg-[#1a1918]/50" />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#1a1918] via-[#1a1918]/80 to-transparent" />
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1a1918] via-[#1a1918]/50 to-transparent" />

              <div className="relative z-10">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
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
              </div>
            </div>
          </div>

          {/* ── Right Side: Features List ── */}
          <div
            className={`lg:col-span-6 lg:pt-10 space-y-10 ${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'} ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div>
              <span
                className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
                style={{ background: '#1a1918', color: '#66625d', border: '1px solid #282624' }}
              >
                Key Capabilities
              </span>

              <ul className="space-y-6">
                {service.features.map((feature, fIdx) => (
                  <li 
                    key={fIdx} 
                    className="flex items-start gap-4 group p-4 rounded-2xl transition-all duration-300 hover:bg-[#1a1918]"
                    style={{ border: '1px solid transparent' }}
                  >
                    <CheckCircle2
                      className="w-6 h-6 shrink-0 mt-0.5 transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                      style={{ color: '#f3c892' }}
                    />
                    <span className="text-lg leading-snug transition-colors duration-300 group-hover:text-[#f3c892]" style={{ color: '#ffffff' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t" style={{ borderColor: '#282624' }}>
              <Link
                href={`/services/${service.id}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-white hover:text-black group"
                style={{ border: '1px solid #282624', color: '#ffffff', background: 'transparent' }}
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
              <Link
                href={`/booking?service=${service.id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f3c892, #d4aa73)', color: '#0c0b0a' }}
              >
                Book Your Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
