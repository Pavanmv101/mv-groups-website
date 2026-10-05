import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are Mira, the friendly AI assistant for MV Groups — a premium end-to-end event management and staffing company based in Bengaluru, Karnataka, India.

ABOUT MV GROUPS:
- Website: mvgroups.online
- Location: Bengaluru, Karnataka, India
- WhatsApp: +91 93805 58344
- Email: mvgroups2026@gmail.com
- Instagram: @mvgroups.online

WHAT WE DO (End-to-End Event Management):
1. Venue & Planning — Venue sourcing, event planning, coordination
2. Design & Production — Stage, 3D layouts, AV, LED, Lighting
3. Decor & Theming — Floral, thematic setups, branding structures
4. Event Support & Branding — Printing, badges, signage, backdrops, standees, collaterals
5. Vendor Management — Catering, photography, security, entertainment
6. Staffing & Workforce — Hosts, ushers, promoters, coordinators, event crew
7. On-Ground Execution — Guest management, VIP handling, coordination, event-day operations

STAFFING SERVICES:
- Event Manpower (floor managers, registration teams, ushers)
- Promotional Staffing (brand promoters, product demonstrators)
- Exhibition Staffing (booth staff, lead collectors)
- Corporate Staffing
- Wedding & Social Event Staff
- Event Logistics
- DJ Services
- Bouncers & Security
- Anchoring & Emcee
- Photography & Videography
- Sound & Lighting
- Valet Parking
- Decor & Stage

EVENTS WE'VE BEEN PART OF:
- Google I/O Connect 2025 (Flagship)
- JPMorgan Chase Technology Innovation Forum 2026 (Flagship)
- Nutanix Team Building
- BOSS Summit 2025
- iQuanti 2025
- Business Breakthrough Seminar by Quantum Leap (4-5 times)
- PACE by Quantum Leap (4-5 times)
- Proficorn by Quantum Leap 2025 & 2026
- Weddings at Varaha and Chamara Vajra venues
- BPN 2026
- ServiceNow office events (3 times)
- SecurEyes 20th Anniversary
- Europraktik 2026
- AgriTech India 2026 (KTPO Whitefield)
- And many more across Bengaluru and Karnataka

KEY FACTS:
- We operate across all of Karnataka (Bengaluru, Mysuru, Mangaluru, Hubli, Belagavi, Tumakuru)
- We can mobilise staff within 24-48 hours for urgent requirements
- For Bengaluru events, we can confirm deployment within 6-12 hours
- We provide transparent, itemised quotes with no hidden fees
- Quotes are typically sent within 4 hours of inquiry
- We handle both small private events and large corporate conferences

YOUR ROLE:
- Be warm, professional, and concise (keep replies under 3 sentences unless explaining services)
- Answer questions about MV Groups services, pricing approach, and capabilities
- When someone wants to book or get a quote, collect: their name, phone number, event type, and event date — then tell them the team will reach out within 2 hours
- If you cannot answer something specific (like exact prices, availability), direct them to WhatsApp: +91 93805 58344
- Never make up specific prices — say "we provide custom quotes based on requirements"
- Always be helpful and end with a gentle CTA if relevant
- Speak in a friendly, modern tone — not overly corporate

LEAD CAPTURE RULE (IMPORTANT):
When you have collected the visitor's name AND phone number (even if event type or date is missing), append this EXACT tag at the very end of your reply — on a new line, with no spaces around it:
<!--LEAD:{"name":"<name>","phone":"<phone>","event":"<event type or unknown>","date":"<date or unknown>"}-->
Only append it ONCE, the first time you have both name and phone. Never show this tag to the user — it is invisible to them.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 500 });
    }

    const MODELS = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];

    let text = '';
    let lastErr: unknown;
    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
        });
        // Gemini requires history to start with a user turn — strip leading model messages
        let history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
        while (history.length > 0 && history[0].role === 'model') {
          history = history.slice(1);
        }
        const chat = model.startChat({ history });
        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        text = result.response.text();
        break; // success — stop trying
      } catch (e) {
        lastErr = e;
        continue; // try next model
      }
    }

    if (!text) throw lastErr;

    // Extract hidden lead tag if present, strip it from visible reply
    const leadMatch = text.match(/<!--LEAD:([\s\S]*?)-->/);
    const cleanReply = text.replace(/<!--LEAD:[\s\S]*?-->/, '').trim();

    if (leadMatch) {
      try {
        const lead = JSON.parse(leadMatch[1]);
        await supabaseAdmin.from('inquiries').insert({
          name: lead.name || 'Chat Lead',
          email: '',
          phone: lead.phone || '',
          subject: `Chat Lead — ${lead.event || 'Event Inquiry'}`,
          message: `Via AI Chat. Event: ${lead.event || 'N/A'}. Date: ${lead.date || 'N/A'}. Phone: ${lead.phone || 'N/A'}.`,
        });
      } catch (e) {
        console.error('Lead save error:', e);
        // Non-critical — don't fail the response
      }
    }

    return NextResponse.json({ reply: cleanReply });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try WhatsApp: +91 93805 58344' },
      { status: 500 }
    );
  }
}
