'use client';

import { ArrowRight, Sparkles, LayoutTemplate, Palette, CheckCircle2, Calendar, Users, Mic2, Camera, Speaker, UtensilsCrossed, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

const PROCESS_STEPS = [
  {
    icon: Sparkles,
    num: '01',
    title: 'Discovery &amp; Strategy',
    desc: 'We deep-dive into your brand, audience, and event objectives to build a bulletproof execution plan tailored to your goals.'
  },
  {
    icon: LayoutTemplate,
    num: '02',
    title: 'Concept &amp; Design',
    desc: 'Our creative team develops stunning stage designs, floor plans, and themes that bring your vision to life.'
  },
  {
    icon: Palette,
    num: '03',
    title: 'Vendor Sourcing',
    desc: 'We leverage our extensive network of premium vendors for AV, lighting, F&amp;B, and decor to get you the best rates.'
  },
  {
    icon: CheckCircle2,
    num: '04',
    title: 'Flawless Execution',
    desc: 'With our roots in manpower, our on-ground execution is unmatched. We manage the floor so you can enjoy the event.'
  }
];

const EVENT_TYPES = [
  { title: 'Corporate Summits', desc: 'Conferences, product launches, and annual meets', icon: Calendar },
  { title: 'Award Ceremonies', desc: 'Stage production, scripting, and live coordination', icon: Star },
  { title: 'Private Celebrations', desc: 'Luxury weddings, receptions, and milestone events', icon: Sparkles },
  { title: 'Brand Activations', desc: 'Experiential marketing and pop-up experiences', icon: Mic2 },
  { title: 'Exhibition Setups', desc: 'Booth design, logistics, and on-ground staff', icon: MapPin },
  { title: 'Social Gatherings', desc: 'Cocktail parties, galas, and networking events', icon: UtensilsCrossed },
];

const CAPABILITIES = [
  { icon: LayoutTemplate, title: 'Venue Sourcing', desc: 'Access to 200+ premium venues across Karnataka' },
  { icon: Palette, title: 'Theme &amp; Decor', desc: 'Custom stage design, floral, and immersive setups' },
  { icon: Speaker, title: 'AV &amp; Production', desc: 'Sound, lighting, LED walls, and live streaming' },
  { icon: Camera, title: 'Content &amp; Media', desc: 'Photography, videography, and social media coverage' },
  { icon: UtensilsCrossed, title: 'F&amp;B Management', desc: 'Catering coordination and bar service setup' },
  { icon: Users, title: 'On-Ground Crew', desc: 'Our staffing backbone ensures flawless execution' },
];

const STATS = [
  { value: '50+', label: 'Events Managed' },
  { value: '200+', label: 'Vendor Network' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Event Support' },
];

export default function ManagementPage() {
  return (
    <div className="min-h-screen bg-[#0a0908]">

      {/* ══════════════════════════════════════════════
          SECTION 1: Premium Hero
      ══════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/80 via-[#0a0908]/50 to-[#0a0908]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-premium-grid opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ background: 'rgba(243,200,146,0.08)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Full-Service Event Production
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              We Don&apos;t Just Plan Events. <br/>
              <span className="gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>We Engineer Experiences.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#c8c3be] mb-10 max-w-2xl mx-auto leading-relaxed">
              For years, we&apos;ve been the operational backbone of Karnataka&apos;s biggest events. Now, we bring that unmatched on-ground expertise to end-to-end event management.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/build-your-event" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 shadow-2xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
                style={{ background: '#f3c892', color: '#0c0b0a' }}
              >
                Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 border-white/20 text-white hover:border-[#f3c892] hover:text-[#f3c892] transition-all"
              >
                View Our Work
              </Link>
            </div>
          </Reveal>

          {/* Stats bar */}
          <Reveal delay={0.5}>
            <div className="mt-16 inline-flex flex-wrap justify-center items-center gap-0 rounded-full" style={{ background: 'rgba(12,11,10,0.7)', border: '1px solid rgba(42,42,42,0.8)', backdropFilter: 'blur(12px)', padding: '0.75rem 2rem' }}>
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="flex flex-col items-center px-4 sm:px-6 py-1">
                    <span className="font-black text-2xl sm:text-3xl" style={{ color: '#f3c892' }}>{stat.value}</span>
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest mt-1" style={{ color: '#a39e98' }}>{stat.label}</span>
                  </div>
                  {i < STATS.length - 1 && <div className="w-px h-10 bg-[#2a2a2a]" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2: Event Types We Handle
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0c0b0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-premium-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
                ● WHAT WE PRODUCE
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
                Events We{' '}
                <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  Specialize In
                </em>
              </h2>
              <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Every event is unique. We bring the same level of precision and creativity to each one.</p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_TYPES.map((event) => {
              const Icon = event.icon;
              return (
                <StaggerItem key={event.title}>
                  <div className="group p-8 rounded-3xl border border-[#282624] bg-[#141312] hover:bg-[#1a1918] transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#f3c892] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-3xl" />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                      <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-[#a39e98] text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3: Our Process (Timeline Style)
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0a0908] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(243,200,146,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
                ● HOW WE WORK
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Our Blueprint for{' '}
                <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  Success
                </em>
              </h2>
              <p className="text-[#a39e98] text-lg max-w-2xl mx-auto">Because we started in manpower, we know that a great concept means nothing without flawless execution.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={idx} delay={0.1 * idx}>
                  <div className="relative group">
                    {/* Connector line (hidden on last item and mobile) */}
                    {idx < PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-[-2rem] h-px bg-gradient-to-r from-[#f3c892]/30 to-transparent" />
                    )}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)' }}>
                        <div className="absolute inset-0 rounded-full bg-[#f3c892]/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                        <Icon className="w-8 h-8 relative z-10" style={{ color: '#f3c892' }} />
                      </div>
                      <span className="text-xs font-black tracking-[0.2em] uppercase mb-2 block" style={{ color: '#f3c892' }}>{step.num}</span>
                      <h3 className="text-lg font-bold text-white mb-3" dangerouslySetInnerHTML={{ __html: step.title }} />
                      <p className="text-[#a39e98] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4: Our Capabilities
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0c0b0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-premium-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <Reveal>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
                  ● WHAT WE BRING TO THE TABLE
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                  Everything You Need,{' '}
                  <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                    Under One Roof
                  </em>
                </h2>
                <p className="text-[#a39e98] text-lg leading-relaxed mb-8">
                  Stop managing 10 different vendors. We coordinate every moving part — from venue to AV to catering — so you get one point of contact and zero stress.
                </p>
                <Link 
                  href="/build-your-event"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)]"
                  style={{ background: '#f3c892', color: '#0c0b0a' }}
                >
                  Start Planning <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>

            {/* Right: Capability Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <StaggerItem key={cap.title}>
                    <div className="group p-6 rounded-2xl border border-[#282624] bg-[#141312] hover:border-[#f3c892]/30 transition-all duration-300">
                      <Icon className="w-6 h-6 mb-3" style={{ color: '#f3c892' }} />
                      <h4 className="text-white font-bold mb-1" dangerouslySetInnerHTML={{ __html: cap.title }} />
                      <p className="text-[#66625d] text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: cap.desc }} />
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5: Why MV Groups
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0a0908] relative overflow-hidden border-t border-[#1a1918]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#c9a84c' }}>
              ● OUR EDGE
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-16 leading-tight">
              Why Clients Choose{' '}
              <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                MV Groups
              </em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)' }}>
                  <Users className="w-7 h-7" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Staffing DNA</h3>
                <p className="text-[#a39e98] text-sm leading-relaxed">We started in manpower. That means our on-ground execution is unmatched — we don&apos;t just plan, we deliver with trained professionals.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)' }}>
                  <MapPin className="w-7 h-7" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Local Expertise</h3>
                <p className="text-[#a39e98] text-sm leading-relaxed">Deep knowledge of Karnataka&apos;s best venues, vendors, and logistics — we know the terrain like no one else.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)' }}>
                  <CheckCircle2 className="w-7 h-7" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Single Point of Contact</h3>
                <p className="text-[#a39e98] text-sm leading-relaxed">One dedicated project manager handles everything — vendors, timelines, budgets, and day-of coordination.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: Premium CTA
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden bg-[#0c0b0a] border-t border-[#1a1918]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#282624 1px, transparent 1px), linear-gradient(90deg, #282624 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="w-20 h-20 bg-[#f3c892]/10 border border-[#f3c892]/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-[#f3c892] blur-[20px] opacity-20 rounded-full animate-pulse" />
            <Sparkles className="w-8 h-8 relative z-10" style={{ color: '#f3c892' }} />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Ready to create <br/>
            <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>something unforgettable</em>?
          </h2>

          <p className="text-xl text-[#a39e98] mb-12 max-w-2xl mx-auto">
            Let&apos;s turn your vision into a flawlessly executed event. Start with a free strategy call.
          </p>

          <Link 
            href="/build-your-event"
            className="inline-flex items-center justify-center gap-3 bg-white text-[#0c0b0a] font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            Plan Your Event
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
