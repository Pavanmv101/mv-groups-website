'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, LayoutTemplate, Palette, Camera, Speaker, UtensilsCrossed, Mic2, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

const MANAGEMENT_SERVICES = [
  {
    id: 'event_planning',
    icon: LayoutTemplate,
    title: 'End-to-End Event Planning',
    desc: 'From concept to flawless execution — venue sourcing, vendor coordination, and day-of management.',
    features: ['Venue Sourcing & Booking', 'Vendor & Artist Management', 'Stage & Technical Production', 'On-Ground Event Coordination', 'Concept & Theme Design'],
    image: 'https://images.unsplash.com/photo-1505236858219-8373dd707522?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'stage_production',
    icon: Speaker,
    title: 'Stage & AV Production',
    desc: 'State-of-the-art sound, lighting, LED walls, and live streaming for any event scale.',
    features: ['Line Array PA Systems', 'Intelligent Stage Lighting', 'LED Video Walls', 'Trussing & Rigging', 'On-site AV Technicians'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'decor_design',
    icon: Palette,
    title: 'Decor & Stage Design',
    desc: 'Custom stage design, floral arrangements, themed setups, and branded environments.',
    features: ['Custom Stage Design', 'Floral & Fabric Decor', 'Themed Event Setups', 'Props & Centerpieces', 'Red Carpet & Backdrop Installation'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'content_media',
    icon: Camera,
    title: 'Content & Media Coverage',
    desc: 'Professional photography, cinematic videography, and social media-ready content.',
    features: ['Event Photography', 'Cinematic Videography', 'Drone Coverage', 'Instant Reels & Social Media Content', 'Photo Booths'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'catering_hospitality',
    icon: UtensilsCrossed,
    title: 'Catering & Hospitality',
    desc: 'Complete F&B coordination — menus, service staff, bar setups, and guest hospitality.',
    features: ['Menu Planning & Curation', 'Bar & Beverage Setup', 'Service Staff Coordination', 'Dietary Accommodation', 'VIP Guest Hospitality'],
    image: 'https://images.unsplash.com/photo-1559336197-ded8aaa244bc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'entertainment',
    icon: Mic2,
    title: 'Entertainment & Talent',
    desc: 'DJs, emcees, live performers, and artist management for unforgettable experiences.',
    features: ['Professional DJs', 'Event Emcees & Anchors', 'Live Band Coordination', 'Artist Booking & Management', 'Performance Choreography'],
    image: 'https://images.unsplash.com/photo-1516280440502-d2fdaa07a518?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function ManagementServicesPage() {
  return (
    <div style={{ background: '#0c0b0a', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b" style={{ borderBottomColor: '#1a1918' }}>
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }} />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.03)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-8 animate-fade-in"
            style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Management Services
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-8 animate-fade-in-up delay-100"
            style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            Full-Service Event<br />
            <span style={{ color: '#f3c892' }}>Production</span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200"
            style={{ color: '#a39e98' }}
          >
            From venue selection to post-event wrap — we handle every single detail so you can focus on what matters most.
          </p>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-8">
            {MANAGEMENT_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              const isReversed = idx % 2 === 1;

              return (
                <StaggerItem key={service.id}>
                  <div
                    className="group relative rounded-3xl overflow-hidden border border-[#282624] hover:border-[#f3c892]/30 transition-all duration-500"
                    style={{ background: idx % 2 === 0 ? '#141312' : '#0c0b0a' }}
                  >
                    <div className={`grid lg:grid-cols-2 gap-0 ${isReversed ? '' : ''}`}>
                      {/* Image Side */}
                      <div className={`relative h-64 lg:h-auto min-h-[400px] overflow-hidden ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141312]/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] to-transparent lg:hidden" />
                      </div>

                      {/* Content Side */}
                      <div className={`p-8 lg:p-14 flex flex-col justify-center ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.15)' }}>
                          <Icon className="w-7 h-7" style={{ color: '#f3c892' }} />
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{service.title}</h2>
                        <p className="text-[#a39e98] mb-8 leading-relaxed">{service.desc}</p>

                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-3 text-sm">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#f3c892' }} />
                              <span className="text-white/80">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href="/build-your-event"
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl hover:shadow-[0_8px_30px_rgba(243,200,146,0.3)] self-start"
                          style={{ background: '#f3c892', color: '#0c0b0a' }}
                        >
                          Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4 border-t border-[#1a1918]">
        <Reveal>
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: '#f3c892' }}>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0908] mb-6">Need a custom package?</h2>
              <p className="text-[#403e3c] text-lg mb-8 max-w-xl mx-auto font-medium">Every event is different. Let&apos;s build a tailored solution that fits your vision and budget.</p>
              <Link
                href="/build-your-event"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all shadow-xl bg-[#0a0908] text-white hover:bg-[#1a1918]"
              >
                Plan Your Event <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
