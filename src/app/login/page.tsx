'use client'

import { useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowRight, Eye, EyeOff, ShieldCheck, Mail, RotateCcw } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { login, signup } from '@/app/login/actions'
import { Turnstile } from '@marsidev/react-turnstile'

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
    <div className="flex gap-2 sm:gap-3 justify-center">
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
          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl transition-all outline-none focus:border-transparent focus:ring-2"
          style={{ 
            background: '#0c0b0a', 
            border: '1px solid #282624', 
            color: '#ffffff',
            boxShadow: '0 0 0 0px rgba(243,200,146,0.2)' 
          }}
        />
      ))}
    </div>
  )
}

// Animated tick component adapted for dark theme
const AnimatedTick = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="p-8 sm:p-12 rounded-3xl shadow-2xl text-center border" style={{ background: '#1a1918', borderColor: '#282624' }}>
    <div className="mx-auto mb-8 w-24 h-24 relative flex items-center justify-center rounded-full" style={{ background: 'rgba(34,197,94,0.1)' }}>
      <svg className="w-12 h-12" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray="283"
          strokeDashoffset="283"
          className="animate-[drawCircle_0.6s_ease-out_forwards]"
        />
        <path
          d="M30 52 L44 66 L70 38"
          fill="none"
          stroke="#22c55e"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="60"
          strokeDashoffset="60"
          className="animate-[drawCheck_0.4s_ease-out_0.5s_forwards]"
        />
      </svg>
    </div>
    <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>{title}</h3>
    <p className="text-lg" style={{ color: '#a39e98' }}>{subtitle}</p>
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
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [requireCaptcha, setRequireCaptcha] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

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

    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    if (turnstileToken) {
      formData.append('turnstileToken', turnstileToken)
    }

    try {
      if (isLogin) {
        const result = await login(formData)
        
        if (result.error) {
          setError(result.error)
          if (result.requireCaptcha) {
            setRequireCaptcha(true)
          }
        } else if (result.success) {
          setRequireCaptcha(false)
          setTurnstileToken(null)
          setLoginSuccess(true)
          setTimeout(() => {
            if (result.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/dashboard')
            }
            router.refresh()
          }, 1500)
        }
      } else {
        const result = await signup(formData)
        
        if (result.error) {
          setError(result.error)
        } else if (result.success) {
          setOtpEmail(result.email as string)
          setOtpStep(true)
          setError(null)
        }
      }
    } catch (err: any) {
      console.error(err)
      setError('System Error: ' + (err.message || 'An error occurred. Please try again.'))
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
      <div className="p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(243,200,146,0.1)' }}>
              <Mail className="w-8 h-8" style={{ color: '#f3c892' }} />
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>Verify Your Email</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#a39e98' }}>
              We sent a 6-digit code to<br />
              <span className="font-bold" style={{ color: '#ffffff' }}>{otpEmail}</span>
            </p>
          </div>

          {error && (
            <div className="mb-8 p-5 rounded-xl border text-sm font-medium text-center" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <div className="mb-8">
            <OtpInput value={otpCode} onChange={setOtpCode} />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={loading || otpCode.length !== 6}
            className="w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Verify Email
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={handleResendOtp}
              disabled={resending}
              className="text-sm font-bold flex items-center justify-center gap-2 mx-auto transition-opacity hover:opacity-80"
              style={{ color: '#f3c892' }}
            >
              <RotateCcw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              {resending ? 'Sending...' : "Didn't get the code? Resend"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs" style={{ color: '#66625d' }}>
            <ShieldCheck className="w-4 h-4" />
            <span>Check your spam folder if you don&apos;t see the email</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
      <div className="relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-lg" style={{ color: '#a39e98' }}>
            {isLogin 
              ? 'Sign in to access your dashboard and manage bookings.'
              : 'Sign up to request quotes and track your bookings.'}
          </p>
        </div>

        {message && (
          <div className="mb-8 p-5 rounded-xl border text-sm font-medium" style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.2)', color: '#4ade80' }}>
            {message}
          </div>
        )}

        {error && (
          <div className="mb-8 p-5 rounded-xl border text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Full Name</label>
              <input 
                name="full_name"
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl transition-all outline-none"
                style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#a39e98' }}>Email Address</label>
            <input 
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-5 py-4 rounded-xl transition-all outline-none"
              style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold" style={{ color: '#a39e98' }}>Password</label>
              {isLogin && (
                <Link href="/forgot-password" className="text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: '#f3c892' }}>
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
                className="w-full px-5 py-4 rounded-xl transition-all outline-none pr-12"
                style={{ background: '#141312', border: '1px solid #282624', color: '#ffffff' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-100 transition-opacity p-1"
                style={{ color: '#66625d', opacity: 0.7 }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-xs mt-3" style={{ color: '#66625d' }}>Min 8 characters with uppercase, lowercase, and a number.</p>
            )}
          </div>

          {requireCaptcha && (
            <div className="mt-6 flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || lockedUntil !== null}
              className="w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-between text-sm">
          <div className="w-full h-px" style={{ background: '#282624' }}></div>
          <span className="px-4 font-semibold" style={{ color: '#66625d', background: '#1a1918' }}>OR</span>
          <div className="w-full h-px" style={{ background: '#282624' }}></div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading || lockedUntil !== null}
            className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all hover:opacity-90 disabled:opacity-50 border"
            style={{ background: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
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

        <div className="mt-8 flex items-center justify-center gap-2 text-xs" style={{ color: '#66625d' }}>
          <ShieldCheck className="w-4 h-4" />
          <span>Secured with end-to-end encryption</span>
        </div>

        <div className="mt-8 text-center text-sm font-medium" style={{ color: '#a39e98' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="font-bold hover:underline"
            style={{ color: '#f3c892' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-32" style={{ background: '#0c0b0a' }}>
      <div className="max-w-md w-full mx-auto px-4">
        <Suspense fallback={<div className="text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto" style={{ color: '#f3c892' }} /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
