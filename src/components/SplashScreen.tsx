'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('mv_splash_shown')) {
      const skipTimer = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(skipTimer);
    }
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      if (typeof window !== 'undefined') sessionStorage.setItem('mv_splash_shown', '1');
    }, 2300);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0b0a] pointer-events-none select-none"
      style={{ transition: 'opacity 0.5s ease', opacity: fading ? 0 : 1 }}
      aria-hidden="true"
    >
      <div style={{ animation: 'splash-logo 0.6s ease forwards' }}>
        <Image src="/logo.png" alt="MV Groups" width={120} height={80} className="object-contain" priority />
      </div>
      <div className="mt-5 h-px" style={{
        width: 'clamp(48px,7vw,80px)',
        background: '#f3c892',
        animation: 'splash-line 0.6s ease 0.4s forwards',
        opacity: 0,
        transformOrigin: 'center'
      }} />
    </div>
  );
}
