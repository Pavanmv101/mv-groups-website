'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitApplication } from './actions'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Join the <span className="gradient-text">MV Groups</span> Team
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            We are always looking for passionate, energetic, and reliable individuals to join our growing team. Whether you&apos;re looking for flexible event work or a career in manpower staffing, we have opportunities for you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Diverse Opportunities</h3>
              <p className="text-sm text-slate-600">From brand promoters to event logistics, find a role that fits your skills.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Flexible Schedules</h3>
              <p className="text-sm text-slate-600">Work when you want. Choose events that fit around your lifestyle.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Top Venues</h3>
              <p className="text-sm text-slate-600">Experience working at the best corporate and social events in Bengaluru.</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Your Application</h2>
            
            {state.success ? (
              <div className="text-center py-8">
                {/* Animated tick mark */}
                <div className="mx-auto mb-6 w-24 h-24 relative">
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      className="animate-[drawCircle_0.6s_ease-out_forwards]"
                    />
                    <path
                      d="M30 52 L44 66 L70 38"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="60"
                      strokeDashoffset="60"
                      className="animate-[drawCheck_0.4s_ease-out_0.5s_forwards]"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Thank you for your interest in joining MV Groups. Our recruitment team will review your application and get back to you shortly.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-8 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Submit Another Application
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
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                    <input required type="tel" id="phone" name="phone" pattern="[+0-9\s\-]+" minLength={10} maxLength={20} title="Phone number should contain at least 10 digits" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">City of Residence *</label>
                    <input required type="text" id="city" name="city" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="Bengaluru" />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-slate-700 mb-2">What are you interested in doing? *</label>
                  <select required id="interest" name="interest" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700">
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
                  <label htmlFor="availability" className="block text-sm font-medium text-slate-700 mb-2">Availability *</label>
                  <select required id="availability" name="availability" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700">
                    <option value="">Select your availability...</option>
                    <option value="Full-time">Full-time (Any days)</option>
                    <option value="Part-time (Weekends)">Part-time (Weekends Only)</option>
                    <option value="Part-time (Weekdays)">Part-time (Weekdays Only)</option>
                    <option value="Flexible / As Needed">Flexible / Per Event</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-2">Resume / CV (Optional)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      id="resume" 
                      name="resume" 
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all border border-slate-200 rounded-xl bg-slate-50" 
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Max size: 5MB. Formats: PDF, DOCX</p>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/20"
                >
                  {isPending ? (
                    'Submitting...'
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 font-semibold text-lg">
                How and when do I get paid?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Payments are typically processed within 48 to 72 hours after the successful completion of an event. We transfer payments directly to your provided bank account via NEFT/UPI. For long-term projects (e.g., month-long exhibitions), payments may be made weekly or bi-weekly.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 font-semibold text-lg">
                What is the standard dress code for events?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Dress codes vary depending on the client and the nature of the event. For corporate events, formal attire (black trousers, white shirt, blazer) is usually expected. For promotional events, clients often provide branded t-shirts. We will always inform you of the specific dress code before you confirm a shift.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 font-semibold text-lg">
                Do I need prior experience to join?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                While prior experience in event management, hospitality, or promotions is highly valued, it is not strictly mandatory for all roles. We look for individuals with great communication skills, punctuality, and a positive attitude. We often provide basic training/briefings before major events.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 font-semibold text-lg">
                How will I be notified about upcoming shifts?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Once you are shortlisted and verified in our database, our operations team will reach out to you via WhatsApp or phone call whenever there is an event in your city that matches your profile and availability.
              </p>
            </details>
          </div>
        </div>

      </div>
    </div>
  )
}
