import Image from 'next/image'

const LOGOS = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
  { id: 3, name: 'Client 3' },
  { id: 4, name: 'Client 4' },
  { id: 5, name: 'Client 5' },
  { id: 6, name: 'Client 6' },
]

export default function ClientLogos() {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 tracking-wide uppercase mb-8">
          Trusted by teams across Karnataka
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale transition-all duration-500">
          {LOGOS.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center w-32 h-12 bg-slate-100 rounded-lg shadow-sm border border-slate-200 text-slate-400 font-medium text-sm hover:bg-slate-200 transition-colors cursor-default">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
