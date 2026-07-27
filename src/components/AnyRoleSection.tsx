'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const CAPABILITIES = [
  'VIP Protocol Officers', 'Multilingual Ushers', 'Brand Ambassadors',
  'Mixologists', 'Event Producers', 'Technical Runners',
  'Stage Managers', 'Security Directors', 'Lead Generators',
  'Registration Techs', 'Valet Coordinators', 'Show Callers'
];

export default function AnyRoleSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Randomly light up capabilities to create a living "cloud" effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * CAPABILITIES.length);
      setActiveIndex(randomIdx);
      
      setTimeout(() => {
        setActiveIndex(null);
      }, 1500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#121110]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <div className="lg:w-1/3">
            <p className="text-[#f3c892] text-xs font-bold tracking-[0.2em] uppercase mb-4">The Talent</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Any role.<br/>
              <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                Any scale.
              </em>
            </h2>
            <p className="text-[#a39e98] leading-relaxed mb-8">
              From a single high-profile brand ambassador to a 500-person coordinated ground team, our network scales instantly to meet the demands of your event.
            </p>
            <Link href="/booking" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#f3c892]/10 hover:bg-[#f3c892]/20 border border-[#f3c892]/30 px-6 py-3 rounded-full transition-all">
              Curate Your Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Capabilities Grid */}
          <div className="lg:w-2/3">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {CAPABILITIES.map((cap, i) => {
                const isActive = activeIndex === i;
                
                return (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="cursor-default transition-all duration-500"
                    style={{
                      background: isActive ? '#f3c892' : '#1a1918',
                      border: isActive ? '1px solid #f3c892' : '1px solid #282624',
                      color: isActive ? '#0a0908' : '#c8c3be',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      boxShadow: isActive ? '0 0 20px rgba(243,200,146,0.3)' : 'none',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {cap}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
