'use client';

import { useEffect, useRef, useState } from 'react';
import { Shield, Clock, Award, HeadphonesIcon } from 'lucide-react';

const ITEMS = [
  {
    icon: Shield,
    title: 'Verified & Vetted',
    description: 'Every professional in our network undergoes thorough background checks and skill verification before deployment.',
  },
  {
    icon: Clock,
    title: 'Rapid Deployment',
    description: 'Need staff in 48 hours? Our ready talent pool ensures lightning-fast mobilisation, even for large-scale events.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Strict quality standards with regular performance reviews and client feedback loops keep our crew best-in-class.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated WhatsApp support and round-the-clock operations management for every event we staff.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#141312' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-14 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="section-label">● WHY MV GROUPS</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Built on Trust,{' '}
            <em
              className="not-italic"
              style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}
            >
              Driven by Excellence
            </em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-2xl p-7 gold-card ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(243,200,146,0.1)', border: '1px solid rgba(243,200,146,0.25)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#f3c892' }} />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
