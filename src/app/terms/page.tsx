import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: `Terms & Conditions | ${COMPANY.name}`,
  description: `Terms and Conditions for ${COMPANY.name}`,
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></p>
            
            <p>
              Welcome to {COMPANY.name}! These terms and conditions outline the rules and regulations for the use of {COMPANY.name}'s Website, 
              located at {COMPANY.website}, as well as the provision of our staffing and event management services.
            </p>
            <p>
              By accessing this website and/or booking our services, we assume you accept these terms and conditions. 
              Do not continue to use {COMPANY.name} if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Service Provision & Bookings</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All booking requests submitted through our website are subject to availability and confirmation by our operations team.</li>
              <li>A booking is only considered confirmed once a formal agreement is signed and any required advance payment is received.</li>
              <li>{COMPANY.name} reserves the right to decline any service request that violates local laws, involves hazardous environments without proper safety measures, or conflicts with our company policies.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Payments and Billing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clients must adhere to the payment schedules outlined in their specific service agreements.</li>
              <li>Standard terms typically require an advance deposit prior to the event, with the balance due upon completion, unless otherwise negotiated.</li>
              <li>Late payments may incur additional charges as specified in the individual contract.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Cancellations and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations made by the client must be communicated in writing (via email).</li>
              <li>Cancellations made within 48 hours of the scheduled event may result in forfeiture of the advance deposit to cover mobilization and staffing commitments.</li>
              <li>In the rare event that {COMPANY.name} must cancel a confirmed booking due to unforeseen circumstances, a full refund of any deposits paid will be issued immediately.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Staff Conduct and Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{COMPANY.name} provides professional, vetted staff. We are responsible for their initial briefing and basic conduct.</li>
              <li>Clients are responsible for providing a safe working environment for our staff, free from harassment, discrimination, or physical hazards.</li>
              <li>Clients must provide specific on-site instructions, necessary equipment, and standard amenities (like drinking water and designated breaks) for the staff during the event.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, {COMPANY.name} and/or its licensors own the intellectual property rights for all material on {COMPANY.website}. 
              All intellectual property rights are reserved. You may access this from {COMPANY.name} for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall {COMPANY.name}, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website or minor operational discrepancies during an event. 
              {COMPANY.name}, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of India, specifically within the jurisdiction of {COMPANY.location}, 
              and you submit to the non-exclusive jurisdiction of the state and federal courts located in {COMPANY.location} for the resolution of any disputes.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact Information</h2>
            <p>
              If you have any queries regarding any of our terms, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> {COMPANY.email}</li>
              <li><strong>Phone:</strong> {COMPANY.phone}</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
