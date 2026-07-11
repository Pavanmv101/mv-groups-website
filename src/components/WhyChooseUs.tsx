'use client';

import { useEffect, useRef, useState } from 'react';
import { WHY_CHOOSE_US } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WhyChooseUs() {
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
    <section ref={ref} className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="Built on Trust, Driven by Excellence"
          description="We combine industry expertise with operational precision to deliver staffing and event solutions you can rely on."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`text-center ${
                  visible
                    ? `animate-fade-in-up delay-${(index + 1) * 100}`
                    : 'opacity-0'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-5 shadow-lg shadow-navy-900/20">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
