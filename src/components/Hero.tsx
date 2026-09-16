'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Pre-computed gold particle positions (pure, no Math.random during render) ── */
const PARTICLES = [
  { id: 0, left: '12%', top: '8%', size: 2, duration: 7, delay: 0 },
  { id: 1, left: '28%', top: '22%', size: 3, duration: 9, delay: 1.2 },
  { id: 2, left: '45%', top: '15%', size: 1.5, duration: 6, delay: 0.5 },
  { id: 3, left: '67%', top: '35%', size: 2.5, duration: 8, delay: 2.1 },
  { id: 4, left: '82%', top: '12%', size: 1.8, duration: 5, delay: 3 },
  { id: 5, left: '15%', top: '55%', size: 3.5, duration: 10, delay: 0.8 },
  { id: 6, left: '38%', top: '68%', size: 2, duration: 7.5, delay: 1.5 },
  { id: 7, left: '55%', top: '48%', size: 1.2, duration: 6.5, delay: 2.5 },
  { id: 8, left: '72%', top: '72%', size: 2.8, duration: 9, delay: 0.3 },
  { id: 9, left: '90%', top: '42%', size: 1.6, duration: 5.5, delay: 3.5 },
  { id: 10, left: '8%', top: '82%', size: 2.2, duration: 8, delay: 1.8 },
  { id: 11, left: '52%', top: '88%', size: 3, duration: 7, delay: 2.8 },
  { id: 12, left: '35%', top: '92%', size: 1.4, duration: 6, delay: 0.6 },
  { id: 13, left: '78%', top: '58%', size: 2.6, duration: 8.5, delay: 1 },
  { id: 14, left: '22%', top: '38%', size: 1.8, duration: 7.2, delay: 3.2 },
];

function GoldParticles() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(243,200,146,0.8) 0%, rgba(243,200,146,0) 70%)',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <section className="relative w-full h-[100svh] flex flex-col md:flex-row overflow-hidden bg-[#0a0908]">
      
      {/* ── Animated gold divider line (Desktop) ── */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px z-30 hidden md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#f3c892]/40 to-transparent" />
      </motion.div>

      {/* ── Left Pillar: Event Staffing ── */}
      <motion.div
        className="relative h-1/2 md:h-full flex-shrink-0 flex items-end md:items-center justify-center cursor-pointer overflow-hidden group"
        initial={{ flexBasis: '50%' }}
        animate={{
          flexBasis: hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%',
        }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image — Energetic event crowd */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600)' }}
        />

        {/* Gradient overlay — darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/50 to-transparent" />

        {/* Hover brightening effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hoveredSide === 'right'
              ? 'rgba(10,9,8,0.75)'
              : hoveredSide === 'left'
              ? 'rgba(10,9,8,0.1)'
              : 'rgba(10,9,8,0.3)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 pb-16 md:pb-8 md:p-16 w-full max-w-xl mx-auto">
          <motion.div
            animate={{
              opacity: hoveredSide === 'right' ? 0.2 : 1,
              y: hoveredSide === 'left' ? -8 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon badge */}
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl"
              style={{
                background: 'rgba(12, 11, 10, 0.7)',
                border: '1px solid rgba(243,200,146,0.3)',
                backdropFilter: 'blur(12px)',
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="w-7 h-7" style={{ color: '#f3c892' }} />
            </motion.div>

            {/* Label */}
            <motion.p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#f3c892' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Staffing &amp; Manpower
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Build Your <br />
              <span className="gold-text">Dream Crew</span>
            </motion.h1>

            {/* Description + CTA */}
            <AnimatePresence mode="wait">
              {(!hoveredSide || hoveredSide === 'left') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-sm md:text-base text-[#c8c3be] mb-8 max-w-md leading-relaxed">
                    Vetted VIP hosts, security, brand promoters, and logistics crew — deployed across Karnataka&apos;s biggest events.
                  </p>
                  <Link
                    href="/staffing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    Enter Staffing Portal
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Pillar: Event Management ── */}
      <motion.div
        className="relative h-1/2 md:h-full flex-shrink-0 flex items-end md:items-center justify-center cursor-pointer overflow-hidden group"
        initial={{ flexBasis: '50%' }}
        animate={{
          flexBasis: hoveredSide === 'right' ? '65%' : hoveredSide === 'left' ? '35%' : '50%',
        }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image — Luxury venue */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600)' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/50 to-transparent" />

        {/* Hover brightening effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hoveredSide === 'left'
              ? 'rgba(10,9,8,0.75)'
              : hoveredSide === 'right'
              ? 'rgba(10,9,8,0.1)'
              : 'rgba(10,9,8,0.3)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Gold particles on right side */}
        <GoldParticles />

        {/* Content */}
        <div className="relative z-10 p-8 pb-16 md:pb-8 md:p-16 w-full max-w-xl mx-auto">
          <motion.div
            animate={{
              opacity: hoveredSide === 'left' ? 0.2 : 1,
              y: hoveredSide === 'right' ? -8 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon badge */}
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl"
              style={{
                background: 'rgba(12, 11, 10, 0.7)',
                border: '1px solid rgba(243,200,146,0.3)',
                backdropFilter: 'blur(12px)',
              }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Crown className="w-7 h-7" style={{ color: '#f3c892' }} />
            </motion.div>

            {/* Label */}
            <motion.p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#f3c892' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Full-Service Production
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Craft Your <br />
              <span className="gold-text">Perfect Event</span>
            </motion.h1>

            {/* Description + CTA */}
            <AnimatePresence mode="wait">
              {(!hoveredSide || hoveredSide === 'right') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-sm md:text-base text-[#c8c3be] mb-8 max-w-md leading-relaxed">
                    From concept to flawless execution — we design, produce, and manage premium corporate and social events.
                  </p>
                  <Link
                    href="/management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    Enter Management Portal
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Top Center Logo ── */}
      <motion.div
        className="absolute top-8 left-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -30, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/mv-groups-logo.png"
          alt="MV Groups Logo"
          width={160}
          height={64}
          className="w-28 md:w-40 h-auto object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* ── Bottom center subtle hint ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex items-center gap-2 text-[#66625d] text-xs tracking-widest uppercase">
          <Sparkles className="w-3 h-3" style={{ color: '#f3c892' }} />
          <span>Choose Your Experience</span>
          <Sparkles className="w-3 h-3" style={{ color: '#f3c892' }} />
        </div>
      </motion.div>
    </section>
  );
}
