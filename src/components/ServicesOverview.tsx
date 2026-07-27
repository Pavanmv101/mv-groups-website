'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Heart, Briefcase, Store, Megaphone, Truck,
  GraduationCap, Zap, UtensilsCrossed, Music,
} from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

const SERVICES = [
  {
    id: 'vip-hospitality',
    label: 'HOSPITALITY',
    icon: UtensilsCrossed,
    title: 'VIP Hospitality & Guest Services',
    desc: 'Flawless service for your most important guests. From elite servers to protocol officers and mixologists.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a1a1a 100%)',
    bento: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'brand-ambassadors',
    label: 'BRAND',
    icon: Megaphone,
    title: 'Brand Ambassadors & Activations',
    desc: 'Charismatic product specialists and lead generators who seamlessly adopt and project your brand’s voice.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a1a2a 100%)',
    bento: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'corporate-teams',
    label: 'CORPORATE',
    icon: Briefcase,
    title: 'Corporate & Conference Teams',
    desc: 'Articulate registration teams, multilingual ushers, and dedicated tech-assistants for high-stakes summits.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a2a1a 100%)',
    bento: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'private-events',
    label: 'PRIVATE',
    icon: Heart,
    title: 'Private & Exclusive Gatherings',
    desc: 'Discreet, highly-vetted staff tailored for ultra-exclusive, high-net-worth social events and bespoke weddings.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a1a2a 100%)',
    bento: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'logistics',
    label: 'LOGISTICS',
    icon: Truck,
    title: 'Logistics & Ground Control',
    desc: 'Precision crowd flow management, VIP access control, and rapid deployment setup crews.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #2a2a1a 100%)',
    bento: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'production',
    label: 'PRODUCTION',
    icon: Music,
    title: 'Behind-the-Scenes Production',
    desc: 'The invisible engine of your event. Stage managers, green-room coordinators, and technical runners.',
    bg: 'linear-gradient(135deg, #1a1918 0%, #1a1a2a 100%)',
    bento: 'md:col-span-4 md:row-span-1'
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32" style={{ background: '#141312' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
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
        </Reveal>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 auto-rows-[160px] gap-4">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <StaggerItem key={svc.id} className={svc.bento}>
                <div
                  className="group relative rounded-3xl overflow-hidden cursor-pointer h-full w-full flex flex-col justify-end p-6 md:p-8"
                  style={{
                    background: svc.bg,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at center, rgba(243,200,146,0.15) 0%, transparent 70%)' }}
                />

                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}
                />

                {/* Top left Icon & Label */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{ background: 'rgba(243,200,146,0.1)', border: '1px solid rgba(243,200,146,0.2)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#f3c892' }} />
                  </div>
                  <span
                    className="text-[11px] font-black tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {svc.label}
                  </span>
                </div>

                {/* Content Area */}
                <div className="relative z-10 w-full transform group-hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed max-w-[90%]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {svc.desc}
                  </p>
                  
                  {/* Arrow CTA that fades in/slides up on hover */}
                  <Link
                    href={`/booking?service=${svc.id}`}
                    className="absolute right-0 bottom-2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
                    aria-label={`Book ${svc.title}`}
                  >
                    <span className="text-lg leading-none">↗</span>
                  </Link>
                </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
