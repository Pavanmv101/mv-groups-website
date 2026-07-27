import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: `Terms & Conditions | ${COMPANY.name}`,
  description: `Terms and Conditions for ${COMPANY.name}`,
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: '#0c0b0a' }}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span 
            className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6"
            style={{ background: 'rgba(243,200,146,0.1)', color: '#f3c892', border: '1px solid rgba(243,200,146,0.2)' }}
          >
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>Terms and Conditions</h1>
          <p className="text-lg" style={{ color: '#a39e98' }}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className="p-8 sm:p-12 rounded-3xl" style={{ background: '#1a1918', border: '1px solid #282624' }}>
          <div className="prose prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-8" style={{ color: '#a39e98' }}>
            
            <p>
              Welcome to {COMPANY.name}! These terms and conditions outline the rules and regulations for the use of {COMPANY.name}&apos;s Website, 
              located at {COMPANY.website}, as well as the provision of our staffing and event management services.
            </p>
            <p>
              By accessing this website and/or booking our services, we assume you accept these terms and conditions. 
              Do not continue to use {COMPANY.name} if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>1. Service Provision & Bookings</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>All booking requests submitted through our website are subject to availability and confirmation by our operations team.</li>
              <li>A booking is only considered confirmed once a formal agreement is signed and any required advance payment is received.</li>
              <li>{COMPANY.name} reserves the right to decline any service request that violates local laws, involves hazardous environments without proper safety measures, or conflicts with our company policies.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>2. Payments and Billing</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Clients must adhere to the payment schedules outlined in their specific service agreements.</li>
              <li>Standard terms typically require an advance deposit prior to the event, with the balance due upon completion, unless otherwise negotiated.</li>
              <li>Late payments may incur additional charges as specified in the individual contract.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>3. Cancellations and Refunds</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Cancellations made by the client must be communicated in writing (via email).</li>
              <li>Cancellations made within 48 hours of the scheduled event may result in forfeiture of the advance deposit to cover mobilization and staffing commitments.</li>
              <li>In the rare event that {COMPANY.name} must cancel a confirmed booking due to unforeseen circumstances, a full refund of any deposits paid will be issued immediately.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>4. Staff Conduct and Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>{COMPANY.name} provides professional, vetted staff. We are responsible for their initial briefing and basic conduct.</li>
              <li>Clients are responsible for providing a safe working environment for our staff, free from harassment, discrimination, or physical hazards.</li>
              <li>Clients must provide specific on-site instructions, necessary equipment, and standard amenities (like drinking water and designated breaks) for the staff during the event.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>5. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, {COMPANY.name} and/or its licensors own the intellectual property rights for all material on {COMPANY.website}. 
              All intellectual property rights are reserved. You may access this from {COMPANY.name} for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>6. Limitation of Liability</h2>
            <p>
              In no event shall {COMPANY.name}, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or minor operational discrepancies during an event. 
              {COMPANY.name}, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of India, specifically within the jurisdiction of {COMPANY.location}, 
              and you submit to the non-exclusive jurisdiction of the state and federal courts located in {COMPANY.location} for the resolution of any disputes.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Contact Information</h2>
            <p>
              If you have any queries regarding any of our terms, please contact us at:
            </p>
            <ul className="list-none space-y-3 pt-2">
              <li><strong style={{ color: '#f3c892' }}>Email:</strong> {COMPANY.email}</li>
              <li><strong style={{ color: '#f3c892' }}>Phone:</strong> {COMPANY.phone}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
