import { COMPANY } from '@/lib/constants'
import { Shield, Target, Users, Zap, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          About <span className="gradient-text">{COMPANY.name}</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Founded in 2024 in Bengaluru, {COMPANY.name} was born out of a simple vision: to revolutionize 
          how businesses and event organizers source reliable, professional manpower. We believe that 
          the success of any event hinges on the quality of its people.
        </p>
      </section>

      {/* Meet the Founder */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl relative">
              <Image 
                src="/images/founder.jpg" 
                alt="Pavan M V - Founder & Director"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl -z-10"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Pavan M V</h2>
            <p className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4">Founder & Director</p>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              With a strong background in Information Science & Engineering, Pavan brings a unique, tech-driven approach to the event staffing industry. Drawing from hands-on experience at premier industry events like Google I/O Connect and the JPMorganChase Technology Innovation Forum, his vision for MV Groups is to seamlessly bridge the gap between world-class event operations and reliable, professional manpower across Karnataka.
            </p>
            
            <a 
              href="https://www.linkedin.com/in/pavan-mv-815051286/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To provide unparalleled staffing solutions that empower our clients to execute flawless events. 
              We strive to bridge the gap between talented individuals seeking opportunities and organizations 
              requiring dependable manpower, fostering growth and excellence in the Karnataka event industry.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Zap className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed relative z-10">
              To be the most trusted and preferred staffing partner across South India by 2028. 
              We envision a future where finding the right event crew is seamless, and where every 
              brand ambassador or logistics coordinator we deploy elevates the client's brand experience.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
          <p className="text-slate-600 mt-3">The principles that guide everything we do.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-center">
            <Shield className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reliability</h3>
            <p className="text-sm text-slate-600">We show up on time, every time, ready to work.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center">
            <Users className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Professionalism</h3>
            <p className="text-sm text-slate-600">Our staff is trained to represent your brand with the utmost class.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all text-center">
            <Award className="w-10 h-10 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Excellence</h3>
            <p className="text-sm text-slate-600">We don't just meet expectations; we strive to exceed them.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all text-center">
            <Zap className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Flexibility</h3>
            <p className="text-sm text-slate-600">Adaptable solutions to meet the dynamic needs of any event.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-navy rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work with Us?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              Whether you are looking to hire a reliable crew for your next big event, or you are looking to join our growing roster of professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/booking" 
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors w-full sm:w-auto"
              >
                Request a Quote
              </Link>
              <Link 
                href="/careers" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Join Our Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
