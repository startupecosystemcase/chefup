'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] bg-clip-text text-transparent',
        'bg-[length:200%_auto]',
        className
      )}
      animate={{
        backgroundPosition: ['0% center', '200% center', '0% center'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}

