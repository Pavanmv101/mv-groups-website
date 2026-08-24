'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitApplication } from './actions'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const initialState = {
  success: false,
  error: null,
}

export default function CareersPage() {
  const [state, formAction, isPending] = useActionState(submitApplication, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Header Section ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span 
              className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
              style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
            >
              Careers
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" 
            style={{ color: '#ffffff' }}
          >
            Join the <span style={{ color: '#f3c892' }}>MV Groups</span> Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed" 
            style={{ color: '#a39e98' }}
          >
            We are always looking for passionate, energetic, and reliable individuals to join our growing team. Whether you&apos;re looking for flexible event work or a career in manpower staffing, we have opportunities for you.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-3xl transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <Briefcase className="w-6 h-6" style={{ color: '#f3c892' }} />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#ffffff' }}>Diverse Opportunities</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>From brand promoters to event logistics, find a role that fits your skills.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-3xl transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <Clock className="w-6 h-6" style={{ color: '#f3c892' }} />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#ffffff' }}>Flexible Schedules</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>Work when you want. Choose events that fit around your lifestyle.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-8 rounded-3xl transition-all hover:-translate-y-1" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <MapPin className="w-6 h-6" style={{ color: '#f3c892' }} />
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#ffffff' }}>Top Venues</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>Experience working at the best corporate and social events in Bengaluru.</p>
            </motion.div>
          </div>
        </div>

        {/* ── Application Form ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-3xl mx-auto rounded-3xl overflow-hidden relative" 
          style={{ background: '#1a1918', border: '1px solid #282624' }}
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
          <div className="p-8 md:p-12 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: '#ffffff' }}>Submit Your Application</h2>
            
            {state.success ? (
              <div className="text-center py-12">
                <div className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>Application Submitted!</h3>
                <p className="max-w-md mx-auto mb-10 text-lg" style={{ color: '#a39e98' }}>
                  Thank you for your interest in joining MV Groups. Our recruitment team will review your application and get back to you shortly.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 rounded-full font-bold transition-all hover:opacity-90"
                  style={{ background: '#f3c892', color: '#0c0b0a' }}
                >
                  Submit Another Application
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
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Phone Number *</label>
                    <input required type="tel" id="phone" name="phone" pattern="[+0-9\s\-]+" minLength={10} maxLength={20} title="Phone number should contain at least 10 digits" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Email Address *</label>
                    <input required type="email" id="email" name="email" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>City of Residence *</label>
                    <input required type="text" id="city" name="city" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="Bengaluru" />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>What are you interested in doing? *</label>
                  <select required id="interest" name="interest" className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none" style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }}>
                    <option value="">Select what you are interested in doing...</option>
                    <option value="Usher / Registration Staff">Usher / Registration Staff</option>
                    <option value="Brand Promoter">Brand Promoter</option>
                    <option value="Event Setup & Logistics Crew">Event Setup & Logistics Crew</option>
                    <option value="Corporate Event Staff">Corporate Event Staff</option>
                    <option value="Exhibition Staff">Exhibition Staff</option>
                    <option value="Open to Any Role">Open to Any Role</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Availability *</label>
                  <select required id="availability" name="availability" className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none" style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }}>
                    <option value="">Select your availability...</option>
                    <option value="Full-time">Full-time (Any days)</option>
                    <option value="Part-time (Weekends)">Part-time (Weekends Only)</option>
                    <option value="Part-time (Weekdays)">Part-time (Weekdays Only)</option>
                    <option value="Flexible / As Needed">Flexible / Per Event</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Gender *</label>
                    <select required id="gender" name="gender" className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none" style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }}>
                      <option value="">Select gender...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Prior Experience *</label>
                    <select required id="experience" name="experience" className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none" style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }}>
                      <option value="">Do you have experience?</option>
                      <option value="None">No prior experience (Fresher)</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="languages" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Languages Spoken *</label>
                    <input required type="text" id="languages" name="languages" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="English, Kannada, Hindi..." />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Instagram Handle (Optional)</label>
                    <input type="text" id="instagram" name="instagram" className="w-full px-5 py-4 rounded-xl transition-all outline-none" style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }} placeholder="@yourhandle" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="photo" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Headshot / Full Body Photo (Optional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="photo" 
                        name="photo" 
                        accept="image/jpeg,image/png,image/webp"
                        className="w-full px-5 py-4 rounded-xl transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f3c892] file:text-[#0c0b0a] hover:file:bg-[#e2b985]" 
                        style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }} 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="resume" className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Resume / CV (Optional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="resume" 
                        name="resume" 
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="w-full px-5 py-4 rounded-xl transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f3c892] file:text-[#0c0b0a] hover:file:bg-[#e2b985]" 
                        style={{ background: '#141312', border: '1px solid #282624', color: '#a39e98' }} 
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs" style={{ color: '#66625d' }}>Max size: 5MB. Formats: PDF, DOCX, JPG, PNG</p>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    {isPending ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="max-w-3xl mx-auto mt-32">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#ffffff' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <details className="group p-6 rounded-2xl transition-all [&_summary::-webkit-details-marker]:hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-lg" style={{ color: '#ffffff' }}>
                How and when do I get paid?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180" style={{ color: '#f3c892' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-base" style={{ color: '#a39e98' }}>
                Payments are typically processed within 48 to 72 hours after the successful completion of an event. We transfer payments directly to your provided bank account via NEFT/UPI. For long-term projects (e.g., month-long exhibitions), payments may be made weekly or bi-weekly.
              </p>
            </details>

            <details className="group p-6 rounded-2xl transition-all [&_summary::-webkit-details-marker]:hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-lg" style={{ color: '#ffffff' }}>
                What is the standard dress code for events?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180" style={{ color: '#f3c892' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-base" style={{ color: '#a39e98' }}>
                Dress codes vary depending on the client and the nature of the event. For corporate events, formal attire (black trousers, white shirt, blazer) is usually expected. For promotional events, clients often provide branded t-shirts. We will always inform you of the specific dress code before you confirm a shift.
              </p>
            </details>

            <details className="group p-6 rounded-2xl transition-all [&_summary::-webkit-details-marker]:hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-lg" style={{ color: '#ffffff' }}>
                Do I need prior experience to join?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180" style={{ color: '#f3c892' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-base" style={{ color: '#a39e98' }}>
                While prior experience in event management, hospitality, or promotions is highly valued, it is not strictly mandatory for all roles. We look for individuals with great communication skills, punctuality, and a positive attitude. We often provide basic training/briefings before major events.
              </p>
            </details>

            <details className="group p-6 rounded-2xl transition-all [&_summary::-webkit-details-marker]:hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-lg" style={{ color: '#ffffff' }}>
                How will I be notified about upcoming shifts?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180" style={{ color: '#f3c892' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-base" style={{ color: '#a39e98' }}>
                Once you are shortlisted and verified in our database, our operations team will reach out to you via WhatsApp or phone call whenever there is an event in your city that matches your profile and availability.
              </p>
            </details>
          </div>
        </div>

      </div>
    </div>
  )
}
