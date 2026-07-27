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
    <section className="py-14" style={{ background: '#0c0b0a', borderBottom: '1px solid #1a1918' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.2}>
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c9a84c]">
              ● Trusted by Teams Across India
            </p>
          </div>
        </Reveal>
        
        <StaggerContainer className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {LOGOS.map((logo) => (
            <StaggerItem key={logo.id}>
              <div className="group flex flex-col items-center justify-center gap-2 cursor-default">
                <div className="relative w-auto h-10 flex items-center justify-center opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={160}
                    height={40}
                    className="object-contain h-10 w-auto"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
