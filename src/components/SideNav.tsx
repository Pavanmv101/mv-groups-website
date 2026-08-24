"use client";

import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: '01 — HERO' },
  { id: 'process', label: '02 — PROCESS' },
  { id: 'services', label: '03 — SERVICES' },
  { id: 'trust', label: '04 — TRUST' },
  { id: 'crew', label: '05 — CREW' },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px', 
      }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end gap-8 group">
      <div className="absolute right-[3px] top-2 bottom-2 w-[1px] bg-white/10 z-0 pointer-events-none" />
      
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button 
            key={id}
            onClick={() => scrollToSection(id)}
            className="relative flex items-center gap-4 z-10 cursor-pointer"
            aria-label={`Scroll to ${label}`}
          >
            <span 
              className={`text-[9px] font-bold tracking-[0.25em] transition-all duration-300 ease-out ${
                isActive 
                  ? 'text-[#f3c892] opacity-100 translate-x-0' 
                  : 'text-white/50 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white'
              }`}
            >
              {label}
            </span>
            <div 
              className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#f3c892] shadow-[0_0_12px_rgba(243,200,146,0.6)] scale-100' 
                  : 'bg-white/20 scale-50 group-hover:scale-75 group-hover:bg-white/50'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
