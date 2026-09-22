'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center" style={{ background: '#0c0b0a' }}>
      <div className="max-w-xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-black mb-4 tracking-tighter" style={{ color: '#f3c892' }}>404</h1>
          <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
          <p className="text-[#a39e98] text-lg mb-10">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg w-full sm:w-auto"
              style={{ background: '#f3c892', color: '#0c0b0a' }}
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 w-full sm:w-auto border"
              style={{ background: 'transparent', color: '#ffffff', borderColor: '#282624' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
