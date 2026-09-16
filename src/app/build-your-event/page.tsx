'use client';

import { useState } from 'react';
import { SERVICES } from '@/lib/constants';
import { ArrowRight, CheckCircle2, Package, MapPin, Calendar as CalendarIcon, Users } from 'lucide-react';
import Link from 'next/link';

export default function BuildYourEventPage() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    date: '',
    venue: '',
    name: '',
    email: '',
    phone: '',
    budget: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const EVENT_TYPES = ['Corporate Gala', 'Wedding', 'Concert / Festival', 'Private Party', 'Exhibition', 'Other'];
  const GUEST_COUNTS = ['Under 50', '50 - 200', '200 - 500', '500 - 1000', '1000+'];
  const BUDGETS = ['₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹3,00,000', '₹3,00,000+'];

  const handleToggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Combine everything into a massive description for the existing booking action
    const description = `
[ONE-STOP EVENT PACKAGE]
Event Type: ${formData.eventType}
Guest Count: ${formData.guestCount}
Budget: ${formData.budget}
Venue: ${formData.venue}
Selected Services: ${selectedServices.map(id => SERVICES.find(s => s.id === id)?.title).join(', ')}

Additional Details:
${formData.details}
    `.trim();

    try {
      const formDataObj = new FormData();
      formDataObj.append('contact_name', formData.name);
      formDataObj.append('contact_email', formData.email);
      formDataObj.append('contact_phone', formData.phone);
      formDataObj.append('service_type', 'event_package');
      formDataObj.append('start_date', formData.date);
      formDataObj.append('description', description);
      formDataObj.append('people_needed', '1'); // Default

      // We use the existing booking action
      const { submitBooking } = await import('@/app/booking/actions');
      const res = await submitBooking(formDataObj);
      
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">Event Package Submitted!</h1>
          <p className="text-lg text-[#a39e98] mb-8">
            Thank you for trusting MV Groups as your one-stop solution. Our event specialists will review your requirements and reach out within 2 hours with a comprehensive proposal.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1" style={{ background: '#f3c892', color: '#0c0b0a' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6" style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}>
            <Package className="w-4 h-4" />
            One-Stop Solution
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Build Your <span style={{ color: '#f3c892' }}>Event Package</span>
          </h1>
          <p className="text-lg md:text-xl text-[#a39e98]">
            Select everything you need for your event in one place. We'll handle the rest.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ background: '#1a1918' }} />
          <div className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-all duration-500" style={{ background: '#f3c892', width: `${((step - 1) / 2) * 100}%` }} />
          
          {[1, 2, 3].map((num) => (
            <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-500 ${step >= num ? 'bg-[#f3c892] text-[#0c0b0a]' : 'bg-[#1a1918] text-[#a39e98]'}`}>
              {num}
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-6 sm:p-10" style={{ background: '#141312', border: '1px solid #282624' }}>
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-8">What kind of event are you planning?</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {EVENT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, eventType: type})}
                    className={`p-4 rounded-xl text-left border transition-all ${formData.eventType === type ? 'bg-[#f3c892]/10 border-[#f3c892] text-[#f3c892]' : 'bg-[#0c0b0a] border-[#282624] text-[#a39e98] hover:border-[#f3c892]/50'}`}
                  >
                    <span className="font-semibold">{type}</span>
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Estimated Guests</label>
                  <select 
                    value={formData.guestCount}
                    onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                    className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624] appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f3c892'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="">Select count...</option>
                    {GUEST_COUNTS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Event Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f3c892]" />
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-[#0c0b0a] text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none border border-[#282624] [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Venue / Location (Bengaluru)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f3c892]" />
                    <input 
                      type="text"
                      placeholder="e.g. ITC Gardenia, Bangalore Palace"
                      value={formData.venue}
                      onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      className="w-full bg-[#0c0b0a] text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none border border-[#282624]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.eventType}
                  className="px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 transition-all hover:gap-3"
                  style={{ background: '#f3c892', color: '#0c0b0a' }}
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Services */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-2">Select Services Needed</h2>
              <p className="text-[#a39e98] mb-8">Choose all that apply. We'll bundle them into one comprehensive package.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {SERVICES.map(service => {
                  const Icon = service.icon;
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleToggleService(service.id)}
                      className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-3 group ${isSelected ? 'bg-[#f3c892]/10 border-[#f3c892]' : 'bg-[#0c0b0a] border-[#282624] hover:border-[#f3c892]/50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#f3c892]' : 'bg-[#1a1918]'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#0c0b0a]' : 'text-[#f3c892]'}`} />
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#f3c892] border-[#f3c892]' : 'border-[#282624]'}`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-[#0c0b0a]" />}
                        </div>
                      </div>
                      <div>
                        <h3 className={`font-bold mb-1 ${isSelected ? 'text-[#f3c892]' : 'text-white'}`}>{service.title}</h3>
                        <p className="text-xs text-[#a39e98] line-clamp-2">{service.shortDescription}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full font-bold text-white border border-[#282624] hover:bg-[#1a1918]">Back</button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={selectedServices.length === 0}
                  className="px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 transition-all hover:gap-3"
                  style={{ background: '#f3c892', color: '#0c0b0a' }}
                >
                  Review Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Submit */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-8">Final Details</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Your Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email Address *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Overall Budget Estimate</label>
                    <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624] appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f3c892'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}>
                      <option value="">Select...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-2">Any specific requirements or schedule?</label>
                    <textarea rows={4} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-[#0c0b0a] text-white px-4 py-3 rounded-xl focus:outline-none border border-[#282624] resize-none" placeholder="E.g. We need the DJ for 5 hours, and bouncers primarily at the main entrance..." />
                  </div>
                </div>

                <div className="p-6 rounded-2xl mb-8" style={{ background: 'rgba(243,200,146,0.05)' }}>
                  <h4 className="font-bold text-[#f3c892] mb-3">Package Summary</h4>
                  <ul className="text-sm text-[#a39e98] space-y-1">
                    <li>• {formData.eventType} for {formData.guestCount} guests</li>
                    <li>• {selectedServices.length} Services: {selectedServices.map(id => SERVICES.find(s => s.id === id)?.title).join(', ')}</li>
                  </ul>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 mb-6">Failed to submit. Please ensure all fields are filled or try again.</p>
                )}

                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => setStep(2)} className="px-6 py-3 rounded-full font-bold text-white border border-[#282624] hover:bg-[#1a1918]">Back</button>
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-1 transition-transform"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Request Package Quote'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
