import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Megaphone } from 'lucide-react'

export default async function UpdatesPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('updates')
    .select('title, slug, content, thumbnail_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      
      {/* ── Header Section ── */}
      <section className="text-center max-w-3xl mx-auto mb-20 px-4">
        <span 
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
          style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
        >
          Latest News
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>
          News & <span style={{ color: '#f3c892' }}>Updates</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#a39e98' }}>
          Stay up to date with the latest announcements, insights, and news from MV Groups.
        </p>
      </section>

      {/* ── Posts Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {(!posts || posts.length === 0) ? (
          <div className="text-center py-24 rounded-3xl" style={{ background: '#1a1918', border: '1px solid #282624' }}>
            <Megaphone className="w-12 h-12 mx-auto mb-6 opacity-30" style={{ color: '#f3c892' }} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>No updates yet</h3>
            <p className="text-lg" style={{ color: '#a39e98' }}>Check back soon for the latest news from MV Groups.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              // Generate a simple excerpt from the HTML content
              const excerpt = post.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'
              const date = new Date(post.published_at || '').toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })

              return (
                <Link 
                  key={post.slug} 
                  href={`/updates/${post.slug}`}
                  className="group rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-2 relative"
                  style={{ background: '#141312', border: '1px solid #282624' }}
                >
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(243,200,146,0.05) 0%, transparent 70%)' }}></div>
                  
                  {/* Thumbnail Area */}
                  <div className="aspect-[16/9] w-full relative overflow-hidden" style={{ background: '#0c0b0a' }}>
                    {post.thumbnail_url ? (
                      <Image 
                        src={post.thumbnail_url} 
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-5xl font-black uppercase tracking-widest" style={{ color: '#ffffff' }}>MV</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow relative z-10">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: '#66625d' }}>
                      <Calendar className="w-4 h-4" style={{ color: '#f3c892' }} />
                      {date}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 line-clamp-2 transition-colors group-hover:opacity-80" style={{ color: '#ffffff' }}>
                      {post.title}
                    </h3>
                    
                    <p className="mb-8 line-clamp-3 leading-relaxed text-sm flex-grow" style={{ color: '#a39e98' }}>
                      {excerpt}
                    </p>
                    
                    <div className="flex items-center font-bold text-sm mt-auto transition-colors" style={{ color: '#f3c892' }}>
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </section>
    </div>
  )
}
