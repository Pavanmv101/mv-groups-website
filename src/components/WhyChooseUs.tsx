'use client';

import { CheckCircle2 } from 'lucide-react';

const REASONS = [
  {
    title: 'Elite Vetting Process',
    desc: 'Every candidate undergoes a rigorous 4-step interview, background check, and etiquette screening before they ever put on our uniform.'
  },
  {
    title: 'Rapid Deployment',
    desc: 'Need a team tomorrow? Our proprietary management software allows us to dispatch fully-briefed crews in under 24 hours.'
  },
  {
    title: 'Immaculate Presentation',
    desc: 'We enforce strict grooming and uniform standards. Our staff arrives looking exactly as premium as the event you are hosting.'
  },
  {
    title: 'On-Site Supervision',
    desc: 'We don’t just drop off staff. A dedicated MV Groups supervisor remains on-site to manage the crew so you can focus on your guests.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0c0b0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left - Sticky Editorial Header */}
          <div className="lg:w-1/2 relative">
            <div className="lg:sticky lg:top-32">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c9a84c] mb-4">● The MV Standard</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tighter">
                Why the best brands <br className="hidden lg:block"/>
                <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  trust us.
                </em>
              </h2>
              <p className="text-[#a39e98] leading-relaxed text-lg mb-8 max-w-md">
                We bridge the gap between temporary manpower and permanent luxury hospitality. We are your partners in perfect execution.
              </p>
            </div>
          </div>

          {/* Right - Value Props Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REASONS.map((reason, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 group hover:border-[#f3c892]/50 transition-all flex flex-col">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#141312] border border-[#282624] flex items-center justify-center group-hover:border-[#f3c892] group-hover:shadow-[0_0_15px_rgba(243,200,146,0.2)] transition-all duration-300">
                    <CheckCircle2 className="w-6 h-6 text-[#f3c892]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f3c892] transition-colors">{reason.title}</h3>
                  <p className="text-[#a39e98] leading-relaxed text-sm">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
