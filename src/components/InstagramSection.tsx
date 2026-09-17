'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function InstagramIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Static placeholder grid — replace src values with actual Instagram post image URLs
// once you connect Instagram Basic Display API or use a service like Behold.so
const POSTS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Event staffing excellence' },
  { id: 2, src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Premium event production' },
  { id: 3, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Corporate event crew' },
  { id: 4, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Award ceremony setup' },
  { id: 5, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Stage production' },
  { id: 6, src: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=400&h=400', caption: 'Luxury gala evening' },
];

export default function InstagramSection() {
  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1918', background: '#0c0b0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InstagramIcon className="w-5 h-5" style={{ color: '#f3c892' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#f3c892' }}>Follow Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">@mvgroups.online</h2>
          </div>
          <Link
            href="https://www.instagram.com/mvgroups.online"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:-translate-y-0.5"
            style={{ background: '#141312', color: '#f3c892', border: '1px solid #282624' }}
          >
            View Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {POSTS.map((post) => (
            <Link
              key={post.id}
              href="https://www.instagram.com/mvgroups.online"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden block"
              style={{ background: '#141312' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.src}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'rgba(243,200,146,0.15)', backdropFilter: 'blur(4px)' }}>
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile follow button */}
        <div className="sm:hidden text-center mt-6">
          <Link
            href="https://www.instagram.com/mvgroups.online"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
            style={{ background: '#141312', color: '#f3c892', border: '1px solid #282624' }}
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
