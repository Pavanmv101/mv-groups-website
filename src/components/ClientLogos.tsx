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
          <p
            className="text-center text-xs font-bold tracking-[0.18em] uppercase mb-10"
            style={{ color: '#66625d' }}
          >
            Trusted by Teams Across India
          </p>
        </Reveal>
        <StaggerContainer className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {LOGOS.map((logo) => (
            <StaggerItem key={logo.id}>
              <div className="flex flex-col items-center gap-2">
                {/* .logo-card handles grayscale → colour on :hover via pure CSS */}
              <div className="logo-card relative w-28 h-16 rounded-lg overflow-hidden flex items-center justify-center p-2">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain p-1"
                  sizes="112px"
                />
              </div>
              <p className="text-[10px] text-center font-medium" style={{ color: '#66625d' }}>
                {logo.name}
              </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
