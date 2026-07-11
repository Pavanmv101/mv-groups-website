// ============================================================
// MV Groups — Constants & Company Data
// ============================================================

import {
  Users,
  Megaphone,
  Store,
  Briefcase,
  HeartHandshake,
  Truck,
  Shield,
  Clock,
  Award,
  HeadphonesIcon,
} from 'lucide-react';

// ---- Company Info ----
export const COMPANY = {
  name: 'MV Groups',
  tagline: 'Powering Your Workforce & Events',
  description:
    'A premier manpower supply and software/tech events company delivering reliable staffing solutions and world-class event management across Karnataka.',
  founded: '2024',
  location: 'Bengaluru, Karnataka',
  email: 'mvgroups2026@gmail.com',
  phone: '+91 93805 58344',
  linkedin: 'https://linkedin.com/company/mvgroups',
  website: 'https://mvgroups.in',
} as const;

// ---- Navigation ----
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
] as const;

// ---- Services ----
export const SERVICES = [
  {
    id: 'event_manpower',
    title: 'Event Manpower Services',
    shortDescription: 'Professional event crew, registration staff, ushers, and VIP assistance.',
    description: 'We provide comprehensive manpower for any event scale. From the registration desk to crowd management and VIP handling, our vetted crew ensures your event runs flawlessly.',
    icon: Users,
    features: ['Event Crew & Ushers', 'Registration Desk Staff', 'VIP Assistance & Protocol', 'Guest Relations Executives', 'Ticketing & Crowd Management'],
  },
  {
    id: 'promotional_staffing',
    title: 'Promotional Staffing',
    shortDescription: 'Brand promoters, product demonstrators, and mall activation staff to boost your reach.',
    description: 'Amplify your brand presence with our energetic promotional staff. We supply brand ambassadors and marketing executives tailored for roadshows, mall activations, and sampling campaigns.',
    icon: Megaphone,
    features: ['Brand Promoters & Ambassadors', 'Product Demonstrators', 'Mall Activation Staff', 'Roadshow Promoters', 'Sampling Staff'],
  },
  {
    id: 'exhibition_staffing',
    title: 'Exhibition Staffing',
    shortDescription: 'Booth staff, stall assistants, and lead generation experts for trade shows.',
    description: 'Maximize your exhibition ROI with our trained stall assistants and lead generation executives. Our exhibition hosts and presenters represent your brand professionally on the trade show floor.',
    icon: Store,
    features: ['Booth & Stall Assistants', 'Lead Generation Executives', 'Exhibition Hosts & Hostesses', 'Product Presenters', 'B2B Interaction Staff'],
  },
  {
    id: 'corporate_staffing',
    title: 'Corporate Event Staffing',
    shortDescription: 'Sophisticated staffing for conferences, seminars, and corporate hospitality.',
    description: 'Deliver premium experiences at your business events. Our corporate event coordinators and registration teams provide the polished, professional support expected in corporate environments.',
    icon: Briefcase,
    features: ['Conference & Seminar Staff', 'Business Event Coordinators', 'Corporate Registration Teams', 'Guest Management', 'Corporate Hospitality Support'],
  },
  {
    id: 'wedding_social',
    title: 'Wedding & Social Event Staffing',
    shortDescription: 'Dedicated reception, welcome, and venue assistance teams for your special day.',
    description: 'Ensure a seamless experience for your guests with our specialized social event staff. We manage everything from the welcome team and reception to parking coordination and venue assistance.',
    icon: HeartHandshake,
    features: ['Reception & Welcome Team', 'Guest Assistance', 'Parking Coordination', 'Venue & Floor Assistance', 'F&B Support Staff'],
  },
  {
    id: 'event_logistics',
    title: 'Event Setup & Logistics',
    shortDescription: 'Reliable loading crew, stage setup, and barricading teams for behind-the-scenes execution.',
    description: 'The backbone of any successful event. Our strong and capable logistics crew handles loading/unloading, stage and furniture setup, barricading, and general event venue assistance.',
    icon: Truck,
    features: ['Loading & Unloading Crew', 'Stage & Furniture Setup', 'Barricading Team', 'Event Helpers & Riggers', 'Post-Event Dismantling'],
  },
] as const;

// ---- Why Choose Us ----
export const WHY_CHOOSE_US = [
  {
    icon: Shield,
    title: 'Verified & Vetted',
    description:
      'Every professional in our network undergoes thorough background checks and skill verification.',
  },
  {
    icon: Clock,
    title: 'Rapid Deployment',
    description:
      'Need staff in 48 hours? Our ready talent pool ensures lightning-fast mobilization.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description:
      'We maintain strict quality standards with regular performance reviews and client feedback loops.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description:
      'Dedicated account managers and round-the-clock support for all your operational needs.',
  },
] as const;

// ---- Stats ----
export const STATS = [
  { value: 100, suffix: '+', label: 'Events Managed' },
  { value: 250, suffix: '+', label: 'Staff Deployed' },
  { value: 15, suffix: '+', label: 'Active Clients' },
] as const;

// ---- How It Works ----
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Submit Your Request',
    description:
      'Tell us what you need — service type, dates, team size, and budget. We respond within 24 hours.',
  },
  {
    step: 2,
    title: 'Review & Approve',
    description:
      'We prepare a detailed proposal with team profiles and cost breakdown. You review and approve.',
  },
  {
    step: 3,
    title: 'We Deliver',
    description:
      'Our team is deployed on schedule. We handle operations end-to-end while you focus on your core business.',
  },
] as const;

// ---- Budget Ranges ----
export const BUDGET_RANGES = [
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000 – ₹10,00,000',
  '₹10,00,000+',
] as const;
