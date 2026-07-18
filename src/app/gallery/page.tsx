import Image from 'next/image';

import { createClient } from '@/utils/supabase/server';

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
    <div className="min-h-screen bg-white">
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Work in Action</h1>
            <p className="text-xl text-slate-600">
              A glimpse into the professional teams and successful events we&apos;ve helped power across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-w-4 aspect-h-3 relative h-64 w-full">
                  <Image 
                    src={image.image_url} 
                    alt={image.alt_text}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full mb-2 backdrop-blur-sm">
                    {image.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">{image.alt_text}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center bg-slate-50 rounded-3xl p-10 sm:p-16 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Want a reliable team for your next event?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Our professional staff is ready to help make your event a massive success.
            </p>
            <a href="/booking" className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              Book Our Staff
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
