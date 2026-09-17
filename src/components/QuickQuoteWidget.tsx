'use client';

import { useState } from 'react';
import { ArrowRight, Users, Calendar, Sliders, CheckCircle2, MessageSquare } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const EVENT_TYPES = [
  'Corporate Event', 'Tech Conference', 'Wedding & Social', 'Concert / Live Show',
  'Brand Activation', 'Exhibition / Expo', 'Award Ceremony', 'Other',
];
const TEAM_SIZES = ['1-5 Staff', '6-15 Staff', '16-30 Staff', '30-50 Staff', '50+ Staff'];
const BUDGETS = ['Under ₹50K', '₹50K – ₹1L', '₹1L – ₹5L', '₹5L – ₹10L', '₹10L+'];

export default function QuickQuoteWidget() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ eventType: '', teamSize: '', budget: '' });
  const [done, setDone] = useState(false);

  const handleSelect = (key: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (step < 3) setStep(s => s + 1);
  };

  const handleSubmit = () => {
    const msg = `Hi MV Groups! I'm looking for event staffing.\n\n📌 Event Type: ${selections.eventType}\n👥 Team Size: ${selections.teamSize}\n💰 Budget: ${selections.budget}\n\nPlease get in touch!`;
    const url = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setDone(true);
  };

  const steps = [
    { label: 'Event Type', icon: Calendar, key: 'eventType' as const, options: EVENT_TYPES },
    { label: 'Team Size',  icon: Users,    key: 'teamSize'  as const, options: TEAM_SIZES   },
    { label: 'Budget',     icon: Sliders,  key: 'budget'    as const, options: BUDGETS       },
  ];
  const current = steps[step - 1];

  if (done) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#f3c892' }} />
        <h3 className="text-xl font-black text-white mb-2">Opening WhatsApp…</h3>
        <p className="text-[#a39e98] text-sm mb-6">Your details are pre-filled. Just hit send!</p>
        <button onClick={() => { setStep(1); setSelections({ eventType: '', teamSize: '', budget: '' }); setDone(false); }} className="text-xs underline" style={{ color: '#66625d' }}>Start over</button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Step progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive   = step === i + 1;
          const isComplete = step > i + 1;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <button
                onClick={() => step > i + 1 && setStep(i + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                style={{
                  background: isActive ? 'rgba(243,200,146,0.15)' : isComplete ? 'rgba(243,200,146,0.08)' : 'transparent',
                  color: isActive ? '#f3c892' : isComplete ? '#f3c892' : '#66625d',
                  border: isActive ? '1px solid rgba(243,200,146,0.4)' : '1px solid transparent',
                }}
              >
                <Icon className="w-3 h-3" />
                {s.label}
                {isComplete && <CheckCircle2 className="w-3 h-3" />}
              </button>
              {i < 2 && <div className="w-6 h-px" style={{ background: step > i + 1 ? '#f3c892' : '#282624' }} />}
            </div>
          );
        })}
      </div>

      {/* Current step */}
      <div>
        <p className="text-center text-sm font-semibold text-white/70 mb-4">
          Step {step} of 3 — Choose your <span style={{ color: '#f3c892' }}>{current.label}</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {current.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleSelect(current.key, opt)}
              className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 text-left"
              style={{
                background: selections[current.key] === opt ? 'rgba(243,200,146,0.15)' : '#141312',
                border: selections[current.key] === opt ? '1px solid rgba(243,200,146,0.5)' : '1px solid #282624',
                color: selections[current.key] === opt ? '#f3c892' : '#a39e98',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Submit on step 3 if selected */}
      {step === 3 && selections.budget && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-xl"
            style={{ background: '#f3c892', color: '#0c0b0a' }}
          >
            <MessageSquare className="w-4 h-4" />
            Send via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs mt-3" style={{ color: '#66625d' }}>Opens WhatsApp with your details pre-filled</p>
        </div>
      )}
    </div>
  );
}
