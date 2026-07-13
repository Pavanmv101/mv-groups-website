import { createClient } from '@/utils/supabase/server'
import { Quote } from 'lucide-react'

export default async function Testimonials() {
  const supabase = await createClient()
  
  // Fetch featured testimonials, or fallback to all if none are featured
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  // If no featured testimonials exist, just grab the latest 3
  const displayTestimonials = testimonials && testimonials.length > 0 
    ? testimonials 
    : (await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)
      ).data || []

  if (displayTestimonials.length === 0) return null

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Don&apos;t just take our word for it. Hear from the amazing teams and companies we&apos;ve had the pleasure of working with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((t, idx) => (
            <div 
              key={t.id} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both hover:shadow-md transition-shadow"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-indigo-100 absolute top-6 right-6" />
              
              <p className="text-slate-700 italic relative z-10 mb-8 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200">
                  {t.client_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t.client_name}</h4>
                  <p className="text-sm text-slate-500">
                    {t.role ? `${t.role}, ` : ''}{t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
