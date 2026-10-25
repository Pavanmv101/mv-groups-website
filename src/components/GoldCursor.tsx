'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function GoldCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef  = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });
  const rafRef  = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let isVisible = false;

    const setOpacity = (opacity: string) => {
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (glowRef.current) glowRef.current.style.opacity = opacity;
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        isVisible = true;
        setOpacity('1');
      }
    };

    const onLeave = () => {
      isVisible = false;
      setOpacity('0');
    };

    const onEnter = () => {
      isVisible = true;
      setOpacity('1');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Interactive scale on buttons, links, cards
    const onDown = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0.4)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(0.85)';
    };

    const onUp = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    const onHoverIn = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '54px';
        ringRef.current.style.height = '54px';
        ringRef.current.style.borderColor = 'rgba(243,200,146,0.7)';
        ringRef.current.style.background = 'rgba(243,200,146,0.06)';
      }
      if (glowRef.current) {
        glowRef.current.style.transform = 'translate(-50%,-50%) scale(1.25)';
      }
    };

    const onHoverOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.borderColor = 'rgba(243,200,146,0.35)';
        ringRef.current.style.background = 'transparent';
      }
      if (glowRef.current) {
        glowRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      }
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .card-glow';
    const elements = document.querySelectorAll<HTMLElement>(interactiveSelectors);
    elements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    // 60-120fps rAF rendering with smooth spring/lerp
    const animate = () => {
      // Ring follows tightly (0.16 lerp)
      const rdx = posRef.current.x - ringPos.current.x;
      const rdy = posRef.current.y - ringPos.current.y;
      ringPos.current.x += rdx * 0.16;
      ringPos.current.y += rdy * 0.16;

      // Ambient spotlight glow lags softly (0.08 lerp for silky feel)
      const gdx = posRef.current.x - glowPos.current.x;
      const gdy = posRef.current.y - glowPos.current.y;
      glowPos.current.x += gdx * 0.08;
      glowPos.current.y += gdy * 0.08;

      if (dotRef.current) {
        dotRef.current.style.left = `${posRef.current.x}px`;
        dotRef.current.style.top  = `${posRef.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top  = `${glowPos.current.y}px`;
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
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  return (
    <>
      {/* 1. Large Ambient Gold Spotlight (Follows cursor smoothly across dark UI) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[1] rounded-full transition-transform duration-300 ease-out"
        style={{
          width: 520,
          height: 520,
          background: 'radial-gradient(circle, rgba(243,200,146,0.075) 0%, rgba(243,200,146,0.02) 40%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          transition: 'opacity 0.4s ease, transform 0.3s ease-out',
          willChange: 'left, top, transform',
        }}
      />

      {/* 2. Inner pinpoint gold core */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: 7,
          height: 7,
          background: '#f3c892',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          boxShadow: '0 0 12px 2px rgba(243,200,146,0.7)',
          transition: 'opacity 0.3s, transform 0.15s ease',
          willChange: 'left, top',
        }}
      />

      {/* 3. Outer lagging gold precision ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: 32,
          height: 32,
          border: '1.5px solid rgba(243,200,146,0.35)',
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          transition: 'opacity 0.3s, width 0.25s ease, height 0.25s ease, border-color 0.25s, background 0.25s',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
