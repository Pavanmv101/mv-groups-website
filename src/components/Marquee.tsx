'use client';

const ROW1_ITEMS = [
  'MV GROUPS', '★', 'EVENTS', '★', 'STAFFING', '★', 'MANPOWER', '★', 'KARNATAKA', '★',
  'MV GROUPS', '★', 'EVENTS', '★', 'STAFFING', '★', 'MANPOWER', '★', 'KARNATAKA', '★',
];

const ROW2_ITEMS = [
  'STAFF', '★', 'STAGE', '★', 'SUCCEED', '★', 'EVENTS', '★', 'CREW', '★', 'RELIABLE', '★',
  'STAFF', '★', 'STAGE', '★', 'SUCCEED', '★', 'EVENTS', '★', 'CREW', '★', 'RELIABLE', '★',
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden" style={{ background: '#0c0b0a' }}>
      {/* ── Row 1: dark bg, gold text, scrolling LEFT ── */}
      <div
        className="flex items-center gap-0 border-y"
        style={{
          background: '#141312',
          borderColor: '#1a1918',
          height: '52px',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex items-center gap-0 flex-shrink-0 animate-marquee-left"
          style={{ willChange: 'transform' }}
        >
          {ROW1_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center flex-shrink-0 font-black text-[15px] uppercase tracking-[0.05em] px-6"
              style={{ color: item === '★' ? 'rgba(243,200,146,0.5)' : '#f3c892', whiteSpace: 'nowrap' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Row 2: gold bg, dark text, scrolling RIGHT ── */}
      <div
        className="flex items-center gap-0"
        style={{
          background: '#f3c892',
          height: '52px',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex items-center gap-0 flex-shrink-0 animate-marquee-right"
          style={{ willChange: 'transform' }}
        >
          {ROW2_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center flex-shrink-0 font-black text-[15px] uppercase tracking-[0.05em] px-6"
              style={{ color: item === '★' ? 'rgba(12,11,10,0.35)' : '#0c0b0a', whiteSpace: 'nowrap' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
