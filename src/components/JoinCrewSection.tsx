import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BENEFITS = [
  { icon: '₹', title: 'Paid Work', desc: 'Same-week payouts' },
  { icon: '🎓', title: 'Training', desc: 'On-the-job upskilling' },
  { icon: '🎪', title: 'Top Events', desc: 'Concerts, weddings, brand launches' },
  { icon: '⭐', title: 'Real Career', desc: 'Grow into a team lead' },
];

export default function JoinCrewSection() {
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label justify-center">● FOR VOLUNTEERS</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Join the MV Groups Crew
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#999999' }}>
            Work the biggest events across Karnataka. Get trained, get paid, and build a real career
            in live events.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-xl p-6 text-center transition-all duration-300"
              style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                {b.icon}
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{b.title}</h3>
              <p className="text-xs" style={{ color: '#555555' }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/careers" className="btn-gold text-sm px-10 py-4">
            Fill Out Application Form
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs" style={{ color: '#555555' }}>
            Takes under 3 minutes · No prior experience needed
          </p>
        </div>
      </div>
    </section>
  );
}
