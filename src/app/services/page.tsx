'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Calendar,
  Megaphone,
  Store,
  Briefcase,
  HeartHandshake,
  Truck,
  Users,
  GraduationCap,
  ShoppingBag,
  Hotel,
  Rocket,
  Landmark,
  Heart,
  Trophy,
  Music,
} from 'lucide-react';
import { SERVICES, STATS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQSection from '@/components/FAQSection';

/* ------------------------------------------------------------------ */
/*  Animated entrance hook                                             */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Industries We Serve — data                                         */
/* ------------------------------------------------------------------ */
const INDUSTRIES = [
  { icon: Building2, label: 'Corporate Companies' },
  { icon: Calendar, label: 'Event Management' },
  { icon: Megaphone, label: 'Marketing Agencies' },
  { icon: Store, label: 'Exhibition Organizers' },
  { icon: HeartHandshake, label: 'Wedding Planners' },
  { icon: GraduationCap, label: 'Colleges & Universities' },
  { icon: ShoppingBag, label: 'Shopping Malls' },
  { icon: Hotel, label: 'Hotels & Convention Centers' },
  { icon: Rocket, label: 'Startups' },
  { icon: Landmark, label: 'Government Events' },
  { icon: Heart, label: 'NGOs' },
  { icon: Trophy, label: 'Sports Events' },
];

/* ------------------------------------------------------------------ */
/*  Service icon map (for the icon prop which is a component)          */
/* ------------------------------------------------------------------ */
const SERVICE_ICON_MAP: Record<string, typeof Users> = {
  event_manpower: Users,
  promotional_staffing: Megaphone,
  exhibition_staffing: Store,
  corporate_staffing: Briefcase,
  wedding_social: HeartHandshake,
  event_logistics: Truck,
};

/* ------------------------------------------------------------------ */
/*  Accent color map per service for visual variety                     */
/* ------------------------------------------------------------------ */
const ACCENT = [
  { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', gradient: 'from-violet-500 to-violet-600' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', gradient: 'from-emerald-500 to-emerald-600' },
  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', gradient: 'from-amber-500 to-amber-600' },
];

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default function ServicesPage() {
  return (
    <>
      {/* ───── Hero Banner ───── */}
      <section className="relative gradient-navy hero-pattern pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6 animate-fade-in">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-100">
            Comprehensive Staffing &{' '}
            <span className="gradient-text">Event Solutions</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Whether you need a single specialist or a 500‑strong workforce, MV
            Groups delivers tailored manpower supply and end‑to‑end event
            management across Karnataka.
          </p>
        </div>

      </section>

      {/* ───── Service Detail Sections ───── */}
      {SERVICES.map((service, idx) => {
        const accent = ACCENT[idx % ACCENT.length];
        const isReversed = idx % 2 === 1;
        const Icon = SERVICE_ICON_MAP[service.id] ?? Users;

        return (
          <ServiceDetailSection
            key={service.id}
            service={service}
            accent={accent}
            Icon={Icon}
            reversed={isReversed}
            index={idx}
          />
        );
      })}

      {/* ───── Industries We Serve ───── */}
      <IndustriesSection />

      {/* ───── Stats Band ───── */}
      <StatsBand />

      {/* ───── CTA ───── */}
      <CTABanner />
    </>
  );
}

/* ================================================================== */
/*  Service Detail Section                                             */
/* ================================================================== */
interface ServiceDetailProps {
  service: (typeof SERVICES)[number];
  accent: (typeof ACCENT)[number];
  Icon: typeof Users;
  reversed: boolean;
  index: number;
}

function ServiceDetailSection({
  service,
  accent,
  Icon,
  reversed,
  index,
}: ServiceDetailProps) {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      id={service.id}
      className={`py-20 lg:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
          style={{ direction: reversed ? 'rtl' : 'ltr' }}
        >
          {/* ── Visual card ── */}
          <div
            className={`${
              visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ direction: 'ltr' }}
          >
            <div
              className={`relative rounded-3xl ${accent.bg} border ${accent.border} p-10 lg:p-14 overflow-hidden`}
            >
              {/* Gradient corner accent */}
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${accent.gradient} opacity-10 blur-2xl`}
              />

              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mb-8 shadow-lg`}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                {service.title}
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed">
                {service.description}
              </p>

              {/* Decorative dots */}
              <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-1.5 opacity-20">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full bg-gradient-to-br ${accent.gradient}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Features list ── */}
          <div
            className={`space-y-6 ${
              visible ? 'animate-fade-in-up delay-200' : 'opacity-0'
            }`}
            style={{ direction: 'ltr' }}
          >
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${accent.bg} ${accent.text}`}
            >
              Key Capabilities
            </span>

            <ul className="space-y-4">
              {service.features.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2
                    className={`w-6 h-6 ${accent.text} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-slate-700 text-lg leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href={`/booking?service=${service.id}`}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${accent.gradient} text-white font-semibold text-base hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5`}
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Industries Section                                                 */
/* ================================================================== */
function IndustriesSection() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-24 lg:py-32 gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industries"
          title="Serving Diverse Sectors"
          description="Our staffing and event solutions span across major industry verticals. No matter your domain, we have the talent and expertise to deliver."
          light
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.label}
                className={`glass rounded-2xl p-6 text-center group hover:bg-white/15 transition-all duration-300 ${
                  visible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : 'opacity-0'
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Icon className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </div>
                <span className="text-white text-sm font-medium">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Stats Band                                                         */
/* ================================================================== */
function StatsBand() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${
                visible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : 'opacity-0'
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-1">
                {stat.value.toLocaleString('en-IN')}
                {stat.suffix}
              </div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA Banner                                                         */
/* ================================================================== */
function CTABanner() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
          Ready to Scale Your Team?
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Tell us what you need and we&apos;ll put together a custom proposal
          within 24 hours. No obligation, no hidden fees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-navy-800 text-navy-800 font-semibold text-lg hover:bg-navy-800 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
