"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update dot instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };
    
    // Animate ring smoothly
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animate);
    
    // Hide standard cursor globally when this is active
    document.body.style.cursor = 'none';
    
    // Also add class to all interactive elements to use 'none' cursor or custom state
    const addCursorNone = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none';
      });
    };
    
    addCursorNone();
    
    // Handle hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, select, textarea') && ringRef.current) {
        ringRef.current.style.width = '48px';
        ringRef.current.style.height = '48px';
        ringRef.current.style.margin = '-24px 0 0 -24px';
        ringRef.current.style.borderColor = '#f3c892';
        ringRef.current.style.backgroundColor = 'rgba(243, 200, 146, 0.1)';
      }
    };
    
    const onMouseOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.margin = '-16px 0 0 -16px';
        ringRef.current.style.borderColor = 'rgba(243, 200, 146, 0.5)';
        ringRef.current.style.backgroundColor = 'transparent';
      }
    };
    
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#f3c892] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ margin: '-4px 0 0 -4px' }}
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[#f3c892]/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center mix-blend-screen"
        style={{ margin: '-16px 0 0 -16px' }}
      />
    </>
  );
}
