'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function AdminHeader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className={cn('flex', 'items-center', 'justify-between', 'px-6', 'py-4', 'bg-white', 'border-b', 'border-gray-200')}>
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2 rounded-md bg-[#1E5BFF] text-white px-4 py-2 hover:bg-[#1650cc] disabled:opacity-60"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        Logout
      </button>
    </header>
  )
}
