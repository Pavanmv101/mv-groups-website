'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import TextReveal from '@/components/animations/TextReveal';
import MagneticButton from '@/components/animations/MagneticButton';

function ImageBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full bg-[#0c0b0a]"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1540039155732-d68b54f5f8b4?auto=format&fit=crop&q=80&w=2560')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Very slow zoom effect
        animation: 'zoomIn 30s linear infinite alternate',
      }}
    >
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

const STATS = [
  { value: '100+', label: 'EVENTS POWERED' },
  { value: '250+', label: 'STAFF DEPLOYED' },
  { value: '15+',  label: 'ACTIVE CLIENTS'  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Image background ── */}
      <ImageBackground />

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-premium-grid"
        style={{ backgroundColor: 'rgba(0,0,0,0.58)' }}
      />

      {/* ── Fine grain noise texture overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-24 pb-12">

        {/* Badge pills */}
        <Reveal delay={0}>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90"
              style={{
                background: 'rgba(18,17,16,0.85)',
                border: '1px solid rgba(243,200,146,0.35)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ color: '#f3c892' }}>✦</span>
              Reliable Events. Reliable Staff.
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80"
              style={{
                background: 'rgba(18,17,16,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block shrink-0" />
              Est. 2024 · Growing Fast
            </span>
          </div>
        </Reveal>

        {/* ── Logo treatment ── */}
        <Reveal delay={0.15}>
          <div className="mb-4">
          <div
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(72px, 16vw, 128px)',
              color: '#f3c892',
              textShadow: '0 0 60px rgba(243,200,146,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            MV
          </div>
          <div
            className="font-black text-white mt-0 tracking-[0.22em]"
            style={{ fontSize: 'clamp(18px, 4vw, 28px)', letterSpacing: '0.22em' }}
          >
            GROUPS
          </div>
          </div>
        </Reveal>

        {/* ── Tagline ── */}
        <Reveal delay={0.3}>
          <p
            className="font-bold text-white mb-4"
            style={{ fontSize: 'clamp(15px, 2.5vw, 22px)' }}
          >
            The Human Element of Extraordinary Events.
          </p>
        </Reveal>

        {/* ── Description ── */}
        <Reveal delay={0.45}>
          <p
            className="leading-relaxed mb-10 max-w-xl"
            style={{ color: '#c8c3be', fontSize: '15px' }}
          >
            We don't just fill roles; we curate the professional faces that bring your vision to life. Elite hospitality, brand ambassadors, and seamless event talent across Karnataka.
          </p>
        </Reveal>

        {/* ── CTA buttons ── */}
        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 mb-14 justify-center w-full">
            <MagneticButton>
              <Link href="/booking" className="btn-gold text-sm px-7 py-3.5">
                Curate Your Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact" className="btn-outline text-sm px-7 py-3.5">
                Request a Consultation
              </Link>
            </MagneticButton>
          </div>
        </Reveal>

        {/* ── Stats row ── */}
        <Reveal delay={0.75}>
          <div
            className="flex flex-col sm:flex-row items-center gap-0"
            style={{
              background: 'rgba(12,11,10,0.7)',
              border: '1px solid rgba(42,42,42,0.8)',
              borderRadius: '9999px',
              backdropFilter: 'blur(12px)',
              padding: '0.75rem 2rem',
            }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-6 py-1">
                  <span
                    className="font-black leading-none"
                    style={{ color: '#f3c892', fontSize: '1.5rem' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-widest mt-0.5"
                    style={{ color: '#a39e98', letterSpacing: '0.1em' }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="w-px self-stretch"
                    style={{ background: '#282624' }}
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── Scroll indicator ── */}
      <Reveal delay={1}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#66625d' }}>
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, #282624, transparent)',
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
