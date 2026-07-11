import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 gradient-navy overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
          Ready to get started?
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Let&apos;s Build Something{' '}
          <span className="gradient-text">Great Together</span>
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
          Whether you need 10 staff for a weekend event or 500 professionals for a long-term
          project, MV Groups delivers. Get a custom quote in 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`tel:${COMPANY.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
