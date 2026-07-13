'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar, Users, Filter, CheckCircle2, AlertCircle, Clock, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { SERVICES } from '@/lib/constants'
import Link from 'next/link'

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

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    setCurrentPage(1)
    setSelectedIds([])
    router.push(`/admin?${params.toString()}`)
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedBookings.map(b => b.id))
    } else {
      setSelectedIds([])
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const handleBulkApprove = async () => {
    if (!selectedIds.length) return
    const supabase = createClient()
    await supabase.from('bookings').update({ status: 'approved' }).in('id', selectedIds)
    router.refresh()
    setSelectedIds([])
  }

  const handleExportCSV = () => {
    if (!selectedIds.length) return
    const selectedBookings = initialBookings.filter(b => selectedIds.includes(b.id))
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Client,Email,Phone,Service,Start Date,End Date,Staff Needed,Status\n"
      + selectedBookings.map(b => 
          `${b.id},"${b.contact_name}","${b.contact_email}","${b.contact_phone}",${b.service_type},${b.start_date},${b.end_date},${b.people_needed},${b.status}`
        ).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "bookings_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalPages = Math.ceil(initialBookings.length / pageSize)
  const paginatedBookings = initialBookings.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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

      {selectedIds.length > 0 && (
        <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-800">{selectedIds.length} bookings selected</span>
          <div className="flex gap-2">
            <button onClick={handleBulkApprove} className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded shadow-sm text-sm font-medium hover:bg-indigo-50">Approve Selected</button>
            <button onClick={handleExportCSV} className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded shadow-sm text-sm font-medium hover:bg-indigo-50 flex items-center gap-1"><Download className="w-4 h-4"/> Export CSV</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-semibold w-12">
                <input type="checkbox" checked={paginatedBookings.length > 0 && selectedIds.length === paginatedBookings.length} onChange={handleSelectAll} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"/>
              </th>
              <th className="px-6 py-4 font-semibold">Client / Contact</th>
              <th className="px-6 py-4 font-semibold">Service</th>
              <th className="px-6 py-4 font-semibold">Dates & Staff</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No bookings found for the selected filter.
                </td>
              </tr>
            ) : (
              paginatedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <input type="checkbox" checked={selectedIds.includes(booking.id)} onChange={() => toggleSelect(booking.id)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"/>
                  </td>
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
                    <Link href={`/admin/booking/${booking.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, initialBookings.length)}</span> of <span className="font-medium">{initialBookings.length}</span> results
          </p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4"/>
            </button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
