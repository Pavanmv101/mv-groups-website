'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2, Send } from 'lucide-react'

type Message = {
  id: string
  booking_id: string
  sender_id: string
  sender_role: 'client' | 'admin'
  content: string
  created_at: string
}

export default function BookingMessaging({ bookingId, currentRole, currentUserId }: { bookingId: string, currentRole: 'client' | 'admin', currentUserId: string }) {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('booking_messages')
        .select('*')
        .eq('booking_id', bookingId)
        .order('created_at', { ascending: true })

      if (!error && data) {
        setMessages(data)
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
      setLoading(false)
    }

    fetchMessages()
    
    // Subscribe to realtime messages
    const channel = supabase
      .channel(`booking_${bookingId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'booking_messages',
        filter: `booking_id=eq.${bookingId}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message])
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [bookingId, supabase])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setSending(true)
    const { error } = await supabase.from('booking_messages').insert({
      booking_id: bookingId,
      sender_id: currentUserId,
      sender_role: currentRole,
      content: newMessage.trim(),
    })

    if (!error) {
      setNewMessage('')
    } else {
      console.error("Failed to send message", error)
    }
    setSending(false)
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
  }

  return (
    <div className="flex flex-col h-[500px] border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <h3 className="font-bold text-slate-900">Message Thread</h3>
        <p className="text-sm text-slate-500">Chat with {currentRole === 'admin' ? 'the client' : 'our team'}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 my-8">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_role === currentRole
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  isMe 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-slate-100 text-slate-900 rounded-tl-sm'
                }`}>
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
