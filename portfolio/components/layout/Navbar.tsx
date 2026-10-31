'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import MagneticButton from '@/components/animations/MagneticButton'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const menuVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 40, x: -20 },
    open: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-500 transition-colors">
              <Image
                src="/saurav prasad circular.png.png"
                alt="Saurav Prasad"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              <span className="text-[#1E5BFF]">Saurav</span>{' '}
              <span className="text-[#FF7A1A]">Prasad</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={15}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1E5BFF] transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <MagneticButton strength={20}>
              <Link
                href="/contact"
                className="relative inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#1E5BFF] to-[#3B7BFF] rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Hire Me</span>
                {/* Shine sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[105] bg-white flex flex-col items-center justify-center lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav
              className="flex flex-col items-center gap-6"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-gray-900 hover:text-[#1E5BFF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#1E5BFF] to-[#FF7A1A] rounded-full"
                >
                  Hire Me
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
