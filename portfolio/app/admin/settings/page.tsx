'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, CheckCircle2, Phone, Mail, MapPin, MessageSquare, Shield, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Contact Info state
  const [email, setEmail] = useState('SauravPrasad119@gmail.com')
  const [phone, setPhone] = useState('7782004400')
  const [whatsapp, setWhatsapp] = useState('917782004400')
  const [location, setLocation] = useState('India')

  // Theme settings state
  const [primaryColor, setPrimaryColor] = useState('#1E5BFF')
  const [accentColor, setAccentColor] = useState('#FF7A1A')

  const supabase = createClient()

  useEffect(() => {
    async function loadSettings() {
      setLoading(true)
      const { data, error } = await supabase.from('settings').select('*')
      if (!error && data) {
        const contactSetting = data.find((s) => s.key === 'contact_info')
        if (contactSetting?.value) {
          setEmail(contactSetting.value.email || '')
          setPhone(contactSetting.value.phone || '')
          setWhatsapp(contactSetting.value.whatsapp || '')
          setLocation(contactSetting.value.location || '')
        }
        const themeSetting = data.find((s) => s.key === 'theme')
        if (themeSetting?.value) {
          setPrimaryColor(themeSetting.value.primaryColor || '#1E5BFF')
          setAccentColor(themeSetting.value.accentColor || '#FF7A1A')
        }
      }
      setLoading(false)
    }

    loadSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMsg('')
    setErrorMsg('')

    try {
      // Update contact_info
      const { error: err1 } = await supabase.from('settings').upsert({
        key: 'contact_info',
        value: { email, phone, whatsapp, location },
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      if (err1) throw err1

      // Update theme
      const { error: err2 } = await supabase.from('settings').upsert({
        key: 'theme',
        value: { primaryColor, accentColor, textColor: '#0A0A0A', backgroundColor: '#FFFFFF' },
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      if (err2) throw err2

      setSuccessMsg('Settings saved successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="animate-spin text-[#1E5BFF] mb-3" size={32} />
        <p className="text-sm">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure site contact details, social communication, and admin preferences.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Globe className="text-[#1E5BFF]" size={20} />
            <h2 className="text-base font-bold text-gray-900">Contact & Communication Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1 flex items-center gap-1.5">
                <Mail size={14} className="text-gray-400" /> Public Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1 flex items-center gap-1.5">
                <Phone size={14} className="text-gray-400" /> Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-green-500" /> WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" /> Location / Region
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E5BFF] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Brand Accent Colors */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Brand Colors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="px-3 py-2 text-sm font-mono border border-gray-200 rounded-xl w-32 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Accent Gradient Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="px-3 py-2 text-sm font-mono border border-gray-200 rounded-xl w-32 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Account Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Shield className="text-gray-400" size={18} />
            <h2 className="text-base font-bold text-gray-900">Admin Account Info</h2>
          </div>
          <p className="text-xs text-gray-500">
            Signed in as: <strong className="text-gray-800">admin@sauravprasad.com</strong>
          </p>
          <p className="text-xs text-gray-400">
            Password and user authentication are securely managed via your Supabase project. To update your password, you can change it directly in the Supabase Dashboard &gt; Authentication.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E5BFF] text-white text-sm font-semibold rounded-xl hover:bg-[#1650cc] shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
