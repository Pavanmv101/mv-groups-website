'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BENTO = [
  { title: 'End-to-End Event Management', desc: 'From concept to curtain call — venue, design, decor, vendors, and execution under one roof.', emoji: '🎪', href: '/management', span: 'md:col-span-2', bg: 'linear-gradient(135deg, #1a1918 0%, #201e1c 100%)' },
  { title: 'Event Staffing', desc: 'Hosts, ushers, brand promoters, floor managers — deployed in 6-12 hours.', emoji: '👥', href: '/staffing', span: '', bg: '#1a1918' },
  { title: 'Corporate Events', desc: 'Conferences, summits, launches — Google I/O to JPMorgan.', emoji: '🏢', href: '/staffing', span: '', bg: '#1a1918' },
  { title: 'Exhibition Manpower', desc: 'Trained booth staff and lead collectors for BIEC and KTPO.', emoji: '🏛️', href: '/staffing', span: '', bg: '#1a1918' },
  { title: 'Weddings & Social Events', desc: 'Luxury staffing and full management for weddings across Karnataka.', emoji: '💍', href: '/management', span: 'md:col-span-2', bg: 'linear-gradient(135deg, #1a1918 0%, #201e1c 100%)' },
];

export default function BentoServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="py-24" style={{ background: '#0c0b0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: '#f3c892' }}>What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our <span style={{ color: '#f3c892', fontStyle: 'italic' }}>Services</span></h2>
        </motion.div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENTO.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative rounded-2xl p-7 overflow-hidden group card-glow ${item.span}`}
              style={{ background: item.bg, border: '1px solid #282624', textDecoration: 'none', display: 'block', transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(243,200,146,0.07) 0%, transparent 70%)' }} />
              <span className="text-4xl block mb-4">{item.emoji}</span>
              <h3 className="text-xl font-bold text-white mb-2" style={{ transition: 'color 0.3s' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8a8480' }}>{item.desc}</p>
              <div className="mt-6 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#f3c892' }}>Explore →</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
