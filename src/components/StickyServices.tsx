'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    category: 'Event Management',
    title: 'End-to-End Event Management',
    desc: 'From the first brief to the final curtain call — we own every detail. Concept, planning, production, vendors, and execution delivered seamlessly under one roof.',
    points: ['Complete event concept & planning', 'Multi-vendor coordination', 'Budget management & cost optimisation', 'Full event-day oversight & delivery'],
    image: 'https://kkanfilvlittraukxrhb.supabase.co/storage/v1/object/public/gallery/uploads/1792251203475_h0szws.jpg',
    tag: 'Full-Scope Production',
    href: '/management',
  },
  {
    num: '02',
    category: 'Venue & Planning',
    title: 'Venue Sourcing & Event Planning',
    desc: 'We identify, negotiate, and secure the right venue — then build a meticulous plan around it. From BIEC and KTPO to luxury hotels across Karnataka.',
    points: ['Venue identification & site visits', 'Layout planning & floor plans', 'Timeline & runsheet creation', 'Supplier & vendor coordination'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=900',
    tag: 'BIEC · KTPO · Hotels',
    href: '/management',
  },
  {
    num: '03',
    category: 'Design & Production',
    title: 'Stage Design & AV Production',
    desc: 'World-class stage fabrication, 3D set design, LED walls, sound systems, and professional lighting rigs — built to impress at any scale.',
    points: ['3D stage & set design', 'LED walls, AV & sound systems', 'Professional lighting & rigging', 'Set fabrication & installation'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=900',
    tag: 'Stage & LED Walls',
    href: '/management',
  },
  {
    num: '04',
    category: 'Decor & Theming',
    title: 'Decor & Thematic Setups',
    desc: 'Immersive environments crafted to match your brand and vision. From minimal corporate to grand celebration — we transform any space.',
    points: ['Floral & thematic decor', 'Branded environments & installations', 'Stage backdrops & branding structures', 'Entrance & registration area design'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=900',
    tag: 'Thematic Transformations',
    href: '/management',
  },
  {
    num: '05',
    category: 'Weddings & Social',
    title: 'Wedding & Social Event Management',
    desc: "Your special day, executed flawlessly. From intimate weddings to grand receptions at Varaha, Chamara Vajra, and top venues across Karnataka.",
    points: ['Complete wedding planning & coordination', 'Reception & welcome team', 'Guest assistance & parking coordination', 'F&B support & venue floor management'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=900',
    tag: 'Varaha · Chamara Vajra',
    href: '/management',
  },
  {
    num: '06',
    category: 'Concerts & Live Shows',
    title: 'Concert & Live Show Management',
    desc: 'Full production and management for concerts, live performances, cultural shows, and entertainment events across Karnataka. Stage, sound, crew, and crowd — all handled.',
    points: ['Concert & live show production', 'Stage setup & sound engineering', 'Artist & performer coordination', 'Crowd management & event flow'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=900',
    tag: 'Concerts & Live Acts',
    href: '/management',
  },
  {
    num: '07',
    category: 'Awards & Galas',
    title: 'Award Ceremonies & Corporate Galas',
    desc: 'Prestigious award nights, milestone celebrations, and gala dinners — executed with elegance. We handled SecurEyes 20th Anniversary and multiple corporate recognition events.',
    points: ['Award ceremony planning & hosting', 'Gala dinner setup & management', 'Trophy & recognition coordination', 'VIP guest management & protocol'],
    image: '/images/services/award-ceremony.jpg',
    tag: 'SecurEyes 20th & Galas',
    href: '/management',
  },
  {
    num: '08',
    category: 'Staffing & Manpower',
    title: 'Event Staffing & Manpower',
    desc: "Karnataka's most reliable event crew. Vetted, trained, and deployment-ready within 6-12 hours in Bengaluru. Every role, every event, every scale.",
    points: ['Hosts, ushers & floor managers', 'Registration & helpdesk teams', 'VIP assistance & protocol staff', 'Guest relations executives'],
    image: 'https://kkanfilvlittraukxrhb.supabase.co/storage/v1/object/public/gallery/uploads/1784405506289_q994nh.JPG',
    tag: 'Vetted Bengaluru Crew',
    href: '/staffing',
  },
  {
    num: '09',
    category: 'Corporate & Exhibition',
    title: 'Corporate & Exhibition Staffing',
    desc: 'Specialist staff for trade shows, corporate conferences, and exhibitions at BIEC, KTPO, and major Bengaluru venues — including Google I/O and JPMorgan forums.',
    points: ['Conference & seminar staff', 'Exhibition booth & lead collection staff', 'Corporate hospitality support', 'Multi-day expo deployment teams'],
    image: 'https://kkanfilvlittraukxrhb.supabase.co/storage/v1/object/public/gallery/uploads/1784405585190_t6lwn5.JPG',
    tag: 'Google I/O & JPMorgan',
    href: '/staffing',
  },
  {
    num: '10',
    category: 'Brand Activation',
    title: 'Promotional Staffing & Brand Activation',
    desc: 'Amplify your brand presence with energetic promotional staff. Brand ambassadors, product demonstrators, and mall activation teams tailored for maximum impact.',
    points: ['Brand promoters & ambassadors', 'Product demonstrators', 'Mall & roadshow activation staff', 'Sampling & marketing executives'],
    image: 'https://kkanfilvlittraukxrhb.supabase.co/storage/v1/object/public/gallery/uploads/1792939528328_mynt1p.jpg',
    tag: 'Pan-Karnataka Promoters',
    href: '/staffing',
  },
  {
    num: '11',
    category: 'Security & Logistics',
    title: 'Bouncers, Security & Event Logistics',
    desc: 'The backbone of every safe, smooth event. Professional crowd control, VIP protection, loading crew, stage setup, and barricading teams on standby.',
    points: ['Crowd control & VIP escort', 'Venue access control & security planning', 'Loading, unloading & logistics crew', 'Stage setup, barricading & dismantling'],
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=900',
    tag: 'VIP Escort & Bouncers',
    href: '/staffing',
  },
  {
    num: '12',
    category: 'Entertainment',
    title: 'DJ, Anchoring & Photography',
    desc: 'Capture every moment and set the perfect mood. Professional DJs, charismatic emcees, and cinematic photographers — all from one trusted partner.',
    points: ['Corporate, wedding & concert DJs', 'Bilingual emcees & event anchors', 'Event photography & videography', 'Drone coverage & social media reels'],
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=900',
    tag: 'DJs, Emcees & Media',
    href: '/staffing',
  },
  {
    num: '13',
    category: 'On-Ground Execution',
    title: 'On-Ground Execution & Delivery',
    desc: 'The final mile that makes or breaks an event. Our on-ground team coordinates every moving part in real time — so you focus on your guests, not the chaos.',
    points: ['Real-time event coordination', 'Guest management & VIP handling', 'Crisis response & contingency', 'Post-event reporting & debrief'],
    image: 'https://kkanfilvlittraukxrhb.supabase.co/storage/v1/object/public/gallery/uploads/1785144700459_t7vb7r.jpg',
    tag: 'Real-Time Floor Command',
    href: '/management',
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
      className="group"
    >
      {/* Top divider */}
      <div className="w-full h-px transition-colors duration-500 group-hover:bg-[#f3c892]/40" style={{ background: '#1e1c1a' }} />

      <div className="relative py-14 md:py-20 px-0 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Watermark number — far right */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none leading-none transition-opacity duration-500 group-hover:opacity-10"
          style={{
            fontSize: 'clamp(100px, 16vw, 220px)',
            color: '#f3c892',
            opacity: 0.035,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {svc.num}
        </span>

        {/* Vertical gold accent line — left edge */}
        <div
          className="absolute left-0 top-14 bottom-14 w-px hidden md:block transition-all duration-500 group-hover:bg-[#f3c892] group-hover:w-[2px]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(243,200,146,0.25), transparent)' }}
        />

        {/* Left Column: Details (7 cols on desktop) */}
        <div className="md:pl-8 lg:col-span-7 relative z-10">
          {/* Category label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs tracking-[0.35em] uppercase font-bold" style={{ color: '#f3c892' }}>
              {svc.num}
            </span>
            <div className="w-8 h-px bg-[#f3c892]" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase font-bold" style={{ color: '#f3c892' }}>
              {svc.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-bold text-white mb-4 leading-tight transition-colors duration-300 group-hover:text-[#f3c892]"
            style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.2rem)' }}
          >
            {svc.title}
          </h2>

          {/* Description */}
          <p
            className="leading-relaxed mb-6 max-w-xl"
            style={{ color: '#a39e98', fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)' }}
          >
            {svc.desc}
          </p>

          {/* Bullet points */}
          <ul className="space-y-2 mb-8">
            {svc.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-sm text-[#7a746e]">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#f3c892]" />
                {pt}
              </li>
            ))}
          </ul>

          {/* Action Link */}
          <Link
            href={svc.href}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 text-white/80 group-hover:text-[#f3c892] hover:translate-x-1"
          >
            Explore {svc.category}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#f3c892]" />
          </Link>
        </div>

        {/* Right Column: Project Spotlight Hover Card (5 cols on desktop) */}
        <div className="lg:col-span-5 relative z-10 flex justify-end">
          <Link
            href={svc.href}
            className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden border border-[#282624] transition-all duration-500 group-hover:border-[#f3c892]/50 group-hover:shadow-[0_12px_40px_rgba(243,200,146,0.12)] group-hover:-translate-y-1 block"
            style={{ background: '#141312' }}
          >
            <Image
              src={svc.image}
              alt={svc.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/90 via-[#0c0b0a]/20 to-transparent pointer-events-none" />

            {/* Live Tag Pill */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-[#0c0b0a]/80 backdrop-blur-md text-[#f3c892] border border-[#f3c892]/30 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3c892] animate-pulse" />
                {svc.tag}
              </span>
            </div>

            {/* Bottom reveal bar on hover */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="text-xs font-semibold text-white/90 drop-shadow">
                {svc.category}
              </span>
              <span className="text-xs font-bold text-[#f3c892] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Service &rarr;
              </span>
            </div>
          </Link>
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
