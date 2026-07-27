import { COMPANY } from '@/lib/constants'
import { Shield, Target, Users, Zap, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MV Groups | Bangalore Event Staffing Agency',
  description: 'Learn about MV Groups, a premier event staffing and manpower supply agency founded by Pavan MV. We deliver exceptional event experiences across Karnataka.',
  alternates: {
    canonical: 'https://mvgroups.online/about',
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: '#0c0b0a' }}>
      
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight"
          style={{ color: '#ffffff' }}
        >
          About <span style={{ color: '#f3c892' }}>{COMPANY.name}</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#a39e98' }}>
          Founded in 2024 in Bengaluru, {COMPANY.name} was born out of a simple vision: to revolutionize 
          how businesses and event organizers source reliable, professional manpower. We believe that 
          the success of any event hinges on the quality of its people.
        </p>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div 
          className="rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16"
          style={{ background: '#141312', border: '1px solid #282624' }}
        >
          <div className="flex-shrink-0 relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden relative" style={{ border: '2px solid #282624' }}>
              <Image 
                src="/images/founder.jpg" 
                alt="Pavan M V - Founder & Director"
                fill
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-3xl -z-10" style={{ background: 'rgba(243,200,146,0.1)' }}></div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>Pavan M V</h2>
            <p className="font-semibold tracking-[0.15em] uppercase text-xs mb-6" style={{ color: '#f3c892' }}>Founder & Director</p>
            
            <p className="leading-relaxed mb-8 text-base md:text-lg" style={{ color: '#a39e98' }}>
              With a strong background in Information Science & Engineering, Pavan brings a unique, tech-driven approach to the event staffing industry. Drawing from hands-on experience at premier industry events like Google I/O Connect and the JPMorganChase Technology Innovation Forum, his vision for MV Groups is to seamlessly bridge the gap between world-class event operations and reliable, professional manpower across Karnataka.
            </p>
            
            <a 
              href="https://www.linkedin.com/in/pavan-mv-815051286/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: '#1a1918', color: '#ffffff', border: '1px solid #282624' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                style={{ color: '#0A66C2' }}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="p-10 lg:p-14 rounded-3xl" style={{ background: '#1a1918', border: '1px solid #282624' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(243,200,146,0.1)' }}>
              <Target className="w-7 h-7" style={{ color: '#f3c892' }} />
            </div>
            <h2 className="text-3xl font-bold mb-5" style={{ color: '#ffffff' }}>Our Mission</h2>
            <p className="leading-relaxed text-lg" style={{ color: '#a39e98' }}>
              To provide unparalleled staffing solutions that empower our clients to execute flawless events. 
              We strive to bridge the gap between talented individuals seeking opportunities and organizations 
              requiring dependable manpower, fostering growth and excellence in the Karnataka event industry.
            </p>
          </div>
          
          {/* Vision */}
          <div className="p-10 lg:p-14 rounded-3xl relative overflow-hidden" style={{ background: '#1a1918', border: '1px solid #282624' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative z-10" style={{ background: 'rgba(243,200,146,0.1)' }}>
              <Zap className="w-7 h-7" style={{ color: '#f3c892' }} />
            </div>
            <h2 className="text-3xl font-bold mb-5 relative z-10" style={{ color: '#ffffff' }}>Our Vision</h2>
            <p className="leading-relaxed text-lg relative z-10" style={{ color: '#a39e98' }}>
              To be the most trusted and preferred staffing partner across South India by 2028. 
              We envision a future where finding the right event crew is seamless, and where every 
              brand ambassador or logistics coordinator we deploy elevates the client&apos;s brand experience.
            </p>
            {/* Soft decorative blur */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" style={{ background: 'rgba(243,200,146,0.05)' }}></div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>Our Core Values</h2>
          <p className="text-lg" style={{ color: '#66625d' }}>The principles that guide everything we do.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Reliability', desc: 'We show up on time, every time, ready to work.' },
            { icon: Users, title: 'Professionalism', desc: 'Our staff is trained to represent your brand with the utmost class.' },
            { icon: Award, title: 'Excellence', desc: 'We don\'t just meet expectations; we strive to exceed them.' },
            { icon: Zap, title: 'Flexibility', desc: 'Adaptable solutions to meet the dynamic needs of any event.' },
          ].map((val) => (
            <div key={val.title} className="p-8 rounded-2xl text-center group transition-all duration-300" style={{ background: '#141312', border: '1px solid #282624' }}>
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: 'rgba(243,200,146,0.05)' }}>
                <val.icon className="w-8 h-8" style={{ color: '#f3c892' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>{val.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a39e98' }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: '#141312', border: '1px solid #282624' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none" style={{ background: 'rgba(243,200,146,0.08)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>Ready to Work with Us?</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#a39e98' }}>
              Whether you are looking to hire a reliable crew for your next big event, or you are looking to join our growing roster of professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link 
                href="/booking" 
                className="w-full sm:w-auto px-8 py-4 font-bold rounded-full transition-all hover:opacity-90 text-center"
                style={{ background: '#f3c892', color: '#0c0b0a' }}
              >
                Request a Quote
              </Link>
              <Link 
                href="/careers" 
                className="w-full sm:w-auto px-8 py-4 font-bold rounded-full transition-all flex items-center justify-center gap-2 hover:bg-white/5"
                style={{ background: 'transparent', color: '#ffffff', border: '1px solid #282624' }}
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
