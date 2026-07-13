import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

export default async function UpdatesPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('updates')
    .select('title, slug, content, thumbnail_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <>
      {/* Hero Section matching Services page */}
      <section className="relative gradient-navy hero-pattern pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute top-10 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Latest News
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Updates</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Stay up to date with the latest announcements, insights, and news from MV Groups.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {(!posts || posts.length === 0) ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <MegaphoneIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No updates yet</h3>
              <p className="text-slate-500 mt-1">Check back soon for the latest news from MV Groups.</p>
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
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden flex flex-col border border-slate-100/50 hover:border-blue-100"
                  >
                    {/* Thumbnail Area */}
                    <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                      {post.thumbnail_url ? (
                        <Image 
                          src={post.thumbnail_url} 
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                          <span className="text-4xl font-bold text-blue-900/5 uppercase tracking-widest">MV</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {date}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 line-clamp-3 text-sm flex-grow">
                        {excerpt}
                      </p>
                      
                      <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

        </div>
      </section>
    </>
  )
}

function MegaphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 14v-3z"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  )
}
