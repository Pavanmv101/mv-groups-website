'use client';

import { ShieldCheck, UserCheck, GraduationCap, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';

const VETTING_STEPS = [
  {
    icon: ShieldCheck,
    title: '1. Strict Background Checks',
    description: 'Every candidate undergoes a comprehensive identity and background verification before joining our roster.',
    points: ['Aadhaar & ID Verification', 'Past Employment Checks', 'Police Verification (for Security roles)']
  },
  {
    icon: UserCheck,
    title: '2. In-Person Interviews',
    description: 'We do not hire based on resumes alone. Our HR team conducts rigorous face-to-face evaluations.',
    points: ['Communication Skills Assessment', 'Situation Handling Tests', 'Grooming & Presentation Standards']
  },
  {
    icon: GraduationCap,
    title: '3. Hospitality & Etiquette Training',
    description: 'Staff are trained to represent your brand flawlessly, handling high-pressure event environments with grace.',
    points: ['VIP & Guest Handling Etiquette', 'Crisis Management & De-escalation', 'Brand Ambassadorship Guidelines']
  }
];

export default function VettingProcess() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0a0908' }}>
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #f3c892 0%, transparent 70%)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
            >
              The MV Groups Standard
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
              We Don&apos;t Just Supply Staff.<br/>
              <span style={{ color: '#f3c892' }}>We Provide Professionals.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[#a39e98] leading-relaxed">
              Our industry-leading vetting and training process ensures that every person who steps onto your event floor is reliable, articulate, and ready to elevate your brand.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(243,200,146,0.3), transparent)' }} />

          {VETTING_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={0.3 + (index * 0.15)}>
              <div 
                className="h-full p-8 rounded-3xl relative transition-all duration-300 hover:-translate-y-2 group"
                style={{ 
                  background: 'rgba(20, 19, 18, 0.8)', 
                  border: '1px solid rgba(40, 38, 36, 1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at top right, rgba(243,200,146,0.05), transparent 70%)' }} />
                
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 relative z-10 mx-auto md:mx-0 shadow-lg"
                  style={{ background: '#0c0b0a', border: '1px solid rgba(243,200,146,0.3)' }}
                >
                  <step.icon className="w-8 h-8" style={{ color: '#f3c892' }} />
                  {/* Step number indicator */}
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#f3c892', color: '#0c0b0a' }}>
                    {index + 1}
                  </div>
                </div>

                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-4">{step.title.split('. ')[1]}</h3>
                  <p className="text-[#a39e98] text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#c8c3be] text-left">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 opacity-70" style={{ color: '#f3c892' }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
