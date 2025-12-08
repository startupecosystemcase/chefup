'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus } from 'lucide-react'

export function StickyBottomBar() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#FEFCF9]/80 backdrop-blur-2xl border-t border-white/20 p-3 md:hidden safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <ShinyButton
            size="default"
            withConfetti
            className="w-full min-h-[48px] font-medium text-sm"
            onClick={() => router.push('/auth')}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Создать профиль
          </ShinyButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
