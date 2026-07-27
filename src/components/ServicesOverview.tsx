'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Heart, Briefcase, Store, Megaphone, Truck,
  GraduationCap, Zap, UtensilsCrossed, Music,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'weddings',
    label: 'WEDDINGS',
    icon: Heart,
    title: 'Weddings',
    desc: 'Venue setup, guest management, hospitality & coordination teams',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a1a1a 100%)',
  },
  {
    id: 'corporate',
    label: 'CORPORATE',
    icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Conference support, registration, tech crew & brand ambassadors',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a1a2a 100%)',
  },
  {
    id: 'exhibition',
    label: 'EXHIBITION',
    icon: Store,
    title: 'Exhibition Staffing',
    desc: 'Booth assistants, lead generation, product presenters',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a2a1a 100%)',
  },
  {
    id: 'brand',
    label: 'BRAND',
    icon: Megaphone,
    title: 'Promotional Staffing',
    desc: 'Brand promoters, road show activation, sampling staff',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a1a2a 100%)',
  },
  {
    id: 'logistics',
    label: 'LOGISTICS',
    icon: Truck,
    title: 'Event Setup & Logistics',
    desc: 'Loading crew, stage setup, barricading, transport',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a2a1a 100%)',
  },
  {
    id: 'college',
    label: 'COLLEGE FESTS',
    icon: GraduationCap,
    title: 'College Fests',
    desc: 'Volunteer pools, registration desks, floor managers',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a2a2a 100%)',
  },
  {
    id: 'brand-launches',
    label: 'BRAND LAUNCHES',
    icon: Zap,
    title: 'Brand Launches',
    desc: 'Activation crew, brand ambassadors, launch-day hosts',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a1a1a 100%)',
  },
  {
    id: 'hospitality',
    label: 'HOSPITALITY',
    icon: UtensilsCrossed,
    title: 'Hospitality',
    desc: 'Servers, hosts, bartenders, guest service',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a1a2a 100%)',
  },
  {
    id: 'production',
    label: 'PRODUCTION',
    icon: Music,
    title: 'Production & Backstage',
    desc: 'Stage hands, runners, comms, quick-change choreography',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a2a1a 100%)',
  },
];

export default function ServicesOverview() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#141312' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div>
            <p className="section-label">● WHAT WE DO</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Our{' '}
              <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                Services
              </em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed lg:text-right" style={{ color: '#a39e98' }}>
            Professional staffing across all event categories — from intimate weddings to massive corporate events.
          </p>
        </div>

        {/* 3×3 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 60}ms`,
                  height: '260px',
                  background: svc.bg,
                  border: '1px solid #282624',
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'rgba(243,200,146,0.06)' }}
                />

                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
                />

                {/* Category label + icon — top left */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(243,200,146,0.15)', border: '1px solid rgba(243,200,146,0.3)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: '#f3c892' }} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-[0.12em]"
                    style={{ color: '#f3c892' }}
                  >
                    {svc.label}
                  </span>
                </div>

                {/* Content — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:translate-y-0 translate-y-0 transition-transform">
                    {svc.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {svc.desc}
                  </p>
                  <Link
                    href={`/booking?service=${svc.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#f3c892' }}
                  >
                    Request a Quote →
                  </Link>
                </div>

                {/* Scale on hover */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ zIndex: -1 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
