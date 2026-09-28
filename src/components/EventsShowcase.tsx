'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, PartyPopper, Mic2, CalendarCheck, BadgeCheck, Printer, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/* ══════════════════════════════════════════════════════
   EVENT DATA — Organized by category
══════════════════════════════════════════════════════ */

type EventCategory = 'tech' | 'corporate' | 'wedding' | 'expo' | 'seminar' | 'branding';

interface EventItem {
  name: string;
  org: string;
  year: string;
  category: EventCategory;
  repeat?: string;
  highlight?: boolean;
}

const EVENTS: EventItem[] = [
  // ── Tech & Flagship ──
  { name: 'Google I/O Connect', org: 'Google', year: '2025', category: 'tech', highlight: true },
  { name: 'Technology Innovation Forum', org: 'JPMorgan Chase', year: '2026', category: 'tech', highlight: true },
  { name: 'BOSS Summit', org: 'BOSS Summit', year: '2025', category: 'tech' },

  // ── Corporate Events ──
  { name: 'Team Building Event', org: 'Nutanix', year: '2025', category: 'corporate' },
  { name: 'Corporate Events', org: 'iQuanti', year: '2025', category: 'corporate' },
  { name: 'Office Events', org: 'ServiceNow', year: '2025–26', category: 'corporate', repeat: '3×' },
  { name: '20th Anniversary Celebration', org: 'SecurEyes', year: '2026', category: 'corporate' },
  { name: 'Logistic Support', org: 'Europraktik', year: '2026', category: 'corporate' },
  { name: 'BPN Colloquium', org: 'BPN Bangalore', year: '2026', category: 'corporate' },

  // ── Seminars & Conferences (Quantum Leap) ──
  { name: 'Business Breakthrough Seminar', org: 'Quantum Leap', year: '2024–26', category: 'seminar', repeat: '5×' },
  { name: 'P.A.C.E. Workshop', org: 'Quantum Leap', year: '2024–26', category: 'seminar', repeat: '5×' },
  { name: 'Proficorn', org: 'Quantum Leap', year: '2025–26', category: 'seminar', repeat: '2×' },

  // ── Weddings ──
  { name: 'Wedding at Varaha', org: 'The Wedding Company', year: '2025', category: 'wedding' },
  { name: 'Wedding at Chamara Vajra', org: 'Wewwah Weddings', year: '2025', category: 'wedding' },

  // ── Expos & Trade Shows ──
  { name: 'Elasia Expo', org: 'Futurex · BIEC', year: '2026', category: 'expo' },
  { name: 'India Green Energy Expo', org: 'Futurex · BIEC', year: '2026', category: 'expo' },
  { name: 'Poultry India Expo', org: 'Futurex · BIEC', year: '2026', category: 'expo' },
  { name: 'AgriTech India', org: 'Futurex · KTPO Whitefield', year: '2026', category: 'expo' },

  // ── Branding & Print Support ──
  { name: 'Arcause Spotlight', org: 'E&P Media', year: '2026', category: 'branding' },
];

const CATEGORY_META: Record<EventCategory, { label: string; icon: typeof Building2; color: string }> = {
  tech: { label: 'Tech & Flagship', icon: Mic2, color: '#60a5fa' },
  corporate: { label: 'Corporate', icon: Building2, color: '#f3c892' },
  seminar: { label: 'Seminars & Conferences', icon: CalendarCheck, color: '#a78bfa' },
  wedding: { label: 'Luxury Weddings', icon: PartyPopper, color: '#f472b6' },
  expo: { label: 'Expos & Trade Shows', icon: BadgeCheck, color: '#34d399' },
  branding: { label: 'Branding & Print', icon: Printer, color: '#fb923c' },
};

/* ══════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  if (inView && count === 0) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);
  }

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function EventsShowcase() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredEvents = activeCategory === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory);

  const totalEngagements = EVENTS.reduce((sum, e) => {
    if (e.repeat) {
      const num = parseInt(e.repeat);
      return sum + (isNaN(num) ? 1 : num);
    }
    return sum + 1;
  }, 0);

  const uniqueOrgs = new Set(EVENTS.map(e => e.org)).size;

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#0c0b0a' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #f3c892 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
            ● PROVEN TRACK RECORD
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Events We&apos;ve{' '}
            <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
              Powered
            </em>
          </h2>
          <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">
            From Google&apos;s global developer conference to intimate luxury weddings — we&apos;ve delivered excellence across every scale.
          </p>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-16"
        >
          {[
            { value: totalEngagements, suffix: '+', label: 'Events Powered' },
            { value: uniqueOrgs, suffix: '+', label: 'Organizations Trusted Us' },
            { value: 6, suffix: '', label: 'Event Categories' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 sm:p-6 rounded-2xl" style={{ background: '#141312', border: '1px solid #1a1918' }}>
              <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: '#f3c892' }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#66625d] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Category Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeCategory === 'all' ? 'text-[#0c0b0a] shadow-lg' : 'text-[#a39e98] hover:text-white'}`}
            style={{
              background: activeCategory === 'all' ? '#f3c892' : '#141312',
              border: `1px solid ${activeCategory === 'all' ? '#f3c892' : '#282624'}`,
            }}
          >
            All Events
          </button>
          {(Object.entries(CATEGORY_META) as [EventCategory, typeof CATEGORY_META[EventCategory]][]).map(([key, meta]) => {
            const Icon = meta.icon;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${isActive ? 'text-[#0c0b0a] shadow-lg' : 'text-[#a39e98] hover:text-white'}`}
                style={{
                  background: isActive ? meta.color : '#141312',
                  border: `1px solid ${isActive ? meta.color : '#282624'}`,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {meta.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Event Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredEvents.map((event, idx) => {
            const catMeta = CATEGORY_META[event.category];
            const Icon = catMeta.icon;
            return (
              <motion.div
                key={event.name + event.org}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${event.highlight ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  background: event.highlight ? 'linear-gradient(135deg, rgba(243,200,146,0.06) 0%, #141312 100%)' : '#141312',
                  borderColor: event.highlight ? 'rgba(243,200,146,0.2)' : '#1a1918',
                }}
              >
                {/* Highlight badge */}
                {event.highlight && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase" style={{ background: 'rgba(243,200,146,0.15)', color: '#f3c892' }}>
                    Flagship
                  </div>
                )}

                {/* Category dot + icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${catMeta.color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: catMeta.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{event.name}</h4>
                    <p className="text-[#66625d] text-xs font-medium truncate">{event.org}</p>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md" style={{ background: '#0c0b0a', color: '#a39e98' }}>
                    {event.year}
                  </span>
                  {event.repeat && (
                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md" style={{ background: `${catMeta.color}15`, color: catMeta.color }}>
                      {event.repeat} Editions
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Auto-scrolling ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to right, #0c0b0a, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to left, #0c0b0a, transparent)' }} />

          <div className="flex animate-scroll-left whitespace-nowrap gap-8 py-4">
            {[...EVENTS, ...EVENTS].map((event, i) => (
              <span key={`ticker-${i}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#403e3c]">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: CATEGORY_META[event.category].color }} />
                {event.name}
                <span className="text-[#282624]">·</span>
                <span className="text-[#282624]">{event.org}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg group"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            <Users className="w-5 h-5" />
            Be Our Next Success Story
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
