'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.213-3.724.976.995-3.641-.234-.374A9.818 9.818 0 1112 21.818z" />
    </svg>
  );
}

const SUGGESTED = [
  'What services do you offer?',
  'How fast can you arrange staff?',
  'I need help with my event',
  'What events have you worked on?',
];

// Rotating pop-up teaser messages
const TEASERS = [
  '✨ Planning an event? Let Mira help!',
  '🎤 Need staff for your next event?',
  '🏆 We worked Google I/O & JPMorgan!',
  '⚡ Get a quote in under 4 hours!',
  '🎊 Weddings, Expos, Corporates — we do it all!',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Mira from MV Groups ✨ I can help you plan your event or find the right staff. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [teaserIndex, setTeaserIndex] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show teaser bubble after 3s, then rotate every 5s
  useEffect(() => {
    if (open) return;
    const initialTimer = setTimeout(() => setShowTeaser(true), 3000);
    return () => clearTimeout(initialTimer);
  }, [open]);

  useEffect(() => {
    if (!showTeaser || open) return;
    const interval = setInterval(() => {
      setTeaserIndex((i) => (i + 1) % TEASERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showTeaser, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || data.error }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, something went wrong. Please WhatsApp us at +91 93805 58344' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Teaser bubble */}
      {showTeaser && !open && (
        <div
          className="fixed bottom-44 right-6 z-50 max-w-[220px] px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium shadow-2xl cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #1a1918 0%, #242220 100%)',
            border: '1px solid #f3c892',
            color: '#f3c892',
            animation: 'fadeSlideUp 0.4s ease forwards',
          }}
          onClick={() => { setOpen(true); setHasUnread(false); }}
        >
          {TEASERS[teaserIndex]}
          {/* tail */}
          <div
            className="absolute -bottom-2 right-4 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #f3c892',
            }}
          />
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => { setOpen((o) => !o); setHasUnread(false); setShowTeaser(false); }}
        className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110"
        style={{ boxShadow: '0 0 30px rgba(243,200,146,0.5)' }}
        aria-label="Open chat with Mira"
      >
        {open ? (
          <div className="w-full h-full flex items-center justify-center" style={{ background: '#f3c892' }}>
            <X className="w-6 h-6" style={{ color: '#0c0b0a' }} />
          </div>
        ) : (
          <Image src="/mira-avatar.jpg" alt="Chat with Mira" width={64} height={64} className="object-cover w-full h-full" />
        )}
        {!open && hasUnread && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#0c0b0a] animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-44 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ background: '#0c0b0a', border: '1px solid #282624', height: '530px' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{
              borderColor: '#1a1918',
              background: 'linear-gradient(135deg, #141312 0%, #1a1918 100%)',
            }}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: '0 0 0 2px #f3c892' }}>
              <Image src="/mira-avatar.jpg" alt="Mira" width={40} height={40} className="object-cover" />
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#141312]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm tracking-wide">Mira <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-full ml-1" style={{ background: '#f3c892', color: '#0c0b0a' }}>AI</span></p>
              <p className="text-xs" style={{ color: '#a39e98' }}>MV Groups · Usually replies instantly</p>
            </div>
            <a
              href="https://wa.me/919380558344"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80 flex-shrink-0"
              style={{ background: '#25D366', color: '#fff' }}
            >
              <WhatsAppIcon /> Chat
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <Image src="/mira-avatar.jpg" alt="Mira" width={28} height={28} className="object-cover" />
                  </div>
                )}
                <div
                  className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? { background: '#f3c892', color: '#0c0b0a', borderBottomRightRadius: 4, fontWeight: 500 }
                      : { background: '#1a1918', color: '#e8e4df', border: '1px solid #282624', borderBottomLeftRadius: 4 }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/mira-avatar.jpg" alt="Mira" width={28} height={28} className="object-cover" />
                </div>
                <div className="rounded-2xl px-4 py-3" style={{ background: '#1a1918', border: '1px solid #282624', borderBottomLeftRadius: 4 }}>
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#f3c892' }} />
                </div>
              </div>
            )}

            {/* Suggested chips */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                    style={{ background: '#1a1918', color: '#f3c892', border: '1px solid #f3c892' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t" style={{ borderColor: '#1a1918', background: '#141312' }}>
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{ background: '#1a1918', border: '1px solid #282624' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about events, staffing, pricing..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#5a5550]"
                style={{ color: '#e8e4df' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 hover:scale-110"
                style={{ background: '#f3c892' }}
              >
                <Send className="w-3.5 h-3.5" style={{ color: '#0c0b0a' }} />
              </button>
            </form>
            <p className="text-center text-[10px] mt-1.5" style={{ color: '#3d3a37' }}>Powered by MV Groups AI</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
