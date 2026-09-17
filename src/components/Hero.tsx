'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Crown, Sparkles, CheckCircle2, ChevronDown, Star, Zap, Shield } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ── Pre-computed gold particle positions ── */
const PARTICLES = [
  { id: 0, left: '5%',  top: '10%', size: 2,   duration: 7,   delay: 0   },
  { id: 1, left: '20%', top: '25%', size: 3,   duration: 9,   delay: 1.2 },
  { id: 2, left: '48%', top: '18%', size: 1.5, duration: 6,   delay: 0.5 },
  { id: 3, left: '70%', top: '35%', size: 2.5, duration: 8,   delay: 2.1 },
  { id: 4, left: '88%', top: '15%', size: 1.8, duration: 5,   delay: 3   },
  { id: 5, left: '12%', top: '60%', size: 3.5, duration: 10,  delay: 0.8 },
  { id: 6, left: '35%', top: '70%', size: 2,   duration: 7.5, delay: 1.5 },
  { id: 7, left: '58%', top: '50%', size: 1.2, duration: 6.5, delay: 2.5 },
  { id: 8, left: '75%', top: '75%', size: 2.8, duration: 9,   delay: 0.3 },
  { id: 9, left: '92%', top: '45%', size: 1.6, duration: 5.5, delay: 3.5 },
];

function GoldParticles() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: 'radial-gradient(circle, rgba(243,200,146,0.9) 0%, transparent 70%)',
          }}
          animate={{ y: [0, -70, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const STAFFING_SERVICES = ['Event Manpower', 'Promotional Staffing', 'Corporate Staffing', 'Wedding & Social Staffing', 'Bouncers & Security', 'Anchoring & Emcee'];
const MANAGEMENT_SERVICES = ['End-to-End Event Planning', 'Stage & AV Production', 'Decor & Stage Design', 'Content & Media Coverage', 'Catering & Hospitality', 'Entertainment & Talent'];

const STATS = [
  { value: '150+', label: 'Events Staffed' },
  { value: '15+',  label: 'Trusted Clients' },
  { value: '13',   label: 'Service Types'  },
  { value: '100%', label: 'Reliability'    },
  { value: '24/7', label: 'Dedicated Support' },
];

const WHY_US = [
  {
    icon: Zap,
    title: 'Karnataka\'s Event Backbone',
    desc: 'From Google I/O Connect to JPMorganChase forums — we\'ve been the operational engine behind Karnataka\'s most prestigious events.',
  },
  {
    icon: Shield,
    title: 'Vetted, Trained, Reliable',
    desc: 'Every staff member goes through our 3-stage vetting process. You get professionals, not placeholders.',
  },
  {
    icon: Star,
    title: 'Tech-Driven Operations',
    desc: 'Founded by an engineer, powered by systems. Real-time coordination, digital briefings, zero chaos.',
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'staffing' | 'management'>('staffing');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale  = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const heroY      = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);

  return (
    <div style={{ background: '#0a0908' }}>

      {/* ═══════════════════════════════════════════
          SECTION 1: Cinematic Full-Screen Hero
      ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center">

        {/* Parallax background wrapper */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale, y: heroY }}>
          {/* Left Half — Staffing */}
          <div className="absolute inset-y-0 left-0 w-1/2">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/80 via-[#0a0908]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]/40" />
          </div>

          {/* Right Half — Management */}
          <div className="absolute inset-y-0 right-0 w-1/2">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0a0908]/80 via-[#0a0908]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]/40" />
          </div>
        </motion.div>

        {/* Gold diagonal divider */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px hidden md:block z-20"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top', background: 'linear-gradient(to bottom, transparent, rgba(243,200,146,0.5), transparent)' }}
        />

        {/* Gold particles */}
        <motion.div className="absolute inset-0 z-10" style={{ opacity: heroOpacity }}>
          <GoldParticles />
        </motion.div>

        {/* Center Content */}
        <motion.div className="relative z-30 text-center px-4 max-w-5xl mx-auto" style={{ opacity: heroOpacity }}>
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src="/images/mv-groups-logo.png"
              alt="MV Groups"
              width={180}
              height={72}
              className="w-32 md:w-44 h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8"
            style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Karnataka&apos;s Premier Event Force
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            One Company.<br />
            <span style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Two Powers.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#c8c3be] mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Elite event staffing for every role. End-to-end event production for every occasion.
            We do both — and we do them exceptionally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/staffing"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              <Users className="w-4 h-4" />
              Explore Staffing
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/management"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid rgba(243,200,146,0.3)', backdropFilter: 'blur(12px)' }}
            >
              <Crown className="w-4 h-4" style={{ color: '#f3c892' }} />
              Explore Management
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-[10px] tracking-widest uppercase text-[#66625d]">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <ChevronDown className="w-5 h-5 text-[#f3c892]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: Marquee Trust Bar
      ═══════════════════════════════════════════ */}
      <section className="py-6 border-y overflow-hidden" style={{ borderColor: '#1a1918', background: '#0c0b0a' }}>
        <div className="flex animate-marquee gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[
            'Google I/O Connect', 'JPMorganChase Forum', 'Corporate Summits',
            'Luxury Weddings', 'Award Ceremonies', 'Brand Activations',
            'Exhibition Setups', 'Gala Dinners', 'Concert Productions',
            'Google I/O Connect', 'JPMorganChase Forum', 'Corporate Summits',
            'Luxury Weddings', 'Award Ceremonies', 'Brand Activations',
          ].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase"
              style={{ color: '#66625d' }}
            >
              <span style={{ color: '#f3c892', fontSize: 8 }}>◆</span>
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: The Two Pillars
      ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RevealSection className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6" style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.15)' }}>
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Two Pillars of<br />
            <span style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Event Excellence</span>
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Staffing Card */}
          <RevealSection>
            <Link href="/staffing" className="group block h-full">
              <div
                className="relative h-full min-h-[520px] rounded-3xl overflow-hidden border transition-all duration-500 hover:border-[#f3c892]/40 hover:shadow-[0_0_60px_rgba(243,200,146,0.1)] cursor-pointer"
                style={{ background: '#141312', borderColor: '#282624' }}
              >
                {/* BG Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 transition-all duration-700 group-hover:opacity-50 group-hover:scale-110"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/60 to-transparent" />

                <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full justify-end">
                  {/* Label */}
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 self-start" style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
                    Pillar 01
                  </span>

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                    <Users className="w-8 h-8" style={{ color: '#f3c892' }} />
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">Event Staffing &<br />Manpower</h3>
                  <p className="text-[#a39e98] mb-8 text-lg leading-relaxed">From VIP hospitality crews to full event logistics teams. We supply vetted, trained professionals for any event, any scale.</p>

                  <ul className="space-y-2.5 mb-8">
                    {['150+ Events Staffed', 'VIP Hospitality & Ushers', 'Security & Bouncers', 'Brand Promoters', 'Logistics & Setup Crew'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#f3c892' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#f3c892' }}>
                    Build Your Crew
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          </RevealSection>

          {/* Management Card */}
          <RevealSection>
            <Link href="/management" className="group block h-full">
              <div
                className="relative h-full min-h-[520px] rounded-3xl overflow-hidden border transition-all duration-500 hover:border-[#f3c892]/40 hover:shadow-[0_0_60px_rgba(243,200,146,0.08)] cursor-pointer"
                style={{ background: '#141312', borderColor: '#282624' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 transition-all duration-700 group-hover:opacity-50 group-hover:scale-110"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/60 to-transparent" />

                <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full justify-end">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 self-start" style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
                    Pillar 02
                  </span>

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                    <Crown className="w-8 h-8" style={{ color: '#f3c892' }} />
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">Full-Service Event<br />Management</h3>
                  <p className="text-[#a39e98] mb-8 text-lg leading-relaxed">From venue to curtain call — we plan, design, produce, and manage premium corporate events, weddings, and galas.</p>

                  <ul className="space-y-2.5 mb-8">
                    {['End-to-End Planning', 'Stage & AV Production', 'Luxury Decor & Design', 'Catering Coordination', 'Content & Media Coverage'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#f3c892' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#f3c892' }}>
                    Plan Your Event
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: Stats Bar
      ═══════════════════════════════════════════ */}
      <section className="py-6 border-y overflow-hidden" style={{ borderColor: '#1a1918', background: '#0c0b0a' }}>
        <RevealSection>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: '#f3c892' }}>{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#66625d' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: Services Tab Showcase
      ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RevealSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6" style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.15)' }}>
            Our Services
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
            What We <span style={{ color: '#f3c892' }}>Deliver</span>
          </h2>

          {/* Tab Toggle */}
          <div className="inline-flex items-center rounded-full p-1 mx-auto" style={{ background: '#1a1918', border: '1px solid #282624' }}>
            {(['staffing', 'management'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={{
                  background: activeTab === tab ? '#f3c892' : 'transparent',
                  color: activeTab === tab ? '#0c0b0a' : '#66625d',
                }}
              >
                {tab === 'staffing' ? 'Staffing' : 'Management'}
              </button>
            ))}
          </div>
        </RevealSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {(activeTab === 'staffing' ? STAFFING_SERVICES : MANAGEMENT_SERVICES).map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border transition-all duration-300 hover:border-[#f3c892]/30 hover:-translate-y-1 group"
                style={{ background: '#141312', borderColor: '#282624' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(243,200,146,0.08)' }}>
                  <Sparkles className="w-5 h-5" style={{ color: '#f3c892' }} />
                </div>
                <h4 className="font-bold text-white text-sm leading-tight">{service}</h4>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <RevealSection className="text-center mt-10">
          <Link
            href={activeTab === 'staffing' ? '/staffing/services' : '/management/services'}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border transition-all hover:-translate-y-1"
            style={{ borderColor: '#282624', color: '#f3c892' }}
          >
            View All {activeTab === 'staffing' ? 'Staffing' : 'Management'} Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: Why MV Groups
      ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 border-t" style={{ borderColor: '#1a1918', background: '#0c0b0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6" style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.15)' }}>
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Built Different.<br />
              <span style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Built for Excellence.</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealSection key={item.title}>
                  <div
                    className="p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:border-[#f3c892]/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
                    style={{ background: '#141312', borderColor: '#282624' }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                      <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-[#a39e98] leading-relaxed">{item.desc}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: Dual CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Staffing CTA */}
            <div className="relative rounded-3xl p-10 lg:p-14 overflow-hidden border border-[#282624] hover:border-[#f3c892]/30 transition-all group">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500 group-hover:opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800)' }} />
              <div className="absolute inset-0" style={{ background: '#141312', opacity: 0.85 }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                  <Users className="w-7 h-7" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">Need a crew?</h3>
                <p className="text-[#a39e98] mb-8 leading-relaxed">Tell us your event, we&apos;ll build you the perfect team.</p>
                <Link href="/booking" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl" style={{ background: '#f3c892', color: '#0c0b0a' }}>
                  Book Your Team <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Management CTA */}
            <div className="relative rounded-3xl p-10 lg:p-14 overflow-hidden border border-[#282624] hover:border-[#f3c892]/30 transition-all group">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500 group-hover:opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800)' }} />
              <div className="absolute inset-0" style={{ background: '#141312', opacity: 0.85 }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                  <Crown className="w-7 h-7" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">Planning an event?</h3>
                <p className="text-[#a39e98] mb-8 leading-relaxed">From vision to reality — let&apos;s build something extraordinary.</p>
                <Link href="/build-your-event" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl" style={{ background: '#f3c892', color: '#0c0b0a' }}>
                  Plan Your Event <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

    </div>
  );
}
