'use client';

import { useRef, useEffect, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface GSAPTextRevealProps {
  children: string;
  className?: string;
  tag?: TagType;
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = children.split(' ');

    // Wrap each word/char in a span with overflow hidden wrapper
    el.innerHTML =
      splitBy === 'words'
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

    const selector = splitBy === 'words' ? '.gsap-word' : '.gsap-char';
    const targets = el.querySelectorAll(selector);

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
      if (el) el.textContent = children;
    };
  }, [children, delay, splitBy]);

  const DynamicTag = Tag as ElementType;

  return (
    <DynamicTag ref={ref} className={className}>
      {children}
    </DynamicTag>
  );
}
