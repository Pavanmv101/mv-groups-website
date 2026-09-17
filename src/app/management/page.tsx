'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, LayoutTemplate, Palette, CheckCircle2, Calendar, Users, Mic2, Camera, Speaker, UtensilsCrossed, MapPin, Star, ChevronDown, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MagneticWrapper from '@/components/animations/GSAPMagnetic';

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const TYPEWRITER_LINES = [
  "We Don\u2019t Just Plan Events.",
  "We Engineer Experiences.",
  "We Craft Unforgettable Moments.",
];

const EVENT_TYPES = [
  { title: 'Corporate Summits', desc: 'Conferences, product launches, annual meets, and leadership retreats executed with military precision.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=1200', icon: Calendar },
  { title: 'Award Ceremonies', desc: 'Red carpet arrivals, stage production, scripting, live coordination, and cinematic stage design.', image: 'https://images.unsplash.com/photo-1505236858219-8373dd707522?auto=format&fit=crop&q=80&w=800&h=1200', icon: Star },
  { title: 'Private Celebrations', desc: 'Luxury weddings, milestone birthdays, and receptions designed with breathtaking attention to detail.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=1200', icon: Sparkles },
  { title: 'Brand Activations', desc: 'Experiential marketing, pop-up experiences, and immersive brand environments that captivate audiences.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=1200', icon: Mic2 },
  { title: 'Exhibition Setups', desc: 'Booth design, logistics coordination, and professional on-ground exhibition staffing.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800&h=1200', icon: MapPin },
  { title: 'Social Gatherings', desc: 'Cocktail parties, galas, networking events, and exclusive social experiences.', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800&h=1200', icon: UtensilsCrossed },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We deep-dive into your brand, audience, and event objectives to build a bulletproof execution plan tailored to your goals.', icon: Sparkles },
  { num: '02', title: 'Concept & Design', desc: 'Our creative team develops stunning stage designs, floor plans, and themes that bring your vision to life with meticulous detail.', icon: LayoutTemplate },
  { num: '03', title: 'Vendor Sourcing', desc: 'We leverage our extensive network of premium vendors for AV, lighting, F&B, and decor to get you the best quality at the best rates.', icon: Palette },
  { num: '04', title: 'Flawless Execution', desc: 'With our roots in manpower, our on-ground execution is unmatched. We manage the floor so you can enjoy the event.', icon: CheckCircle2 },
];

const CAPABILITIES = [
  { icon: LayoutTemplate, title: 'Venue Sourcing', desc: 'Access to 200+ premium venues across Karnataka', angle: 0 },
  { icon: Palette, title: 'Theme & Decor', desc: 'Custom stage design, floral, and immersive setups', angle: 60 },
  { icon: Speaker, title: 'AV & Production', desc: 'Sound, lighting, LED walls, and live streaming', angle: 120 },
  { icon: Camera, title: 'Content & Media', desc: 'Photography, videography, and social media coverage', angle: 180 },
  { icon: UtensilsCrossed, title: 'F&B Management', desc: 'Catering coordination and bar service setup', angle: 240 },
  { icon: Users, title: 'On-Ground Crew', desc: 'Our staffing backbone ensures flawless execution', angle: 300 },
];

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', alt: 'Corporate event setup', h: 'h-64' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600', alt: 'Luxury venue', h: 'h-80' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600', alt: 'Event lighting', h: 'h-56' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', alt: 'Stage production', h: 'h-72' },
  { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=600', alt: 'Concert setup', h: 'h-64' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600', alt: 'Decor close-up', h: 'h-80' },
  { src: 'https://images.unsplash.com/photo-1516280440502-d2fdaa07a518?auto=format&fit=crop&q=80&w=600', alt: 'DJ performance', h: 'h-56' },
  { src: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=600', alt: 'Gala evening', h: 'h-72' },
];

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════ */

function TypewriterHeadline() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPEWRITER_LINES[lineIndex];
    const speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && charIndex === 0) {
      // Use timeout to avoid synchronous setState in effect
      const t = setTimeout(() => {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % TYPEWRITER_LINES.length);
      }, 50);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, lineIndex]);

  return (
    <span>
      {TYPEWRITER_LINES[lineIndex].substring(0, charIndex)}
      <span className="typewriter-cursor" />
    </span>
  );
}

function RevealOnScroll({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */

export default function ManagementPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeCapability, setActiveCapability] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollShowcaseRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const timelineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  // Horizontal scroll progress
  const handleShowcaseScroll = useCallback(() => {
    const el = scrollShowcaseRef.current;
    if (!el) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null);
      if (e.key === 'ArrowLeft') setLightboxIdx((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [lightboxIdx]);

  return (
    <div className="min-h-screen" style={{ background: '#0a0908' }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: Cinematic Video Hero with Typewriter
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000"
        >
          <source src="https://cdn.coverr.co/videos/coverr-a-crowd-at-a-concert-9952/1080p.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/70 via-[#0a0908]/40 to-[#0a0908]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%, transparent 0%, #0a0908 100%)' }} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Full-Service Event Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1] min-h-[2.4em]"
          >
            <TypewriterHeadline />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-[#c8c3be] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            For years, we&apos;ve been the operational backbone of Karnataka&apos;s biggest events. Now, we bring that unmatched on-ground expertise to end-to-end event management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/build-your-event"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 shadow-2xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/management/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 border-white/20 text-white hover:border-[#f3c892] hover:text-[#f3c892] transition-all"
            >
              <Play className="w-4 h-4" /> Explore Services
            </Link>
          </motion.div>

          {/* Frosted Stats Pill */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 inline-flex flex-wrap justify-center items-center gap-0 rounded-full"
            style={{ background: 'rgba(12,11,10,0.6)', border: '1px solid rgba(42,42,42,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '1rem 2.5rem' }}
          >
            {[
              { value: '100%', label: 'Bespoke' },
              { value: 'Premium', label: 'Vendors' },
              { value: 'Seamless', label: 'Execution' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-4 sm:px-6 py-1">
                  <span className="font-black text-xl sm:text-2xl" style={{ color: '#f3c892' }}>{stat.value}</span>
                  <span className="text-[10px] font-semibold tracking-widest mt-1" style={{ color: '#a39e98' }}>{stat.label}</span>
                </div>
                {i < 3 && <div className="w-px h-10 bg-[#2a2a2a]" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#66625d' }}>Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce-down" style={{ color: '#66625d' }} />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 2: Horizontal Scroll Showcase
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: '#0c0b0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>● THE EXPERIENCE SPECTRUM</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Events We <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Specialize In</em>
            </h2>
            <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Drag or scroll to explore. Every event is unique — we bring the same level of precision and creativity to each one.</p>
          </RevealOnScroll>
        </div>

        <div
          ref={scrollShowcaseRef}
          onScroll={handleShowcaseScroll}
          className="horizontal-scroll-container px-4 sm:px-8 lg:px-16"
        >
          {EVENT_TYPES.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.title}
                className="horizontal-scroll-card group relative w-[280px] sm:w-[320px] rounded-3xl overflow-hidden border border-[#282624] hover:border-[#f3c892]/40 transition-all duration-500"
                style={{ aspectRatio: '3/4' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(243,200,146,0.15)', backdropFilter: 'blur(8px)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#f3c892' }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll progress bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-6">
          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: '#282624' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#f3c892', width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 3: Vertical Timeline Process
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0a0908' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(243,200,146,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>● THE MV PROCESS</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Our Blueprint for <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Success</em>
            </h2>
            <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Because we started in manpower, we know that a great concept means nothing without flawless execution.</p>
          </RevealOnScroll>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Background line */}
            <div className="timeline-line hidden md:block" />
            {/* Animated fill */}
            <motion.div className="timeline-line-fill hidden md:block" style={{ height: timelineHeight }} />

            <div className="space-y-16 md:space-y-24">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isLeft = idx % 2 === 0;
                return (
                  <RevealOnScroll key={step.num} delay={0.1 * idx}>
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        <span className="text-7xl md:text-8xl font-black block mb-2 select-none" style={{ color: 'rgba(243,200,146,0.06)' }}>{step.num}</span>
                        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-[#a39e98] leading-relaxed max-w-md">{step.desc}</p>
                      </div>

                      {/* Center node */}
                      <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ background: '#141312', border: '2px solid #f3c892', boxShadow: '0 0 30px rgba(243,200,146,0.15)' }}>
                        <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 4: Interactive Capability Orbit
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0c0b0a' }}>
        <div className="absolute inset-0 bg-premium-grid opacity-5 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>● EVERYTHING UNDER ONE ROOF</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Our <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Capabilities</em>
            </h2>
            <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Stop managing 10 different vendors. We coordinate every moving part — one point of contact, zero stress.</p>
          </RevealOnScroll>

          {/* Desktop: Orbit Layout */}
          <div className="hidden lg:block">
            <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '1/1' }}>
              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: 'rgba(243,200,146,0.08)', border: '2px solid rgba(243,200,146,0.25)', boxShadow: '0 0 60px rgba(243,200,146,0.1)' }}>
                  <Sparkles className="w-10 h-10" style={{ color: '#f3c892' }} />
                </div>
              </div>

              {/* Orbit ring */}
              <div className="absolute inset-8 rounded-full" style={{ border: '1px dashed rgba(243,200,146,0.1)' }} />

              {/* Nodes */}
              {CAPABILITIES.map((cap, idx) => {
                const Icon = cap.icon;
                const rad = (cap.angle * Math.PI) / 180;
                const radius = 42;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                const isActive = activeCapability === idx;

                return (
                  <div
                    key={cap.title}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <button
                      onClick={() => setActiveCapability(isActive ? null : idx)}
                      className={`group flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive ? 'rgba(243,200,146,0.2)' : 'rgba(20,19,18,0.9)',
                          border: `1px solid ${isActive ? 'rgba(243,200,146,0.5)' : '#282624'}`,
                          boxShadow: isActive ? '0 0 30px rgba(243,200,146,0.2)' : 'none',
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                      </div>
                      <span className="text-xs font-bold text-white whitespace-nowrap">{cap.title}</span>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 p-4 rounded-2xl z-30"
                          style={{ background: '#1a1918', border: '1px solid #282624', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        >
                          <p className="text-sm text-[#a39e98] leading-relaxed">{cap.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Accordion */}
          <div className="lg:hidden space-y-3">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              const isActive = activeCapability === idx;
              return (
                <button
                  key={cap.title}
                  onClick={() => setActiveCapability(isActive ? null : idx)}
                  className="w-full text-left p-5 rounded-2xl border transition-all duration-300"
                  style={{ background: isActive ? '#1a1918' : '#141312', borderColor: isActive ? 'rgba(243,200,146,0.3)' : '#282624' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(243,200,146,0.08)' }}>
                      <Icon className="w-6 h-6" style={{ color: '#f3c892' }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{cap.title}</h4>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-[#a39e98] mt-2 leading-relaxed"
                          >
                            {cap.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} style={{ color: '#66625d' }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <RevealOnScroll className="text-center mt-16">
            <Link
              href="/build-your-event"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 5: Why MV Groups — Immersive Cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden border-t" style={{ borderColor: '#1a1918', background: '#0a0908' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>● OUR EDGE</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Why Clients Choose <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>MV Groups</em>
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Staffing DNA', desc: 'We started in manpower. That means our on-ground execution is unmatched — we don\u2019t just plan, we deliver with trained professionals.' },
              { icon: MapPin, title: 'Local Expertise', desc: 'Deep knowledge of Karnataka\u2019s best venues, vendors, and logistics — we know the terrain like no one else.' },
              { icon: CheckCircle2, title: 'Single Point of Contact', desc: 'One dedicated project manager handles everything — vendors, timelines, budgets, and day-of coordination.' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <RevealOnScroll key={card.title} delay={idx * 0.15}>
                  <div className="group p-8 rounded-3xl border border-[#282624] hover:border-[#f3c892]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden" style={{ background: '#141312' }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#f3c892] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)' }}>
                      <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-[#a39e98] text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 6: Masonry Photo Grid with Lightbox
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: '#0c0b0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>● BEHIND THE CURTAIN</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              A Glimpse of <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Our World</em>
            </h2>
            <p className="text-[#a39e98] text-lg max-w-xl mx-auto">Every event tells a story. Here are some moments from behind the scenes.</p>
          </RevealOnScroll>

          <div className="masonry-grid">
            {GALLERY_IMAGES.map((img, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.05}>
                <button
                  onClick={() => setLightboxIdx(idx)}
                  className={`group relative w-full ${img.h} rounded-2xl overflow-hidden border border-[#282624] hover:border-[#f3c892]/40 transition-all duration-300 block`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" style={{ background: 'rgba(243,200,146,0.9)' }}>
                      <ArrowRight className="w-5 h-5 text-[#0a0908] rotate-[-45deg]" />
                    </div>
                  </div>
                </button>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxIdx(null)}
          >
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-10 text-white hover:text-[#f3c892] transition-colors" style={{ background: 'rgba(20,19,18,0.8)' }} onClick={() => setLightboxIdx(null)}>
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#f3c892] transition-colors z-10"
              style={{ background: 'rgba(20,19,18,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#f3c892] transition-colors z-10"
              style={{ background: 'rgba(20,19,18,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GALLERY_IMAGES[lightboxIdx].src.replace('w=600', 'w=1400')}
              alt={GALLERY_IMAGES[lightboxIdx].alt}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>


      {/* ══════════════════════════════════════════════════════
          SECTION 7: Magnetic CTA with Morphing Blobs
      ══════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden border-t" style={{ borderColor: '#1a1918', background: '#0a0908' }}>
        {/* Morphing blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] morph-blob opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(243,200,146,0.3) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] morph-blob opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(229,185,128,0.3) 0%, transparent 70%)', animationDelay: '-6s' }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <RevealOnScroll>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 relative" style={{ background: 'rgba(243,200,146,0.1)', border: '1px solid rgba(243,200,146,0.3)' }}>
              <div className="absolute inset-0 bg-[#f3c892] blur-[20px] opacity-20 rounded-full animate-pulse" />
              <Sparkles className="w-8 h-8 relative z-10" style={{ color: '#f3c892' }} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
              Ready to create <br />
              <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>something unforgettable</em>?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-xl text-[#a39e98] mb-12 max-w-2xl mx-auto">
              Let&apos;s turn your vision into a flawlessly executed event. Start with a free strategy call.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <MagneticWrapper strength={0.3}>
              <Link
                href="/build-your-event"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0c0b0a] font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                Plan Your Event
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticWrapper>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
