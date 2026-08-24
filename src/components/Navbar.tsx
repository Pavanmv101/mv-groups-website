'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { type User } from '@supabase/supabase-js';
import { Menu, X, User as UserIcon, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/login/actions';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'client' | 'admin' | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Pages where navbar starts transparent (hero pages)
  const isDarkHeroPage =
    pathname === '/' ||
    pathname === '/services' ||
    pathname === '/updates';

  const scrolled = isScrolled || !isDarkHeroPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const supabase = createClient();

    const fetchRole = async (userId: string) => {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
      if (data) setRole(data.role);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchRole(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-full ${
          scrolled
            ? 'top-4 bg-[#0c0b0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl py-2'
            : 'top-6 bg-transparent border border-transparent py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <Image 
                src="/images/mv-groups-logo.png" 
                alt="MV Groups Logo" 
                width={90} 
                height={36} 
                className="transition-transform duration-300 group-hover:scale-105 drop-shadow-lg h-9 w-auto object-contain"
                priority 
              />
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 relative group ${
                      isActive ? 'text-[#f3c892]' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-px bg-[#f3c892] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Auth links */}
              {user ? (
                <>
                  {role === 'admin' && (
                    <Link
                      href="/admin"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#f3c892]/80 hover:text-[#f3c892] transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  {role !== 'admin' && (
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      Dashboard
                    </Link>
                  )}
                  <form action={logout}>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-red-400 transition-colors"
                    >
                      Log Out
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Login
                </Link>
              )}

              {/* Book Staff CTA */}
              <Link
                href="/booking"
                className={`ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                  scrolled
                    ? 'bg-[#f3c892] text-[#0c0b0a] hover:bg-[#e5b980] shadow-lg shadow-[rgba(243,200,146,0.25)] hover:shadow-[rgba(243,200,146,0.4)] hover:-translate-y-0.5'
                    : 'border-2 border-white/60 text-white hover:border-[#f3c892] hover:text-[#f3c892]'
                }`}
              >
                Book Your Team
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {isOpen && (
        <div className="mobile-nav-overlay md:hidden">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-4 p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Logo in overlay */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-0.5 mb-10">
            <span className="text-3xl font-black" style={{ color: '#f3c892' }}>MV</span>
            <span className="text-3xl font-black tracking-[0.18em] text-white">GROUPS</span>
          </Link>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3.5 px-2 text-2xl font-bold text-white/80 hover:text-[#f3c892] transition-colors border-b border-[#1a1918]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                {role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="py-3.5 px-2 text-2xl font-bold text-[#f3c892] transition-colors border-b border-[#1a1918]"
                  >
                    Admin
                  </Link>
                )}
                {role !== 'admin' && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="py-3.5 px-2 text-2xl font-bold text-white/80 hover:text-[#f3c892] transition-colors border-b border-[#1a1918]"
                  >
                    Dashboard
                  </Link>
                )}
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full text-left py-3.5 px-2 text-2xl font-bold text-white/40 hover:text-red-400 transition-colors border-b border-[#1a1918]"
                  >
                    Log Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="py-3.5 px-2 text-2xl font-bold text-white/80 hover:text-[#f3c892] transition-colors border-b border-[#1a1918]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto pt-8">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="btn-gold w-full justify-center text-base py-4"
            >
              Book Your Team
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-[#66625d] text-xs mt-4">
              Same-day quotes · 7 days a week
            </p>
          </div>
        </div>
      )}
    </>
  );
}
