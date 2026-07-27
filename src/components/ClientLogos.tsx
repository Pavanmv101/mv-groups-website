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
    <section className="py-24 lg:py-32" style={{ background: '#0c0b0a', borderBottom: '1px solid #1a1918' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.2}>
          <p
            className="text-center text-[11px] font-bold tracking-[0.2em] uppercase mb-12"
            style={{ color: '#c9a84c' }}
          >
            Trusted by Teams Across India
          </p>
        </Reveal>
        <StaggerContainer className="flex flex-row justify-center items-center gap-8 md:gap-16 w-full max-w-5xl mx-auto flex-wrap md:flex-nowrap">
          {LOGOS.map((logo) => (
            <StaggerItem key={logo.id} className="flex-1 flex justify-center min-w-[120px]">
              <div className="relative h-10 w-32 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
