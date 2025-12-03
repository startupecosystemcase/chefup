'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedProgressProps {
  value: number
  className?: string
  showValue?: boolean
}

export function AnimatedProgress({
  value,
  className,
  showValue = false,
}: AnimatedProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <div className={cn('relative w-full', className)}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {showValue && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {Math.round(clampedValue)}%
            </span>
          )}
        </motion.div>
      </div>
    </div>
  )
}

