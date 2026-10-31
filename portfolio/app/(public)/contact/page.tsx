'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import SectionHeader from '@/components/ui/SectionHeader'
import MagneticButton from '@/components/animations/MagneticButton'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const supabase = createClient()
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        is_read: false,
      })
      if (error) throw error
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg((err as Error).message)
    }
  }

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Contact"
            title="Get In Touch"
            description="Have a project in mind or just want to say hello? Fill the form below and I’ll get back to you ASAP."
          />
          <motion.form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BFF]"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BFF]"
              />
            </div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BFF]"
            />
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BFF]"
            />

            <div className="flex items-center space-x-4">
              <MagneticButton>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1E5BFF] text-white rounded-full font-semibold hover:bg-[#1650cc] transition-colors disabled:opacity-60"
                >
                  {status === 'loading' && <Loader2 className="animate-spin" />}
                  Send Message
                </button>
              </MagneticButton>
              {status === 'success' && (
                <span className="flex items-center text-green-600">
                  <CheckCircle size={20} className="mr-1" /> Message sent!
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center text-red-600">
                  <XCircle size={20} className="mr-1" /> {errorMsg}
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
