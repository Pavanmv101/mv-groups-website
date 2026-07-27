'use client';

import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Users, CalendarCheck } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import Constellation from './animations/Constellation';

const STEPS = [
  {
    id: '01',
    title: 'Consultation & Planning',
    desc: 'We analyze your event requirements, from guest count to specific talent needs, ensuring we perfectly match the profile of your brand.',
    icon: ClipboardCheck,
    cta: '/contact'
  },
  {
    id: '02',
    title: 'Staff Selection',
    desc: 'Our team hand-selects the ideal hospitality, promotional, or technical staff from our trusted team, specifically chosen for your event type.',
    icon: Users,
    cta: null
  },
  {
    id: '03',
    title: 'Flawless Execution',
    desc: 'On event day, our dedicated supervisors ensure precise setup, perfect presentation, and easy teamwork with your core team.',
    icon: CalendarCheck,
    cta: null
  }
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden bg-premium-grid" style={{ backgroundColor: '#0a0908' }}>
      
      {/* ── Background Effects ── */}
      <Constellation />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f3c892] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c9a06a] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
              ● The Process
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Our <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Process</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            
            return (
              <Reveal key={step.id} delay={i * 0.15}>
                <div 
                  className="relative flex flex-col h-full p-8 rounded-2xl group transition-all duration-300 hover:-translate-y-2"
                  style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-bold tracking-wider" style={{ color: '#c9a84c' }}>
                      STEP {step.id}
                    </span>
                    <Icon className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: '#c9a84c' }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-[#a39e98] leading-relaxed mb-8 flex-grow text-sm">
                    {step.desc}
                  </p>
                  
                  <div className="flex items-end justify-end mt-auto">
                    {step.cta ? (
                      <Link
                        href={step.cta}
                        className="w-10 h-10 rounded-full bg-[#2a2a2a] group-hover:bg-[#c9a84c] text-white flex items-center justify-center transition-colors"
                        aria-label={step.title}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-[#2a2a2a] text-[#2a2a2a] flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
