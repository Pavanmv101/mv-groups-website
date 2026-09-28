'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, MessageCircle, Play } from 'lucide-react';

function InstagramIcon({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const BEHOLD_FEED_ID = 'blS1SssVZM6tz09gAdSv';

interface BeholdPost {
  id: string;
  permalink: string;
  prunedCaption: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  likeCount: number;
  commentsCount: number;
  sizes: {
    medium: { mediaUrl: string };
  };
}

interface BeholdFeed {
  username: string;
  posts: BeholdPost[];
}

export default function InstagramSection() {
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`);
        if (!res.ok) throw new Error('Feed fetch failed');
        const data: BeholdFeed = await res.json();
        setPosts(data.posts?.slice(0, 6) || []);
      } catch {
        // Silently fail — section just won't show
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t" style={{ borderColor: '#1a1918', background: '#0c0b0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <InstagramIcon className="w-5 h-5" style={{ color: '#f3c892' }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#f3c892' }}>Follow Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">@mvgroups.online</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ background: '#141312' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

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

        {/* Grid — LIVE from Instagram */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden block"
              style={{ background: '#141312' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.sizes.medium.mediaUrl}
                alt={post.prunedCaption?.slice(0, 80) || 'MV Groups Instagram post'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Video indicator */}
              {post.mediaType === 'VIDEO' && (
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <Play className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              )}

              {/* Hover overlay with engagement stats */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'rgba(12,11,10,0.7)', backdropFilter: 'blur(4px)' }}>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-white text-sm font-bold">
                    <Heart className="w-4 h-4 fill-white" /> {post.likeCount}
                  </span>
                  <span className="flex items-center gap-1 text-white text-sm font-bold">
                    <MessageCircle className="w-4 h-4 fill-white" /> {post.commentsCount}
                  </span>
                </div>
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
