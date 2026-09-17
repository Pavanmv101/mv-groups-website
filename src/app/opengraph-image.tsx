import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MV Groups | Karnataka\'s Premier Event Force';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0c0b0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient blobs */}
        <div style={{ position: 'absolute', top: -120, left: -120, width: 600, height: 600, background: 'radial-gradient(circle, rgba(243,200,146,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -120, right: -120, width: 500, height: 500, background: 'radial-gradient(circle, rgba(243,200,146,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* Gold top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, transparent, #f3c892, transparent)' }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '0 80px', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(243,200,146,0.1)', border: '1px solid rgba(243,200,146,0.25)', borderRadius: 40 }}>
            <span style={{ color: '#f3c892', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Karnataka&apos;s Premier Event Force</span>
          </div>

          {/* Headline */}
          <div style={{ fontSize: 72, fontWeight: 900, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-2px' }}>
            One Company.{' '}
            <span style={{ color: '#f3c892', fontStyle: 'italic' }}>Two Powers.</span>
          </div>

          {/* Sub */}
          <div style={{ fontSize: 24, color: '#a39e98', maxWidth: 720, lineHeight: 1.5 }}>
            Elite event staffing &amp; end-to-end event production across Karnataka.
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 48, marginTop: 20 }}>
            {[['150+', 'Events Staffed'], ['15+', 'Trusted Clients'], ['100%', 'Reliability']].map(([val, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#f3c892' }}>{val}</span>
                <span style={{ fontSize: 13, color: '#66625d', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, color: '#66625d', letterSpacing: '0.1em' }}>mvgroups.online</span>
        </div>

        {/* Gold bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, transparent, #f3c892, transparent)' }} />
      </div>
    ),
    { ...size }
  );
}
