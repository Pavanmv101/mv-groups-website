'use client';

import { useEffect, useRef, useState } from 'react';
import { HOW_IT_WORKS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function HowItWorks() {
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
          label="How It Works"
          title="Three Simple Steps to Get Started"
          description="Getting the workforce or event support you need is easy. Here's how we work together."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div
                key={item.step}
                className={`relative text-center ${
                  visible
                    ? `animate-fade-in-up delay-${(index + 1) * 200}`
                    : 'opacity-0'
                }`}
              >
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 rounded-full gradient-blue flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>

                {/* Mobile connector */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-blue-200" />
                )}

                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
