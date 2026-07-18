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
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-lg text-slate-600">
          Have a question about our services or want to discuss a custom staffing solution? 
          We&apos;re here to help. Reach out to our team today!
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Phone</h3>
                <p className="text-slate-600 mb-2">Mon-Fri from 9am to 6pm.</p>
                <a href={`tel:${COMPANY.phone}`} className="text-blue-600 font-semibold hover:underline">
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-600 mb-2">Our friendly team is here to help.</p>
                <a href={`mailto:${COMPANY.email}`} className="text-indigo-600 font-semibold hover:underline">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Location</h3>
                <p className="text-slate-600 mb-2">Serving events across</p>
                <span className="text-slate-800 font-medium">
                  {COMPANY.location}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
              
              {state.success ? (
                <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl border border-emerald-100 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-emerald-700 max-w-sm mx-auto">
                    Thank you for reaching out. A member of our team will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-8 px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} action={formAction} className="space-y-6">
                  
                  {state.error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
                      {state.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                      <input required type="text" id="subject" name="subject" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="How can we help?" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none" placeholder="Write your message here..."></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                    <div className="w-full sm:w-auto">
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20"
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
