'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/Logo'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Анимация прогресса
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        // Ускоряемся к концу
        const increment = prev < 70 ? 2 : prev < 90 ? 1.5 : 0.5
        return Math.min(prev + increment, 100)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete, mounted])

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#FEFCF9] flex items-center justify-center"
        >
          {/* Фоновые градиентные круги */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#F97316]/10 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F97316]/8 rounded-full blur-[100px]"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
            {/* Логотип с анимацией */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Logo className="h-16 md:h-20 lg:h-24" />
            </motion.div>

            {/* Прогресс бар */}
            <div className="w-64 md:w-80 max-w-full px-4">
              <div className="h-1 bg-gray-200/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Процент загрузки */}
            <motion.div
              key={progress}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm md:text-base text-[#64748B] font-medium"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Декоративные элементы */}
            <div className="flex items-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#F97316]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

