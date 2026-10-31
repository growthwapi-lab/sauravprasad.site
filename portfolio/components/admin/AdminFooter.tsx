'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function AdminFooter() {
  const [year, setYear] = useState('2026')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className={cn('w-full', 'bg-white', 'border-t', 'border-gray-200', 'p-4', 'text-center', 'text-sm', 'text-gray-500')}>
      © {year} Saurav Prasad. All rights reserved.
    </footer>
  )
}
