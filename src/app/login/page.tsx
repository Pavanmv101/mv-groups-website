'use client'

import { useState, Suspense } from 'react'
import { login, signup } from './actions'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react'

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const message = searchParams.get('message')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side lockout check
    if (lockedUntil && Date.now() < lockedUntil) {
      const secondsLeft = Math.ceil((lockedUntil - Date.now()) / 1000)
      setError(`Too many failed attempts. Please try again in ${secondsLeft} seconds.`)
      return
    }

    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    // Password strength check for signup
    if (!isLogin) {
      const password = formData.get('password') as string
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.')
        setLoading(false)
        return
      }
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
        setLoading(false)
        return
      }
    }

    try {
      if (isLogin) {
        const res = await login(formData)
        if (res?.error) {
          const newAttempts = failedAttempts + 1
          setFailedAttempts(newAttempts)
          
          if (newAttempts >= 5) {
            const lockTime = Date.now() + 30000 // 30 second lockout
            setLockedUntil(lockTime)
            setError('Too many failed attempts. Account locked for 30 seconds.')
            setTimeout(() => {
              setLockedUntil(null)
              setFailedAttempts(0)
            }, 30000)
          } else {
            setError(res.error)
          }
        } else if (res?.success) {
          setFailedAttempts(0)
          setLoginSuccess(true)
          // Show tick animation for 1.5s, then redirect
          setTimeout(() => {
            if (res.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/dashboard')
            }
          }, 1500)
        }
      } else {
        const res = await signup(formData)
        if (res?.error) {
          setError(res.error)
        } else if (res?.success) {
          router.push('/login?message=Check email to continue sign in process')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Show animated tick on login success
  if (loginSuccess) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
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
        <h3 className="text-xl font-bold text-slate-900 mb-2">Login Successful!</h3>
        <p className="text-slate-500">Redirecting you to your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl animate-fade-in-up">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="text-slate-600">
          {isLogin 
            ? 'Sign in to access your dashboard and manage bookings.'
            : 'Sign up to request quotes and track your bookings.'}
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              name="full_name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input 
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            {isLogin && (
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <input 
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {!isLogin && (
            <p className="text-xs text-slate-400 mt-1.5">Min 8 characters with uppercase, lowercase, and a number.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || (lockedUntil !== null && Date.now() < lockedUntil)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 mt-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security badge */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Secured with end-to-end encryption</span>
      </div>

      <div className="mt-6 text-center text-sm text-slate-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => { setIsLogin(!isLogin); setError(null); }}
          className="text-blue-600 font-semibold hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-20">
      <div className="max-w-md w-full mx-auto px-4">
        <Suspense fallback={<div className="text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
