'use client';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Gem, Sparkles, Briefcase } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import Watermark from './animations/Watermark';
import Constellation from './animations/Constellation';

const CRITERIA = [
  { icon: ShieldCheck, title: 'Clean Background', desc: 'Pre-screened and fully vetted' },
  { icon: Gem, title: 'Professional Look', desc: 'Strict aesthetic & presentation standards' },
  { icon: Sparkles, title: 'Hospitality Trained', desc: 'Mastery in manners and protocol' },
  { icon: Briefcase, title: 'High-Stakes Ready', desc: 'Thrives in high-pressure live environments' },
];

export default function JoinCrewSection() {
  return (
    <section id="crew" className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0908]" style={{ borderTop: '1px solid #1a1918' }}>
      
      {/* ── Background Effects ── */}
      <Watermark text="CREW" />
      <Constellation />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f3c892] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none transform translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
              ● Join the Roster
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Not everyone makes the cut.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {CRITERIA.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center p-6 group">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-6 group-hover:bg-[#c9a84c] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#c9a84c] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-[#c9a84c] transition-colors">{c.title}</h3>
                  <p className="text-[#a39e98] text-sm leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="flex justify-center">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-bold text-[#0c0b0a] bg-[#c9a84c] hover:bg-white px-8 py-4 rounded-full transition-all hover:-translate-y-1">
              Apply to the Elite Roster
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
