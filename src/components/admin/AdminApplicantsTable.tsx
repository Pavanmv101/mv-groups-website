'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Calendar, Phone, Mail, MapPin, Briefcase, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

type Applicant = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  interest: string
  availability: string
  resume_url: string | null
  status: string
  created_at: string
}

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'new':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200"><Clock className="w-3 h-3"/> New</span>
    case 'reviewed':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"><Clock className="w-3 h-3"/> Reviewed</span>
    case 'shortlisted':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3"/> Shortlisted</span>
    case 'rejected':
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><AlertCircle className="w-3 h-3"/> Rejected</span>
    default:
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{status}</span>
  }
}

export default function AdminApplicantsTable({ applicants }: { applicants: Applicant[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const currentStatus = searchParams.get('status') || 'all'

  const statuses = ['all', 'new', 'reviewed', 'shortlisted', 'rejected']

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
    const { error } = await supabase.from('applicants').update({ status: newStatus }).eq('id', id)
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
          <Briefcase className="w-5 h-5 text-slate-500" />
          Job Applications
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
              <th className="px-6 py-4 font-semibold">Applicant</th>
              <th className="px-6 py-4 font-semibold">Interest & Availability</th>
              <th className="px-6 py-4 font-semibold">Resume</th>
              <th className="px-6 py-4 font-semibold">Status & Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applicants.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No applicants found for the selected filter.
                </td>
              </tr>
            ) : (
              applicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-slate-900">{app.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><Mail className="w-3 h-3"/> {app.email}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {app.phone}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/> {app.city}</p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="font-medium text-slate-900">{app.interest}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      {app.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top">
                    {app.resume_url ? (
                      <a 
                        href={app.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400 italic">No resume</span>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top">
                    {getStatusBadge(app.status)}
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="text-sm border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-1.5 pl-3 pr-8 bg-white text-slate-700 outline-none transition-all cursor-pointer hover:border-slate-400"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
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
