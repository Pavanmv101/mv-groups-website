import { Loader2 } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 animate-spin w-16 h-16 mx-auto"></div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden z-10 animate-pulse bg-white">
            <Image src="/logo.jpg" alt="MV Groups Logo" width={48} height={48} className="object-cover" />
          </div>
        </div>
        
        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold text-navy-900">{COMPANY.name}</h2>
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span className="text-sm font-medium">Loading content...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
