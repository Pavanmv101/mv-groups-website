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
  Music,
  ShieldCheck,
  Mic2,
  Camera,
  Speaker,
  Car,
  Palette,
} from 'lucide-react';

// ---- Company Info ----
export const COMPANY = {
  name: 'MV Groups',
  tagline: 'End-to-End Event Management & Staffing',
  description:
    'A premier event management and manpower supply agency. We deliver end-to-end event execution—from concept to logistics—alongside reliable staffing solutions across Karnataka.',
  founded: '2024',
  location: 'Bengaluru, Karnataka',
  email: 'mvgroups2026@gmail.com',
  phone: '+91 93805 58344',
  linkedin: 'https://www.linkedin.com/company/mvgroups-karnataka',
  instagram: 'https://instagram.com/mvgroups.online',
  website: 'https://mvgroups.online',
} as const;

// ---- Navigation ----
export const NAV_LINKS = [
  { label: 'Staffing', href: '/staffing' },
  { label: 'Management', href: '/management' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

// ---- Services ----
export const SERVICES = [
  {
    id: 'event_management',
    title: 'End-to-End Event Planning',
    shortDescription: 'Full-service event execution, from venue sourcing to production and management.',
    description: 'We take the stress off your shoulders. Our expert planners handle end-to-end event execution, including conceptualization, vendor management, stage production, and on-ground coordination for corporate and social events.',
    icon: Award,
    features: [
      'Venue & Planning (Sourcing, Coordination)', 
      'Design & Production (Stage, AV, Layouts)', 
      'Decor & Theming (Floral, Custom Setups)', 
      'Event Support & Branding (Signage, Badges)', 
      'Vendor Management (Catering, Photography)', 
      'Staffing & Workforce (Hosts, Crew)', 
      'On-Ground Execution (VIP Handling, Operations)'
    ],
  },
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
  {
    id: 'dj_services',
    title: 'DJ Services',
    shortDescription: 'Professional DJ artists for corporate parties, weddings, and concerts.',
    description: 'Bring your events to life with our expert DJs. From corporate galas to high-energy concerts and memorable weddings, our DJs know how to read the crowd and set the perfect mood.',
    icon: Music,
    features: ['Corporate Party DJs', 'Wedding & Sangeet DJs', 'Club & Concert DJs', 'Custom Playlists', 'Live Mixing'],
  },
  {
    id: 'bouncers_security',
    title: 'Bouncers & Security',
    shortDescription: 'Crowd control, VIP protection, and venue security.',
    description: 'Ensure a safe and secure environment for your guests with our professional bouncers and security personnel. We provide robust crowd control, VIP protection, and comprehensive venue security.',
    icon: ShieldCheck,
    features: ['Crowd Control & Management', 'VIP Escort & Protection', 'Venue Access Control', 'Event Security Planning', 'Emergency Response Trained'],
  },
  {
    id: 'anchoring_emcee',
    title: 'Anchoring & Emcee',
    shortDescription: 'Professional event hosts and MCs for all occasions.',
    description: 'Engage your audience with our charismatic anchors and emcees. Perfect for corporate awards, product launches, weddings, and entertainment shows, our hosts keep the event flowing smoothly.',
    icon: Mic2,
    features: ['Corporate Event Hosts', 'Wedding Emcees', 'Bilingual Presenters', 'Audience Engagement', 'Scripted & Extempore Hosting'],
  },
  {
    id: 'photography_videography',
    title: 'Photography & Videography',
    shortDescription: 'Comprehensive event coverage, reels, and highlights.',
    description: 'Capture every memorable moment with our professional photography and videography services. We specialize in event coverage, cinematic highlights, and social media-ready reels.',
    icon: Camera,
    features: ['Event Photography', 'Cinematic Videography', 'Drone Coverage', 'Instant Reels & Social Media Content', 'Photo Booths'],
  },
  {
    id: 'sound_lighting',
    title: 'Sound & Lighting',
    shortDescription: 'PA systems, stage lighting, and LED walls.',
    description: 'Transform your venue with our state-of-the-art sound and lighting solutions. We provide high-quality PA systems, dynamic stage lighting, and immersive LED wall setups for any event size.',
    icon: Speaker,
    features: ['Line Array PA Systems', 'Stage Wash & Intelligent Lighting', 'LED Video Walls', 'Trussing & Rigging', 'On-site AV Technicians'],
  },
  {
    id: 'valet_parking',
    title: 'Valet Parking',
    shortDescription: 'Professional valet staff for premium events.',
    description: 'Provide a seamless arrival experience for your guests with our professional valet parking services. Our courteous and efficient drivers handle high volumes with care and precision.',
    icon: Car,
    features: ['Professional Valet Drivers', 'Traffic Management', 'Key Management Systems', 'Uniformed Staff', 'VIP Arrival Handling'],
  },
  {
    id: 'decor_stage',
    title: 'Decor & Stage Setup',
    shortDescription: 'Stage design, floral decor, and themed event setups.',
    description: 'Create visually stunning environments with our decor and stage setup services. From elegant floral arrangements for weddings to branded stage designs for corporate events, we bring your vision to life.',
    icon: Palette,
    features: ['Custom Stage Design', 'Floral & Fabric Decor', 'Themed Event Setups', 'Props & Centerpieces', 'Red Carpet & Backdrop Installation'],
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
