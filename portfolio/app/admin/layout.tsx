'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminFooter from '@/components/admin/AdminFooter'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    document.body.classList.add('admin-body')
    return () => {
      document.body.classList.remove('admin-body')
    }
  }, [])

  if (isLoginPage) {
    return <div className="admin-layout min-h-screen">{children}</div>
  }

  return (
    <div className="admin-layout flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        <AdminFooter />
      </div>
    </div>
  )
}
