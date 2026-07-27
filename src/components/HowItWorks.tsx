'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function HowItWorks() {
  const { ref, visible } = useReveal();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
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
            style={{ fontSize: 'clamp(120px, 18vw, 220px)', color: '#1a1a1a', letterSpacing: '-0.04em' }}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-16 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="section-label">● THE PROCESS</p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              How It{' '}
              <em className="not-italic" style={{ color: '#c9a84c', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                Works
              </em>
            </h2>
            <p className="text-sm pb-1" style={{ color: '#999999' }}>
              Three simple steps from booking to event execution
            </p>
          </div>
          <p className="text-xs tracking-[0.2em] uppercase mt-4" style={{ color: '#555555' }}>
            Tap each step to walk through
          </p>
        </div>

        {/* Step cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.num}
                onClick={() => setActive(isActive ? null : i)}
                className={`text-left rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  visible ? `reveal visible reveal-delay-${i + 1}` : 'opacity-0'
                }`}
                style={{
                  background: '#1a1a1a',
                  border: isActive ? '1.5px solid #c9a84c' : '1.5px solid #2a2a2a',
                  boxShadow: isActive ? '0 0 32px rgba(201,168,76,0.12)' : 'none',
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-5xl font-black leading-none"
                    style={{ color: isActive ? '#c9a84c' : '#2a2a2a' }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="text-2xl transition-transform duration-300"
                    style={{ transform: isActive ? 'rotate(45deg)' : 'none', color: '#555555' }}
                  >
                    +
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                  {i < STEPS.length - 1 && (
                    <span className="ml-2 text-base" style={{ color: '#555555' }}>→</span>
                  )}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: '#999999' }}>
                  {step.short}
                </p>

                {/* Expanded detail */}
                {isActive && (
                  <div className="mt-5 pt-5 border-t" style={{ borderColor: '#2a2a2a' }}>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#cccccc' }}>
                      {step.detail}
                    </p>
                    {step.cta && (
                      <Link
                        href={step.cta}
                        className="inline-flex items-center gap-1.5 text-sm font-bold"
                        style={{ color: '#c9a84c' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Tap to Start Booking
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
