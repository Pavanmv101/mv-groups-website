import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Users, IndianRupee, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch bookings for this user
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  const getServiceName = (id: string) => {
    return SERVICES.find(s => s.id === id)?.title || id
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200"><Clock className="w-3 h-3"/> Pending</span>
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"><CheckCircle2 className="w-3 h-3"/> Approved</span>
      case 'completed':
      case 'paid':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3"/> {status.charAt(0).toUpperCase() + status.slice(1)}</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><AlertCircle className="w-3 h-3"/> Rejected</span>
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back, {user.user_metadata?.full_name || user.email}</p>
          </div>
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shrink-0"
          >
            New Booking Request
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900">Your Bookings</h2>
          </div>
          
          {error && (
            <div className="p-6 text-red-600 bg-red-50">
              Error loading bookings: {error.message}
            </div>
          )}

          {!bookings || bookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No bookings yet</h3>
              <p className="text-slate-500 mb-6">You haven't requested any services yet.</p>
              <Link href="/services" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
                Explore our services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {getServiceName(booking.service_type)}
                        </h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm text-slate-500">
                        Requested on {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {booking.amount && (
                      <div className="text-right">
                        <p className="text-sm text-slate-500 font-medium">Quote Amount</p>
                        <p className="text-xl font-bold text-slate-900">₹{booking.amount.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Dates</p>
                      <p className="text-sm text-slate-900 font-medium">
                        {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Staff Needed</p>
                      <p className="text-sm text-slate-900 font-medium">{booking.people_needed} People</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 font-medium mb-1">Description</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{booking.description || 'No description provided.'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
