'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import Preloader from '@/components/animations/Preloader'
import CustomCursor from '@/components/animations/CustomCursor'
import ScrollProgress from '@/components/animations/ScrollProgress'
import LenisProvider from '@/components/animations/LenisProvider'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {preloaderDone && (
        <>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </>
      )}
    </LenisProvider>
  )
}
