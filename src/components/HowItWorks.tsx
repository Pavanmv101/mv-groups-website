'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

const STEPS = [
  {
    num: '01',
    title: 'Tell Us',
    short: 'Share your event type, date, location, and the roles you need.',
    detail:
      'Use our simple booking form or drop us a WhatsApp. Tell us what kind of event it is, your expected headcount, the specific roles you need filled, and the date. The more detail, the faster we match.',
    cta: null,
  },
  {
    num: '02',
    title: 'We Match',
    short: 'We match roles and send verified staff profiles within hours.',
    detail:
      'Our internal team reviews your brief and hand-picks staff from our vetted pool. Within hours you receive a proposal with staff profiles, bios, and a transparent cost breakdown — no hidden fees.',
    cta: null,
  },
  {
    num: '03',
    title: 'We Execute',
    short: 'Confirm team — we dispatch with WhatsApp support & live tracking.',
    detail:
      'Once confirmed, our ops team handles dispatch, briefing, and on-ground coordination. You get a dedicated WhatsApp group with your team lead for real-time updates throughout the event.',
    cta: '/booking',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden bg-premium-grid"
      style={{ backgroundColor: '#0c0b0a' }}
    >
      {/* Large faded background numbers */}
      <div
        className="absolute inset-0 flex items-center justify-around pointer-events-none select-none"
        aria-hidden="true"
      >
        {['01', '02', '03'].map((n) => (
          <span
            key={n}
            className="font-black leading-none"
            style={{ fontSize: 'clamp(120px, 18vw, 220px)', color: '#1a1918', letterSpacing: '-0.04em' }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Spotlights */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute left-1/6 top-0 w-1/3 h-full animate-sway" style={{ background: 'linear-gradient(180deg, rgba(243,200,146,0.08) 0%, rgba(243,200,146,0) 80%)', clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)', transformOrigin: 'top center', animationDelay: '0s' }} />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/3 h-full animate-sway" style={{ background: 'linear-gradient(180deg, rgba(243,200,146,0.08) 0%, rgba(243,200,146,0) 80%)', clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)', transformOrigin: 'top center', animationDelay: '1.5s' }} />
        <div className="absolute right-1/6 top-0 w-1/3 h-full animate-sway" style={{ background: 'linear-gradient(180deg, rgba(243,200,146,0.08) 0%, rgba(243,200,146,0) 80%)', clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)', transformOrigin: 'top center', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-16">
            <p className="section-label">● THE PROCESS</p>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                How It{' '}
                <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  Works
                </em>
              </h2>
              <p className="text-sm pb-1" style={{ color: '#a39e98' }}>
                Three simple steps from booking to event execution
              </p>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase mt-4" style={{ color: '#66625d' }}>
              Tap each step to walk through
            </p>
          </div>
        </Reveal>

        {/* Step cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <StaggerItem key={step.num}>
              <button
                onClick={() => setActive(isActive ? null : i)}
                className="text-left rounded-2xl p-8 transition-all duration-300 cursor-pointer w-full"
                style={{
                  background: '#1a1918',
                  border: isActive ? '1.5px solid #f3c892' : '1.5px solid #282624',
                  boxShadow: isActive ? '0 0 32px rgba(243,200,146,0.12)' : 'none',
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-5xl font-black leading-none"
                    style={{ color: isActive ? '#f3c892' : '#282624' }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="text-2xl transition-transform duration-300"
                    style={{ transform: isActive ? 'rotate(45deg)' : 'none', color: '#66625d' }}
                  >
                    +
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                  {i < STEPS.length - 1 && (
                    <span className="ml-2 text-base" style={{ color: '#66625d' }}>→</span>
                  )}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>
                  {step.short}
                </p>

                {/* Expanded detail */}
                {isActive && (
                  <div className="mt-5 pt-5 border-t" style={{ borderColor: '#282624' }}>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#c8c3be' }}>
                      {step.detail}
                    </p>
                    {step.cta && (
                      <Link
                        href={step.cta}
                        className="inline-flex items-center gap-1.5 text-sm font-bold"
                        style={{ color: '#f3c892' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Tap to Start Booking
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
