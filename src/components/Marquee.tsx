'use client';

export default function Marquee() {
  const METRICS = [
    '0 TO 500 STAFF IN 24 HOURS',
    'WHITE-GLOVE HOSPITALITY',
    'VVIP SECURITY CLEARED',
    'PRECISION GROUND CONTROL',
    'FLAWLESS PROTOCOL',
    'ELITE BRAND AMBASSADORS'
  ];

  // We duplicate the array to ensure seamless infinite scrolling
  const scrollItems = [...METRICS, ...METRICS, ...METRICS, ...METRICS];

  return (
    <div className="w-full bg-[#f3c892] py-5 overflow-hidden flex border-y border-[#d4aa73]">
      <div 
        className="flex gap-12 items-center whitespace-nowrap animate-marquee-left"
        style={{ willChange: 'transform' }}
      >
        {scrollItems.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-[#0a0908] font-black text-sm tracking-[0.2em] uppercase">
              {item}
            </span>
            <span className="text-[#0a0908] opacity-30 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
