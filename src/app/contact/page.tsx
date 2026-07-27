'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitInquiry } from './actions'
import { COMPANY } from '@/lib/constants'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

const initialState = {
  success: false,
  error: null,
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      
      {/* ── Header Section ── */}
      <section className="text-center max-w-3xl mx-auto mb-20 px-4">
        <span 
          className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
          style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
        >
          Contact Us
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>
          Get in <span style={{ color: '#f3c892' }}>Touch</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#a39e98' }}>
          Have a question about our services or want to discuss a custom staffing solution? 
          We&apos;re here to help. Reach out to our team today!
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ── Contact Info Cards ── */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-3xl flex items-start gap-5 transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <Phone className="w-7 h-7" style={{ color: '#f3c892' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Phone</h3>
                <p className="mb-2 text-sm" style={{ color: '#66625d' }}>Mon-Fri from 9am to 6pm.</p>
                <a href={`tel:${COMPANY.phone}`} className="font-bold text-lg hover:opacity-80 transition-opacity" style={{ color: '#f3c892' }}>
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="p-8 rounded-3xl flex items-start gap-5 transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <Mail className="w-7 h-7" style={{ color: '#f3c892' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Email</h3>
                <p className="mb-2 text-sm" style={{ color: '#66625d' }}>Our friendly team is here to help.</p>
                <a href={`mailto:${COMPANY.email}`} className="font-bold text-lg hover:opacity-80 transition-opacity break-all" style={{ color: '#f3c892' }}>
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="p-8 rounded-3xl flex items-start gap-5 transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <MapPin className="w-7 h-7" style={{ color: '#f3c892' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Location</h3>
                <p className="mb-2 text-sm" style={{ color: '#66625d' }}>Serving events across</p>
                <span className="font-bold text-lg" style={{ color: '#ffffff' }}>
                  {COMPANY.location}
                </span>
              </div>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden relative" style={{ background: '#1a1918', border: '1px solid #282624' }}>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
            
            <div className="p-8 md:p-12 relative z-10">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#ffffff' }}>Send us a message</h2>
              
              {state.success ? (
                <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>Message Sent Successfully!</h3>
                  <p className="max-w-md mx-auto mb-8 text-lg" style={{ color: '#a39e98' }}>
                    Thank you for reaching out. A member of our team will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 font-bold rounded-full transition-all hover:opacity-90"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} action={formAction} className="space-y-6">
                  
                  {state.error && (
                    <div className="p-5 rounded-xl border text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
                      {state.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Full Name *</label>
                      <input required type="text" id="name" name="name" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Email Address *</label>
                      <input required type="email" id="email" name="email" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Phone Number</label>
                      <input type="tel" id="phone" name="phone" pattern="[+0-9\s\-]+" minLength={10} maxLength={20} className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="+91 98765 43210" title="Phone number should contain at least 10 digits" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Subject *</label>
                      <input required type="text" id="subject" name="subject" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="How can we help?" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Message *</label>
                    <textarea required id="message" name="message" rows={6} className="w-full px-5 py-4 rounded-xl transition-all outline-none resize-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="Write your message here..."></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 font-bold rounded-full transition-all disabled:opacity-50 flex items-center justify-center gap-2 group hover:-translate-y-0.5 shadow-lg"
                      style={{ background: '#f3c892', color: '#0c0b0a' }}
                    >
                      {isPending ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
