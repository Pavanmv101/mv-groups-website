import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fallbackImages = [
  { id: "fallback-1", image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "Corporate Event Registration", category: "Registration" },
  { id: "fallback-2", image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "Exhibition Booth Staffing", category: "Exhibitions" },
  { id: "fallback-3", image_url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "Brand Promotion Team", category: "Promotions" },
  { id: "fallback-4", image_url: "https://images.unsplash.com/photo-1475721028314-398858db1946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "Event Setup Crew", category: "Logistics" },
  { id: "fallback-5", image_url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "Conference Ushers", category: "Corporate" },
  { id: "fallback-6", image_url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt_text: "VIP Hosting Team", category: "Hosting" }
];

export const metadata = {
  title: 'Our Work | MV Groups Gallery',
  description: 'Explore the high-quality events and brands powered by MV Groups staffing solutions.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: dbImages } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  const images = dbImages && dbImages.length > 0 ? dbImages : fallbackImages;

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      
      {/* ── Header Section ── */}
      <section className="text-center max-w-3xl mx-auto mb-20 px-4">
        <span 
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
          style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
        >
          Gallery
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>
          Our Work in <span style={{ color: '#f3c892' }}>Action</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#a39e98' }}>
          A glimpse into the professional teams and successful events we&apos;ve helped power across the country.
        </p>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.id} className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2" style={{ background: '#1a1918', border: '1px solid #282624' }}>
              <div className="aspect-[4/3] relative w-full overflow-hidden" style={{ background: '#0c0b0a' }}>
                <Image 
                  src={image.image_url} 
                  alt={image.alt_text}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(12,11,10,0.9) 0%, rgba(12,11,10,0.2) 50%, transparent 100%)' }}></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-4 py-1.5 text-xs font-bold rounded-full mb-3 backdrop-blur-md" style={{ background: 'rgba(243,200,146,0.9)', color: '#0c0b0a' }}>
                  {image.category}
                </span>
                <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>{image.alt_text}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ── Call to Action ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center rounded-3xl p-12 sm:p-20 relative overflow-hidden" style={{ background: '#141312', border: '1px solid #282624' }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#ffffff' }}>Want a reliable team for your next event?</h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: '#a39e98' }}>
              Our professional staff is ready to help make your event a massive success.
            </p>
            <Link 
              href="/booking" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg group"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              Book Our Staff
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
