'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar, Users, Filter, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

type Booking = {
  id: string
  client_id: string
  service_type: string
  contact_name: string
  contact_email: string
  contact_phone: string
  start_date: string
  end_date: string
  people_needed: number
  budget_range: string
  status: string
  created_at: string
  amount: number | null
}

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

export default function AdminBookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'all'

  const statuses = ['all', 'pending', 'approved', 'rejected', 'invoiced', 'paid', 'completed']

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    router.push(`/admin?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-500" />
          Filter Bookings
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentStatus === status
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-semibold">Client / Contact</th>
              <th className="px-6 py-4 font-semibold">Service</th>
              <th className="px-6 py-4 font-semibold">Dates & Staff</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No bookings found for the selected filter.
                </td>
              </tr>
            ) : (
              initialBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-slate-900">{booking.contact_name}</p>
                    <p className="text-sm text-slate-500">{booking.contact_email}</p>
                    <p className="text-sm text-slate-500">{booking.contact_phone}</p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="font-medium text-slate-900">{getServiceName(booking.service_type)}</p>
                    <p className="text-xs text-slate-500 mt-1">ID: {booking.id.split('-')[0]}</p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="text-sm text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-700 flex items-center gap-1 mt-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {booking.people_needed} Staff Needed
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    {getStatusBadge(booking.status)}
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
