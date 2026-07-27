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
    <section className="py-32 relative overflow-hidden" style={{ background: '#0a0908' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c9a84c] mb-4">● The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            How We <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Curate</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col relative group hover:border-[#f3c892]/50 transition-colors h-[340px]">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[#f3c892] font-black text-xl">{step.id}</span>
                  <Icon className="w-6 h-6 text-[#66625d] group-hover:text-[#f3c892] transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-[#a39e98] leading-relaxed text-sm flex-grow">{step.desc}</p>
                
                {step.cta ? (
                  <Link
                    href={step.cta}
                    className="mt-6 self-end inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2a2a2a] text-white group-hover:bg-[#f3c892] group-hover:text-black transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="mt-6 self-end inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2a2a2a] text-[#66625d] group-hover:bg-[#282624] group-hover:text-white transition-colors cursor-default">
                    <ArrowRight className="w-4 h-4 opacity-30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
