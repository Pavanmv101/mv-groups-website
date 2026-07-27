import { Loader2 } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0c0b0a' }}>
      <div className="flex flex-col items-center gap-8">
        
        {/* Logo Text Animation */}
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="flex items-center gap-0.5">
            <span
              className="text-4xl sm:text-5xl font-black tracking-tight leading-none"
              style={{ color: '#f3c892' }}
            >
              MV
            </span>
            <span
              className="text-4xl sm:text-5xl font-black tracking-[0.18em] leading-none text-white"
            >
              GROUPS
            </span>
          </div>
        </div>
        
        {/* Loading Indicator */}
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#f3c892' }} />
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#a39e98' }}>
            Loading content
          </span>
        </div>
        
      </div>
    </div>
  );
}
