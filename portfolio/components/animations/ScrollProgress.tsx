'use client'

import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #1E5BFF, #FF7A1A)',
      }}
    />
  )
}
