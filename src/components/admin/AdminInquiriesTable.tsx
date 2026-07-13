'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Mail, Phone, Calendar, Clock, CheckCircle2, Archive } from 'lucide-react'

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  created_at: string
}

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'unread':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200"><Clock className="w-3 h-3"/> Unread</span>
    case 'read':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3"/> Read</span>
    case 'archived':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"><Archive className="w-3 h-3"/> Archived</span>
    default:
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{status}</span>
  }
}

export default function AdminInquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const currentStatus = searchParams.get('status') || 'all'

  const statuses = ['all', 'unread', 'read', 'archived']

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    router.push(`/admin?${params.toString()}`)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id)
    if (!error) {
      router.refresh()
    } else {
      alert('Failed to update status.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-slate-500" />
          General Inquiries
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
              <th className="px-6 py-4 font-semibold">Contact Info</th>
              <th className="px-6 py-4 font-semibold">Message</th>
              <th className="px-6 py-4 font-semibold">Status & Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No inquiries found for the selected filter.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className={`transition-colors ${inquiry.status === 'unread' ? 'bg-amber-50/30' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4 align-top w-64">
                    <p className="font-semibold text-slate-900">{inquiry.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 break-all">
                      <Mail className="w-3 h-3 shrink-0"/> {inquiry.email}
                    </p>
                    {inquiry.phone && (
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 shrink-0"/> {inquiry.phone}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top max-w-md">
                    <p className="font-bold text-slate-900 mb-1">{inquiry.subject}</p>
                    <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">{inquiry.message}</p>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-nowrap">
                    {getStatusBadge(inquiry.status)}
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top text-right space-y-2">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-1.5 pl-3 pr-8 bg-white text-slate-700 outline-none transition-all cursor-pointer hover:border-slate-400"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="archived">Archived</option>
                    </select>
                    
                    <a 
                      href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`}
                      className="inline-block w-full text-center px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors border border-indigo-200 mt-2"
                    >
                      Reply Email
                    </a>
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
