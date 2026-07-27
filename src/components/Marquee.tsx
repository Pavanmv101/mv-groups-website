'use client';

const ROW1_ITEMS = Array(10).fill(['MV GROUPS', '★', 'EVENTS', '★', 'STAFFING', '★', 'KARNATAKA', '★']).flat();
const ROW2_ITEMS = Array(10).fill(['STAGE', '★', 'SUCCEED', '★', 'EVENTS', '★', 'CREW', '★', 'STAFF', '★']).flat();
const ROW3_ITEMS = Array(10).fill(['RELIABLE', '★', 'MANPOWER', '★', 'ACTIVATIONS', '★']).flat();

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center min-h-[40vh] py-24 z-10" style={{ background: '#0c0b0a' }}>
      
      {/* ── Background Outline Ticker (Layer 3) ── */}
      <div className="absolute top-1/2 left-0 w-[120%] -translate-y-1/2 -translate-x-[10%] -rotate-[4deg] z-0 opacity-10 pointer-events-none">
        <div className="flex items-center flex-shrink-0 animate-marquee-left" style={{ willChange: 'transform' }}>
          {ROW3_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center flex-shrink-0 font-black uppercase tracking-tight px-8"
              style={{ 
                fontSize: 'clamp(80px, 12vw, 160px)', 
                color: 'transparent',
                WebkitTextStroke: '2px #f3c892',
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Intersecting Tape 1: Dark bg, Gold text, angled up ── */}
      <div 
        className="relative z-10 w-[110%] -ml-[5%] flex items-center border-y shadow-2xl -rotate-[2deg] hover:rotate-0 transition-transform duration-700 ease-out"
        style={{
          background: '#141312',
          borderColor: '#f3c892',
          padding: '1.5rem 0',
        }}
      >
        <div className="flex items-center flex-shrink-0 animate-marquee-left" style={{ willChange: 'transform' }}>
          {ROW1_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center flex-shrink-0 font-black uppercase tracking-tight px-8"
              style={{ 
                fontSize: 'clamp(48px, 6vw, 96px)',
                color: item === '★' ? 'rgba(243,200,146,0.5)' : '#f3c892', 
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Intersecting Tape 2: Gold bg, Dark text, angled down ── */}
      <div 
        className="relative z-20 w-[110%] -ml-[5%] flex items-center shadow-2xl rotate-[3deg] -mt-12 hover:rotate-0 transition-transform duration-700 ease-out"
        style={{
          background: '#f3c892',
          padding: '1.5rem 0',
        }}
      >
        <div className="flex items-center flex-shrink-0 animate-marquee-right" style={{ willChange: 'transform' }}>
          {ROW2_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center flex-shrink-0 font-black uppercase tracking-tight px-8"
              style={{ 
                fontSize: 'clamp(48px, 6vw, 96px)',
                color: item === '★' ? 'rgba(12,11,10,0.35)' : '#0c0b0a', 
                whiteSpace: 'nowrap',
                lineHeight: 1
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
}
