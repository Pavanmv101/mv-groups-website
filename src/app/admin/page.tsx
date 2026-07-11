import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminBookingsTable from '@/components/admin/AdminBookingsTable'
import AdminApplicantsTable from '@/components/admin/AdminApplicantsTable'
import AdminInquiriesTable from '@/components/admin/AdminInquiriesTable'
import AdminUpdatesTable from '@/components/admin/AdminUpdatesTable'
import { ShieldCheck, Users, Briefcase, Mail, Megaphone } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string, view?: string }>
}) {
  const supabase = await createClient()

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // 2. Authorize admin role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'admin') {
    redirect('/dashboard')
  }

  // 3. Extract search params for filtering & view toggling
  const resolvedParams = await searchParams
  const statusFilter = resolvedParams.status
  const currentView = ['bookings', 'applicants', 'inquiries', 'updates'].includes(resolvedParams.view || '') 
    ? resolvedParams.view 
    : 'bookings'

  // 4. Fetch Data based on view
  let bookings: any[] = []
  let applicants: any[] = []
  let inquiries: any[] = []
  let updates: any[] = []
  let fetchError = null

  if (currentView === 'bookings') {
    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (statusFilter && statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data, error } = await query
    bookings = data || []
    fetchError = error
  } else if (currentView === 'applicants') {
    let query = supabase.from('applicants').select('*').order('created_at', { ascending: false })
    if (statusFilter && statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data, error } = await query
    applicants = data || []
    fetchError = error
  } else if (currentView === 'updates') {
    let query = supabase.from('updates').select('*').order('created_at', { ascending: false })
    if (statusFilter && statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data, error } = await query
    updates = data || []
    fetchError = error
  } else {
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (statusFilter && statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data, error } = await query
    inquiries = data || []
    fetchError = error
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200">
                <ShieldCheck className="w-4 h-4" />
                Admin Protected
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
            <p className="text-slate-600 mt-1">Manage all incoming bookings, team applications, messages, and news updates.</p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-slate-200 overflow-x-auto hide-scrollbar">
          <Link
            href="/admin?view=bookings"
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              currentView === 'bookings'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Client Bookings
          </Link>
          <Link
            href="/admin?view=applicants"
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              currentView === 'applicants'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Job Applications
          </Link>
          <Link
            href="/admin?view=inquiries"
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              currentView === 'inquiries'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Messages
          </Link>
          <Link
            href="/admin?view=updates"
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              currentView === 'updates'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            News & Updates
          </Link>
        </div>

        {fetchError ? (
          <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
            Error loading data: {fetchError.message}
          </div>
        ) : (
          <>
            {currentView === 'bookings' && (
              <AdminBookingsTable initialBookings={bookings} />
            )}
            {currentView === 'applicants' && (
              <AdminApplicantsTable applicants={applicants} />
            )}
            {currentView === 'inquiries' && (
              <AdminInquiriesTable inquiries={inquiries} />
            )}
            {currentView === 'updates' && (
              <AdminUpdatesTable updates={updates} />
            )}
          </>
        )}

      </div>
    </div>
  )
}
