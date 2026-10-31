'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Folder, FileText, MessageSquare, Settings, Users } from 'lucide-react'

const navItems = [
  { href: '/admin/manage-projects', label: 'Projects', icon: Users },
  { href: '/admin/case-studies', label: 'Case Studies', icon: FileText },
  { href: '/admin/media-library', label: 'Media Library', icon: Folder },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <h2 className="text-xl font-bold text-[#1E5BFF] mb-6">Admin</h2>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
              pathname.startsWith(href)
                ? 'bg-[#1E5BFF] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
