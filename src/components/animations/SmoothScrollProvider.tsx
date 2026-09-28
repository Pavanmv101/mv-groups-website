'use client';

/**
 * SmoothScrollProvider — Lenis removed.
 *
 * Lenis was causing scroll-freeze conflicts with:
 *   • Framer Motion useScroll / useInView
 *   • IntersectionObserver (FAQ, SideNav)
 *   • Navbar overflow:hidden toggle (mobile menu)
 *   • window.scrollTo calls (booking page)
 *
 * Native browser scroll + CSS scroll-behavior: smooth provides
 * the same buttery feel without any of the lock-up issues.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
