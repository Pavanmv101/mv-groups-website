import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const fallbackImages = [
  { id: "fallback-m1", image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", alt_text: "Corporate Summit Stage", category: "Corporate" },
  { id: "fallback-m2", image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", alt_text: "Live Concert Production", category: "Production" },
  { id: "fallback-m3", image_url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80", alt_text: "Luxury Wedding Decor", category: "Wedding" },
  { id: "fallback-m4", image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80", alt_text: "Stage Design Setup", category: "Design" },
  { id: "fallback-m5", image_url: "https://images.unsplash.com/photo-1475721028314-398f6dc78bf8?auto=format&fit=crop&w=1200&q=80", alt_text: "Award Ceremony", category: "Awards" },
  { id: "fallback-m6", image_url: "https://images.unsplash.com/photo-1505236858219-8373dd707522?auto=format&fit=crop&w=1200&q=80", alt_text: "Gala Dinner", category: "Social" }
];

export const metadata = {
  title: 'Our Portfolio | MV Groups Event Management',
  description: 'Explore the high-end events, stages, and experiences produced by MV Groups.',
};

export const revalidate = 60;

export default async function ManagementPortfolioPage() {
  const supabase = await createClient();
  const { data: dbImages } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  // Fallback to beautiful stock images if the DB is empty
  const images = dbImages && dbImages.length > 0 ? dbImages : fallbackImages;

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      {/* ── Header Section ── */}
      <section className="text-center max-w-3xl mx-auto mb-20 px-4">
        <span 
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
          style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Our Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Crafting <em className="not-italic gold-text" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Extraordinary</em> Experiences
        </h1>
        <p className="text-[#a39e98] text-lg max-w-2xl mx-auto leading-relaxed">
          Take a look at some of the premium events, conferences, and weddings we have produced across Karnataka.
        </p>
      </section>

      {/* ── Masonry/Grid Layout ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#1a1918] border border-[#282624] hover:border-[#f3c892]/30 transition-colors"
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || 'Event by MV Groups'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {img.category && (
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3" style={{ background: 'rgba(243,200,146,0.15)', color: '#f3c892' }}>
                    {img.category}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {img.alt_text || 'Premium Event Production'}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mt-32 max-w-4xl mx-auto px-4 text-center">
        <div className="p-12 rounded-3xl relative overflow-hidden" style={{ background: '#141312', border: '1px solid #282624' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(243,200,146,0.05) 0%, transparent 70%)' }} />
          <h2 className="text-3xl font-black text-white mb-4 relative z-10">Ready to build something unforgettable?</h2>
          <p className="text-[#a39e98] mb-8 max-w-xl mx-auto relative z-10">
            Let&apos;s discuss your vision and build a custom production plan for your next big event.
          </p>
          <Link 
            href="/build-your-event"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 relative z-10"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            Start Planning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
