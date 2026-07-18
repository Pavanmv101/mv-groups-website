import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, Zap, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | MV Groups Services`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to all services
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-2xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{service.title}</h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="hidden md:block w-full max-w-sm">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Need this service?</h3>
                <p className="text-slate-600 mb-6">Book our professional team today and ensure your event is a success.</p>
                <Link href="/booking" className="block w-full text-center bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Book Staff Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">What&apos;s included in {service.title}?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-lg font-medium text-slate-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works in Bangalore</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl">
              We&apos;ve refined our staffing process to tackle Bangalore&apos;s unique event landscape, ensuring zero delays and perfectly matched talent.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">1</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Scope & Briefing</h4>
                <p className="text-slate-600">You share your exact headcount, roles, and dress code requirements with our team.</p>
                <div className="hidden md:block absolute top-6 left-16 right-0 h-[2px] bg-slate-100 -z-10"></div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">2</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Local Sourcing</h4>
                <p className="text-slate-600">We source pre-vetted staff locally (e.g., near Whitefield or BIEC) to avoid traffic delays.</p>
                <div className="hidden md:block absolute top-6 left-16 right-0 h-[2px] bg-slate-100 -z-10"></div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">3</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">On-Site Prep</h4>
                <p className="text-slate-600">Our team arrives 60-90 minutes early for a full run-of-show briefing and orientation.</p>
                <div className="hidden md:block absolute top-6 left-16 right-0 h-[2px] bg-slate-100 -z-10"></div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">4</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Live Execution</h4>
                <p className="text-slate-600">A dedicated agency supervisor manages the flow so you can focus on the event.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">Why Choose Us for {service.title}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <Users className="w-10 h-10 text-blue-600 mb-6" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Multilingual & Tech Fluent</h4>
                <p className="text-slate-600">Staff fluent in English, Hindi, and Kannada, trained on digital check-ins, CRM tools, and QR scanners.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <Zap className="w-10 h-10 text-blue-600 mb-6" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Scalability on Demand</h4>
                <p className="text-slate-600">Need 5 people or 50? We scale our workforce up or down based on your specific daily requirements.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <ShieldCheck className="w-10 h-10 text-blue-600 mb-6" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Guaranteed Reliability</h4>
                <p className="text-slate-600">We maintain an on-site backup buffer (10-15% extra staff) to instantly replace any last-minute no-shows.</p>
              </div>
            </div>
          </div>
          
          {/* Mobile CTA */}
          <div className="md:hidden mt-16 bg-slate-900 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
            <p className="text-slate-300 mb-8">Book our professional {service.title.toLowerCase()} team today.</p>
            <Link href="/booking" className="inline-block w-full bg-blue-500 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-600 transition-colors">
              Book Staff Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
