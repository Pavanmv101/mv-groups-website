'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  {
    num: '01', category: 'Event Management',
    title: 'End-to-End Event Management',
    desc: 'From the first brief to the final curtain call — we own every detail. Concept, planning, production, vendors, and execution delivered seamlessly under one roof.',
    points: ['Complete event concept & planning', 'Multi-vendor coordination', 'Budget management & cost optimisation', 'Full event-day oversight & delivery'],
  },
  {
    num: '02', category: 'Venue & Planning',
    title: 'Venue Sourcing & Event Planning',
    desc: 'We identify, negotiate, and secure the right venue — then build a meticulous plan around it. From BIEC and KTPO to luxury hotels across Karnataka.',
    points: ['Venue identification & site visits', 'Layout planning & floor plans', 'Timeline & runsheet creation', 'Supplier & vendor coordination'],
  },
  {
    num: '03', category: 'Design & Production',
    title: 'Stage Design & AV Production',
    desc: 'World-class stage fabrication, 3D set design, LED walls, sound systems, and professional lighting rigs — built to impress at any scale.',
    points: ['3D stage & set design', 'LED walls, AV & sound systems', 'Professional lighting & rigging', 'Set fabrication & installation'],
  },
  {
    num: '04', category: 'Decor & Theming',
    title: 'Decor & Thematic Setups',
    desc: 'Immersive environments crafted to match your brand and vision. From minimal corporate to grand celebration — we transform any space.',
    points: ['Floral & thematic decor', 'Branded environments & installations', 'Stage backdrops & branding structures', 'Entrance & registration area design'],
  },
  {
    num: '05', category: 'Weddings & Social',
    title: 'Wedding & Social Event Management',
    desc: "Your special day, executed flawlessly. From intimate weddings to grand receptions at Varaha, Chamara Vajra, and top venues across Karnataka.",
    points: ['Complete wedding planning & coordination', 'Reception & welcome team', 'Guest assistance & parking coordination', 'F&B support & venue floor management'],
  },
  {
    num: '06', category: 'Concerts & Live Shows',
    title: 'Concert & Live Show Management',
    desc: 'Full production and management for concerts, live performances, cultural shows, and entertainment events across Karnataka. Stage, sound, crew, and crowd — all handled.',
    points: ['Concert & live show production', 'Stage setup & sound engineering', 'Artist & performer coordination', 'Crowd management & event flow'],
  },
  {
    num: '07', category: 'Awards & Galas',
    title: 'Award Ceremonies & Corporate Galas',
    desc: 'Prestigious award nights, milestone celebrations, and gala dinners — executed with elegance. We handled SecurEyes 20th Anniversary and multiple corporate recognition events.',
    points: ['Award ceremony planning & hosting', 'Gala dinner setup & management', 'Trophy & recognition coordination', 'VIP guest management & protocol'],
  },
  {
    num: '08', category: 'Staffing & Manpower',
    title: 'Event Staffing & Manpower',
    desc: "Karnataka's most reliable event crew. Vetted, trained, and deployment-ready within 6-12 hours in Bengaluru. Every role, every event, every scale.",
    points: ['Hosts, ushers & floor managers', 'Registration & helpdesk teams', 'VIP assistance & protocol staff', 'Guest relations executives'],
  },
  {
    num: '09', category: 'Corporate & Exhibition',
    title: 'Corporate & Exhibition Staffing',
    desc: 'Specialist staff for trade shows, corporate conferences, and exhibitions at BIEC, KTPO, and major Bengaluru venues — including Google I/O and JPMorgan forums.',
    points: ['Conference & seminar staff', 'Exhibition booth & lead collection staff', 'Corporate hospitality support', 'Multi-day expo deployment teams'],
  },
  {
    num: '10', category: 'Brand Activation',
    title: 'Promotional Staffing & Brand Activation',
    desc: 'Amplify your brand presence with energetic promotional staff. Brand ambassadors, product demonstrators, and mall activation teams tailored for maximum impact.',
    points: ['Brand promoters & ambassadors', 'Product demonstrators', 'Mall & roadshow activation staff', 'Sampling & marketing executives'],
  },
  {
    num: '11', category: 'Security & Logistics',
    title: 'Bouncers, Security & Event Logistics',
    desc: 'The backbone of every safe, smooth event. Professional crowd control, VIP protection, loading crew, stage setup, and barricading teams on standby.',
    points: ['Crowd control & VIP escort', 'Venue access control & security planning', 'Loading, unloading & logistics crew', 'Stage setup, barricading & dismantling'],
  },
  {
    num: '12', category: 'Entertainment',
    title: 'DJ, Anchoring & Photography',
    desc: 'Capture every moment and set the perfect mood. Professional DJs, charismatic emcees, and cinematic photographers — all from one trusted partner.',
    points: ['Corporate, wedding & concert DJs', 'Bilingual emcees & event anchors', 'Event photography & videography', 'Drone coverage & social media reels'],
  },
  {
    num: '13', category: 'On-Ground Execution',
    title: 'On-Ground Execution & Delivery',
    desc: 'The final mile that makes or breaks an event. Our on-ground team coordinates every moving part in real time — so you focus on your guests, not the chaos.',
    points: ['Real-time event coordination', 'Guest management & VIP handling', 'Crisis response & contingency', 'Post-event reporting & debrief'],
  },
];

function ServiceRow({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 * (index % 4) }}
    >
      {/* Top divider */}
      <div className="w-full h-px" style={{ background: '#1e1c1a' }} />

      <div className="relative py-14 md:py-20 px-0 overflow-hidden">
        {/* Watermark number — far right */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(100px, 16vw, 220px)',
            color: '#f3c892',
            opacity: 0.04,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {svc.num}
        </span>

        {/* Vertical gold accent line — left edge */}
        <div
          className="absolute left-0 top-14 bottom-14 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(243,200,146,0.3), transparent)' }}
        />

        <div className="md:pl-8">
          {/* Category label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#f3c892' }}>
              {svc.num}
            </span>
            <div className="w-8 h-px" style={{ background: '#f3c892' }} />
            <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#f3c892' }}>
              {svc.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-bold text-white mb-5 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            {svc.title}
          </h2>

          {/* Description */}
          <p
            className="leading-relaxed mb-8 max-w-xl"
            style={{ color: '#a39e98', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
          >
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
      </div>
    </motion.div>
  );
}

export default function StickyServices() {
  return (
    <section style={{ background: '#0c0b0a' }}>
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-6">
        <p className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: '#f3c892' }}>What We Do</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Our{' '}
          <span style={{ color: '#f3c892', fontStyle: 'italic' }}>Services</span>
        </h2>
      </div>

      {/* Services list */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.num} svc={svc} index={i} />
        ))}
        {/* Bottom divider */}
        <div className="w-full h-px" style={{ background: '#1e1c1a' }} />
      </div>
    </section>
  );
}
