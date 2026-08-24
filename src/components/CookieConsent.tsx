'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already accepted
    const accepted = localStorage.getItem('mv-cookie-consent');
    if (!accepted) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mv-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mv-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6 animate-slide-up"
      style={{ animationDuration: '0.5s' }}
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl"
        style={{
          background: 'rgba(12,11,10,0.95)',
          border: '1px solid rgba(243,200,146,0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Icon + Text */}
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#f3c892' }} />
          <p className="text-sm leading-relaxed" style={{ color: '#c8c3be' }}>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies.{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-2 transition-colors hover:text-white"
              style={{ color: '#f3c892' }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/10"
            style={{ color: '#a39e98', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #f3c892, #d4aa73)',
              color: '#0c0b0a',
            }}
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" style={{ color: '#66625d' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
