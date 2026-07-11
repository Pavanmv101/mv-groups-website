'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const FAQS = [
  {
    question: 'How do I submit a staffing request?',
    answer: 'You can submit a staffing request by reaching out to us through our contact form, via WhatsApp, or by calling our office directly. We will schedule a quick consultation to understand your requirements, role specifications, and the number of personnel needed.'
  },
  {
    question: 'What is your typical response time?',
    answer: 'We pride ourselves on our swift response times. For standard staffing requirements, we typically respond within 24 hours with a preliminary plan and candidate profiles. For urgent event staffing, we can often mobilize teams within 48-72 hours.'
  },
  {
    question: 'How is your pricing structured?',
    answer: 'Our pricing is customized based on the complexity of the role, the duration of the engagement, and the number of personnel required. We offer transparent, competitive rates with no hidden fees, whether you need temporary event staff or long-term corporate placements.'
  },
  {
    question: 'What areas in Karnataka do you serve?',
    answer: 'While our headquarters is based in Tumakuru and we have a strong presence in Bengaluru, our operations span across the entirety of Karnataka. We have successfully deployed teams to various tier-2 and tier-3 cities for large scale events and activations.'
  },
  {
    question: 'What is your cancellation or replacement policy?',
    answer: 'If you are unsatisfied with a placed candidate, we offer a swift replacement guarantee within a stipulated time frame at no extra cost. For event cancellations, we have flexible terms which are discussed upfront during contract signing.'
  },
  {
    question: 'How do your event management engagements work?',
    answer: 'For events and hackathons, we provide end-to-end management. We start with a scoping meeting to understand your vision, followed by resource planning (logistics, technical support, crowd management). Our dedicated project managers oversee the execution on the ground to ensure a flawless experience.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about partnering with MV Groups for your staffing and event needs."
          centered
        />

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-indigo-600' : ''
                    }`} 
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
