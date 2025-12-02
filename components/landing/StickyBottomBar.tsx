'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
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
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-white/20 p-3 md:hidden safe-area-bottom"
        >
          <Button
            className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white h-12 text-base font-semibold rounded-xl"
            onClick={() => router.push('/auth')}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Создать профиль
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
