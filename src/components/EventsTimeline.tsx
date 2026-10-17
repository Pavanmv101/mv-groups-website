'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EVENTS = [
  { year: '2024', title: 'MV Groups Founded', desc: 'Started operations in Bengaluru with event staffing.', gold: true },
  { year: '2025 Q1', title: 'Google I/O Connect 2025', desc: "Staffing and coordination for one of India's biggest tech events.", gold: true },
  { year: '2025 Q2', title: 'Proficorn & Quantum Leap 2025', desc: 'End-to-end event support for multiple startup and business summits.', gold: false },
  { year: '2025 Q3', title: 'BOSS Summit & iQuanti 2025', desc: 'Corporate event manpower and on-ground coordination.', gold: false },
  { year: '2025 Q4', title: 'SecurEyes 20th Anniversary', desc: 'Milestone corporate celebration — full event management support.', gold: false },
  { year: '2026 Q1', title: 'JPMorgan Chase Tech Forum 2026', desc: 'Flagship corporate event — our largest deployment to date.', gold: true },
  { year: '2026 Q2', title: 'AgriTech India & Europraktik 2026', desc: 'Exhibition staffing at KTPO Whitefield and international event support.', gold: false },
  { year: '2026+', title: 'Growing Pan-Karnataka', desc: 'Expanding operations to Mysuru, Mangaluru, Hubli and beyond.', gold: true },
];

export default function EventsTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section className="py-24" style={{ background: '#0f0e0d' }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: '#f3c892' }}>Our Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Events <span style={{ color: '#f3c892', fontStyle: 'italic' }}>Timeline</span></h2>
        </motion.div>
        <div ref={ref} className="relative">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #282624 10%, #282624 90%, transparent)' }} />
          <div className="space-y-10">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
              >
                <div className="absolute left-0 md:left-1/2 top-4 z-10" style={{ transform: 'translateX(-7px)' }}>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ background: ev.gold ? '#f3c892' : '#1a1918', borderColor: ev.gold ? '#f3c892' : '#282624' }}>
                    {ev.gold && <div className="w-2 h-2 rounded-full bg-[#0c0b0a]" />}
                  </div>
                </div>
                <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                  <div className="rounded-xl p-5" style={{ background: '#1a1918', border: `1px solid ${ev.gold ? 'rgba(243,200,146,0.2)' : '#282624'}` }}>
                    <span className="text-xs font-mono mb-2 block" style={{ color: '#f3c892' }}>{ev.year}</span>
                    <h3 className="font-bold text-white mb-1">{ev.title}</h3>
                    <p className="text-sm" style={{ color: '#6b6560' }}>{ev.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
