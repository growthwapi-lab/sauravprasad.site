'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Message } from '@/lib/types'
import { Loader2, Mail, MailOpen, Trash2, Phone, Calendar, Reply, MessageSquare } from 'lucide-react'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const supabase = createClient()

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setMessages(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleToggleRead = async (msg: Message) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: !msg.is_read })
      .eq('id', msg.id)

    if (error) {
      alert('Error updating status: ' + error.message)
    } else {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      )
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, is_read: !selectedMessage.is_read })
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) {
      alert('Error deleting: ' + error.message)
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Contact Inquiries</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-[#1E5BFF] text-white rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Client inquiries received from your website&apos;s contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Refresh Inbox
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin text-[#1E5BFF] mb-3" size={32} />
          <p className="text-sm">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-900 mb-1">No Messages Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            When visitors send an inquiry via your contact page, they will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? 'border-[#1E5BFF] bg-blue-50/40 shadow-sm'
                    : msg.is_read
                    ? 'border-gray-200 bg-white hover:border-gray-300'
                    : 'border-blue-200 bg-white shadow-sm ring-1 ring-blue-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 truncate">{msg.name}</span>
                  {!msg.is_read && (
                    <span className="w-2 h-2 rounded-full bg-[#1E5BFF] flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate mb-2">{msg.email}</p>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                  {msg.message}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  <span>{msg.phone || 'No phone'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail View */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="inline-flex items-center gap-1.5 text-[#1E5BFF] hover:underline"
                      >
                        <Mail size={14} /> {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && (
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-gray-900"
                        >
                          <Phone size={14} /> {selectedMessage.phone}
                        </a>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-gray-400">
                        <Calendar size={14} />{' '}
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedMessage)}
                      title={selectedMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      {selectedMessage.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      title="Delete Message"
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Message
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Inquiry on Saurav Prasad Website`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E5BFF] text-white text-xs font-semibold rounded-xl hover:bg-[#1650cc] shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Reply size={15} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-center">
                <Mail size={36} className="mb-2 opacity-50" />
                <p className="text-sm">Select a message from the list to read the full inquiry.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
