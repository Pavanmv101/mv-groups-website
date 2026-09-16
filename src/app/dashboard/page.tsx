import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Briefcase, ArrowRight, Clock, CheckCircle2, AlertCircle, FileText, Calendar } from 'lucide-react'

type Applicant = {
  id: string;
  interest: string;
  status: string;
  created_at: string;
  availability: string;
  experience: string;
  resume_url?: string;
  photo_url?: string;
  phone: string;
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch applications for this user based on their email
  const { data: applications, error } = await supabase
    .from('applicants')
    .select('*')
    .eq('email', user.email)
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20"><Clock className="w-3.5 h-3.5"/> Under Review</span>
      case 'shortlisted':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5"/> Shortlisted</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"><AlertCircle className="w-3.5 h-3.5"/> Not Selected</span>
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#141312] text-white border border-[#282624]">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0908] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Applicant Portal</h1>
            <p className="text-[#a39e98] mt-1">Welcome back, {user.user_metadata?.full_name || user.email}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/dashboard/profile" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141312] border border-[#282624] text-[#c8c3be] rounded-lg font-medium hover:bg-[#0a0908] transition-colors shadow-sm"
            >
              Profile Settings
            </Link>
          </div>
        </div>

        <div className="bg-[#141312] rounded-2xl shadow-sm border border-[#282624] overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-[#282624] bg-[#141312]/50">
            <h2 className="text-lg font-semibold text-white">Your Applications</h2>
          </div>
          
          {error && (
            <div className="p-6 text-red-400 bg-red-950/20 border-b border-red-900/50">
              Error loading applications: {error.message}
            </div>
          )}

          {!applications || applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#1a1918] text-[#403e3c] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#282624]">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
              <p className="text-[#66625d] mb-6">You haven&apos;t applied for any crew positions yet.</p>
              <Link href="/careers" className="text-[#f3c892] font-medium hover:underline inline-flex items-center gap-1">
                View Open Positions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#282624]">
              {applications.map((app: Applicant) => (
                <div key={app.id} className="p-6 hover:bg-[#0c0b0a] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-white text-lg">
                          {app.interest.charAt(0).toUpperCase() + app.interest.slice(1).replace(/_/g, ' ')} Role
                        </h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-sm text-[#66625d]">
                        Applied on {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1a1918]">
                    <div>
                      <p className="text-xs text-[#66625d] font-medium mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Availability</p>
                      <p className="text-sm text-[#c8c3be]">{app.availability.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#66625d] font-medium mb-1 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> Experience</p>
                      <p className="text-sm text-[#c8c3be]">{app.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#66625d] font-medium mb-1 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Documents</p>
                      <div className="flex gap-3">
                        {app.resume_url && <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-sm text-[#f3c892] hover:underline">Resume</a>}
                        {app.photo_url && <a href={app.photo_url} target="_blank" rel="noreferrer" className="text-sm text-[#f3c892] hover:underline">Photo</a>}
                      </div>
                    </div>
                  </div>
                  
                  {app.status === 'shortlisted' && (
                    <div className="mt-5 p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                      <p className="text-sm text-emerald-400 font-medium mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Next Steps
                      </p>
                      <p className="text-sm text-emerald-200/70">
                        Congratulations! You have been shortlisted. Our operations team will contact you via phone ({app.phone}) shortly to assign you to your first event.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* FAQ Section for Applicants */}
        <div className="bg-[#141312] rounded-2xl shadow-sm border border-[#282624] overflow-hidden p-6">
           <h3 className="text-lg font-bold text-white mb-4">Applicant FAQs</h3>
           <div className="space-y-4">
             <div>
               <h4 className="text-[#c8c3be] font-medium mb-1">When will I hear back?</h4>
               <p className="text-sm text-[#66625d]">We review applications weekly. If your profile matches our upcoming event requirements, your status will change to &quot;Shortlisted&quot; and we will call you.</p>
             </div>
             <div>
               <h4 className="text-[#c8c3be] font-medium mb-1">What should I wear to events?</h4>
               <p className="text-sm text-[#66625d]">Once shortlisted, our team will brief you on the specific dress code. Generally, expect to wear professional black attire unless a branded uniform is provided.</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}
