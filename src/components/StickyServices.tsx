'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    category: 'Event Management',
    title: 'End-to-End Event Management',
    desc: 'From the first brief to the final curtain call — we own every detail. Concept, planning, production, vendors, and execution delivered seamlessly under one roof.',
    points: [
      'Complete event concept & planning',
      'Multi-vendor coordination',
      'Budget management & cost optimisation',
      'Full event-day oversight',
    ],
  },
  {
    num: '02',
    category: 'Venue & Planning',
    title: 'Venue Sourcing & Event Planning',
    desc: 'We identify, negotiate, and secure the right venue for your event — then build a meticulous plan around it. From BIEC and KTPO to luxury hotels across Karnataka.',
    points: [
      'Venue identification & site visits',
      'Layout planning & floor plans',
      'Timeline & runsheet creation',
      'Vendor & supplier coordination',
    ],
  },
  {
    num: '03',
    category: 'Design & Production',
    title: 'Stage Design & AV Production',
    desc: 'World-class stage fabrication, 3D set design, LED walls, sound systems, and lighting rigs — built to impress at every scale.',
    points: [
      '3D stage & set design',
      'LED walls, AV & sound systems',
      'Professional lighting design',
      'Set fabrication & installation',
    ],
  },
  {
    num: '04',
    category: 'Decor & Theming',
    title: 'Decor & Thematic Setups',
    desc: 'Immersive environments crafted to match your brand and vision. From minimal corporate to grand celebration — we transform any space.',
    points: [
      'Floral & thematic decor',
      'Branded environments & installations',
      'Stage backdrops & branding structures',
      'Entrance & registration area design',
    ],
  },
  {
    num: '05',
    category: 'Staffing & Manpower',
    title: 'Event Staffing & Manpower',
    desc: 'Karnataka\'s most reliable event crew. Vetted, trained, and deployment-ready within 6–12 hours for Bengaluru. Every role, every event.',
    points: [
      'Hosts, ushers & floor managers',
      'Brand promoters & demonstrators',
      'Registration & helpdesk teams',
      'Security, logistics & valet crew',
    ],
  },
  {
    num: '06',
    category: 'Exhibition & Corporate',
    title: 'Corporate & Exhibition Manpower',
    desc: 'Specialist staff for trade shows, corporate conferences, and exhibitions at BIEC, KTPO, and major Bengaluru venues — like Google I/O and JPMorgan forums.',
    points: [
      'Exhibition booth & lead collection staff',
      'Corporate conference teams',
      'Multi-day expo deployment',
      'NDA-compliant professional crew',
    ],
  },
  {
    num: '07',
    category: 'On-Ground Execution',
    title: 'On-Ground Execution & Delivery',
    desc: 'The final mile that makes or breaks an event. Our on-ground team coordinates every moving part in real time — so you can focus on your guests.',
    points: [
      'Real-time event coordination',
      'Guest management & VIP handling',
      'Crisis response & contingency',
      'Post-event reporting & debrief',
    ],
  },
];

export default function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        background: '#0c0b0a',
        height: `${SERVICES.length * 100}vh`,
      }}
    >
      {/* Gold edge glow */}
      <div
        className="fixed inset-y-0 left-0 w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(243,200,146,0.04) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
      <div
        className="fixed inset-y-0 right-0 w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(243,200,146,0.04) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Sticky content */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ zIndex: 2 }}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative">
          {SERVICES.map((svc, i) => {
            const start = i / SERVICES.length;
            const end = (i + 1) / SERVICES.length;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.04, end - 0.04, end],
              [0, 1, 1, 0]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [start, start + 0.06, end - 0.04, end],
              [60, 0, 0, -60]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const numOpacity = useTransform(
              scrollYProgress,
              [start, start + 0.05, end - 0.05, end],
              [0, 0.06, 0.06, 0]
            );

            return (
              <motion.div
                key={svc.num}
                className="absolute inset-0 flex items-center"
                style={{ opacity, y }}
              >
                {/* Large background number */}
                <motion.span
                  className="absolute right-0 md:right-4 bottom-0 font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(140px, 22vw, 280px)',
                    color: '#f3c892',
                    opacity: numOpacity,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {svc.num}
                </motion.span>

                {/* Text content */}
                <div className="relative z-10 max-w-xl">
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="font-mono text-xs tracking-[0.35em] uppercase"
                      style={{ color: '#f3c892' }}
                    >
                      {svc.num}
                    </span>
                    <div className="w-12 h-px" style={{ background: '#f3c892' }} />
                    <span
                      className="font-mono text-xs tracking-[0.35em] uppercase"
                      style={{ color: '#f3c892' }}
                    >
                      {svc.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-bold text-white mb-5 leading-tight"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    {svc.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="leading-relaxed mb-8"
                    style={{ color: '#a39e98', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
                  >
                    {svc.desc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm" style={{ color: '#6b6560' }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#f3c892' }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right-side progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
          <div
            className="w-px rounded-full overflow-hidden"
            style={{ height: 120, background: '#282624' }}
          >
            <motion.div
              className="w-full rounded-full"
              style={{
                background: '#f3c892',
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              }}
            />
          </div>
          <div className="space-y-1.5 mt-2">
            {SERVICES.map((_, i) => {
              const start = i / SERVICES.length;
              const end = (i + 1) / SERVICES.length;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const dotOpacity = useTransform(
                scrollYProgress,
                [start, start + 0.04, end - 0.04, end],
                [0.2, 1, 1, 0.2]
              );
              return (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full mx-auto"
                  style={{ background: '#f3c892', opacity: dotOpacity }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
