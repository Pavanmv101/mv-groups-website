import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: `Privacy Policy | ${COMPANY.name}`,
  description: `Privacy Policy for ${COMPANY.name}`,
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>Privacy Policy</h1>
          <p className="text-lg" style={{ color: '#a39e98' }}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className="p-8 sm:p-12 rounded-3xl" style={{ background: '#1a1918', border: '1px solid #282624' }}>
          <div className="prose prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-8" style={{ color: '#a39e98' }}>
            
            <p>
              At {COMPANY.name}, accessible from {COMPANY.website}, one of our main priorities is the privacy of our visitors and clients. 
              This Privacy Policy document contains types of information that is collected and recorded by {COMPANY.name} and how we use it.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. The personal information that you are asked to provide, 
              and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong style={{ color: '#f3c892' }}>Clients:</strong> Name, email address, phone number, company name, and event details when you request a quote or book our services.</li>
              <li><strong style={{ color: '#f3c892' }}>Staff/Applicants:</strong> Name, contact details, work experience, location, and resumes submitted through our Careers portal.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Provide, operate, and maintain our website and staffing services.</li>
              <li>Process your event booking requests and communicate with you regarding your requirements.</li>
              <li>Review job applications and contact candidates for staffing opportunities.</li>
              <li>Improve, personalize, and expand our website and services.</li>
              <li>Send you emails, invoices, and operational updates.</li>
              <li>Find and prevent fraud.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Log Files</h2>
            <p>
              {COMPANY.name} follows a standard procedure of using log files. These files log visitors when they visit websites. 
              The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), 
              date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Cookies and Web Beacons</h2>
            <p>
              Like any other website, {COMPANY.name} uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, 
              and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing 
              our web page content based on visitors&apos; browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Data Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. 
              But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, 
              and we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. 
              We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: '#ffffff', borderBottom: '1px solid #282624', paddingBottom: '0.5rem' }}>Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
            <ul className="list-none space-y-3 pt-2">
              <li><strong style={{ color: '#f3c892' }}>Email:</strong> {COMPANY.email}</li>
              <li><strong style={{ color: '#f3c892' }}>Phone:</strong> {COMPANY.phone}</li>
              <li><strong style={{ color: '#f3c892' }}>Location:</strong> {COMPANY.location}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
