'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  className?: string
  pulse?: boolean
}

export function AnimatedBadge({
  children,
  variant = 'default',
  className,
  pulse = false,
}: AnimatedBadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-primary/50 text-primary bg-background/80 backdrop-blur-sm',
    destructive: 'bg-destructive text-destructive-foreground',
  }

  return (
    <motion.div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
        variants[variant],
        pulse && 'animate-pulse',
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  )
}

