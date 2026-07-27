'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ── Video clip list — add your .mp4 files to /public/videos/ ──
const VIDEO_CLIPS = [
  '/videos/clip1.mp4',
  '/videos/clip2.mp4',
  '/videos/clip3.mp4',
];

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentClip, setCurrentClip] = useState(0);
  const [fade, setFade] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Crossfade between clips every 8 seconds
  useEffect(() => {
    if (videoError) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentClip((prev) => (prev + 1) % VIDEO_CLIPS.length);
        setFade(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, [videoError]);

  if (videoError) {
    // Fallback: dark gradient with subtle noise texture
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #111111 40%, #0d0d0d 70%, #0a0a0a 100%)',
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      key={currentClip}
      className="hero-video"
      src={VIDEO_CLIPS[currentClip]}
      autoPlay
      muted
      loop
      playsInline
      style={{ opacity: fade ? 1 : 0 }}
      onError={() => setVideoError(true)}
    />
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
      {/* ── Video / fallback background ── */}
      <VideoBackground />

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.58)' }}
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
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 animate-fade-in">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90"
            style={{
              background: 'rgba(20,20,20,0.85)',
              border: '1px solid rgba(201,168,76,0.35)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ color: '#c9a84c' }}>✦</span>
            Reliable Events. Reliable Staff.
          </span>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80"
            style={{
              background: 'rgba(20,20,20,0.85)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block shrink-0" />
            Est. 2024 · Growing Fast
          </span>
        </div>

        {/* ── Logo treatment ── */}
        <div className="mb-4 animate-fade-in-up delay-100">
          <div
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(72px, 16vw, 128px)',
              color: '#c9a84c',
              textShadow: '0 0 60px rgba(201,168,76,0.3)',
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

        {/* ── Tagline ── */}
        <p
          className="font-bold text-white mb-4 animate-fade-in-up delay-200"
          style={{ fontSize: 'clamp(15px, 2.5vw, 22px)' }}
        >
          Event Staffing &amp; Manpower Services across Karnataka
        </p>

        {/* ── Description ── */}
        <p
          className="leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-300"
          style={{ color: '#cccccc', fontSize: '15px' }}
        >
          MV Groups provides professional event staffing and manpower solutions for corporate events,
          weddings, exhibitions, college fests, and brand activations across Karnataka.
        </p>

        {/* ── CTA buttons ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in-up delay-400">
          <Link href="/booking" className="btn-gold text-sm px-7 py-3.5">
            Book Event Staff
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="btn-outline text-sm px-7 py-3.5">
            Request a Quote
          </Link>
        </div>

        {/* ── Stats row ── */}
        <div
          className="flex flex-col sm:flex-row items-center gap-0 animate-fade-in-up delay-500"
          style={{
            background: 'rgba(10,10,10,0.7)',
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
                  style={{ color: '#c9a84c', fontSize: '1.5rem' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs font-semibold tracking-widest mt-0.5"
                  style={{ color: '#999999', letterSpacing: '0.1em' }}
                >
                  {stat.label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <div
                  className="w-px self-stretch"
                  style={{ background: '#2a2a2a' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-fade-in delay-700"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#555555' }}>
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: 'linear-gradient(to bottom, #2a2a2a, transparent)',
          }}
        />
      </div>
    </section>
  );
}
