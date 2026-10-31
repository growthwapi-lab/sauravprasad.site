'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const dotConfig = { damping: 35, stiffness: 500, mass: 0.2 }
  const dotX = useSpring(mouseX, dotConfig)
  const dotY = useSpring(mouseY, dotConfig)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    if (isTouch) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMove)

    // Use MutationObserver to continuously track interactive elements
    const addListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor-hover]')
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
      return interactiveEls
    }

    const elements = addListeners()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-blue-500"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isVisible ? 0.8 : 0,
            backgroundColor: isHovering ? 'rgba(30, 91, 255, 0.1)' : 'transparent',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-orange-500"
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </>
  )
}
