'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0c0b0a] border-t border-[#1a1918]">
      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#282624 1px, transparent 1px), linear-gradient(90deg, #282624 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <div className="w-20 h-20 bg-[#f3c892]/10 border border-[#f3c892]/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-[#f3c892] blur-[20px] opacity-20 rounded-full animate-pulse" />
          <div className="w-8 h-8 bg-[#f3c892] rounded-full shadow-[0_0_20px_#f3c892]" />
        </div>
        
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
          Your event has <br/>
          <em className="not-italic" style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>no room</em> for error.
        </h2>
        
        <p className="text-xl text-[#a39e98] mb-12 max-w-2xl mx-auto">
          Secure your talent roster today and let our supervisors handle the ground control. We deploy the best so you can focus on the rest.
        </p>
        
        <Link 
          href="/booking"
          className="inline-flex items-center justify-center gap-3 bg-white text-[#0c0b0a] font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
        >
          Initiate Talent Request
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
