'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { COMPANY, STATS } from '@/lib/constants';

function AnimatedCounter({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count.toLocaleString('en-IN')}{suffix}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-[90vh] flex flex-col justify-center items-center gradient-navy hero-pattern overflow-hidden pt-32 lg:pt-40 pb-20">
      {/* Decorative background glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">
        
        {/* Top Badges */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Play className="w-3 h-3 fill-current" />
            Trusted by 15+ active clients
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-white text-sm font-medium shadow-xl backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Based in Karnataka, India
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] animate-fade-in-up delay-100 drop-shadow-lg mb-8 max-w-4xl">
          Powering Your{' '}
          <span className="gradient-text">Workforce</span>
          {' '}& Events
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200 mb-10">
          {COMPANY.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300 mb-20">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1"
          >
            Explore Services
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1 backdrop-blur-sm"
          >
            Request a Quote
          </Link>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up delay-400">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`glass rounded-2xl p-6 text-center shadow-xl backdrop-blur-md transform transition-transform hover:-translate-y-1 ${
                index === 0 ? 'border-blue-500/30' : 'border-white/10'
              }`}
            >
              <div className="mb-2 text-blue-400 flex justify-center">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-medium text-base">{stat.label}</div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
