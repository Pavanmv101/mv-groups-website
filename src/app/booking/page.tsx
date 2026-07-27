'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import { createClient } from '@/utils/supabase/client';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { submitBooking } from './actions';

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    service_type: preselectedService,
    start_date: '',
    end_date: '',
    people_needed: 1,
    budget_range: '',
    description: '',
  });

  const [prevService, setPrevService] = useState(preselectedService);
  if (preselectedService !== prevService) {
    setPrevService(preselectedService);
    setFormData((prev) => ({ ...prev, service_type: preselectedService }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Pre-fill data if user is logged in
  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsLoggedIn(true);
        setFormData(prev => ({
          ...prev,
          contact_name: user.user_metadata?.full_name || prev.contact_name,
          contact_email: user.email || prev.contact_email,
        }));
      }
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      const formDataObj = new FormData(e.target as HTMLFormElement);
      const result = await submitBooking(formDataObj);

      if (!result.success) {
        throw new Error(result.error);
      }
      
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl p-10 sm:p-14 text-center animate-fade-in-up" style={{ background: '#1a1918', border: '1px solid #282624' }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>Request Submitted!</h2>
        <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: '#a39e98' }}>
          Thank you for reaching out. Our team will review your requirements and get back to you with a customized quote shortly.
        </p>
        <Link 
          href="/services" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:opacity-90"
          style={{ background: '#f3c892', color: '#0c0b0a' }}
        >
          Explore More Services
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-12 animate-fade-in-up delay-200 shadow-2xl relative overflow-hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
      <div className="relative z-10">
        
        {error && (
          <div className="mb-8 p-5 rounded-xl border text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
            {error}
          </div>
        )}

        {isLoggedIn ? (
          <>
            <input type="hidden" name="contact_name" value={formData.contact_name} />
            <input type="hidden" name="contact_email" value={formData.contact_email} />
            <input type="hidden" name="contact_phone" value={formData.contact_phone} />
          </>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-bold border-b pb-4 mb-6" style={{ color: '#ffffff', borderColor: '#282624' }}>Contact Details</h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Full Name *</label>
              <input 
                type="text" 
                name="contact_name" 
                required 
                value={formData.contact_name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl transition-all outline-none"
                style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Email Address *</label>
              <input 
                type="email" 
                name="contact_email" 
                required 
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl transition-all outline-none"
                style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Phone Number *</label>
              <input 
                type="tel" 
                name="contact_phone" 
                required 
                pattern="[+0-9\s\-]+"
                minLength={10}
                maxLength={20}
                title="Phone number should contain at least 10 digits"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl transition-all outline-none"
                style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="sm:col-span-2 mt-2">
            <h3 className="text-xl font-bold border-b pb-4 mb-6" style={{ color: '#ffffff', borderColor: '#282624' }}>Event & Staffing Requirements</h3>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Service Type *</label>
            <select 
              name="service_type" 
              required 
              value={formData.service_type}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none"
              style={{ background: '#141312', border: '1px solid #282624', color: formData.service_type ? '#ffffff' : '#a39e98' }}
            >
              <option value="" disabled>Select a service...</option>
              {SERVICES.map(s => (
                <option key={s.id} value={s.id} style={{ color: '#ffffff' }}>{s.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Start Date *</label>
            <input 
              type="date" 
              name="start_date" 
              required 
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none"
              style={{ background: '#141312', border: '1px solid #282624', color: formData.start_date ? '#ffffff' : '#a39e98' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>End Date *</label>
            <input 
              type="date" 
              name="end_date" 
              required 
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none"
              style={{ background: '#141312', border: '1px solid #282624', color: formData.end_date ? '#ffffff' : '#a39e98' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Staff/People Needed</label>
            <input 
              type="number" 
              name="people_needed" 
              min="1"
              value={formData.people_needed}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none"
              style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Budget Range (Optional)</label>
            <select 
              name="budget_range" 
              value={formData.budget_range}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none appearance-none"
              style={{ background: '#141312', border: '1px solid #282624', color: formData.budget_range ? '#ffffff' : '#a39e98' }}
            >
              <option value="">Select a range...</option>
              <option value="Under ₹10,000" style={{ color: '#ffffff' }}>Under ₹10,000</option>
              <option value="₹10,000 - ₹50,000" style={{ color: '#ffffff' }}>₹10,000 - ₹50,000</option>
              <option value="₹50,000 - ₹2,00,000" style={{ color: '#ffffff' }}>₹50,000 - ₹2,00,000</option>
              <option value="₹2,00,000+" style={{ color: '#ffffff' }}>₹2,00,000+</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Additional Details</label>
            <textarea 
              name="description" 
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl transition-all outline-none resize-none"
              style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
              placeholder="Tell us more about your event or specific requirements..."
            ></textarea>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Request Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Page Header ── */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span 
            className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
            style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
          >
            Get a Quote
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>
            Book Our <span style={{ color: '#f3c892' }}>Services</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: '#a39e98' }}>
            Fill out the form below with your requirements, and our team will get back to you with a tailored quote within 24 hours.
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin mx-auto" style={{ color: '#f3c892' }} />
          </div>
        }>
          <BookingForm />
        </Suspense>

      </div>
    </div>
  );
}
