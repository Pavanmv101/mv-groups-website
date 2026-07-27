import { createClient } from '@/utils/supabase/server';

const STARS = [1, 2, 3, 4, 5];

export default async function Testimonials() {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const displayTestimonials =
    featured && featured.length > 0
      ? featured
      : (
          await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3)
        ).data || [];

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="section-label">● WHAT CLIENTS SAY</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight max-w-2xl">
            Trusted by Event Organisers{' '}
            <em
              className="not-italic"
              style={{ color: '#c9a84c', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}
            >
              Across Karnataka
            </em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((t, idx) => (
            <div
              key={t.id}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                animationDelay: `${idx * 120}ms`,
              }}
            >
              {/* Gold quote mark */}
              <div
                className="text-7xl font-black leading-none mb-4 select-none"
                style={{ color: '#c9a84c', opacity: 0.25, fontFamily: 'Georgia, serif', lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {STARS.map((s) => (
                  <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill="#c9a84c">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: '#cccccc' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #2a2a2a' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  {t.client_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: '#c9a84c' }}>
                    {t.client_name}
                  </h4>
                  <p className="text-xs" style={{ color: '#555555' }}>
                    {t.role ? `${t.role}${t.company ? ', ' : ''}` : ''}
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
