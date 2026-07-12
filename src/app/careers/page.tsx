'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitApplication } from './actions'
import { Briefcase, MapPin, Clock, Upload, ArrowRight, CheckCircle2 } from 'lucide-react'

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
            We are always looking for passionate, energetic, and reliable individuals to join our growing team. Whether you're looking for flexible event work or a career in manpower staffing, we have opportunities for you!
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
                    <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" placeholder="+91 98765 43210" />
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
                  <label htmlFor="interest" className="block text-sm font-medium text-slate-700 mb-2">Primary Area of Interest *</label>
                  <select required id="interest" name="interest" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700">
                    <option value="">Select an area of interest...</option>
                    <option value="Manpower Staffing (Ushers, Registration, etc.)">Manpower Staffing (Ushers, Registration, etc.)</option>
                    <option value="Promotional Staffing (Brand Promoters)">Promotional Staffing (Brand Promoters)</option>
                    <option value="Event Setup & Logistics (Crew)">Event Setup & Logistics (Crew)</option>
                    <option value="Corporate Event Staffing">Corporate Event Staffing</option>
                    <option value="Exhibition Staffing">Exhibition Staffing</option>
                    <option value="Open to Any">Open to Any / General</option>
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

      </div>
    </div>
  )
}
