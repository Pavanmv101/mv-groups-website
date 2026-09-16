'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import GSAPCounter from '@/components/animations/GSAPCounter';
import GSAPMagnetic from '@/components/animations/GSAPMagnetic';

const STATS = [
  { num: 1500, suffix: '+', label: 'EVENTS STAFFED' },
  { num: 50, suffix: '+', label: 'TRUSTED CLIENTS' },
  { num: 100, suffix: '%', label: 'RELIABILITY' },
];

export default function StaffingHero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background Video */}
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/concert.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#0c0b0a]" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-premium-grid" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }} />

      {/* Hero content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-24 pb-12">
        
        <Reveal delay={0}>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white/90" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(243,200,146,0.35)', backdropFilter: 'blur(10px)' }}>
              <span style={{ color: '#f3c892' }}>✦</span>
              Karnataka&apos;s Most Reliable Event Crew
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            The Backbone of <br />
            <span style={{ color: '#f3c892' }}>Extraordinary Events</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-lg md:text-xl text-[#c8c3be] mb-10 max-w-2xl leading-relaxed">
            We don&apos;t just fill roles; we supply the professional faces that bring your vision to life. Elite hospitality, VIP security, brand ambassadors, and seamless event talent.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="flex flex-col sm:flex-row gap-4 mb-14 justify-center w-full">
            <GSAPMagnetic strength={0.35}>
              <Link href="/booking" className="btn-gold text-sm px-7 py-3.5 flex items-center justify-center gap-2">
                Hire Event Staff
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GSAPMagnetic>
            <GSAPMagnetic strength={0.35}>
              <Link href="/services" className="btn-outline text-sm px-7 py-3.5 flex items-center justify-center gap-2">
                View All Roles
              </Link>
            </GSAPMagnetic>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center gap-0" style={{ background: 'rgba(12,11,10,0.7)', border: '1px solid rgba(42,42,42,0.8)', borderRadius: '9999px', backdropFilter: 'blur(12px)', padding: '0.75rem 2rem' }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-6 py-1">
                  <GSAPCounter value={stat.num} suffix={stat.suffix} duration={2.2} className="font-black leading-none" style={{ color: '#f3c892', fontSize: '36px' } as React.CSSProperties} />
                  <span className="text-[11px] font-semibold tracking-widest mt-1" style={{ color: '#a39e98', letterSpacing: '0.1em' }}>{stat.label}</span>
                </div>
                {i < STATS.length - 1 && <div className="w-[1px] h-12 bg-[#2a2a2a]" />}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
