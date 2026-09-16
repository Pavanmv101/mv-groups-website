'use client';

import { ArrowRight, Sparkles, LayoutTemplate, Palette, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/animations/Reveal';

const PROCESS_STEPS = [
  {
    icon: Sparkles,
    title: '1. Discovery & Strategy',
    desc: 'We start by understanding your brand, audience, and event objectives to build a bulletproof execution plan.'
  },
  {
    icon: LayoutTemplate,
    title: '2. Concept & Design',
    desc: 'Our creative team develops stunning stage designs, floor plans, and themes tailored to your vision.'
  },
  {
    icon: Palette,
    title: '3. Vendor Sourcing',
    desc: 'We leverage our extensive network of premium vendors for AV, lighting, F&B, and decor to get you the best rates.'
  },
  {
    icon: CheckCircle2,
    title: '4. Flawless Execution',
    desc: 'With our roots in manpower, our on-ground execution is unmatched. We manage the floor so you can enjoy the event.'
  }
];

export default function ManagementPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] pt-24 pb-20">
      {/* ── Premium Hero ── */}
      <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505236858219-8373dd707522?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#0a0908]/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
              Full-Service Event Production
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              We Don&apos;t Just Plan Events. <br/>
              <span style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>We Engineer Experiences.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#c8c3be] mb-10 max-w-2xl mx-auto leading-relaxed">
              For years, we’ve been the operational backbone of Karnataka’s biggest events. Now, we bring that unmatched on-ground expertise to end-to-end event management.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link 
              href="/build-your-event" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 shadow-2xl"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Our Blueprint for Success</h2>
          <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Because we started in manpower, we know that a great concept means nothing without flawless execution. Here is our 4-step process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div className="p-8 rounded-3xl h-full border border-[#282624] bg-[#141312] hover:bg-[#1a1918] transition-colors relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f3c892] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-3xl" />
                <step.icon className="w-10 h-10 mb-6" style={{ color: '#f3c892' }} />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#a39e98] leading-relaxed text-sm">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: '#f3c892' }}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000')] bg-cover mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#0a0908] mb-6">Ready to elevate your next event?</h2>
            <p className="text-[#403e3c] text-lg mb-8 max-w-xl mx-auto font-medium">Stop managing 10 different vendors. Let MV Groups handle the stress while you take the credit.</p>
            <Link 
              href="/build-your-event" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all shadow-xl bg-[#0a0908] text-white hover:bg-[#1a1918]"
            >
              Start Planning Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
