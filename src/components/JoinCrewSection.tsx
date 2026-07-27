'use client';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Gem, Sparkles, Briefcase } from 'lucide-react';

const CRITERIA = [
  { icon: ShieldCheck, title: 'Flawless Background', desc: 'Pre-screened and fully vetted' },
  { icon: Gem, title: 'Impeccable Grooming', desc: 'Strict aesthetic & presentation standards' },
  { icon: Sparkles, title: 'Hospitality Trained', desc: 'Mastery in etiquette and protocol' },
  { icon: Briefcase, title: 'High-Stakes Ready', desc: 'Thrives in high-pressure live environments' },
];

export default function JoinCrewSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0c0b0a]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(243,200,146,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#282624] rounded-3xl p-8 lg:p-16 bg-[#121110] relative overflow-hidden">
          
          {/* Decorative Corner */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#f3c892] opacity-5 blur-[80px] rounded-full" />

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 text-left">
              <p className="text-[#f3c892] text-xs font-bold tracking-[0.2em] uppercase mb-4">The Standard</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                Not everyone makes the cut.
              </h2>
              <p className="text-[#a39e98] leading-relaxed text-lg mb-10 max-w-md">
                We don't do "gig work". We curate an exclusive roster of top-tier talent. If you have the grace for high-end hospitality or the grit for live production, you belong here.
              </p>
              
              <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-bold text-[#0c0b0a] bg-[#f3c892] hover:bg-[#e5b980] px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(243,200,146,0.3)] hover:shadow-[0_0_30px_rgba(243,200,146,0.5)] hover:-translate-y-0.5">
                Apply to the Elite Roster
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {CRITERIA.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="p-6 bg-[#1a1918] border border-[#282624] rounded-2xl flex flex-col gap-4 group hover:border-[#f3c892]/50 transition-all">
                    <Icon className="w-8 h-8 text-[#f3c892] group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{c.title}</h3>
                      <p className="text-[#66625d] text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
