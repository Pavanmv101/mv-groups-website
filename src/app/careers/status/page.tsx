'use client'

import { useActionState, useState } from 'react'
import { checkApplicationStatus } from './actions'
import { ArrowLeft, Search, Clock, CheckCircle, XCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const initialState = {
  success: false,
  error: null,
  data: null as any
}

export default function StatusCheckPage() {
  const [state, formAction, isPending] = useActionState(checkApplicationStatus, initialState)
  const [appId, setAppId] = useState('')

  const getStatusDisplay = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new':
        return { label: 'Under Review', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Clock }
      case 'shortlisted':
        return { label: 'Shortlisted', color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle }
      case 'rejected':
        return { label: 'Not Selected', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle }
      case 'reviewed':
        return { label: 'Reviewed', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: FileText }
      default:
        return { label: 'Processing', color: 'text-[#f3c892]', bg: 'bg-[#f3c892]/10', icon: Clock }
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white" style={{ color: '#a39e98' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight" style={{ color: '#ffffff' }}>
            Application Status Tracker
          </h1>
          <p className="text-lg" style={{ color: '#a39e98' }}>
            Enter your unique Application ID below to check the current status of your application.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 sm:p-10 mb-8 shadow-xl" 
          style={{ background: '#141312', border: '1px solid #282624' }}
        >
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="applicationId" className="block text-sm font-semibold mb-3" style={{ color: '#a39e98' }}>
                Application ID *
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f3c892]" />
                <input 
                  required 
                  type="text" 
                  id="applicationId" 
                  name="applicationId" 
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 rounded-xl transition-all outline-none font-mono text-sm" 
                  style={{ background: '#0c0b0a', border: '1px solid #282624', color: '#ffffff' }} 
                  placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000" 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending || !appId}
              className="w-full py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              {isPending ? 'Searching...' : 'Check Status'}
            </button>
          </form>

          {state.error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-6 p-4 rounded-xl border text-sm font-medium text-center" 
              style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)', color: '#f87171' }}
            >
              {state.error}
            </motion.div>
          )}

          {state.success && state.data && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 sm:p-8 rounded-2xl border"
              style={{ background: '#0c0b0a', borderColor: '#282624' }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#66625d' }}>Applicant</p>
                  <h3 className="text-xl font-bold text-white mb-1">{state.data.name}</h3>
                  <p className="text-sm font-medium" style={{ color: '#a39e98' }}>{state.data.role}</p>
                  <p className="text-xs mt-3" style={{ color: '#66625d' }}>
                    Applied on: {new Date(state.data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                
                <div className="flex flex-col items-end">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#66625d' }}>Current Status</p>
                  
                  {(() => {
                    const statusDisplay = getStatusDisplay(state.data.status);
                    const StatusIcon = statusDisplay.icon;
                    return (
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${statusDisplay.bg} ${statusDisplay.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusDisplay.label}
                      </div>
                    )
                  })()}
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>

        <div className="text-center text-sm" style={{ color: '#66625d' }}>
          <p>Lost your Application ID? Please <Link href="/contact" className="hover:text-white underline">contact us</Link> for support.</p>
        </div>

      </div>
    </div>
  )
}
