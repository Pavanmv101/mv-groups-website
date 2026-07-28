import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/lib/constants';

const POPULAR_SERVICES = [
  'Event Manpower',
  'Promotional Staffing',
  'Exhibition Staffing',
  'Corporate Event Staffing',
  'Wedding & Social Staffing',
  'Event Setup & Logistics',
];

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: '#0c0b0a', borderTop: '1px solid #1a1918' }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-0.5 mb-5 group">
              <Image 
                src="/images/mv-groups-logo.jpg" 
                alt="MV Groups Logo" 
                width={56} 
                height={56} 
                className="rounded-full shadow-lg border-[1.5px] border-[#d4aa73]/30 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#66625d' }}>
              On-demand event staffing for Karnataka. Professional crew, vetted &amp; trained.
            </p>
            {/* Social icons — pure CSS hover via .social-icon-btn */}
            <div className="flex gap-3">
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="social-icon-btn"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#66625d' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#f3c892' }}
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="footer-link-gold text-sm flex items-center gap-1"
                >
                  Request a Quote
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Popular Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#66625d' }}>
              Popular Services
            </h3>
            <ul className="space-y-3">
              {POPULAR_SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="footer-link text-sm">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#66625d' }}>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#f3c892' }} />
                <span className="text-sm" style={{ color: '#a39e98' }}>{COMPANY.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#f3c892' }} />
                <a href={`tel:${COMPANY.phone}`} className="footer-link text-sm">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#f3c892' }} />
                <a href={`mailto:${COMPANY.email}`} className="footer-link text-sm">
                  {COMPANY.email}
                </a>
              </li>
              {/* Response badge */}
              <li>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Replies within 2 hours · 7 days
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Massive Edge-to-Edge Typography */}
      <div className="w-full overflow-hidden flex justify-center items-center py-6 md:py-12 select-none pointer-events-none border-t border-[#1a1918]">
        <h1 className="text-[16vw] font-black leading-none tracking-tighter text-center" style={{ color: '#141312' }}>
          MV<span style={{ color: 'rgba(243,200,146,0.05)' }}>GROUPS</span>
        </h1>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1a1918' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#66625d' }}>
            © {new Date().getFullYear()} MV Groups. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="footer-link-muted text-xs">Privacy Policy</Link>
            <Link href="/terms" className="footer-link-muted text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
