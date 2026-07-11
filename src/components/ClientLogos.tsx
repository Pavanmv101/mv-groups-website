import Image from 'next/image'

const LOGOS = [
  {
    id: 1,
    name: 'Frigus Fiesta Entertainments',
    location: 'Hyderabad',
    src: '/images/logo-frigus-fiesta.jpg',
  },
  {
    id: 2,
    name: 'Dreamcraft Events & Experiences',
    location: 'Bangalore',
    src: '/images/logo-dreamcraft.jpg',
  },
  {
    id: 3,
    name: 'Futurex',
    location: 'Delhi',
    src: '/images/logo-futurex.jpg',
  },
  {
    id: 4,
    name: 'Electronic & Print Media Networks',
    location: 'Delhi',
    src: '/images/logo-print-media.jpg',
  },
  {
    id: 5,
    name: 'Wewaah Weddings & Experiences',
    location: 'Bangalore',
    src: '/images/logo-wewaah.jpg',
  },
]

export default function ClientLogos() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-10">
          Trusted by Teams Across India
        </p>

        <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12">
          {LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-36 h-24 relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center p-3 transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300 group-hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain p-2"
                  sizes="144px"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-600">{logo.name}</p>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {logo.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
