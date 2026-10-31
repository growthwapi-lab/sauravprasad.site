'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  splitBy?: 'word' | 'letter'
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'p',
  splitBy = 'word',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const units = splitBy === 'letter' ? text.split('') : text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: splitBy === 'letter' ? 0.03 : 0.08, delayChildren: delay },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    // @ts-expect-error - dynamic tag element
    <Tag ref={ref} className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap gap-x-[0.25em]"
        aria-label={text}
      >
        {units.map((unit, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block overflow-hidden"
          >
            <motion.span className="inline-block">
              {unit === ' ' ? '\u00A0' : unit}
            </motion.span>
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
