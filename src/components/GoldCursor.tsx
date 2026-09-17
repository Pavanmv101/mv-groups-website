'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GoldCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const posRef    = useRef({ x: -100, y: -100 });
  const ringPos   = useRef({ x: -100, y: -100 });
  const rafRef    = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only enable on non-touch desktops
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Add magnetic/scale effect on interactive elements
    const onDown  = () => { if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0.5)'; };
    const onUp    = () => { if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; };
    const onHoverIn  = () => { if (ringRef.current) { ringRef.current.style.width = '56px'; ringRef.current.style.height = '56px'; ringRef.current.style.borderColor = 'rgba(243,200,146,0.8)'; ringRef.current.style.background = 'rgba(243,200,146,0.06)'; } };
    const onHoverOut = () => { if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.borderColor = 'rgba(243,200,146,0.4)'; ringRef.current.style.background = 'transparent'; } };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const interactiveSelectors = 'a,button,[role="button"],input,textarea,select,[data-cursor-hover]';
    const elements = document.querySelectorAll<HTMLElement>(interactiveSelectors);
    elements.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    // Smooth lag ring animation via rAF
    const animate = () => {
      const dx = posRef.current.x - ringPos.current.x;
      const dy = posRef.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left  = `${posRef.current.x}px`;
        dotRef.current.style.top   = `${posRef.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Inner gold dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100"
        style={{
          width: 8,
          height: 8,
          background: '#f3c892',
          transform: 'translate(-50%,-50%)',
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 10px 2px rgba(243,200,146,0.6)',
          transition: 'opacity 0.3s, transform 0.1s',
          willChange: 'left, top',
        }}
      />
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: 36,
          height: 36,
          border: '1.5px solid rgba(243,200,146,0.4)',
          transform: 'translate(-50%,-50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
