'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIconProps {
  icon: LucideIcon
  className?: string
}

export function StepIcon({ icon: Icon, className }: StepIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={cn(
        'w-16 h-16 rounded-full bg-[#F97316]/10 flex items-center justify-center mb-6',
        'shadow-lg shadow-[#F97316]/20',
        className
      )}
    >
      <Icon className="w-8 h-8 text-[#F97316]" />
    </motion.div>
  )
}

