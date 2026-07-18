import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: `Privacy Policy | ${COMPANY.name}`,
  description: `Privacy Policy for ${COMPANY.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></p>
            
            <p>
              At {COMPANY.name}, accessible from {COMPANY.website}, one of our main priorities is the privacy of our visitors and clients. 
              This Privacy Policy document contains types of information that is collected and recorded by {COMPANY.name} and how we use it.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. The personal information that you are asked to provide, 
              and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Clients:</strong> Name, email address, phone number, company name, and event details when you request a quote or book our services.</li>
              <li><strong>Staff/Applicants:</strong> Name, contact details, work experience, location, and resumes submitted through our Careers portal.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and staffing services.</li>
              <li>Process your event booking requests and communicate with you regarding your requirements.</li>
              <li>Review job applications and contact candidates for staffing opportunities.</li>
              <li>Improve, personalize, and expand our website and services.</li>
              <li>Send you emails, invoices, and operational updates.</li>
              <li>Find and prevent fraud.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Log Files</h2>
            <p>
              {COMPANY.name} follows a standard procedure of using log files. These files log visitors when they visit websites. 
              The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), 
              date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Cookies and Web Beacons</h2>
            <p>
              Like any other website, {COMPANY.name} uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, 
              and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing 
              our web page content based on visitors&apos; browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. 
              But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, 
              and we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. 
              We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> {COMPANY.email}</li>
              <li><strong>Phone:</strong> {COMPANY.phone}</li>
              <li><strong>Location:</strong> {COMPANY.location}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
