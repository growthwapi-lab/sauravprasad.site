'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const nameText = 'Saurav Prasad'
const letters = nameText.split('')

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'curtain' | 'done'>('loading')
  const [revealedLetters, setRevealedLetters] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const letterRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // Check if preloader already shown this session
    const shown = sessionStorage.getItem('preloader-shown')
    if (shown) {
      setPhase('done')
      onCompleteRef.current()
      return
    }

    // Reveal letters one by one
    let letterIdx = 0
    letterRef.current = setInterval(() => {
      letterIdx++
      setRevealedLetters(letterIdx)
      if (letterIdx >= letters.length && letterRef.current) {
        clearInterval(letterRef.current)
      }
    }, 80)

    // Progress counter
    let prog = 0
    intervalRef.current = setInterval(() => {
      prog += Math.random() * 8 + 2
      if (prog >= 100) {
        prog = 100
        setProgress(100)
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimeout(() => setPhase('curtain'), 400)
        setTimeout(() => {
          setPhase('done')
          sessionStorage.setItem('preloader-shown', 'true')
          onCompleteRef.current()
        }, 1400)
      } else {
        setProgress(Math.round(prog))
      }
    }, 60)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (letterRef.current) clearInterval(letterRef.current)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Spinning photo with gradient ring */}
          <div className="relative mb-8 flex items-center justify-center" style={{ width: 200, height: 200 }}>
            {/* Orbiting dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#1E5BFF' : '#FF7A1A',
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos(((deg) * Math.PI) / 180) * 95 - 6,
                    Math.cos(((deg + 360) * Math.PI) / 180) * 95 - 6,
                  ],
                  y: [
                    Math.sin(((deg) * Math.PI) / 180) * 95 - 6,
                    Math.sin(((deg + 360) * Math.PI) / 180) * 95 - 6,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Gradient spinning ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 176,
                height: 176,
                background: 'conic-gradient(from 0deg, #1E5BFF, #FF7A1A, #1E5BFF)',
                padding: '4px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </motion.div>

            {/* Circular photo */}
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/saurav prasad circular.png.png"
                alt="Saurav Prasad"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Name reveal */}
          <div className="flex items-center gap-0 mb-6 text-3xl md:text-4xl font-bold tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: i < revealedLetters ? 1 : 0,
                  y: i < revealedLetters ? 0 : 20,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={letter === ' ' ? 'w-3' : ''}
                style={{
                  color: i < 6 ? '#1E5BFF' : '#FF7A1A',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-52 h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #1E5BFF, #FF7A1A)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Counter */}
          <span className="text-sm font-mono text-gray-400 tabular-nums">
            {progress}%
          </span>
        </motion.div>
      )}

      {/* Curtain reveal panels */}
      {phase === 'curtain' && (
        <>
          <motion.div
            key="curtain-blue"
            className="fixed inset-y-0 left-0 w-1/2 z-[9999]"
            style={{ background: '#1E5BFF' }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            key="curtain-orange"
            className="fixed inset-y-0 right-0 w-1/2 z-[9999]"
            style={{ background: '#FF7A1A' }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
