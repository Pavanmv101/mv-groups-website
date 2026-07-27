import Image from 'next/image';

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
        <p
          className="text-center text-xs font-bold tracking-[0.18em] uppercase mb-10"
          style={{ color: '#66625d' }}
        >
          Trusted by Teams Across India
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col items-center gap-2 group transition-all duration-300"
            >
              <div
                className="relative w-28 h-16 rounded-lg overflow-hidden flex items-center justify-center p-2 transition-all duration-300"
                style={{
                  background: '#1a1918',
                  border: '1px solid #282624',
                  filter: 'grayscale(1) brightness(0.6)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0) brightness(1)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(243,200,146,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(1) brightness(0.6)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#282624';
                }}
              >
                <Image src={logo.src} alt={logo.name} fill className="object-contain p-1" sizes="112px" />
              </div>
              <p className="text-[10px] text-center font-medium" style={{ color: '#66625d' }}>
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
