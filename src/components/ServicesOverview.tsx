'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ServicesOverview() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Comprehensive Staffing & Event Solutions"
          description="From deploying skilled workforce to managing world-class tech events, we deliver end-to-end solutions tailored to your business needs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden ${
                  visible
                    ? `animate-fade-in-up delay-${(index + 1) * 100}`
                    : 'opacity-0'
                }`}
              >
                {/* Gradient accent top */}
                <div className="absolute top-0 left-0 right-0 h-1 gradient-blue opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/booking?service=${service.id}`}
                  className="mt-6 flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
