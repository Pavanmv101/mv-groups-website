'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPTextRevealProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  splitBy?: 'words' | 'chars';
}

export default function GSAPTextReveal({
  children,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  splitBy = 'words',
}: GSAPTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split text manually for SSR safety
    const words = children.split(' ');
    const splitBy_ = splitBy === 'words' ? words : children.split('');

    // Wrap each word/char in a span with overflow hidden wrapper
    el.innerHTML = splitBy === 'words'
      ? words
          .map(
            (w) =>
              `<span style="display:inline-block; overflow:hidden; vertical-align:bottom;"><span class="gsap-word" style="display:inline-block;">${w}</span></span> `
          )
          .join('')
      : children
          .split('')
          .map(
            (c) =>
              `<span style="display:inline-block; overflow:hidden;"><span class="gsap-char" style="display:inline-block;">${c === ' ' ? '&nbsp;' : c}</span></span>`
          )
          .join('');

    const targets = el.querySelectorAll(splitBy === 'words' ? '.gsap-word' : '.gsap-char');

    const tl = gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        delay,
        stagger: splitBy === 'words' ? 0.07 : 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tl.kill();
      // restore original text
      if (el) el.textContent = children;
    };
  }, [children, delay, splitBy]);

  return (
    // @ts-ignore
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
