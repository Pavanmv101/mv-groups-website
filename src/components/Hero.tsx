'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <section 
      className="relative w-full h-[100svh] flex flex-col md:flex-row overflow-hidden bg-[#0a0908]"
    >
      {/* ── Left Pillar: Event Manpower ── */}
      <motion.div
        className="relative h-1/2 md:h-full flex-shrink-0 flex items-center justify-center cursor-pointer border-b md:border-b-0 md:border-r border-[#282624] overflow-hidden group"
        initial={{ flexBasis: '50%' }}
        animate={{
          flexBasis: hoveredSide === 'left' ? '70%' : hoveredSide === 'right' ? '30%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image/Video */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600)' }}
        />
        
        {/* Dynamic Dark Overlay based on hover state */}
        <motion.div 
          className="absolute inset-0 bg-[#0a0908]"
          animate={{ opacity: hoveredSide === 'right' ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 w-full max-w-2xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            animate={{ 
              opacity: hoveredSide === 'right' ? 0.3 : 1,
              y: hoveredSide === 'left' ? -10 : 0 
            }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-lg" style={{ background: 'rgba(20, 19, 18, 0.8)', border: '1px solid rgba(243,200,146,0.3)', backdropFilter: 'blur(10px)' }}>
              <Users className="w-6 h-6" style={{ color: '#f3c892' }} />
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
              Event Staffing <br className="hidden md:block" />
              <span style={{ color: '#f3c892' }}>& Manpower</span>
            </h1>
            
            <AnimatePresence mode="wait">
              {(!hoveredSide || hoveredSide === 'left') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm md:text-base text-[#c8c3be] mb-8 max-w-md mx-auto md:mx-0">
                    The reliable backbone of Karnataka&apos;s biggest events. We supply vetted VIP hospitality, security, promoters, and logistics crew.
                  </p>
                  <Link 
                    href="/staffing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    Enter Staffing Portal <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Pillar: Event Management ── */}
      <motion.div
        className="relative h-1/2 md:h-full flex-shrink-0 flex items-center justify-center cursor-pointer overflow-hidden group"
        initial={{ flexBasis: '50%' }}
        animate={{
          flexBasis: hoveredSide === 'right' ? '70%' : hoveredSide === 'left' ? '30%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image/Video */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505236858219-8373dd707522?auto=format&fit=crop&q=80&w=1600)' }}
        />
        
        {/* Dynamic Dark Overlay based on hover state */}
        <motion.div 
          className="absolute inset-0 bg-[#0a0908]"
          animate={{ opacity: hoveredSide === 'left' ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 w-full max-w-2xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            animate={{ 
              opacity: hoveredSide === 'left' ? 0.3 : 1,
              y: hoveredSide === 'right' ? -10 : 0
            }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-lg" style={{ background: 'rgba(20, 19, 18, 0.8)', border: '1px solid rgba(243,200,146,0.3)', backdropFilter: 'blur(10px)' }}>
              <Award className="w-6 h-6" style={{ color: '#f3c892' }} />
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
              End-to-End <br className="hidden md:block" />
              <span style={{ color: '#f3c892' }}>Event Planning</span>
            </h1>

            <AnimatePresence mode="wait">
              {(!hoveredSide || hoveredSide === 'right') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm md:text-base text-[#c8c3be] mb-8 max-w-md mx-auto md:mx-0">
                    From concept to flawless execution. We design, produce, and manage premium corporate and social events.
                  </p>
                  <Link 
                    href="/management" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    Enter Management Portal <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Central MV Groups Branding (Hidden on mobile) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 hidden md:block pointer-events-none">
         <div
            className="font-black text-white tracking-[0.22em] text-center"
            style={{ fontSize: '16px', letterSpacing: '0.22em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            MV GROUPS
          </div>
      </div>
    </section>
  );
}
