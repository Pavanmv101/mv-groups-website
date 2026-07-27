import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const MINI_CARDS = [
  {
    icon: '📸',
    title: 'Signature Events',
    subtitle: 'Events we\'ve powered',
    href: '/gallery',
  },
  {
    icon: '📝',
    title: 'Read Updates',
    subtitle: 'News & field notes',
    href: '/updates',
  },
  {
    icon: '💬',
    title: 'Start a Conversation',
    subtitle: 'Same-day quote',
    href: '/contact',
  },
];

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA card */}
        <div
          className="rounded-2xl p-10 lg:p-16 mb-6"
          style={{ background: '#111111', border: '1px solid #2a2a2a' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="section-label">● KEEP EXPLORING</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight max-w-lg">
                There&apos;s more to{' '}
                <em
                  className="not-italic"
                  style={{ color: '#c9a84c', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}
                >
                  the story.
                </em>
              </h2>
              <p className="mt-4 text-sm max-w-md" style={{ color: '#999999' }}>
                Browse our signature events, read our updates, or just start a conversation — we reply the same day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/booking" className="btn-gold text-sm px-8 py-3.5">
                Book Event Staff
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="btn-outline text-sm px-8 py-3.5"
              >
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Three mini explore cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MINI_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col justify-between rounded-xl p-6 transition-all duration-300"
              style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
              }}
            >
              {/* Arrow top right */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-2xl">{card.icon}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: '#c9a84c' }}
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">{card.title}</h3>
                <p className="text-xs" style={{ color: '#555555' }}>{card.subtitle}</p>
              </div>
              {/* Gold bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ background: '#c9a84c' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
