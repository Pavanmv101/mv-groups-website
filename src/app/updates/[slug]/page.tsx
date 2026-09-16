import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowLeft } from 'lucide-react'
import sanitizeHtml from 'sanitize-html'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('updates')
    .select('title')
    .eq('slug', resolvedParams.slug)
    .single()

  return {
    title: post ? `${post.title} | MV Groups Updates` : 'Update Not Found',
  }
}

export default async function UpdatePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('updates')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  if (!post || post.status !== 'published') {
    notFound()
  }

  const date = new Date(post.published_at || '').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <article className="min-h-screen bg-[#0c0b0a] pt-28 pb-20">
      
      {/* Header Section */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link 
          href="/updates"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-[#f3c892] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to all updates
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-[#f3c892] font-bold mb-4 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
          {post.title}
        </h1>
      </header>

      {/* Featured Image */}
      {post.thumbnail_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#282624]">
            <Image 
              src={post.thumbnail_url} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content Section using Tailwind Typography (prose) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-invert max-w-none hover:prose-a:text-[#e5b980] prose-a:text-[#f3c892] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />
      </div>
      
    </article>
  )
}
