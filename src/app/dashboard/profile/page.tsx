'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, User, Lock, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { updateProfile, updatePassword } from './actions'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [initialLoading, setInitialLoading] = useState(true)
  const [userMetadata, setUserMetadata] = useState<any>(null)

  // Profile State
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')

  // Password State
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserMetadata(user.user_metadata)
        setFullName(user.user_metadata?.full_name || '')
      } else {
        router.push('/login')
      }
      setInitialLoading(false)
    }
    fetchUser()
  }, [router, supabase.auth])

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileError(null)
    setProfileSuccess(false)

    const formData = new FormData(e.currentTarget)
    try {
      const res = await updateProfile(formData)
      if (res.error) {
        setProfileError(res.error)
      } else if (res.success) {
        setProfileSuccess(true)
        setTimeout(() => setProfileSuccess(false), 3000)
        router.refresh()
      }
    } catch (err) {
      setProfileError('An unexpected error occurred.')
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordError(null)
    setPasswordSuccess(false)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.')
      setPasswordLoading(false)
      return
    }

    try {
      const res = await updatePassword(formData)
      if (res.error) {
        setPasswordError(res.error)
      } else if (res.success) {
        setPasswordSuccess(true)
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setPasswordSuccess(false), 3000)
      }
    } catch (err) {
      setPasswordError('An unexpected error occurred.')
    } finally {
      setPasswordLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account details and security.</p>
        </div>

        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-6">
              {profileError && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                  {profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Profile updated successfully.
                </div>
              )}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    disabled
                    value={userMetadata?.email || 'Your Email'}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">Email cannot be changed currently.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    name="full_name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Security</h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6">
              {passwordError && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Password updated successfully.
                </div>
              )}
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input 
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">Min 8 characters with uppercase, lowercase, and a number.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                  <input 
                    name="confirm_password"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {passwordLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
