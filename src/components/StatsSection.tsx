'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { value: 50, suffix: '+', label: 'Events Supported', sub: 'Across Karnataka' },
  { value: 500, suffix: '+', label: 'Staff Deployed', sub: 'Vetted professionals' },
  { value: 6, suffix: '', label: 'Cities Covered', sub: 'Pan-Karnataka' },
  { value: 4, suffix: 'hr', label: 'Quote Turnaround', sub: 'Average response time' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="py-20" style={{ background: '#0f0e0d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative rounded-2xl p-6 text-center overflow-hidden group card-glow"
              style={{ background: '#1a1918', border: '1px solid #282624', transition: 'border-color 0.3s, box-shadow 0.3s' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(243,200,146,0.06) 0%, transparent 70%)' }} />
              <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: '#f3c892' }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white font-semibold text-sm md:text-base">{s.label}</p>
              <p className="mt-1 text-xs" style={{ color: '#6b6560' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
