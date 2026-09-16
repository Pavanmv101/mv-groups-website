'use client';

import { useState } from 'react';
import { requestBrochure } from '@/app/actions/brochure';
import { FileText, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function BrochureDownload() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await requestBrochure(email);
      if (res.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send request');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#0c0b0a' }}>
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.03)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.02)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className="rounded-3xl p-8 md:p-12 text-center"
          style={{ background: '#141312', border: '1px solid #282624' }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(243,200,146,0.1)' }}>
            <FileText className="w-8 h-8" style={{ color: '#f3c892' }} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Download Our Company Profile
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#a39e98' }}>
            Get a comprehensive overview of MV Groups, our full service catalog, operational footprint, and past successful events.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Check Your Inbox!</h3>
              <p className="text-green-400">We've emailed the profile PDF to your address.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm underline opacity-70 hover:opacity-100 transition-opacity text-white"
              >
                Request another copy
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="flex-1 bg-[#0c0b0a] text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 disabled:opacity-50"
                style={{ border: '1px solid #282624' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:-translate-y-1"
                style={{ background: '#f3c892', color: '#0c0b0a' }}
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Download PDF
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
          
          {status === 'error' && (
            <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>
          )}
          
          <p className="text-xs mt-6 opacity-50 text-white">
            By downloading, you agree to receive occasional updates from MV Groups. We never spam.
          </p>
        </div>
      </div>
    </section>
  );
}
