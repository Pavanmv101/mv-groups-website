import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

const LOGOS = [
  { id: 1, name: 'Frigus Fiesta Entertainments', location: 'Hyderabad', src: '/images/logo-frigus-fiesta.jpg' },
  { id: 2, name: 'Dreamcraft Events & Experiences', location: 'Bangalore', src: '/images/logo-dreamcraft.jpg' },
  { id: 3, name: 'Futurex', location: 'Delhi', src: '/images/logo-futurex.jpg' },
  { id: 4, name: 'Electronic & Print Media Networks', location: 'Delhi', src: '/images/logo-print-media.jpg' },
  { id: 5, name: 'Wewaah Weddings & Experiences', location: 'Bangalore', src: '/images/logo-wewaah.jpg' },
];

export default function ClientLogos() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0c0b0a', borderBottom: '1px solid #1a1918' }}>
      
      {/* ── Animated Background Blobs ── */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#f3c892] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob pointer-events-none transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#e5b980] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob animation-delay-4000 pointer-events-none transform -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0.2}>
          <p
            className="text-center text-[11px] font-bold tracking-[0.2em] uppercase mb-12"
            style={{ color: '#c9a84c' }}
          >
            Trusted by Teams Across India
          </p>
        </Reveal>
        <StaggerContainer className="flex flex-row justify-center items-start gap-10 md:gap-12 w-full max-w-6xl mx-auto flex-wrap md:flex-nowrap">
          {LOGOS.map((logo) => (
            <StaggerItem key={logo.id} className="flex-1 flex flex-col items-center justify-start min-w-[160px] gap-5 group cursor-default">
              <div className="relative h-24 w-44 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
              <div className="text-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xs md:text-[13px] font-bold text-white tracking-widest uppercase mb-1.5 leading-snug">
                  {logo.name}
                </h4>
                <p className="text-[10px] md:text-[11px] font-medium text-[#c9a84c] tracking-[0.2em] uppercase">
                  {logo.location}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
