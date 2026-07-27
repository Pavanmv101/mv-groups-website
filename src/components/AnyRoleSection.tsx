'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ROW1_PILLS = [
  'Registration Team', 'Greeting Team', 'Ushers', 'Seat Assigners',
  'Event Coordinator', 'MC', 'Host', 'Videographer',
];
const ROW2_PILLS = [
  'Brand Ambassadors', 'Security', 'Logistics', 'Floor Manager',
  'Backstage Runner', 'Hospitality', 'Stage Hand', 'Promoter',
];

function PillRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ display: 'flex', gap: '10px', willChange: 'transform' }}
      >
        {doubled.map((pill, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold text-white whitespace-nowrap"
            style={{ background: '#282624', border: '1px solid rgba(243,200,146,0.25)' }}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AnyRoleSection() {
  return (
    <section className="py-10 lg:py-14" style={{ background: '#0c0b0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#141312', border: '1px solid #282624' }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left — text */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <p className="section-label">BUILD YOUR OWN CREW</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
                Any role.{' '}
                <em
                  className="not-italic"
                  style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}
                >
                  Any size.
                </em>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#a39e98' }}>
                From a single promoter for a brand stall to 500 crew for a corporate summit — if it
                happens at an event, MV Groups staffs it.
              </p>
              <Link href="/booking" className="btn-gold self-start text-sm">
                Build My Crew
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — scrolling pills */}
            <div
              className="flex flex-col justify-center gap-4 py-10 lg:py-14 pr-10 pl-0 lg:pl-4"
              style={{ borderLeft: '1px solid #282624' }}
            >
              <PillRow items={ROW1_PILLS} direction="left" />
              <PillRow items={ROW2_PILLS} direction="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
