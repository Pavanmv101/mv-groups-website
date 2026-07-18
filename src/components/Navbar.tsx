'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import { Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '@/lib/constants';
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/login/actions';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'client' | 'admin' | null>(null);
  const pathname = usePathname();

  const isDarkHeroPage = pathname === '/' || pathname === '/services' || pathname === '/updates';
  const scrolled = isScrolled || !isDarkHeroPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchRole = async (userId: string) => {
      const { data } = await supabase.from('users').select('role').eq('id', userId).single();
      if (data) setRole(data.role);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
              <Image src="/logo.jpg" alt="MV Groups Logo" width={40} height={40} className="object-cover" />
            </div>
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              {COMPANY.name}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                {role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`ml-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                      scrolled
                        ? 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50'
                        : 'text-indigo-300 hover:text-indigo-100 hover:bg-indigo-500/20'
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
                {role !== 'admin' && (
                  <Link
                    href="/dashboard"
                    className={`ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      scrolled
                        ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}
                <form action={logout}>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      scrolled
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-red-300 hover:text-red-200 hover:bg-red-500/10'
                    }`}
                  >
                    Log Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className={`ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  scrolled
                    ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                Login
              </Link>
            )}

            <Link
              href="/booking"
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              scrolled ? 'text-navy-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200/20 animate-fade-in">
            <div className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
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
                      className={`px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                        scrolled
                          ? 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50'
                          : 'text-indigo-300 hover:text-indigo-100 hover:bg-white/10'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {role !== 'admin' && (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        scrolled
                          ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <form action={logout}>
                    <button
                      type="submit"
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        scrolled
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-red-300 hover:bg-white/10'
                      }`}
                    >
                      Log Out
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
              )}

              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
