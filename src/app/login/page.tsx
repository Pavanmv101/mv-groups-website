'use client'

import { useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowRight, Eye, EyeOff, ShieldCheck, Mail, RotateCcw } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

function OtpInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const digits = value.padEnd(6, '').split('')

  function handleChange(index: number, char: string) {
    if (!/^\d?$/.test(char)) return
    const newDigits = [...digits]
    newDigits[index] = char
    onChange(newDigits.join('').trim())
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
    const focusIndex = Math.min(pasted.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
        />
      ))}
    </div>
  )
}

// Animated tick component
const AnimatedTick = ({ title, subtitle }: { title: string; subtitle: string }) => (
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
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500">{subtitle}</p>
  </div>
)

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

  // OTP verification state
  const [otpStep, setOtpStep] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [resending, setResending] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)
    try {
      const origin = window.location.origin
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to login with Google')
      }
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (lockedUntil && Date.now() < lockedUntil) {
      const secondsLeft = Math.ceil((lockedUntil - Date.now()) / 1000)
      setError(`Too many failed attempts. Please try again in ${secondsLeft} seconds.`)
      return
    }

    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    if (!isLogin) {
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
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        
        if (signInError) {
          const newAttempts = failedAttempts + 1
          setFailedAttempts(newAttempts)
          
          if (newAttempts >= 5) {
            const lockTime = Date.now() + 30000
            setLockedUntil(lockTime)
            setError('Too many failed attempts. Account locked for 30 seconds.')
            setTimeout(() => {
              setLockedUntil(null)
              setFailedAttempts(0)
            }, 30000)
          } else {
            setError(signInError.message)
          }
        } else if (data.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single()

          setFailedAttempts(0)
          setLoginSuccess(true)
          setTimeout(() => {
            if (userData?.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/dashboard')
            }
            router.refresh()
          }, 1500)
        }
      } else {
        const full_name = formData.get('full_name') as string
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name }
          }
        })
        
        if (signUpError) {
          setError(signUpError.message)
        } else {
          setOtpEmail(email)
          setOtpStep(true)
          setError(null)
        }
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit code.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: otpEmail,
        token: otpCode,
        type: 'signup',
      })
      
      if (verifyError) {
        setError(verifyError.message)
      } else {
        setOtpVerified(true)
        setTimeout(() => {
          router.push('/dashboard')
          router.refresh()
        }, 1500)
      }
    } catch (err) {
      console.error(err)
      setError('Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setResending(true)
    setError(null)
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: otpEmail,
      })
      if (resendError) {
        setError(resendError.message)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to resend code.')
    } finally {
      setResending(false)
    }
  }



  // Login success screen
  if (loginSuccess) {
    return <AnimatedTick title="Login Successful!" subtitle="Redirecting you to your dashboard..." />
  }

  // OTP verified success screen
  if (otpVerified) {
    return <AnimatedTick title="Email Verified!" subtitle="Your account is ready. Redirecting..." />
  }

  // OTP verification step
  if (otpStep) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
          <p className="text-slate-600">
            We sent a 6-digit code to<br />
            <span className="font-semibold text-slate-800">{otpEmail}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="mb-6">
          <OtpInput value={otpCode} onChange={setOtpCode} />
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={loading || otpCode.length !== 6}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Verify Email
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendOtp}
            disabled={resending}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 mx-auto transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            {resending ? 'Sending...' : "Didn't get the code? Resend"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Check your spam folder if you don&apos;t see the email</span>
        </div>
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
          disabled={loading || lockedUntil !== null}
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

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <div className="w-full h-px bg-slate-200"></div>
        <span className="px-3 bg-white text-slate-400">or</span>
        <div className="w-full h-px bg-slate-200"></div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading || lockedUntil !== null}
          className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-70"
        >
          {googleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>

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
