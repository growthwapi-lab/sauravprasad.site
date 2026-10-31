'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionHeader({ label, title, description, center = true }: SectionHeaderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      {label && (
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-[#1E5BFF] bg-blue-50 rounded-full border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BFF] animate-pulse" />
          {label}
        </motion.span>
      )}
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-4 text-base sm:text-lg text-gray-500 leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
