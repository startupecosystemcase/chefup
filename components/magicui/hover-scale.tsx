'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HoverScaleProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}

export function HoverScale({ 
  children, 
  className = '',
  scale = 1.02,
  duration = 0.2 
}: HoverScaleProps) {
  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

