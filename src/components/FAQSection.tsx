'use client';

import { useState, useRef, useEffect } from 'react';

const FAQS = [
  {
    q: 'Do you provide event manpower across Karnataka?',
    a: 'Yes. MV Groups operates across the full state of Karnataka, including Bengaluru, Mysuru, Mangaluru, Hubli-Dharwad, Belagavi, and Tumakuru. We can mobilise staff for your event anywhere in the state within 24–48 hours.',
  },
  {
    q: 'How do I hire event staff on short notice?',
    a: 'Fill out our quick booking form or WhatsApp us directly at +91 93805 58344. For urgent requirements, we have a ready standby pool of trained staff and can typically confirm deployment within 6–12 hours for Bengaluru events.',
  },
  {
    q: 'What does event staffing cost?',
    a: 'Pricing depends on event type, number of staff, duration, and roles required. We offer transparent, itemised quotes with no hidden fees. Most clients receive a detailed cost breakdown within 4 hours of inquiry.',
  },
  {
    q: 'Do you supply event volunteers for college fests?',
    a: 'Absolutely. College fests are one of our specialties. We supply trained floor managers, registration desk staff, volunteer coordinators, and crowd management teams — all experienced with fast-paced college event environments.',
  },
  {
    q: 'Are you a one-stop event solution?',
    a: 'Yes. Beyond staffing, we coordinate end-to-end event support including logistics crew, stage setup teams, hospitality staff, brand activation teams, and production crew. One call covers everything.',
  },
  {
    q: 'How do I get a quote or confirm a booking?',
    a: 'You can use the "Book Event Staff" button anywhere on our site, email us at mvgroups2026@gmail.com, or WhatsApp us. We reply within 2 hours on business days and aim to send a full proposal the same day.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
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
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#0a0a0a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-14 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="section-label">● FREQUENTLY ASKED</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Event Manpower —{' '}
            <em
              className="not-italic"
              style={{ color: '#c9a84c', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}
            >
              Karnataka
            </em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: '#999999' }}>
            Straight answers from an event staffing crew that runs across Karnataka.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 60}ms`,
                  border: isOpen ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2a2a2a',
                  background: '#1a1a1a',
                  boxShadow: isOpen ? '0 0 24px rgba(201,168,76,0.08)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: isOpen ? '#c9a84c' : '#ffffff' }}>
                    {faq.q}
                  </span>
                  <span
                    className="text-2xl leading-none flex-shrink-0 font-light transition-transform duration-300"
                    style={{
                      color: '#c9a84c',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#999999' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
