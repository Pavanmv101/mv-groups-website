'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

// ── Team Data ──────────────────────────────────────────────────────────────────
type Member = {
  name: string;
  role: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  initials: string;
};

const DEPARTMENTS: { id: string; label: string; desc: string; members: Member[] }[] = [
  {
    id: 'marketing',
    label: 'Marketing Team',
    desc: 'Driving brand awareness, digital presence, and client acquisition across Karnataka.',
    members: [
      {
        name: 'Harsha TD',
        role: 'Marketing Executive',
        bio: 'Manages brand campaigns, digital outreach, and client acquisition for MV Groups across Karnataka.',
        phone: '+91 84313 81947',
        whatsapp: 'https://wa.me/918431381947',
        email: 'harshatd.mvgroups@gmail.com',
        initials: 'HT',
      },
      {
        name: 'Tejas',
        role: 'Marketing Executive',
        bio: 'Handles social media content, event promotions, and brand storytelling for MV Groups.',
        phone: '+91 84312 23246',
        whatsapp: 'https://wa.me/918431223246',
        email: 'tejas.mvgroups@gmail.com',
        initials: 'TJ',
      },
    ],
  },
  {
    id: 'sales',
    label: 'Sales Team',
    desc: 'Building client relationships, closing deals, and ensuring every enquiry converts to a successful partnership.',
    members: [
      {
        name: 'Shrujan',
        role: 'Sales Executive',
        bio: 'Manages client enquiries, quotations, and bookings for staffing and event management services.',
        phone: '+91 99729 83823',
        whatsapp: 'https://wa.me/919972983823',
        email: 'shrujan.mvgroups@gmail.com',
        initials: 'SJ',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Operations Team',
    desc: 'The engine room — ensuring every event is staffed, coordinated, and delivered to perfection on the ground.',
    members: [
      {
        name: 'Pavan MV',
        role: 'Founder & Operations Head',
        bio: 'Founded MV Groups to bring professional event staffing and management to Karnataka. Oversees all operations, HR, and strategic growth.',
        phone: '+91 93805 58344',
        whatsapp: 'https://wa.me/919380558344',
        email: 'pavanmv.mvgroups@gmail.com',
        initials: 'PM',
      },
    ],
  },
];

// ── Member Card ───────────────────────────────────────────────────────────────
function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: '#1a1918',
        border: '1px solid #282624',
      }}
    >
      {/* Gold top border on hover */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to right, transparent, #f3c892, transparent)' }}
      />

      {/* Avatar circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black"
        style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)', color: '#f3c892' }}
      >
        {member.initials}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{member.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: '#f3c892' }}>
          {member.role}
        </p>
        <p className="text-xs mb-3" style={{ color: '#6b6560' }}>{member.phone}</p>
        <div className="w-8 h-px mb-3" style={{ background: 'rgba(243,200,146,0.25)' }} />
        <p className="text-sm leading-relaxed" style={{ color: '#6b6560' }}>
          {member.bio}
        </p>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: '#282624' }}>
        <a
          href={member.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(243,200,146,0.06)', color: '#6b6560' }}
          aria-label="Phone / WhatsApp"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://instagram.com/mvgroups.online"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(243,200,146,0.06)', color: '#6b6560' }}
          aria-label="Instagram"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={`mailto:${member.email}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(243,200,146,0.06)', color: '#6b6560' }}
          aria-label="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>('marketing');
  const activeDept = DEPARTMENTS.find((d) => d.id === activeTab)!;

  return (
    <div className="min-h-screen" style={{ background: '#0c0b0a' }}>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.p
          className="text-sm uppercase tracking-[0.35em] mb-4"
          style={{ color: '#f3c892' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The People Behind MV Groups
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Meet Our{' '}
          <span style={{ color: '#f3c892', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Team</span>
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl mx-auto"
          style={{ color: '#6b6560' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Three dedicated teams working behind the scenes to deliver events that leave a lasting impression.
        </motion.p>
      </section>

      {/* Dept tabs */}
      <div className="sticky top-20 z-30 flex justify-center px-6 pb-6" style={{ background: '#0c0b0a' }}>
        <div
          className="inline-flex items-center gap-1 rounded-full p-1"
          style={{ background: '#131211', border: '1px solid #282624' }}
        >
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveTab(dept.id)}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                background: activeTab === dept.id ? '#f3c892' : 'transparent',
                color: activeTab === dept.id ? '#0c0b0a' : '#6b6560',
              }}
            >
              {dept.label.replace(' Team', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Members grid */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dept heading */}
            <div className="mb-10 pb-6 border-b" style={{ borderColor: '#1e1c1a' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeDept.label}</h2>
              <p className="text-sm" style={{ color: '#6b6560', maxWidth: '540px' }}>{activeDept.desc}</p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activeDept.members.map((member, i) => (
                <MemberCard key={member.role + i} member={member} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <section className="border-t py-20 px-6 text-center" style={{ borderColor: '#1e1c1a' }}>
        <p className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: '#f3c892' }}>Work With Us</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Want to join the{' '}
          <span style={{ color: '#f3c892', fontStyle: 'italic' }}>team?</span>
        </h2>
        <Link
          href="/careers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1"
          style={{ background: '#f3c892', color: '#0c0b0a' }}
        >
          View Open Positions
        </Link>
      </section>
    </div>
  );
}
