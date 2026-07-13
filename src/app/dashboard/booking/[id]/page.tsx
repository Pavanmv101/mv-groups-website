import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Users, Briefcase } from 'lucide-react'
import BookingMessaging from '@/components/BookingMessaging'

export default async function ClientBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/auth/login')
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .eq('client_id', session.user.id)
    .single()

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-slate-900">Booking not found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">Return to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Booking Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Booking Details</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                  booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Service</p>
                    <p className="text-sm font-semibold text-slate-900">{booking.service_type}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Dates</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">People Needed</p>
                    <p className="text-sm font-semibold text-slate-900">{booking.people_needed}</p>
                  </div>
                </div>
              </div>

              {booking.description && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-2">Description</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded-xl border border-slate-100">{booking.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Messaging Thread */}
          <div className="lg:col-span-2">
            <BookingMessaging bookingId={booking.id} currentRole="client" currentUserId={session.user.id} />
          </div>

        </div>
      </div>
    </div>
  )
}
