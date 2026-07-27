'use client'

import { useState } from 'react'
import { resetPassword } from './actions'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await resetPassword(formData)
      if (res?.error) {
        setError(res.error)
      } else if (res?.success) {
        setMessage("If that email exists, we've sent a password reset link.")
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-32 px-4 sm:px-6 lg:px-8" style={{ background: '#0c0b0a' }}>
      <div className="max-w-md w-full mx-auto">
        
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl font-black text-2xl transition-transform hover:scale-105 shadow-xl" style={{ background: '#f3c892', color: '#0c0b0a' }}>
            MV
          </Link>
        </div>
        
        <div className="p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
          <div className="relative z-10">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>
                Reset Password
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#a39e98' }}>
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {message && (
              <div className="mb-8 p-5 rounded-xl border text-sm font-medium text-center" style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.2)', color: '#4ade80' }}>
                {message}
              </div>
            )}

            {error && (
              <div className="mb-8 p-5 rounded-xl border text-sm font-medium text-center" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
                {error}
              </div>
            )}

            {!message && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Email Address</label>
                  <input 
                    name="email"
                    type="email"
                    required
                    className="w-full px-5 py-4 rounded-xl transition-all outline-none"
                    style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg"
                    style={{ background: '#f3c892', color: '#0c0b0a' }}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid #282624' }}>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80" style={{ color: '#f3c892' }}>
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
