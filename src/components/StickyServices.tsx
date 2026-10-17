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
      'Full event-day oversight & delivery',
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
      'Supplier & vendor coordination',
    ],
  },
  {
    num: '03',
    category: 'Design & Production',
    title: 'Stage Design & AV Production',
    desc: 'World-class stage fabrication, 3D set design, LED walls, sound systems, and professional lighting rigs — built to impress at any scale.',
    points: [
      '3D stage & set design',
      'LED walls, AV & sound systems',
      'Professional lighting & rigging',
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
    category: 'Weddings & Social',
    title: 'Wedding & Social Event Management',
    desc: 'Your special day, executed flawlessly. From intimate weddings to grand receptions at Varaha, Chamara Vajra, and top venues across Karnataka.',
    points: [
      'Complete wedding planning & coordination',
      'Reception & welcome team',
      'Guest assistance & parking coordination',
      'F&B support & venue floor management',
    ],
  },
  {
    num: '06',
    category: 'Staffing & Manpower',
    title: 'Event Staffing & Manpower',
    desc: 'Karnataka\'s most reliable event crew. Vetted, trained, and deployment-ready within 6–12 hours in Bengaluru. Every role, every event, every scale.',
    points: [
      'Hosts, ushers & floor managers',
      'Registration & helpdesk teams',
      'VIP assistance & protocol staff',
      'Guest relations executives',
    ],
  },
  {
    num: '07',
    category: 'Corporate & Exhibition',
    title: 'Corporate & Exhibition Staffing',
    desc: 'Specialist staff for trade shows, corporate conferences, and exhibitions at BIEC, KTPO, and major Bengaluru venues — including Google I/O and JPMorgan forums.',
    points: [
      'Conference & seminar staff',
      'Exhibition booth & lead collection staff',
      'Corporate hospitality support',
      'Multi-day expo deployment teams',
    ],
  },
  {
    num: '08',
    category: 'Brand Activation',
    title: 'Promotional Staffing & Brand Activation',
    desc: 'Amplify your brand presence with energetic promotional staff. Brand ambassadors, product demonstrators, and mall activation teams tailored for maximum impact.',
    points: [
      'Brand promoters & ambassadors',
      'Product demonstrators',
      'Mall & roadshow activation staff',
      'Sampling & marketing executives',
    ],
  },
  {
    num: '09',
    category: 'Security & Logistics',
    title: 'Bouncers, Security & Event Logistics',
    desc: 'The backbone of every safe, smooth event. Professional crowd control, VIP protection, loading crew, stage setup, and barricading teams on standby.',
    points: [
      'Crowd control & VIP escort',
      'Venue access control & security planning',
      'Loading, unloading & logistics crew',
      'Stage setup, barricading & dismantling',
    ],
  },
  {
    num: '10',
    category: 'Entertainment',
    title: 'DJ, Anchoring & Photography',
    desc: 'Capture every moment and set the perfect mood. Professional DJs, charismatic emcees, and cinematic photographers — all from one trusted partner.',
    points: [
      'Corporate, wedding & concert DJs',
      'Bilingual emcees & event anchors',
      'Event photography & videography',
      'Drone coverage & social media reels',
    ],
  },
  {
    num: '11',
    category: 'On-Ground Execution',
    title: 'On-Ground Execution & Delivery',
    desc: 'The final mile that makes or breaks an event. Our on-ground team coordinates every moving part in real time — so you focus on your guests, not the chaos.',
    points: [
      'Real-time event coordination',
      'Guest management & VIP handling',
      'Crisis response & contingency',
      'Post-event reporting & debrief',
    ],
  },
];

function ServiceSlide({ svc, scrollYProgress, i, total }: {
  svc: typeof SERVICES[0];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  i: number;
  total: number;
}) {
  const start = i / total;
  const end = (i + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.06, end - 0.04, end],
    [60, 0, 0, -60]
  );
  const numOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 0.055, 0.055, 0]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [0.2, 1, 1, 0.2]
  );

  return { opacity, y, numOpacity, dotOpacity };
}

export default function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const slides = SERVICES.map((svc, i) => ServiceSlide({ svc, scrollYProgress, i, total: SERVICES.length }));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ background: '#0c0b0a', height: `${SERVICES.length * 100}vh` }}
    >
      {/* Gold edge glows */}
      <div className="fixed inset-y-0 left-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(243,200,146,0.04) 0%, transparent 100%)', zIndex: 1 }} />
      <div className="fixed inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(243,200,146,0.04) 0%, transparent 100%)', zIndex: 1 }} />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ zIndex: 2 }}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-14 relative">

          {SERVICES.map((svc, i) => {
            const { opacity, y, numOpacity } = slides[i];
            return (
              <motion.div
                key={svc.num}
                className="absolute inset-0 flex items-center"
                style={{ opacity, y, pointerEvents: 'none' }}
              >
                {/* Watermark number */}
                <motion.span
                  className="absolute right-0 bottom-[-10%] font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(140px, 22vw, 300px)',
                    color: '#f3c892',
                    opacity: numOpacity,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {svc.num}
                </motion.span>

                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-7">
                    <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#f3c892' }}>{svc.num}</span>
                    <div className="w-10 h-px" style={{ background: '#f3c892' }} />
                    <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#f3c892' }}>{svc.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    {svc.title}
                  </h2>

                  {/* Description */}
                  <p className="leading-relaxed mb-8" style={{ color: '#a39e98', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', maxWidth: '520px' }}>
                    {svc.desc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm" style={{ color: '#6b6560' }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#f3c892' }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right side — progress + dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 hidden md:flex" style={{ zIndex: 10 }}>
          {/* Progress track */}
          <div className="w-px rounded-full overflow-hidden" style={{ height: 100, background: '#282624' }}>
            <motion.div className="w-full rounded-full" style={{ background: '#f3c892', height: progressHeight }} />
          </div>
          {/* Dots */}
          <div className="space-y-1.5 mt-2">
            {SERVICES.map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full mx-auto"
                style={{ background: '#f3c892', opacity: slides[i].dotOpacity }}
              />
            ))}
          </div>
          {/* Current number */}
          <div className="mt-3 font-mono text-xs" style={{ color: '#6b6560' }}>
            {String(SERVICES.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
