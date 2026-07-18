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
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted!</h2>
        <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
          Thank you for reaching out. Our team will review your requirements and get back to you with a customized quote shortly.
        </p>
        <Link 
          href="/services" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
        >
          Explore More Services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 animate-fade-in-up delay-200">
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
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
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="sm:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Contact Details</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              name="contact_name" 
              required 
              value={formData.contact_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
            <input 
              type="email" 
              name="contact_email" 
              required 
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
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
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="sm:col-span-2 mt-4">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Event & Staffing Requirements</h3>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Service Type *</label>
          <select 
            name="service_type" 
            required 
            value={formData.service_type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white appearance-none"
          >
            <option value="" disabled>Select a service...</option>
            {SERVICES.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Start Date *</label>
          <input 
            type="date" 
            name="start_date" 
            required 
            value={formData.start_date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">End Date *</label>
          <input 
            type="date" 
            name="end_date" 
            required 
            value={formData.end_date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Staff/People Needed</label>
          <input 
            type="number" 
            name="people_needed" 
            min="1"
            value={formData.people_needed}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range (Optional)</label>
          <select 
            name="budget_range" 
            value={formData.budget_range}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white appearance-none"
          >
            <option value="">Select a range...</option>
            <option value="Under ₹10,000">Under ₹10,000</option>
            <option value="₹10,000 - ₹50,000">₹10,000 - ₹50,000</option>
            <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
            <option value="₹2,00,000+">₹2,00,000+</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Details</label>
          <textarea 
            name="description" 
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white resize-none"
            placeholder="Tell us more about your event or specific requirements..."
          ></textarea>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Get a Quote
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Book Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the form below with your requirements, and our team will get back to you with a tailored quote within 24 hours.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" /></div>}>
          <BookingForm />
        </Suspense>

      </div>
    </div>
  );
}
