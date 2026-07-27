'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Users, CalendarCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  {
    id: '01',
    title: 'Consultation & Scoping',
    desc: 'We analyze your event requirements, from guest count to specific talent needs, ensuring we perfectly match the profile of your brand.',
    icon: ClipboardCheck,
    cta: '/contact'
  },
  {
    id: '02',
    title: 'Talent Curation',
    desc: 'Our team hand-selects the ideal hospitality, promotional, or technical staff from our vetted roster, specifically chosen for your event type.',
    icon: Users,
    cta: null
  },
  {
    id: '03',
    title: 'Flawless Execution',
    desc: 'On event day, our dedicated supervisors ensure precise deployment, immaculate grooming, and seamless integration with your core team.',
    icon: CalendarCheck,
    cta: null
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-linked progress bar for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0a0908' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-24">
          <p className="text-[#f3c892] text-xs font-bold tracking-[0.2em] uppercase mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            How We <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Curate</em>
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Central Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-[#282624] -translate-x-1/2" />
          
          {/* Active Line */}
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 w-[2px] bg-[#f3c892] -translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_#f3c892]"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-32">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Half */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                    <span className="text-[#282624] font-black text-7xl md:text-8xl mb-2 block leading-none tracking-tighter">{step.id}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-[#a39e98] leading-relaxed mb-6 text-sm md:text-base">{step.desc}</p>
                    
                    {step.cta && (
                      <Link
                        href={step.cta}
                        className={`inline-flex items-center gap-2 text-sm font-bold text-[#f3c892] hover:text-white transition-colors ${isEven ? 'md:justify-end md:w-full' : ''}`}
                      >
                        Start Your Consultation
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-[28px] md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#141312] border-2 border-[#282624] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Icon className="w-6 h-6 text-[#f3c892]" />
                  </div>
                  
                  {/* Empty Space for Grid Alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
